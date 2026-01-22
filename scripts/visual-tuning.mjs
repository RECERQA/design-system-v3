/**
 * Visual Tuning Script
 *
 * Claudeが生成した差分レポートをGeminiに渡して修正させるワークフロー
 *
 * Usage:
 *   node scripts/visual-tuning.mjs
 */

import fs from 'node:fs/promises';
import path from 'node:path';
import { execSync } from 'node:child_process';

const ARTIFACTS_DIR = './artifacts/monthly-pl';
const DIFF_REPORT_PATH = './artifacts/monthly-pl/diff-report.md';

async function main() {
  console.log('🔍 Visual Tuning Workflow\n');

  // 1. 差分レポートを読み込み
  let diffReport;
  try {
    diffReport = await fs.readFile(DIFF_REPORT_PATH, 'utf-8');
    console.log('📄 Diff report loaded');
  } catch {
    console.log('❌ No diff report found at', DIFF_REPORT_PATH);
    console.log('   Please create a diff report first using Claude.');
    process.exit(1);
  }

  // 2. Geminiプロンプトを構築
  const prompt = `
# Visual Diff Correction Task

以下は、オリジナルデザインとモック実装の視覚的な差分レポートです。
この差分を修正するためのコード変更を提案してください。

## 差分レポート

${diffReport}

## 対象ファイル
- src/app/monthly-pl/page.tsx
- src/components/monthly-pl-chart.tsx
- src/components/monthly-pl-table.tsx

## 指示
1. 各差分について、具体的なコード修正を提案
2. 修正後の完全なコードブロックを出力
3. 変更理由を簡潔に説明

修正を開始してください。
`;

  // 3. プロンプトを一時ファイルに保存
  const promptPath = path.join(ARTIFACTS_DIR, 'gemini-prompt.txt');
  await fs.writeFile(promptPath, prompt);
  console.log('📝 Prompt saved to', promptPath);

  // 4. Geminiを実行
  console.log('\n🤖 Invoking Gemini CLI...\n');
  console.log('Run this command:');
  console.log(`  gemini "$(cat ${promptPath})"`);
}

main().catch(console.error);
