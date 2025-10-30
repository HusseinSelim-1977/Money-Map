"use client"

import type React from "react"

import { useState } from "react"
import { useMoneyMap } from "@/context/money-map-context"
import { UnchainedBackground } from "@/components/unchained-background"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

const CURRENCIES = [
  { code: "USD", symbol: "$", name: "US Dollar" },
  { code: "EUR", symbol: "€", name: "Euro" },
  { code: "GBP", symbol: "£", name: "British Pound" },
  { code: "INR", symbol: "₹", name: "Indian Rupee" },
  { code: "JPY", symbol: "¥", name: "Japanese Yen" },
  { code: "AUD", symbol: "A$", name: "Australian Dollar" },
  { code: "CAD", symbol: "C$", name: "Canadian Dollar" },
  { code: "CHF", symbol: "CHF", name: "Swiss Franc" },
]

export default function SetupWizard() {
  const { updateProfile } = useMoneyMap()
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [currency, setCurrency] = useState("USD")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!firstName || !lastName || !email) return

    updateProfile({
      firstName,
      lastName,
      email,
      currency,
      isSetup: true,
    })
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden">
      <UnchainedBackground />

      <Card className="w-full max-w-md p-8 bg-slate-900/40 backdrop-blur border border-cyan-500/40 relative z-10 shadow-2xl hover:shadow-cyan-500/30 transition-all duration-300">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent mb-2 uppercase tracking-wider">
          Welcome to MoneyMap
        </h1>
        <p className="text-cyan-200/60 mb-8 text-sm">Let's set up your profile to get started</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-cyan-300 mb-2 uppercase tracking-wider">
                First Name
              </label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="John"
                className="w-full px-3 py-2 border border-cyan-500/30 rounded-lg bg-slate-800/50 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all backdrop-blur"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-cyan-300 mb-2 uppercase tracking-wider">
                Last Name
              </label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Doe"
                className="w-full px-3 py-2 border border-cyan-500/30 rounded-lg bg-slate-800/50 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all backdrop-blur"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-cyan-300 mb-2 uppercase tracking-wider">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="john@example.com"
              className="w-full px-3 py-2 border border-cyan-500/30 rounded-lg bg-slate-800/50 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all backdrop-blur"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-cyan-300 mb-2 uppercase tracking-wider">Currency</label>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="w-full px-3 py-2 border border-cyan-500/30 rounded-lg bg-slate-800/50 text-white focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all backdrop-blur"
            >
              {CURRENCIES.map((curr) => (
                <option key={curr.code} value={curr.code}>
                  {curr.name} ({curr.symbol})
                </option>
              ))}
            </select>
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold uppercase tracking-wider shadow-lg hover:shadow-cyan-500/50 transition-all"
          >
            Get Started
          </Button>
        </form>
      </Card>
    </div>
  )
}
