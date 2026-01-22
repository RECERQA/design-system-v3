import fs from 'node:fs/promises';
import { chromium } from 'playwright';
import pixelmatch from 'pixelmatch';
import { PNG } from 'pngjs';

const config = {
  urlA: 'https://app.projection-ai.com/21d968b4bbe6490b8fd5f4088f42308f/annual-pl',
  urlB: 'http://localhost:3000',
  outDir: './artifacts',
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 1,
  fullPage: false, // ビューポート内のみ比較
  timeout: 60000,
  diffThreshold: 0.1,
};

await fs.mkdir(config.outDir, { recursive: true });

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({
  viewport: config.viewport,
  deviceScaleFactor: config.deviceScaleFactor,
});

async function preparePage(page, url) {
  await page.goto(url, { waitUntil: 'networkidle', timeout: config.timeout });

  // フォントロード待ち
  await page.evaluate(() => document.fonts && document.fonts.ready);

  // アニメーション/トランジション停止
  await page.addStyleTag({
    content: `
      *, *::before, *::after {
        animation: none !important;
        transition: none !important;
        caret-color: transparent !important;
      }
    `,
  });

  // スクロール位置固定
  await page.evaluate(() => window.scrollTo(0, 0));

  // 少し待機（レンダリング完了）
  await page.waitForTimeout(1000);
}

async function capture(page, name) {
  const path = `${config.outDir}/${name}.png`;
  await page.screenshot({ path, fullPage: config.fullPage });
  return path;
}

async function measureDOM(page, selector = 'body') {
  return await page.evaluate((sel) => {
    const root = document.querySelector(sel);
    if (!root) return [];

    const items = [];
    const nodes = root.querySelectorAll('*');

    nodes.forEach((el, index) => {
      const r = el.getBoundingClientRect();
      const style = window.getComputedStyle(el);

      // 可視要素のみ
      if (r.width === 0 || r.height === 0) return;

      items.push({
        index,
        tag: el.tagName,
        id: el.id || null,
        class: String(el.className || '').slice(0, 50),
        text: el.textContent?.trim().slice(0, 30) || null,
        rect: {
          x: Math.round(r.x),
          y: Math.round(r.y),
          w: Math.round(r.width),
          h: Math.round(r.height),
        },
        style: {
          fontSize: style.fontSize,
          fontWeight: style.fontWeight,
          color: style.color,
          backgroundColor: style.backgroundColor,
          padding: style.padding,
          margin: style.margin,
          borderRadius: style.borderRadius,
        },
      });
    });

    return items;
  }, selector);
}

console.log('Starting comparison...');
console.log(`Original: ${config.urlA}`);
console.log(`Mock: ${config.urlB}`);

const pageA = await context.newPage();
const pageB = await context.newPage();

console.log('Preparing pages...');
await preparePage(pageA, config.urlA);
await preparePage(pageB, config.urlB);

console.log('Capturing screenshots...');
const shotA = await capture(pageA, 'original');
const shotB = await capture(pageB, 'mock');

console.log('Measuring DOM...');
const domA = await measureDOM(pageA);
const domB = await measureDOM(pageB);

await fs.writeFile(`${config.outDir}/dom-original.json`, JSON.stringify(domA, null, 2));
await fs.writeFile(`${config.outDir}/dom-mock.json`, JSON.stringify(domB, null, 2));

await browser.close();

// pixelmatch差分
console.log('Generating diff...');
const imgA = PNG.sync.read(await fs.readFile(shotA));
const imgB = PNG.sync.read(await fs.readFile(shotB));

// サイズが違う場合はリサイズ
const width = Math.min(imgA.width, imgB.width);
const height = Math.min(imgA.height, imgB.height);

const diff = new PNG({ width, height });
const diffPixels = pixelmatch(
  imgA.data,
  imgB.data,
  diff.data,
  width,
  height,
  { threshold: config.diffThreshold, includeAA: false }
);

await fs.writeFile(`${config.outDir}/diff.png`, PNG.sync.write(diff));

const totalPixels = width * height;
const diffPercent = ((diffPixels / totalPixels) * 100).toFixed(2);

const summary = {
  diffPixels,
  totalPixels,
  diffPercent: `${diffPercent}%`,
  matchPercent: `${(100 - parseFloat(diffPercent)).toFixed(2)}%`,
  imageSize: { width, height },
};

await fs.writeFile(`${config.outDir}/report.json`, JSON.stringify(summary, null, 2));

// DOM差分レポート生成
const domDiff = [];
const textMap = new Map();

// オリジナルのテキスト要素をマップ
domA.forEach((item) => {
  if (item.text) {
    textMap.set(item.text, item);
  }
});

// モックの要素と比較
domB.forEach((mockItem) => {
  if (mockItem.text && textMap.has(mockItem.text)) {
    const origItem = textMap.get(mockItem.text);

    // 位置・サイズ・スタイルの差分をチェック
    const diffs = [];

    if (Math.abs(origItem.rect.x - mockItem.rect.x) > 2) {
      diffs.push(`x: ${origItem.rect.x} → ${mockItem.rect.x}`);
    }
    if (Math.abs(origItem.rect.y - mockItem.rect.y) > 2) {
      diffs.push(`y: ${origItem.rect.y} → ${mockItem.rect.y}`);
    }
    if (Math.abs(origItem.rect.w - mockItem.rect.w) > 2) {
      diffs.push(`width: ${origItem.rect.w} → ${mockItem.rect.w}`);
    }
    if (Math.abs(origItem.rect.h - mockItem.rect.h) > 2) {
      diffs.push(`height: ${origItem.rect.h} → ${mockItem.rect.h}`);
    }
    if (origItem.style.fontSize !== mockItem.style.fontSize) {
      diffs.push(`fontSize: ${origItem.style.fontSize} → ${mockItem.style.fontSize}`);
    }
    if (origItem.style.fontWeight !== mockItem.style.fontWeight) {
      diffs.push(`fontWeight: ${origItem.style.fontWeight} → ${mockItem.style.fontWeight}`);
    }
    if (origItem.style.color !== mockItem.style.color) {
      diffs.push(`color: ${origItem.style.color} → ${mockItem.style.color}`);
    }

    if (diffs.length > 0) {
      domDiff.push({
        text: mockItem.text,
        tag: mockItem.tag,
        differences: diffs,
        original: origItem,
        mock: mockItem,
      });
    }
  }
});

await fs.writeFile(`${config.outDir}/dom-diff.json`, JSON.stringify(domDiff, null, 2));

console.log('\n========== COMPARISON RESULT ==========');
console.log(`Total Pixels: ${totalPixels.toLocaleString()}`);
console.log(`Diff Pixels: ${diffPixels.toLocaleString()}`);
console.log(`Match Rate: ${summary.matchPercent}`);
console.log(`Diff Rate: ${summary.diffPercent}`);
console.log(`DOM Differences Found: ${domDiff.length}`);
console.log('========================================\n');

console.log('Output files:');
console.log(`  - ${config.outDir}/original.png`);
console.log(`  - ${config.outDir}/mock.png`);
console.log(`  - ${config.outDir}/diff.png (red = different)`);
console.log(`  - ${config.outDir}/report.json`);
console.log(`  - ${config.outDir}/dom-diff.json`);

if (domDiff.length > 0) {
  console.log('\nTop DOM Differences:');
  domDiff.slice(0, 10).forEach((d, i) => {
    console.log(`  ${i + 1}. "${d.text}" (${d.tag})`);
    d.differences.forEach((diff) => console.log(`     - ${diff}`));
  });
}
