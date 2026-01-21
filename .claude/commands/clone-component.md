# Clone Component (プロジェクト固有)

Projection AIのコンポーネントをピクセルパーフェクトで再現します。

## 引数
- `$ARGUMENTS`: コンポーネント名（sidebar, header, table, chart など）

## 前提条件
- 開発サーバー起動済み（localhost:3000）
- Chrome拡張（Claude in Chrome）接続済み

## 実行手順

### 1. オリジナル分析
オリジナルサイト（https://app.projection-ai.com/）にアクセスし、以下を実行:

```javascript
// DOM測定スクリプト - サイドバー用
(function() {
  const sidebar = document.querySelector('[data-sidebar]');
  if (!sidebar) return console.log('Sidebar not found');

  const analyze = (el, name) => {
    const s = getComputedStyle(el);
    const r = el.getBoundingClientRect();
    return {
      name,
      width: r.width,
      height: r.height,
      padding: s.padding,
      margin: s.margin,
      gap: s.gap,
      fontSize: s.fontSize,
      fontWeight: s.fontWeight,
      color: s.color,
      backgroundColor: s.backgroundColor,
      borderRadius: s.borderRadius,
    };
  };

  const results = {
    sidebar: analyze(sidebar, 'sidebar'),
    header: analyze(sidebar.querySelector('[data-sidebar="header"]'), 'header'),
    menuButton: analyze(sidebar.querySelector('[data-sidebar="menu-button"]'), 'menuButton'),
    menuSubButton: analyze(sidebar.querySelector('[data-sidebar="menu-sub-button"]'), 'menuSubButton'),
    footer: analyze(sidebar.querySelector('[data-sidebar="footer"]'), 'footer'),
  };

  console.log(JSON.stringify(results, null, 2));
})();
```

### 2. トークン更新
`src/app/globals.css` を更新:
- カラー変数
- サイドバー固有のスタイル

### 3. コンポーネント実装
`src/components/` にコンポーネントを作成:
- shadcn/uiをベースに
- カスタムスタイルを適用

### 4. 比較検証
1. 両サイトのスクリーンショットを取得
2. 並べて比較
3. 差分があれば調整

## 品質基準
- サイズ: ±1px
- スペーシング: 完全一致
- フォント: 完全一致
- カラー: 完全一致

## 既存コンポーネント参照
- `src/components/app-sidebar.tsx` - サイドバー（実装済み）
- `src/components/app-header.tsx` - ヘッダー
- `src/components/pl-chart.tsx` - PLチャート
- `src/components/pl-table.tsx` - PLテーブル
