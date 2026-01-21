# Pixel-Perfect Component Cloning Skill

## 概要

既存サイトのUIコンポーネントをピクセル単位で正確に再現するためのワークフロー。
デザインシステムの移植、リファレンス実装の作成に使用。

---

## Phase 0: 分析思考（Analysis Thinking）

コーディング前に以下を明確化：

- **目的**: なぜこのコンポーネントを複製するのか？
  - デザインシステム構築
  - リファレンス実装
  - 学習目的
- **スコープ**: どの範囲まで複製するか？
  - 見た目のみ
  - インタラクションも含む
  - レスポンシブ対応も含む
- **技術制約**: 使用するスタック
  - shadcn/ui, Tailwind CSS, etc.
- **許容誤差**: どこまでの精度を求めるか？
  - ±1px
  - 完全一致

---

## Phase 1: リファレンス分析

### 1.1 スクリーンショット取得

```bash
# Playwright CLI
npx playwright screenshot https://example.com reference/original.png
```

### 1.2 DOM測定スクリプト

Chrome DevTools Console で実行：

```javascript
// 汎用DOM測定スクリプト
(function() {
  const analyze = (el, name) => {
    if (!el) return null;
    const s = getComputedStyle(el);
    const r = el.getBoundingClientRect();
    return {
      name,
      // サイズ
      width: Math.round(r.width),
      height: Math.round(r.height),
      // スペーシング
      padding: s.padding,
      margin: s.margin,
      gap: s.gap,
      // タイポグラフィ
      fontSize: s.fontSize,
      fontWeight: s.fontWeight,
      fontFamily: s.fontFamily,
      lineHeight: s.lineHeight,
      letterSpacing: s.letterSpacing,
      // カラー
      color: s.color,
      backgroundColor: s.backgroundColor,
      borderColor: s.borderColor,
      // ボーダー・シャドウ
      borderRadius: s.borderRadius,
      borderWidth: s.borderWidth,
      boxShadow: s.boxShadow,
    };
  };

  // 対象セレクタを指定
  const selector = '[data-sidebar]';
  const el = document.querySelector(selector);
  console.log(JSON.stringify(analyze(el, selector), null, 2));
})();
```

### 1.3 階層構造分析

```javascript
// コンポーネント階層の抽出
(function() {
  function traverse(node, depth = 0) {
    if (!node || depth > 5) return null;
    const s = getComputedStyle(node);
    return {
      tag: node.tagName?.toLowerCase(),
      classes: [...(node.classList || [])].slice(0, 3),
      display: s.display,
      flex: s.flexDirection,
      children: [...(node.children || [])].slice(0, 10).map(c => traverse(c, depth + 1)).filter(Boolean),
    };
  }
  const el = document.querySelector('[対象セレクタ]');
  console.log(JSON.stringify(traverse(el), null, 2));
})();
```

---

## Phase 2: デザイントークン抽出

### 2.1 カラートークン

抽出したRGB値をHSLに変換してCSS変数化：

```css
:root {
  /* Primary colors */
  --primary: hsl(217 91% 60%);
  --primary-foreground: hsl(0 0% 100%);

  /* Backgrounds */
  --background: hsl(0 0% 100%);
  --foreground: hsl(222.2 84% 4.9%);

  /* Component specific */
  --sidebar: hsl(0 0% 98%);
  --sidebar-foreground: hsl(240 3.8% 26.1%);
}
```

### 2.2 スペーシングシステム

8pxグリッドベースで整理：

```
4px  = 0.25rem (gap-1)
8px  = 0.5rem  (gap-2, p-2)
12px = 0.75rem (gap-3, p-3)
16px = 1rem    (gap-4, p-4)
24px = 1.5rem  (gap-6, p-6)
32px = 2rem    (gap-8, p-8)
```

### 2.3 タイポグラフィ

```
12px = text-xs
14px = text-sm (デフォルト)
16px = text-base
18px = text-lg
```

---

## Phase 3: 実装

### 3.1 ベースコンポーネント導入

```bash
npx shadcn@latest add sidebar
npx shadcn@latest add collapsible
```

### 3.2 構造実装

オリジナルの階層構造に合わせてJSXを構築。

### 3.3 カスタムスタイル適用

`globals.css` でセレクタベースのオーバーライド：

```css
/* コンポーネント固有のスタイル */
[data-sidebar="menu-button"] {
  height: 32px;
  padding: 8px !important;
  gap: 8px;
  border-radius: 6px;
  font-size: 14px;
}
```

---

## Phase 4: 比較・検証

### 4.1 スクリーンショット比較

両方のスクリーンショットを取得し、並べて比較。

### 4.2 DOM測定値比較

同じ測定スクリプトをモック側で実行し、差分を検出：

```javascript
// 差分検出
const original = { height: 32, fontSize: '14px' };
const mock = { height: 30, fontSize: '14px' };

Object.keys(original).forEach(key => {
  if (original[key] !== mock[key]) {
    console.log(`❌ ${key}: ${original[key]} → ${mock[key]}`);
  } else {
    console.log(`✅ ${key}: ${original[key]}`);
  }
});
```

### 4.3 反復調整

差分が見つかった場合：
1. 該当CSSを修正
2. 再度スクリーンショット取得
3. 比較を繰り返す

---

## Phase 5: 品質チェックリスト

### 必須項目

- [ ] サイズ（width/height）が±1px以内
- [ ] スペーシング（margin/padding/gap）が完全一致
- [ ] フォント（size/weight/family）が完全一致
- [ ] カラーがHSL/RGB値で完全一致
- [ ] ボーダー（radius/width）が完全一致

### 推奨項目

- [ ] ホバー状態の再現
- [ ] アクティブ状態の再現
- [ ] トランジションの再現
- [ ] レスポンシブ対応

---

## 回避すべきこと

- **推測による実装**: 必ず測定値を基に実装
- **目視のみの確認**: DOM測定で数値検証
- **一括調整**: 1つずつ確認しながら修正
- **フォントの妥協**: 同一フォントファイルを使用

---

## ツール

| ツール | 用途 |
|-------|-----|
| Chrome DevTools | DOM測定、CSS確認 |
| Playwright | スクリーンショット自動取得 |
| pixelmatch | 画像差分検出 |
| Claude in Chrome | ブラウザ自動操作 |

---

## 使用例

```
User: サイドバーをピクセルパーフェクトで実装して

Claude:
1. Phase 0: スコープ確認（見た目＋インタラクション）
2. Phase 1: オリジナルのDOM測定実行
3. Phase 2: デザイントークンをglobals.cssに追加
4. Phase 3: shadcn/ui Sidebarをベースに実装
5. Phase 4: スクリーンショット比較、差分修正
6. Phase 5: チェックリスト確認
```

---

## 関連スキル

- **frontend-design**: 新規デザイン作成時に使用（公式プラグイン）
- **clone-component**: プロジェクト固有の複製コマンド
