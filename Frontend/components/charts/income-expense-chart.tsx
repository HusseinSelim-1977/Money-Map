"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

interface IncomeExpenseChartProps {
  data: { income: number; expenses: number; byCategory: Record<string, number> }
}

export default function IncomeExpenseChart({ data }: IncomeExpenseChartProps) {
  const chartData = [
    {
      name: "Monthly",
      Income: data.income,
      Expenses: data.expenses,
    },
  ]

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" stroke="currentColor" opacity={0.1} />
        <XAxis dataKey="name" stroke="currentColor" opacity={0.5} />
        <YAxis stroke="currentColor" opacity={0.5} />
        <Tooltip
          contentStyle={{ backgroundColor: "var(--background)", border: "1px solid var(--border)" }}
          formatter={(value) => `$${value.toFixed(2)}`}
        />
        <Legend />
        <Bar dataKey="Income" fill="#10b981" />
        <Bar dataKey="Expenses" fill="#ef4444" />
      </BarChart>
    </ResponsiveContainer>
  )
}
