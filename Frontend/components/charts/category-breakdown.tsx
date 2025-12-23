"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"

interface CategoryBreakdownProps {
  data: Record<string, number>
}

const COLORS = ["#f59e0b", "#8b5cf6", "#ef4444", "#ec4899", "#3b82f6", "#10b981", "#06b6d4"]

export default function CategoryBreakdown({ data }: CategoryBreakdownProps) {
  const chartData = Object.entries(data)
    .filter(([_, amount]) => amount > 0)
    .map(([name, value]) => ({ name, value }))

  if (chartData.length === 0) {
    return <p className="text-slate-500 dark:text-slate-400 text-center py-8">No spending data yet</p>
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={chartData}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ name, value }) => `${name}: $${value.toFixed(0)}`}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {chartData.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
      </PieChart>
    </ResponsiveContainer>
  )
}
