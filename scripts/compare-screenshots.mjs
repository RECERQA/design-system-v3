/**
 * スクリーンショット比較スクリプト
 *
 * 使い方:
 * 1. Chrome拡張でオリジナルとモックのスクリーンショットを保存
 * 2. node scripts/compare-screenshots.mjs original.png mock.png
 */

import fs from 'node:fs/promises';
import path from 'node:path';
import pixelmatch from 'pixelmatch';
import { PNG } from 'pngjs';

const args = process.argv.slice(2);

if (args.length < 2) {
  console.log('Usage: node scripts/compare-screenshots.mjs <original.png> <mock.png>');
  console.log('');
  console.log('Example:');
  console.log('  node scripts/compare-screenshots.mjs artifacts/original.png artifacts/mock.png');
  process.exit(1);
}

const [originalPath, mockPath] = args;
const outDir = './artifacts';
const threshold = 0.1;

await fs.mkdir(outDir, { recursive: true });

console.log('Loading images...');
console.log(`  Original: ${originalPath}`);
console.log(`  Mock: ${mockPath}`);

const imgA = PNG.sync.read(await fs.readFile(originalPath));
const imgB = PNG.sync.read(await fs.readFile(mockPath));

console.log(`  Original size: ${imgA.width}x${imgA.height}`);
console.log(`  Mock size: ${imgB.width}x${imgB.height}`);

// サイズが違う場合は小さい方に合わせる
const width = Math.min(imgA.width, imgB.width);
const height = Math.min(imgA.height, imgB.height);

if (imgA.width !== imgB.width || imgA.height !== imgB.height) {
  console.log(`  Comparing at: ${width}x${height} (cropped to smaller)`);
}

const diff = new PNG({ width, height });

console.log('');
console.log('Comparing pixels...');

const diffPixels = pixelmatch(
  imgA.data,
  imgB.data,
  diff.data,
  width,
  height,
  {
    threshold,
    includeAA: false,
    alpha: 0.1,
    diffColor: [255, 0, 0],      // 赤: 差分
    diffColorAlt: [0, 255, 0],   // 緑: アンチエイリアス差分
  }
);

const totalPixels = width * height;
const matchPixels = totalPixels - diffPixels;
const matchPercent = ((matchPixels / totalPixels) * 100).toFixed(2);
const diffPercent = ((diffPixels / totalPixels) * 100).toFixed(2);

// 差分画像を保存
const diffPath = path.join(outDir, 'diff.png');
await fs.writeFile(diffPath, PNG.sync.write(diff));

// レポートを保存
const report = {
  original: originalPath,
  mock: mockPath,
  size: { width, height },
  totalPixels,
  matchPixels,
  diffPixels,
  matchPercent: `${matchPercent}%`,
  diffPercent: `${diffPercent}%`,
  threshold,
  timestamp: new Date().toISOString(),
};

await fs.writeFile(
  path.join(outDir, 'comparison-report.json'),
  JSON.stringify(report, null, 2)
);

// 結果表示
console.log('');
console.log('╔════════════════════════════════════════════╗');
console.log('║          PIXEL COMPARISON RESULT           ║');
console.log('╠════════════════════════════════════════════╣');
console.log(`║  Total Pixels:  ${totalPixels.toLocaleString().padStart(15)}       ║`);
console.log(`║  Match Pixels:  ${matchPixels.toLocaleString().padStart(15)}       ║`);
console.log(`║  Diff Pixels:   ${diffPixels.toLocaleString().padStart(15)}       ║`);
console.log('╠════════════════════════════════════════════╣');

// マッチ率に応じた色分け
let statusIcon = '🔴';
if (parseFloat(matchPercent) >= 95) statusIcon = '🟢';
else if (parseFloat(matchPercent) >= 80) statusIcon = '🟡';
else if (parseFloat(matchPercent) >= 60) statusIcon = '🟠';

console.log(`║  ${statusIcon} Match Rate:   ${matchPercent.padStart(10)}%          ║`);
console.log(`║     Diff Rate:    ${diffPercent.padStart(10)}%          ║`);
console.log('╚════════════════════════════════════════════╝');
console.log('');
console.log(`Diff image saved: ${diffPath}`);
console.log('');

// 品質評価
if (parseFloat(matchPercent) >= 95) {
  console.log('✅ Excellent! Almost pixel-perfect match.');
} else if (parseFloat(matchPercent) >= 90) {
  console.log('✅ Good! Minor differences detected.');
} else if (parseFloat(matchPercent) >= 80) {
  console.log('⚠️  Fair. Some noticeable differences.');
} else if (parseFloat(matchPercent) >= 60) {
  console.log('⚠️  Needs work. Significant differences detected.');
} else {
  console.log('❌ Major differences. Review the diff image.');
}
