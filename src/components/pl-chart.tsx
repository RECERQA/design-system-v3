"use client"

import {
  Bar,
  ComposedChart,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell,
} from "recharts"

const data = [
  {
    period: "2026/12",
    ARR: 200,
    operatingProfit: -102,
    grossProfitMargin: 70,
  },
  {
    period: "2027/12",
    ARR: 600,
    operatingProfit: -347,
    grossProfitMargin: 70,
  },
  {
    period: "2028/12",
    ARR: 1800,
    operatingProfit: -619,
    grossProfitMargin: 70,
  },
  {
    period: "2029/12",
    ARR: 3600,
    operatingProfit: -956,
    grossProfitMargin: 75,
  },
  {
    period: "2030/12",
    ARR: 7200,
    operatingProfit: -319,
    grossProfitMargin: 80,
  },
  {
    period: "2031/12",
    ARR: 14400,
    operatingProfit: 1275,
    grossProfitMargin: 85,
  },
]

export function PLChart() {
  return (
    <div className="w-full">
      <div className="h-[400px] w-full">
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
              dataKey="period"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#6b7280' }}
            />
            <YAxis
              yAxisId="left"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#6b7280' }}
              tickFormatter={(value) => value.toLocaleString()}
              domain={[-3000, 15000]}
              ticks={[-3000, 0, 3000, 6000, 9000, 12000, 15000]}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#6b7280' }}
              tickFormatter={(value) => `${value}%`}
              domain={[0, 100]}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
              }}
              formatter={(value: number, name: string) => {
                if (name === 'grossProfitMargin') {
                  return [`${value}%`, '売上総利益率']
                }
                return [value.toLocaleString(), name === 'ARR' ? 'ARR' : '営業損益']
              }}
            />
            <Bar
              yAxisId="left"
              dataKey="ARR"
              fill="#3b82f6"
              radius={[4, 4, 0, 0]}
              barSize={40}
            />
            <Bar
              yAxisId="left"
              dataKey="operatingProfit"
              radius={[4, 4, 0, 0]}
              barSize={40}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.operatingProfit >= 0 ? '#22c55e' : '#ef4444'}
                />
              ))}
            </Bar>
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="grossProfitMargin"
              stroke="#f59e0b"
              strokeWidth={2}
              dot={{ fill: '#f59e0b', strokeWidth: 0, r: 4 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
