"use client"

import { useMemo } from "react"
import {
  DataSheetGrid,
  textColumn,
  keyColumn,
} from "react-datasheet-grid"

type Row = {
  label: string
  y2026: string
  y2027: string
  y2028: string
  y2029: string
  y2030: string
  y2031: string
  isHeader?: boolean
  isNegative?: boolean
  isPercentage?: boolean
}

const plData: Row[] = [
  { label: "成長倍率", y2026: "", y2027: "3x", y2028: "3x", y2029: "2x", y2030: "2x", y2031: "2x" },
  { label: "ARR", y2026: "200", y2027: "600", y2028: "1,800", y2029: "3,600", y2030: "7,200", y2031: "14,400" },
  { label: "売上高", y2026: "108", y2027: "463", y2028: "1,375", y2029: "3,188", y2030: "6,375", y2031: "12,750" },
  { label: "売上原価", y2026: "△32", y2027: "△139", y2028: "△413", y2029: "△797", y2030: "△1,275", y2031: "△1,913", isNegative: true },
  { label: "売上原価／売上高", y2026: "30%", y2027: "30%", y2028: "30%", y2029: "25%", y2030: "20%", y2031: "15%", isPercentage: true },
  { label: "売上総利益", y2026: "75", y2027: "324", y2028: "963", y2029: "2,391", y2030: "5,100", y2031: "10,838" },
  { label: "売上総利益／売上高", y2026: "70%", y2027: "70%", y2028: "70%", y2029: "75%", y2030: "80%", y2031: "85%", isPercentage: true },
  { label: "営業経費", y2026: "△177", y2027: "△671", y2028: "△1,581", y2029: "△3,347", y2030: "△5,419", y2031: "△9,563", isNegative: true },
  { label: "営業経費／売上高", y2026: "165%", y2027: "145%", y2028: "115%", y2029: "105%", y2030: "85%", y2031: "75%", isPercentage: true },
  { label: "S&M", y2026: "△129", y2027: "△463", y2028: "△1,100", y2029: "△2,231", y2030: "△3,825", y2031: "△6,375", isNegative: true },
  { label: "S&M／売上高", y2026: "120%", y2027: "100%", y2028: "80%", y2029: "70%", y2030: "60%", y2031: "50%", isPercentage: true },
  { label: "R&D", y2026: "△27", y2027: "△116", y2028: "△275", y2029: "△638", y2030: "△956", y2031: "△1,913", isNegative: true },
  { label: "R&D／売上高", y2026: "25%", y2027: "25%", y2028: "20%", y2029: "20%", y2030: "15%", y2031: "15%", isPercentage: true },
  { label: "G&A", y2026: "△22", y2027: "△93", y2028: "△206", y2029: "△478", y2030: "△638", y2031: "△1,275", isNegative: true },
  { label: "G&A／売上高", y2026: "20%", y2027: "20%", y2028: "15%", y2029: "15%", y2030: "10%", y2031: "10%", isPercentage: true },
  { label: "営業損益", y2026: "△102", y2027: "△347", y2028: "△619", y2029: "△956", y2030: "△319", y2031: "1,275", isNegative: false },
  { label: "営業損益／売上高", y2026: "△95%", y2027: "△75%", y2028: "△45%", y2029: "△30%", y2030: "△5%", y2031: "10%", isPercentage: true },
  { label: "正社員数", y2026: "13人", y2027: "40人", y2028: "120人", y2029: "240人", y2030: "480人", y2031: "960人" },
  { label: "一人あたりARR", y2026: "15", y2027: "15", y2028: "15", y2029: "15", y2030: "15", y2031: "15" },
  { label: "一人あたり売上高", y2026: "8", y2027: "12", y2028: "11", y2029: "13", y2030: "13", y2031: "13" },
]

export function PLTable() {
  const columns = useMemo(
    () => [
      {
        ...keyColumn("label", textColumn),
        title: "",
        minWidth: 180,
        disabled: true,
      },
      {
        ...keyColumn("y2026", textColumn),
        title: "2026/12",
        minWidth: 120,
      },
      {
        ...keyColumn("y2027", textColumn),
        title: "2027/12",
        minWidth: 120,
      },
      {
        ...keyColumn("y2028", textColumn),
        title: "2028/12",
        minWidth: 120,
      },
      {
        ...keyColumn("y2029", textColumn),
        title: "2029/12",
        minWidth: 120,
      },
      {
        ...keyColumn("y2030", textColumn),
        title: "2030/12",
        minWidth: 120,
      },
      {
        ...keyColumn("y2031", textColumn),
        title: "2031/12",
        minWidth: 120,
      },
    ],
    []
  )

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">PL推移表</h2>
        <div className="flex items-center gap-2">
          <select className="text-sm border rounded-md px-3 py-1.5 bg-background">
            <option>T2D3</option>
          </select>
          <select className="text-sm border rounded-md px-3 py-1.5 bg-background">
            <option>百万円</option>
          </select>
        </div>
      </div>
      <div className="border rounded-lg overflow-hidden">
        <DataSheetGrid
          value={plData}
          columns={columns}
          height={600}
          rowHeight={36}
          headerRowHeight={40}
          lockRows
          disableExpandSelection
          cellClassName={({ rowData }) => {
            if (rowData.isNegative) return "text-red-600"
            if (rowData.isPercentage) return "text-muted-foreground italic"
            return ""
          }}
        />
      </div>
    </div>
  )
}
