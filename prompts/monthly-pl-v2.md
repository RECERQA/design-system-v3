# Monthly PL Page - Pixel Perfect Implementation v2

## 概要
Projection AIの「月次予実管理」ページを完全再現する。

## 重要な前提
- **このAIはオリジナル画面を見ることができない**
- そのため、全ての視覚要素を**具体的な数値・色コード**で指定する
- 曖昧な表現は禁止（「〜のような」「適切な」等は使わない）

---

## STEP 1: 既存ファイルの変更

### 1.1 サイドバーメニュー変更
**ファイル:** `src/components/app-sidebar.tsx`

「モニタリング」セクションのサブメニューを以下に変更:
```
モニタリング
├── ダッシュボード
├── 月次予実管理  ← アクティブ状態
└── レポートビルダー (β版バッジ付き)
```

### 1.2 ヘッダーのパンくず変更
**ファイル:** `src/components/app-header.tsx`

パンくずを動的に変更できるようにするか、monthly-pl用のヘッダーを作成:
```
CFO > モニタリング > 月次予実管理
```

---

## STEP 2: ページレイアウト仕様

### 2.1 全体構造（正確なレイアウト）
```
┌──────────────────────────────────────────────────────────────────┐
│ Sidebar(255px) │ Main Content Area                               │
│                │                                                  │
│                │ ┌─[Profile Area]──────┬─[Controls]─────────────┐│
│                │ │ Sakamoto CFO [icons]│ [通常ケース] [円▼][< 期間 >]││
│                │ │ ┌────────────────┐  │                        ││
│                │ │ │ Profile Image  │  │ ┌─[Chart Card]───────┐││
│                │ │ │ 150x180px      │  │ │ 予実推移    MRR▼   │││
│                │ │ │                │  │ │             ◯計画 ●実績│││
│                │ │ └────────────────┘  │ │ [Line Chart]       │││
│                │ └────────────────────┴─┴─────────────────────┘│
│                │                                                  │
│                │ ┌─[Table Card]─────────────────────────────────┐│
│                │ │ 月次データ ⓘ            [予実][達成率][差分][設定]││
│                │ │ ┌─────────────────────────────────────────┐ ││
│                │ │ │ Header: 2022/4 | 2022/5 | ... | 2023/3  │ ││
│                │ │ │        計画   | 計画   | ... | 計画     │ ││
│                │ │ │ KPI-ファネル (gray bg)                   │ ││
│                │ │ │ セッション数  21件    0件    ...         │ ││
│                │ │ │ ...                                      │ ││
│                │ │ └─────────────────────────────────────────┘ ││
│                │ └──────────────────────────────────────────────┘│
└──────────────────────────────────────────────────────────────────┘
```

---

## STEP 3: コンポーネント詳細仕様

### 3.1 プロファイルカード

```typescript
// 配置: ページ左上
// サイズ: 幅180px程度

interface ProfileCard {
  name: "Sakamoto"
  badge: "CFO"  // グレー背景(bg-muted), 小文字(text-xs)
  icons: ["clock", "expand", "chevron-left"]  // 16x16px, text-muted-foreground
  image: {
    width: 150,
    height: 180,
    borderRadius: "8px",
    src: "/profile-sakamoto.jpg"  // なければグレープレースホルダー
  }
}
```

### 3.2 コントロールエリア（右上）

```typescript
// 横並び配置、gap: 8px

controls: [
  {
    type: "tab",
    label: "通常ケース",
    active: true,
    height: "40px",
    padding: "0 16px"
  },
  {
    type: "select",
    label: "円",
    width: "80px",
    height: "36px"
  },
  {
    type: "navigation",
    content: "< 2022/4 - 2023/3 (1期目) >",
    height: "36px"
  }
]
```

### 3.3 チャート仕様（予実推移）

```typescript
// カードスタイル
card: {
  background: "white",
  border: "1px solid hsl(214.3 31.8% 91.4%)",
  borderRadius: "8px",
  padding: "24px"
}

// ヘッダー
header: {
  title: "予実推移",
  fontSize: "16px",
  fontWeight: 500,
  rightControls: [
    { type: "select", label: "MRR", width: "100px" },
    { type: "legend", items: [
      { label: "計画", color: "#3b82f6", style: "dashed-line" },
      { label: "実績", color: "#22c55e", style: "solid-line" }
    ]}
  ]
}

// チャートデータ（重要: 実績は5月まで）
data: [
  { month: "4月", plan: 2000000, actual: 1800000 },
  { month: "5月", plan: 2500000, actual: 2300000 },
  { month: "6月", plan: 3200000, actual: 3000000 },
  { month: "7月", plan: 4000000, actual: 3800000 },
  { month: "8月", plan: 5000000, actual: 4700000 },
  { month: "9月", plan: 6200000, actual: 6000000 },
  { month: "10月", plan: 7500000, actual: 7200000 },
  { month: "11月", plan: 9000000, actual: 8700000 },
  { month: "12月", plan: 10500000, actual: 10200000 },
  { month: "1月", plan: 12000000, actual: 11500000 },
  { month: "2月", plan: 13500000, actual: 13000000 },
  { month: "3月", plan: 15000000, actual: 14500000 },
]

// チャートスタイル
chart: {
  height: 280,
  yAxis: {
    domain: [0, 18000000],
    ticks: [0, 3000000, 6000000, 9000000, 12000000, 15000000, 18000000],
    label: "円",
    tickFormat: (v) => v.toLocaleString()
  },
  xAxis: {
    dataKey: "month"
  },
  lines: {
    plan: {
      stroke: "#3b82f6",
      strokeWidth: 2,
      strokeDasharray: "5 5",
      dot: { r: 0 }  // ドットなし、線のみ
    },
    actual: {
      stroke: "#22c55e",
      strokeWidth: 2,
      dot: { r: 0 }  // ドットなし、線のみ
    }
  }
}
```

### 3.4 テーブル仕様（月次データ）

```typescript
// カードスタイル（チャートと同じ）

// ヘッダー
header: {
  title: "月次データ",
  icon: "info-circle",  // 16px, text-muted-foreground
  tabs: ["予実", "達成率", "差分", "設定"],  // 右側配置
  activeTab: "予実"
}

// テーブルカラム（2段ヘッダー）
columns: [
  { key: "label", title: "", width: 180 },
  { key: "m0", title: "2022/4", subTitle: "計画", width: 90 },
  { key: "m1", title: "2022/5", subTitle: "計画", width: 90 },
  // ... m2-m10
  { key: "m11", title: "2023/3", subTitle: "計画", width: 90 },
]

// データ構造（完全版）
rows: [
  // セクション1
  { type: "section", label: "KPI - ファネル" },
  { type: "data", label: "セッション数", values: ["21件", "0件", "21件", "21件", "21件", "21件", "37件", "37件", "21件", "37件", "60件", "37件"] },
  { type: "data", label: "リード数", values: ["11件", "0件", "11件", "11件", "11件", "11件", "19件", "19件", "11件", "19件", "31件", "19件"] },
  { type: "sub", label: "リード率", values: ["52.4%", "0%", "52.4%", "52.4%", "52.4%", "52.4%", "51.4%", "51.4%", "52.4%", "51.4%", "51.7%", "51.4%"] },
  { type: "data", label: "商談数", values: ["4件", "0件", "4件", "4件", "4件", "4件", "7件", "7件", "4件", "7件", "11件", "7件"] },
  { type: "sub", label: "商談率", values: ["36.4%", "0%", "36.4%", "36.4%", "36.4%", "36.4%", "36.8%", "36.8%", "36.4%", "36.8%", "35.5%", "36.8%"] },
  { type: "data", label: "新規受注", values: ["1件", "0件", "1件", "1件", "1件", "1件", "2件", "2件", "1件", "2件", "3件", "2件"] },
  { type: "sub", label: "受注率", values: ["25%", "0%", "25%", "25%", "25%", "25%", "28.6%", "28.6%", "25%", "28.6%", "27.3%", "28.6%"] },

  // セクション2
  { type: "section", label: "KPI - 顧客" },
  { type: "data", label: "解約顧客", values: ["0件", "0件", "0件", "0件", "0件", "0件", "0件", "0件", "0件", "0件", "0件", "0件"] },
  { type: "sub", label: "解約率", values: ["0%", "0%", "0%", "0%", "0%", "0%", "0%", "0%", "0%", "0%", "0%", "0%"] },
  { type: "data", label: "顧客数（累計）", values: ["1件", "1件", "2件", "3件", "4件", "5件", "7件", "9件", "10件", "12件", "15件", "17件"] },

  // セクション3
  { type: "section", label: "KPI - ユニットエコノミクス" },
  { type: "data", label: "ARPA", values: ["¥1,000,000", "¥1,000,000", "¥1,000,000", "¥1,000,000", "¥1,000,000", "¥1,000,000", "¥1,000,000", "¥1,000,000", "¥1,000,000", "¥1,000,000", "¥1,000,000", "¥1,000,000"] },
  { type: "data", label: "LTV", values: ["¥0", "¥0", "¥0", "¥0", "¥0", "¥0", "¥0", "¥0", "¥0", "¥0", "¥0", "¥0"] },
]

// スタイル
styles: {
  section: {
    background: "hsl(210 40% 96.1%)",  // bg-muted
    fontWeight: 600,
    color: "hsl(222.2 84% 4.9%)"
  },
  data: {
    color: "#2563eb",  // text-blue-600
    fontWeight: 500
  },
  sub: {
    color: "hsl(215.4 16.3% 46.9%)",  // text-muted-foreground
    paddingLeft: "24px"  // インデント
  },
  headerRow: {
    height: 50,
    subTitle: {
      fontSize: "12px",
      color: "hsl(215.4 16.3% 46.9%)"
    }
  },
  dataRow: {
    height: 36
  }
}
```

---

## STEP 4: 作成するファイル一覧

```
src/
├── app/
│   └── monthly-pl/
│       └── page.tsx          # メインページ
├── components/
│   ├── monthly-pl-chart.tsx  # チャートコンポーネント
│   ├── monthly-pl-table.tsx  # テーブルコンポーネント
│   └── app-sidebar.tsx       # 既存ファイル修正（メニュー変更）
```

---

## STEP 5: 検証チェックリスト

実装後、以下を確認:

- [ ] パンくずが「CFO > モニタリング > 月次予実管理」になっている
- [ ] サイドバーの「月次予実管理」がアクティブ状態
- [ ] プロファイルカードが左上に表示（名前、CFOバッジ、画像）
- [ ] チャートの計画線が点線の青色
- [ ] チャートの実績線が実線の緑色
- [ ] チャートY軸が「円」ラベル付きで0〜18,000,000
- [ ] テーブルヘッダーが2段（月 + 計画）
- [ ] セクション行（KPI-ファネル等）がグレー背景
- [ ] データ行の数値が青色
- [ ] サブ行（率）がグレー色でインデント
- [ ] LTV行が表示されている

---

## コマンド

```bash
# 開発サーバー起動
npm run dev

# 確認URL
http://localhost:3000/monthly-pl
```
