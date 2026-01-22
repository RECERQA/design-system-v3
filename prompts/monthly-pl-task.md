# Monthly PL Page Implementation Task

## Objective
Create a pixel-perfect mock of the Projection AI monthly PL page at:
https://app.projection-ai.com/21d968b4bbe6490b8fd5f4088f42308f/monthly-pl

## Tech Stack (Already configured)
- Next.js 15 with App Router
- Tailwind CSS v4
- shadcn/ui components
- Recharts for charts
- react-datasheet-grid for tables

## Existing Reference Files
- Design tokens: `src/app/globals.css`
- Sidebar component: `src/components/app-sidebar.tsx`
- Header component: `src/components/app-header.tsx`
- Existing annual PL page: `src/app/page.tsx`
- Chart example: `src/components/pl-chart.tsx`
- Table example: `src/components/pl-table.tsx`

## Implementation Requirements

### 1. Create new route at `/monthly-pl`
Create `src/app/monthly-pl/page.tsx`

### 2. Page Layout Components
The page should include:
- Profile card with image (左側)
- "通常ケース" tab button
- Date range selector "2022/4 - 2023/3 (1期目)"
- Currency selector "円"
- MRR dropdown selector

### 3. Chart Section - "予実推移"
- Line chart with "計画" (dotted blue) and "実績" (solid green) lines
- Y-axis: 円 (0 to 18,000,000)
- X-axis: Months (4月 to 3月)
- Legend on right side

### 4. Table Section - "月次データ"
Headers: 2022/4, 2022/5, ... 2023/3
Sub-headers: 計画 for each month
Toggle tabs: 予実, 達成率, 差分, 設定

#### KPI Sections:
1. **KPI - ファネル**
   - セッション数
   - リード数 (with リード率 sub-row)
   - 商談数 (with 商談率 sub-row)
   - 新規受注 (with 受注率 sub-row)

2. **KPI - 顧客**
   - 解約顧客 (with 解約率 sub-row)
   - 顧客数（累計）

3. **KPI - ユニットエコノミクス**
   - ARPA

## Workflow Instructions

1. First read the existing components to understand patterns:
   - `src/app/globals.css` for design tokens
   - `src/components/pl-chart.tsx` for chart patterns
   - `src/components/pl-table.tsx` for table patterns

2. Create the page component with proper structure

3. Use Chrome browser tools to compare with original:
   - Take screenshots at same viewport size
   - Compare specific UI elements

4. Iterate to match:
   - Colors, spacing, typography
   - Component sizing
   - Interactive states

## Success Criteria
- Visual match rate > 90% with original
- All sections rendered correctly
- Responsive within the sidebar layout
