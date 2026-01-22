#!/bin/bash
# Gemini CLI実行コマンド v2

cd /Users/nodaakiyoshi/Soruce/tpp

gemini -p "# Pixel-Perfect UI実装タスク

## 指示
prompts/monthly-pl-v2.md に記載された仕様に従って、月次予実管理ページを実装してください。

## 重要な注意事項
1. 仕様書に記載された**具体的な数値・色コード**を正確に使用すること
2. **曖昧な解釈をしない** - 仕様書にない要素は追加しない
3. 既存ファイルを読んでパターンを理解してから実装すること
4. チェックリストの全項目を満たすこと

## 作業順序
1. prompts/monthly-pl-v2.md を読む（全文）
2. src/app/globals.css を読む（色変数の確認）
3. src/components/pl-chart.tsx を読む（Rechartsパターン）
4. src/components/pl-table.tsx を読む（DataSheetGridパターン）
5. src/components/monthly-pl-chart.tsx を作成/更新
6. src/components/monthly-pl-table.tsx を作成/更新
7. src/app/monthly-pl/page.tsx を作成/更新

## 成功基準
- 仕様書の検証チェックリスト全項目がOK
- TypeScriptエラーなし
- 画面が正しくレンダリングされる

作業を開始してください。"
