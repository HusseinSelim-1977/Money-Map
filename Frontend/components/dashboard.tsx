"use client"

import { useMoneyMap } from "../../Schema/MoneyMapContext"
import { Card } from "../components/ui/card"
import IncomeExpenseChart from "./charts/income-expense-chart"
import CategoryBreakdown from "./charts/category-breakdown"
import InvestmentRecommendation from "./investment-recommendation"
import Scene3D from "./scene-3d"

interface DashboardProps {
  month: string
  monthlyData: { income: number; expenses: number; byCategory: Record<string, number> }
  leftover: number
}

export default function Dashboard({ month, monthlyData, leftover }: DashboardProps) {
  const { userData } = useMoneyMap()

  return (
    <div className="space-y-8">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-6 bg-slate-800 border-slate-700">
          <p className="text-sm font-medium text-slate-400 mb-2">Total Income</p>
          <p className="text-3xl font-bold text-emerald-400">₹{monthlyData.income.toFixed(2)}</p>
        </Card>
        <Card className="p-6 bg-slate-800 border-slate-700">
          <p className="text-sm font-medium text-slate-400 mb-2">Total Expenses</p>
          <p className="text-3xl font-bold text-red-400">₹{monthlyData.expenses.toFixed(2)}</p>
        </Card>
        <Card className="p-6 bg-slate-800 border-slate-700">
          <p className="text-sm font-medium text-slate-400 mb-2">Net Balance</p>
          <p
            className={`text-3xl font-bold ${monthlyData.income - monthlyData.expenses >= 0 ? "text-emerald-400" : "text-red-400"}`}
          >
            ₹{(monthlyData.income - monthlyData.expenses).toFixed(2)}
          </p>
        </Card>
        <Card className="p-6 bg-slate-800 border-slate-700">
          <p className="text-sm font-medium text-slate-400 mb-2">Leftover (After Bills)</p>
          <p className="text-3xl font-bold text-blue-400">₹{leftover.toFixed(2)}</p>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="p-6 bg-slate-800 border-slate-700">
          <h3 className="text-lg font-semibold text-white mb-4">Income vs Expenses</h3>
          <IncomeExpenseChart data={monthlyData} />
        </Card>
        <Card className="p-6 bg-slate-800 border-slate-700">
          <h3 className="text-lg font-semibold text-white mb-4">Spending by Category</h3>
          <CategoryBreakdown data={monthlyData.byCategory} />
        </Card>
      </div>

      {/* Investment Recommendation */}
      {leftover > 0 && (
        <InvestmentRecommendation
          leftover={leftover}
          investmentCategories={userData.investmentCategories}
          currency={userData.profile.currency}
        />
      )}

      {/* 3D Visualization */}
      <Card className="p-6 bg-slate-800 border-slate-700 overflow-hidden">
        <h3 className="text-lg font-semibold text-white mb-4">Financial Growth Visualization</h3>
        <div className="w-full h-96 rounded-lg overflow-hidden">
          <Scene3D balance={monthlyData.income - monthlyData.expenses} />
        </div>
      </Card>
    </div>
  )
}
