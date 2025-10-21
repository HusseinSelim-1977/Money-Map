"use client"

import { useMoneyMap } from "@/context/money-map-context"
import LoginPage from "@/components/login-page"
import SetupWizard from "@/components/setup-wizard"
import BillsSection from "@/components/bills-section"
import InvestmentsSection from "@/components/investments-section"
import SpendingsSection from "@/components/spendings-section"
import SalarySection from "@/components/salary-section"
import SettingsModal from "@/components/settings-modal"
import { UnchainedBackground } from "@/components/unchained-background"
import { Card } from "@/components/ui/card"
import { useState } from "react"

export default function Home() {
  const { userData, isLoading, isLoggedIn, getMonthlyTotals, getSpendingAlerts, getLeftoverAmount, logout } =
    useMoneyMap()
  const [showSettings, setShowSettings] = useState(false)

  if (isLoading) {
    return (
      <main className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden">
        <UnchainedBackground />
        <div className="text-center relative z-10">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-cyan-500/30 border-t-cyan-400 mx-auto mb-6 shadow-lg shadow-cyan-500/50"></div>
          <p className="text-cyan-300 font-bold uppercase tracking-widest text-lg">Initializing MoneyMap</p>
          <p className="text-cyan-400/60 text-sm mt-2">Command Center Loading...</p>
        </div>
      </main>
    )
  }

  if (!isLoggedIn) {
    return <LoginPage />
  }

  // Show setup wizard if user hasn't completed setup
  if (!userData.profile.isSetup) {
    return <SetupWizard />
  }

  const totals = getMonthlyTotals()
  const alerts = getSpendingAlerts()
  const leftover = getLeftoverAmount()

  return (
    <main className="min-h-screen bg-black p-4 md:p-8 relative overflow-hidden">
      <UnchainedBackground />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-12 flex items-center justify-between animate-in fade-in slide-in-from-top-4">
          <div>
            <h1
              className="text-5xl font-black bg-gradient-to-r from-purple-300 via-white to-blue-300 bg-clip-text text-transparent mb-2 tracking-wider uppercase"
              style={{
                textShadow: "0 0 30px rgba(168, 85, 247, 0.3)",
                filter: "drop-shadow(0 0 20px rgba(168, 85, 247, 0.2))",
              }}
            >
              MoneyMap
            </h1>
            <p className="text-white/60 font-light tracking-widest text-sm uppercase">
              Welcome back, <span className="text-purple-300 font-semibold">{userData.profile.firstName}</span>
            </p>
          </div>
          <button
            onClick={() => setShowSettings(true)}
            className="p-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-purple-500/50 text-white/70 hover:text-purple-300 transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-purple-500/30 uppercase font-semibold text-sm tracking-wider backdrop-blur-sm"
            title="Settings"
          >
            ⚙️ Settings
          </button>
        </div>

        {/* Salary Section */}
        <div className="mb-8 animate-in fade-in slide-in-from-top-4" style={{ animationDelay: "100ms" }}>
          <SalarySection />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Bills Needed", value: totals.totalBillsNeeded, color: "from-blue-500 to-cyan-600", icon: "📋" },
            {
              label: "Investments",
              value: totals.totalInvestmentNeeded,
              color: "from-green-500 to-cyan-600",
              icon: "📈",
            },
            {
              label: "Total Spending",
              value: totals.totalSpending,
              color: "from-yellow-500 to-cyan-600",
              icon: "💳",
            },
            { label: "Leftover", value: leftover, color: "from-cyan-500 to-blue-600", icon: "💰" },
          ].map((metric, idx) => (
            <Card
              key={idx}
              className="p-6 bg-black/40 backdrop-blur-3xl border border-white/10 hover:border-purple-500/50 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/20 animate-in fade-in slide-in-from-bottom-4 shadow-2xl"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-black text-white/70 uppercase tracking-widest">{metric.label}</p>
                <span className="text-2xl">{metric.icon}</span>
              </div>
              <p className={`text-3xl font-black bg-gradient-to-r ${metric.color} bg-clip-text text-transparent`}>
                {userData.profile.currency} {metric.value.toFixed(2)}
              </p>
            </Card>
          ))}
        </div>

        {/* Alerts */}
        {alerts.length > 0 && (
          <div className="mb-8 space-y-3">
            {alerts.map((alert, idx) => (
              <Card
                key={idx}
                className={`p-4 border-l-4 backdrop-blur-3xl animate-in fade-in slide-in-from-left-4 shadow-2xl ${
                  alert.type === "shortage"
                    ? "border-l-red-500 bg-red-950/40 shadow-red-500/30 border border-red-500/20"
                    : "border-l-yellow-500 bg-yellow-950/40 shadow-yellow-500/30 border border-yellow-500/20"
                }`}
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <p
                  className={`font-black uppercase tracking-wider ${alert.type === "shortage" ? "text-red-200" : "text-yellow-200"}`}
                >
                  {alert.type === "shortage" ? "⚠️ SHORTAGE" : "⚡ ALERT"}: {alert.title}
                </p>
                <p className={`text-sm mt-1 ${alert.type === "shortage" ? "text-red-100" : "text-yellow-100"}`}>
                  {alert.message}
                </p>
              </Card>
            ))}
          </div>
        )}

        {/* Three Main Sections */}
        <div className="space-y-8">
          <BillsSection />
          <InvestmentsSection />
          <SpendingsSection />
        </div>
      </div>

      {/* Settings Modal */}
      <SettingsModal isOpen={showSettings} onClose={() => setShowSettings(false)} />
    </main>
  )
}
