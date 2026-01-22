"use client"

import {
  ComposedChart,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts"

const data = [
  { month: "4月", plan: 2000000, actual: 1800000 },
  { month: "5月", plan: 2500000, actual: 2200000 },
  { month: "6月", plan: 3000000, actual: 2800000 },
  { month: "7月", plan: 3500000, actual: 3400000 },
  { month: "8月", plan: 4500000, actual: 4200000 },
  { month: "9月", plan: 5500000, actual: 5100000 },
  { month: "10月", plan: 7000000, actual: 6800000 },
  { month: "11月", plan: 8500000, actual: 8200000 },
  { month: "12月", plan: 10000000, actual: 9500000 },
  { month: "1月", plan: 11500000, actual: 11000000 },
  { month: "2月", plan: 13000000, actual: 12500000 },
  { month: "3月", plan: 14500000, actual: 14000000 },
]

export function MonthlyPLChart() {
  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
          <XAxis
            dataKey="month"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: '#6b7280' }}
            dy={10}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: '#6b7280' }}
            tickFormatter={(value) => value.toLocaleString()}
            domain={[0, 18000000]}
            ticks={[0, 3000000, 6000000, 9000000, 12000000, 15000000, 18000000]}
            label={{
              value: '円',
              position: 'top',
              offset: 10,
              style: { fontSize: 12, fill: '#6b7280' }
            }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
            }}
            formatter={(value: any) => value?.toLocaleString() ?? '-'}
          />
          {/* Plan: Dotted Blue */}
          <Line
            name="計画"
            type="linear"
            dataKey="plan"
            stroke="#3b82f6"
            strokeWidth={2}
            strokeDasharray="5 5"
            dot={false}
          />
          {/* Actual: Solid Green */}
          <Line
            name="実績"
            type="linear"
            dataKey="actual"
            stroke="#22c55e"
            strokeWidth={2}
            dot={false}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  )
}
