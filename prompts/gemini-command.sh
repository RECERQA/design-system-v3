#!/bin/bash
# Gemini CLI実行コマンド

cd /Users/nodaakiyoshi/Soruce/tpp

gemini -p "あなたはPixel-Perfect UIモック作成のエキスパートです。

# タスク
prompts/monthly-pl-detailed-task.md を読んで、月次予実管理ページを実装してください。

# 作業手順
1. まず prompts/monthly-pl-detailed-task.md を読む
2. src/app/globals.css を読んでデザイントークンを確認
3. src/components/pl-chart.tsx を読んでチャートパターンを確認
4. src/components/pl-table.tsx を読んでテーブルパターンを確認
5. 以下のファイルを作成:
   - src/components/monthly-pl-chart.tsx
   - src/components/monthly-pl-table.tsx
   - src/app/monthly-pl/page.tsx

# 重要
- 詳細仕様はtask.mdに記載済み
- 既存パターンを踏襲すること
- テーブルの値は青色(text-blue-600)にする
- セクションヘッダーは背景グレー

作業を開始してください。"
