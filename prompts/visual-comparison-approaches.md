# Visual Comparison Approaches for AI-driven Pixel Perfect Implementation

## 問題
- Gemini CLIはブラウザを操作できない
- 視覚的なフィードバックループが作れない
- 差分の検出・修正が手動になる

---

## アプローチ比較

### アプローチ1: diff.png を渡す

```bash
# Geminiがファイルを読めるか試す
gemini "artifacts/diff.png を見て、赤い部分（差分）を修正するコード変更を提案してください"
```

**メリット:**
- 差分が明確に可視化されている
- 1枚の画像で伝わる

**デメリット:**
- Gemini CLIが画像を処理できるか不明
- 赤い部分が「何」なのかのコンテキストがない

---

### アプローチ2: original.png + mock.png を渡す

```bash
gemini "
artifacts/original.png がターゲットデザイン
artifacts/mock.png が現在の実装

2つを比較して、mock.pngをoriginal.pngに近づけるための
コード修正を提案してください。

修正対象ファイル:
- src/app/monthly-pl/page.tsx
- src/components/monthly-pl-chart.tsx
- src/components/monthly-pl-table.tsx
"
```

**メリット:**
- 正解と現状が明確
- コンテキストが豊富

**デメリット:**
- 2枚の画像処理が必要
- 差分の検出はAI任せ

---

### アプローチ3: Playwright + pixelmatch で自動化スクリプト

```javascript
// scripts/visual-tuning-loop.mjs
import puppeteer from 'puppeteer';
import pixelmatch from 'pixelmatch';
import { PNG } from 'pngjs';
import { exec } from 'child_process';

async function runTuningLoop() {
  const browser = await puppeteer.launch();

  while (true) {
    // 1. スクリーンショット撮影
    const mockPage = await browser.newPage();
    await mockPage.goto('http://localhost:3000/monthly-pl');
    await mockPage.screenshot({ path: 'artifacts/current-mock.png' });

    // 2. 差分計算
    const original = PNG.sync.read(fs.readFileSync('artifacts/original.png'));
    const mock = PNG.sync.read(fs.readFileSync('artifacts/current-mock.png'));
    const diff = new PNG({ width, height });
    const numDiff = pixelmatch(original.data, mock.data, diff.data, width, height);

    // 3. 差分率チェック
    const diffPercent = numDiff / (width * height) * 100;
    console.log(`Diff: ${diffPercent.toFixed(2)}%`);

    if (diffPercent < 5) {
      console.log('✅ Target achieved!');
      break;
    }

    // 4. Geminiに修正を依頼
    // ここでGeminiを呼び出し、コード修正を取得
    // (画像は渡せないので、差分の特徴をテキストで記述)

    // 5. 修正を適用
    // ...

    // 6. 繰り返し
  }
}
```

**メリット:**
- 完全自動化
- 定量的な進捗管理
- 反復改善可能

**デメリット:**
- 実装が複雑
- Geminiへの視覚情報伝達は依然課題

---

### アプローチ4: Claude (私) がGeminiを補完

```
┌─────────────────────────────────────────────────────┐
│                  Hybrid Workflow                    │
├─────────────────────────────────────────────────────┤
│                                                     │
│  ┌─────────┐    ┌─────────┐    ┌─────────┐        │
│  │ Claude  │───▶│ Gemini  │───▶│ Claude  │        │
│  │ (視覚)  │    │ (実装)  │    │ (検証)  │        │
│  └─────────┘    └─────────┘    └─────────┘        │
│       │              │              │              │
│       ▼              ▼              ▼              │
│  [差分検出]    [コード生成]    [スクショ比較]       │
│  [仕様記述]    [ファイル編集]   [差分レポート]      │
│                                                     │
└─────────────────────────────────────────────────────┘
```

1. **Claude**: スクリーンショットを比較し、具体的な差分をテキストで記述
2. **Gemini**: テキスト仕様に基づいてコード修正
3. **Claude**: 修正結果をスクリーンショットで検証
4. 繰り返し

---

## 推奨: アプローチ4の実装

### Phase 1: Claudeが差分を分析

```markdown
## 視覚差分レポート

### 差分1: プロファイル画像
- 位置: 左上 (x: 170-350, y: 50-230)
- 問題: 画像が表示されていない（グレーのプレースホルダー）
- 修正: 画像ファイルの追加、またはプレースホルダーデザインの改善

### 差分2: チャートの線スタイル
- 位置: 中央チャートエリア
- 問題: 計画線のドットが目立ちすぎる
- 修正: strokeDasharray を "5 5" に変更、dot を非表示に
```

### Phase 2: Geminiに修正を依頼

```bash
gemini "
以下の視覚差分を修正してください:

1. src/components/monthly-pl-chart.tsx
   - Line コンポーネントの dot プロパティを { r: 0 } に変更
   - strokeDasharray を '5 5' に変更

2. src/app/monthly-pl/page.tsx
   - プロファイル画像のプレースホルダーを改善

修正後のコードを出力してください。
"
```

### Phase 3: Claudeが検証

スクリーンショットを再取得し、差分が減少したか確認

---

## 実験用スクリプト

```bash
#!/bin/bash
# prompts/hybrid-tuning.sh

# Step 1: Claudeが作成した差分レポートを読み込み
DIFF_REPORT=$(cat artifacts/diff-report.md)

# Step 2: Geminiに修正を依頼
gemini "
以下の差分レポートに基づいて、コードを修正してください。

$DIFF_REPORT

対象ファイル:
- src/components/monthly-pl-chart.tsx
- src/components/monthly-pl-table.tsx
- src/app/monthly-pl/page.tsx
"
```

---

## 結論

**最も実用的なアプローチはアプローチ4（ハイブリッド）**

- Claudeの視覚能力を活用して差分を検出・記述
- Geminiのコード生成能力を活用して修正
- Claudeで検証を繰り返す

これにより、両AIの強みを活かした効率的なピクセルパーフェクト実装が可能になる。
