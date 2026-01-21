# UI/UXデザインガイドライン

## 目次

- [概要](#概要)
- [デザインシステム](#デザインシステム)
- [レイアウト](#レイアウト)
- [カラーパレット](#カラーパレット)
- [タイポグラフィ](#タイポグラフィ)
- [コンポーネント](#コンポーネント)
- [データビジュアライゼーション](#データビジュアライゼーション)
- [スペーシング](#スペーシング)
- [インタラクション](#インタラクション)

---

## 概要

Projection AIのデザインは、クリーンでモダン、かつデータ中心のダッシュボードUIを実現しています。
主な特徴：

- **シンプルさ**: 不要な装飾を排除し、情報に集中
- **明確な階層**: 視覚的な優先順位が明確
- **データ重視**: チャートやメトリクスが主役
- **直感的なナビゲーション**: 構造化されたサイドバーナビゲーション

---

## デザインシステム

### デザイン原則

1. **Clarity First (明確さ最優先)**
   - 情報の可読性を最優先
   - 余白を活用して視認性を確保

2. **Data-Driven (データ駆動)**
   - データビジュアライゼーションを中心に配置
   - 数値は大きく、わかりやすく表示

3. **Consistency (一貫性)**
   - 統一されたカードレイアウト
   - 一貫したカラースキーム

4. **Hierarchy (階層構造)**
   - 重要な情報ほど大きく、目立つ配置
   - セクションごとに明確な区切り

---

## レイアウト

### 全体構造

```
┌─────────────┬───────────────────────────────────────┐
│             │  Header (パンくずナビ + ツール)        │
│  Sidebar    ├───────────────────────────────────────┤
│  Navigation │                                       │
│             │  Main Content Area                    │
│  (固定幅)   │  (カードベースのグリッド)               │
│             │                                       │
│             │                                       │
└─────────────┴───────────────────────────────────────┘
```

### レイアウト仕様

#### サイドバー (Sidebar)

- **幅**: 240px (固定)
- **背景色**: 白 `#FFFFFF` または薄いグレー `#F9FAFB`
- **位置**: 左側固定、スクロール可能
- **構成要素**:
  - ロゴ/プロジェクト名（上部）
  - ナビゲーションメニュー（階層構造）
  - ユーザー情報（下部）

#### ヘッダー (Header)

- **高さ**: 64px 程度
- **背景色**: 白 `#FFFFFF`
- **構成要素**:
  - パンくずナビゲーション（左）
  - ユーティリティ（日付選択、通貨選択など）（右）
  - シャドウ: `box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1)`

#### メインコンテンツエリア

- **背景色**: `#F9FAFB` (薄いグレー)
- **パディング**: 24px ~ 32px
- **グリッドレイアウト**:
  - 2カラムグリッド (デスクトップ)
  - 1カラム (タブレット/モバイル)
  - ギャップ: 24px

```css
.content-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
  padding: 24px;
}

@media (max-width: 1024px) {
  .content-grid {
    grid-template-columns: 1fr;
  }
}
```

---

## カラーパレット

### プライマリカラー

```css
/* Primary Blue - メインアクション、チャート */
--primary-500: #3B82F6;  /* Main Blue */
--primary-400: #60A5FA;  /* Hover state */
--primary-600: #2563EB;  /* Active state */

/* Light Blue - サブデータ、計画値 */
--primary-300: #93C5FD;
--primary-200: #BFDBFE;
--primary-100: #DBEAFE;
```

### ニュートラルカラー

```css
/* Grays - テキスト、背景、ボーダー */
--gray-900: #111827;  /* Primary text */
--gray-800: #1F2937;  /* Secondary text */
--gray-600: #4B5563;  /* Tertiary text */
--gray-400: #9CA3AF;  /* Placeholder */
--gray-300: #D1D5DB;  /* Border */
--gray-200: #E5E7EB;  /* Divider */
--gray-100: #F3F4F6;  /* Background secondary */
--gray-50:  #F9FAFB;  /* Background primary */
```

### セマンティックカラー

```css
/* Success */
--success-500: #10B981;
--success-100: #D1FAE5;

/* Warning */
--warning-500: #F59E0B;
--warning-100: #FEF3C7;

/* Error */
--error-500: #EF4444;
--error-100: #FEE2E2;

/* Info */
--info-500: #3B82F6;
--info-100: #DBEAFE;
```

### 背景色の使い分け

- **ページ背景**: `--gray-50` (#F9FAFB)
- **カード背景**: `--white` (#FFFFFF)
- **サイドバー背景**: `--white` (#FFFFFF) または `--gray-50`
- **ホバー背景**: `--gray-100` (#F3F4F6)

---

## タイポグラフィ

### フォントファミリー

```css
/* 日本語フォント */
font-family:
  -apple-system,
  BlinkMacSystemFont,
  "Segoe UI",
  "Hiragino Sans",
  "Hiragino Kaku Gothic ProN",
  Meiryo,
  sans-serif;
```

### フォントサイズとウェイト

```css
/* Headings */
--text-3xl: 30px;    /* ページタイトル */
--text-2xl: 24px;    /* セクションタイトル */
--text-xl:  20px;    /* カードタイトル */
--text-lg:  18px;    /* サブタイトル */

/* Body */
--text-base: 16px;   /* 本文 */
--text-sm:   14px;   /* 補足テキスト */
--text-xs:   12px;   /* ラベル、キャプション */

/* Font Weight */
--font-normal:  400;
--font-medium:  500;
--font-semibold: 600;
--font-bold:    700;
```

### テキストスタイル定義

```css
/* ページタイトル */
.page-title {
  font-size: var(--text-2xl);
  font-weight: var(--font-bold);
  color: var(--gray-900);
  line-height: 1.3;
}

/* カードタイトル */
.card-title {
  font-size: var(--text-lg);
  font-weight: var(--font-semibold);
  color: var(--gray-900);
  line-height: 1.4;
}

/* メトリクス値（大きな数値） */
.metric-value {
  font-size: var(--text-3xl);
  font-weight: var(--font-bold);
  color: var(--primary-500);
  line-height: 1.2;
}

/* 本文 */
.body-text {
  font-size: var(--text-base);
  font-weight: var(--font-normal);
  color: var(--gray-800);
  line-height: 1.6;
}

/* ラベル */
.label-text {
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  color: var(--gray-600);
  line-height: 1.5;
}
```

---

## コンポーネント

### カード (Card)

ダッシュボードの主要なコンテナ。

**スタイル仕様:**

```css
.card {
  background: #FFFFFF;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 24px;
  transition: box-shadow 0.2s ease;
}

.card:hover {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

/* カードヘッダー */
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.card-title {
  font-size: 18px;
  font-weight: 600;
  color: var(--gray-900);
}

/* カードボディ */
.card-body {
  /* チャートやコンテンツエリア */
}
```

**使用例:**

```tsx
<div className="card">
  <div className="card-header">
    <h3 className="card-title">ARR推移</h3>
    <div className="card-actions">
      {/* タブやアクションボタン */}
    </div>
  </div>
  <div className="card-body">
    {/* チャートやコンテンツ */}
  </div>
</div>
```

### ボタン (Button)

**プライマリボタン:**

```css
.btn-primary {
  background: var(--primary-500);
  color: #FFFFFF;
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  border: none;
  cursor: pointer;
  transition: background 0.2s ease;
}

.btn-primary:hover {
  background: var(--primary-600);
}

.btn-primary:active {
  background: var(--primary-700);
}
```

**セカンダリボタン:**

```css
.btn-secondary {
  background: transparent;
  color: var(--gray-700);
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  border: 1px solid var(--gray-300);
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-secondary:hover {
  background: var(--gray-50);
  border-color: var(--gray-400);
}
```

### ナビゲーションメニュー (Navigation)

**サイドバーメニュー:**

```css
.nav-menu {
  list-style: none;
  padding: 0;
  margin: 0;
}

.nav-item {
  margin-bottom: 4px;
}

.nav-link {
  display: flex;
  align-items: center;
  padding: 10px 16px;
  color: var(--gray-700);
  text-decoration: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  transition: background 0.2s ease;
}

.nav-link:hover {
  background: var(--gray-100);
  color: var(--gray-900);
}

.nav-link.active {
  background: var(--primary-50);
  color: var(--primary-600);
  font-weight: 600;
}

/* アイコン付きナビゲーション */
.nav-link svg {
  width: 20px;
  height: 20px;
  margin-right: 12px;
}

/* ネストされたメニュー */
.nav-submenu {
  padding-left: 32px;
  margin-top: 4px;
}
```

### タブ (Tabs)

カード内やページ内でのコンテンツ切り替えに使用。

```css
.tabs {
  display: flex;
  gap: 8px;
  border-bottom: 1px solid var(--gray-200);
}

.tab {
  padding: 8px 16px;
  background: transparent;
  border: none;
  border-bottom: 2px solid transparent;
  color: var(--gray-600);
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.tab:hover {
  color: var(--gray-900);
}

.tab.active {
  color: var(--primary-600);
  border-bottom-color: var(--primary-600);
}
```

### ドロップダウン (Dropdown)

```css
.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-trigger {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background: #FFFFFF;
  border: 1px solid var(--gray-300);
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.dropdown-trigger:hover {
  border-color: var(--gray-400);
  background: var(--gray-50);
}

.dropdown-menu {
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  min-width: 160px;
  background: #FFFFFF;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  padding: 8px 0;
  z-index: 1000;
}

.dropdown-item {
  padding: 8px 16px;
  font-size: 14px;
  color: var(--gray-700);
  cursor: pointer;
  transition: background 0.2s ease;
}

.dropdown-item:hover {
  background: var(--gray-100);
}
```

### 統計カード (Stat Card)

メトリクス値を大きく表示するカード。

```css
.stat-card {
  background: #FFFFFF;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 20px;
}

.stat-label {
  font-size: 14px;
  font-weight: 500;
  color: var(--gray-600);
  margin-bottom: 8px;
}

.stat-value {
  font-size: 32px;
  font-weight: 700;
  color: var(--gray-900);
  margin-bottom: 4px;
}

.stat-unit {
  font-size: 16px;
  font-weight: 500;
  color: var(--gray-600);
  margin-left: 4px;
}

.stat-trend {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 14px;
  font-weight: 500;
}

.stat-trend.positive {
  color: var(--success-500);
}

.stat-trend.negative {
  color: var(--error-500);
}
```

---

## データビジュアライゼーション

### チャートの共通スタイル

#### カラースキーム

```javascript
// チャートカラーパレット
const chartColors = {
  // メインデータ（実績）
  primary: '#3B82F6',

  // サブデータ（計画）
  secondary: '#93C5FD',

  // 追加データ系列
  tertiary: '#8B5CF6',
  quaternary: '#EC4899',

  // グリッドライン
  gridLine: '#E5E7EB',

  // テキスト
  text: '#6B7280',
  textStrong: '#111827',
};
```

#### グリッドとスタイル

```javascript
const chartOptions = {
  grid: {
    show: true,
    borderColor: '#E5E7EB',
    strokeDashArray: 3,
    padding: {
      top: 20,
      right: 20,
      bottom: 10,
      left: 10,
    },
  },
  xaxis: {
    labels: {
      style: {
        colors: '#6B7280',
        fontSize: '12px',
        fontWeight: 500,
      },
    },
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
  yaxis: {
    labels: {
      style: {
        colors: '#6B7280',
        fontSize: '12px',
        fontWeight: 500,
      },
    },
  },
  tooltip: {
    theme: 'light',
    style: {
      fontSize: '12px',
    },
  },
};
```

### バーチャート (Bar Chart)

**用途**: 月次推移、比較データの表示

**スタイル仕様**:
- バー幅: 60-80% of available space
- 角丸: 4px (上部のみ)
- カラー: Primary Blue (#3B82F6) - 実績, Light Blue (#93C5FD) - 計画
- グリッドライン: 横線のみ、薄いグレー (#E5E7EB)

```javascript
const barChartConfig = {
  chart: {
    type: 'bar',
    height: 300,
    toolbar: { show: false },
  },
  plotOptions: {
    bar: {
      borderRadius: 4,
      borderRadiusApplication: 'end',
      columnWidth: '70%',
    },
  },
  colors: ['#3B82F6', '#93C5FD'],
  dataLabels: {
    enabled: false,
  },
  ...chartOptions,
};
```

### ラインチャート (Line Chart)

**用途**: トレンド表示、推移の可視化

**スタイル仕様**:
- 線の太さ: 2-3px
- ポイント: 表示（ホバー時）
- カラー: Primary Blue (#3B82F6), Secondary (#93C5FD)
- スムーズカーブ: smooth

```javascript
const lineChartConfig = {
  chart: {
    type: 'line',
    height: 300,
    toolbar: { show: false },
  },
  stroke: {
    curve: 'smooth',
    width: 2,
  },
  markers: {
    size: 4,
    strokeWidth: 0,
    hover: {
      size: 6,
    },
  },
  colors: ['#3B82F6', '#93C5FD'],
  ...chartOptions,
};
```

### ドーナツチャート (Donut Chart)

**用途**: 割合、達成率の表示

**スタイル仕様**:
- 中央に大きくパーセンテージ表示
- リング幅: 20-30px
- カラー: Primary Blue (#3B82F6), Light Gray (#E5E7EB)

```javascript
const donutChartConfig = {
  chart: {
    type: 'donut',
    height: 250,
  },
  colors: ['#3B82F6', '#E5E7EB'],
  plotOptions: {
    pie: {
      donut: {
        size: '75%',
        labels: {
          show: true,
          name: {
            show: true,
            fontSize: '14px',
            color: '#6B7280',
          },
          value: {
            show: true,
            fontSize: '32px',
            fontWeight: 700,
            color: '#111827',
            formatter: (val) => `${val}%`,
          },
          total: {
            show: true,
            label: '達成率',
            fontSize: '14px',
            color: '#6B7280',
          },
        },
      },
    },
  },
  dataLabels: {
    enabled: false,
  },
  legend: {
    show: false,
  },
};
```

### チャート内の凡例とラベル

```css
/* 凡例 */
.chart-legend {
  display: flex;
  gap: 16px;
  justify-content: center;
  margin-top: 16px;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: var(--gray-700);
}

.legend-indicator {
  width: 12px;
  height: 12px;
  border-radius: 2px;
}

.legend-indicator.primary {
  background: var(--primary-500);
}

.legend-indicator.secondary {
  background: var(--primary-300);
}
```

---

## スペーシング

### スペーシングシステム

```css
/* Spacing Scale */
--spacing-1:  4px;
--spacing-2:  8px;
--spacing-3:  12px;
--spacing-4:  16px;
--spacing-5:  20px;
--spacing-6:  24px;
--spacing-8:  32px;
--spacing-10: 40px;
--spacing-12: 48px;
--spacing-16: 64px;
```

### 適用ルール

#### カード

```css
.card {
  padding: var(--spacing-6);      /* 24px */
  margin-bottom: var(--spacing-6); /* 24px */
}

.card-header {
  margin-bottom: var(--spacing-5); /* 20px */
}
```

#### グリッド

```css
.content-grid {
  gap: var(--spacing-6); /* 24px */
  padding: var(--spacing-6); /* 24px */
}
```

#### ナビゲーション

```css
.nav-item {
  margin-bottom: var(--spacing-1); /* 4px */
}

.nav-link {
  padding: var(--spacing-2) var(--spacing-4); /* 8px 16px */
}
```

---

## インタラクション

### ホバー効果

#### カード

```css
.card {
  transition: all 0.2s ease;
}

.card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}
```

#### ボタン

```css
.btn {
  transition: all 0.2s ease;
}

.btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(59, 130, 246, 0.3);
}

.btn:active {
  transform: translateY(0);
}
```

#### リンク

```css
.nav-link {
  transition: all 0.2s ease;
}

.nav-link:hover {
  background: var(--gray-100);
  color: var(--gray-900);
}
```

### フォーカス状態

```css
.focusable:focus {
  outline: 2px solid var(--primary-500);
  outline-offset: 2px;
  border-radius: 8px;
}

.focusable:focus-visible {
  outline: 2px solid var(--primary-500);
  outline-offset: 2px;
}
```

### ローディング状態

```css
.loading {
  position: relative;
  pointer-events: none;
  opacity: 0.6;
}

.loading::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 20px;
  height: 20px;
  margin: -10px 0 0 -10px;
  border: 2px solid var(--gray-300);
  border-top-color: var(--primary-500);
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
```

---

## 実装時の注意点

### アクセシビリティ

1. **カラーコントラスト**
   - テキストと背景のコントラスト比: 最低 4.5:1 (WCAG AA)
   - 重要な情報は色だけで伝えない

2. **キーボード操作**
   - すべてのインタラクティブ要素にフォーカス可能
   - Tab順序が論理的

3. **セマンティックHTML**
   - 適切なHTML要素を使用 (`<button>`, `<nav>`, `<main>`)
   - ARIA属性で補完

### レスポンシブデザイン

```css
/* モバイル (< 768px) */
@media (max-width: 767px) {
  .sidebar {
    transform: translateX(-100%);
    position: fixed;
  }

  .content-grid {
    grid-template-columns: 1fr;
    padding: 16px;
  }

  .card {
    padding: 16px;
  }
}

/* タブレット (768px - 1024px) */
@media (min-width: 768px) and (max-width: 1023px) {
  .content-grid {
    grid-template-columns: 1fr;
  }
}

/* デスクトップ (>= 1024px) */
@media (min-width: 1024px) {
  .content-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
```

### パフォーマンス

1. **チャートの遅延ロード**
   - データ量が多い場合は仮想化
   - 初期表示時は軽量な表示、詳細はオンデマンド

2. **画像最適化**
   - SVGアイコンを優先
   - WebP形式の使用

3. **CSS最適化**
   - Critical CSSの分離
   - 不要なスタイルの削除

---

## コンポーネントライブラリの推奨

このデザインシステムを実装する際に推奨するライブラリ：

- **チャート**: [Apache ECharts](https://echarts.apache.org/), [Recharts](https://recharts.org/), or [Chart.js](https://www.chartjs.org/)
- **アイコン**: [react-icons](https://react-icons.github.io/react-icons/) (Heroicons推奨)
- **日付ピッカー**: [react-datepicker](https://reactdatepicker.com/)
- **ドロップダウン**: [Headless UI](https://headlessui.com/) or [Radix UI](https://www.radix-ui.com/)

---

## まとめ

このデザインガイドラインは、Projection AIのクリーンでデータ中心のUIを再現するための包括的な指針です。

**重要なポイント:**

1. **シンプルさを保つ** - 余計な装飾を避け、データに集中
2. **一貫性を維持** - カラー、スペーシング、コンポーネントの使い方を統一
3. **アクセシビリティ** - すべてのユーザーが使えるUIを
4. **パフォーマンス** - 高速で快適な操作体験を提供

このガイドラインを基に、SCM Webアプリケーションのダッシュボードを構築してください。
