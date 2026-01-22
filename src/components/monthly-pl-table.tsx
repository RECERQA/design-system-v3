"use client"

import { useMemo } from "react"
import {
  DataSheetGrid,
  textColumn,
  keyColumn,
} from "react-datasheet-grid"

type Row = {
  label: string
  isSection?: boolean
  isSubRow?: boolean
  [key: string]: string | boolean | undefined
}

const months = [
  "2022/4", "2022/5", "2022/6", "2022/7", "2022/8", "2022/9",
  "2022/10", "2022/11", "2022/12", "2023/1", "2023/2", "2023/3"
]

const tableData: Row[] = [
  // KPI - ファネル
  { label: "KPI - ファネル", isSection: true, m0: "", m1: "", m2: "", m3: "", m4: "", m5: "", m6: "", m7: "", m8: "", m9: "", m10: "", m11: "" },
  { label: "セッション数", m0: "21件", m1: "0件", m2: "21件", m3: "21件", m4: "21件", m5: "21件", m6: "37件", m7: "37件", m8: "21件", m9: "37件", m10: "60件", m11: "37件" },
  { label: "リード数", m0: "11件", m1: "0件", m2: "11件", m3: "11件", m4: "11件", m5: "11件", m6: "19件", m7: "19件", m8: "11件", m9: "19件", m10: "31件", m11: "19件" },
  { label: "リード率", isSubRow: true, m0: "52.4%", m1: "0%", m2: "52.4%", m3: "52.4%", m4: "52.4%", m5: "52.4%", m6: "51.4%", m7: "51.4%", m8: "52.4%", m9: "51.4%", m10: "51.7%", m11: "51.4%" },
  { label: "商談数", m0: "4件", m1: "0件", m2: "4件", m3: "4件", m4: "4件", m5: "4件", m6: "7件", m7: "7件", m8: "4件", m9: "7件", m10: "11件", m11: "7件" },
  { label: "商談率", isSubRow: true, m0: "36.4%", m1: "0%", m2: "36.4%", m3: "36.4%", m4: "36.4%", m5: "36.4%", m6: "36.8%", m7: "36.8%", m8: "36.4%", m9: "36.8%", m10: "35.5%", m11: "36.8%" },
  { label: "新規受注", m0: "1件", m1: "0件", m2: "1件", m3: "1件", m4: "1件", m5: "1件", m6: "2件", m7: "2件", m8: "1件", m9: "2件", m10: "3件", m11: "2件" },
  { label: "受注率", isSubRow: true, m0: "25%", m1: "0%", m2: "25%", m3: "25%", m4: "25%", m5: "25%", m6: "28.6%", m7: "28.6%", m8: "25%", m9: "28.6%", m10: "27.3%", m11: "28.6%" },
  // KPI - 顧客
  { label: "KPI - 顧客", isSection: true, m0: "", m1: "", m2: "", m3: "", m4: "", m5: "", m6: "", m7: "", m8: "", m9: "", m10: "", m11: "" },
  { label: "解約顧客", m0: "0件", m1: "0件", m2: "0件", m3: "0件", m4: "0件", m5: "0件", m6: "0件", m7: "0件", m8: "0件", m9: "0件", m10: "0件", m11: "0件" },
  { label: "解約率", isSubRow: true, m0: "0%", m1: "0%", m2: "0%", m3: "0%", m4: "0%", m5: "0%", m6: "0%", m7: "0%", m8: "0%", m9: "0%", m10: "0%", m11: "0%" },
  { label: "顧客数（累計）", m0: "1件", m1: "1件", m2: "2件", m3: "3件", m4: "4件", m5: "5件", m6: "7件", m7: "9件", m8: "10件", m9: "12件", m10: "15件", m11: "17件" },
  // KPI - ユニットエコノミクス
  { label: "KPI - ユニットエコノミクス", isSection: true, m0: "", m1: "", m2: "", m3: "", m4: "", m5: "", m6: "", m7: "", m8: "", m9: "", m10: "", m11: "" },
  { label: "ARPA", m0: "¥1,000,000", m1: "¥1,000,000", m2: "¥1,000,000", m3: "¥1,000,000", m4: "¥1,000,000", m5: "¥1,000,000", m6: "¥1,000,000", m7: "¥1,000,000", m8: "¥1,000,000", m9: "¥1,000,000", m10: "¥1,000,000", m11: "¥1,000,000" },
  { label: "LTV", m0: "¥0", m1: "¥0", m2: "¥0", m3: "¥0", m4: "¥0", m5: "¥0", m6: "¥0", m7: "¥0", m8: "¥0", m9: "¥0", m10: "¥0", m11: "¥0" },
]

export function MonthlyPLTable() {
  const columns = useMemo(
    () => [
      {
        ...keyColumn("label", textColumn),
        title: "",
        minWidth: 180,
        disabled: true,
      },
      ...months.map((month, i) => ({
        ...keyColumn(`m${i}`, textColumn),
        title: (
          <div className="flex flex-col items-center justify-center h-full w-full leading-tight">
            <span className="text-xs font-normal">{month}</span>
            <span className="text-xs font-bold text-muted-foreground mt-0.5">計画</span>
          </div>
        ),
        minWidth: 90,
      })),
    ],
    []
  )

  return (
    <div className="w-full">
      <DataSheetGrid
        value={tableData}
        columns={columns}
        height={500}
        rowHeight={36}
        headerRowHeight={50}
        lockRows
        disableExpandSelection
        gutterColumn={false}
        cellClassName={({ rowData, columnId }) => {
          const row = rowData as Row
          if (columnId === "label") {
            if (row.isSection) return "font-semibold bg-muted/50"
            if (row.isSubRow) return "text-muted-foreground pl-6"
            return ""
          }
          if (row.isSection) return "bg-muted/50"
          
          // Data cells
          if (row.isSubRow) return "text-muted-foreground" // Sub-rows (rates) are gray
          return "text-blue-600 font-medium" // Main numbers are blue
        }}
      />
    </div>
  )
}