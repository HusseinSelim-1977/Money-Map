"use client"

import type React from "react"
import { useState } from "react"
import { useMoneyMap } from "@/Schema/money-map-context"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function LoginPage() {
  const { login, signup } = useMoneyMap()
  const [isSignUp, setIsSignUp] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [currency, setCurrency] = useState("USD")
  const [error, setError] = useState("")

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

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    if (!login(email, password)) {
      setError("Invalid email or password")
    }
  }

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    if (!signup(firstName, lastName, email, password, currency)) {
      setError("Email already exists")
    }
  }

  return (
    <div className="min-h-screen bg-[#0f0f1a] flex items-center justify-center p-4 relative overflow-hidden">

      <div className="absolute -top-32 -left-32 w-[350px] h-[350px] bg-green-400 rounded-full opacity-80 blur-[70px] animate-pulse-slow" />
      <div className="absolute -bottom-32 -right-32 w-[350px] h-[350px] bg-fuchsia-500 rounded-full opacity-80 blur-[70px] animate-pulse-slow" />

      <style>{`
        @keyframes pulse-slow {
          0% { transform: scale(1) translate(0,0); }
          50% { transform: scale(1.15) translate(15px, -10px); }
          100% { transform: scale(1) translate(0,0); }
        }
        .animate-pulse-slow {
          animation: pulse-slow 7s ease-in-out infinite;
        }
      `}</style>

      <div className="relative z-10">
        <Card className="w-full max-w-md p-8 bg-black/40 backdrop-blur-3xl border border-white/10 shadow-2xl transition-all duration-500">
          <div className="text-center mb-8">
            <div className="relative inline-block mb-4">
              <h1
                className="text-5xl font-black bg-gradient-to-r from-purple-300 via-white to-blue-300 bg-clip-text text-transparent mb-2 tracking-wider"
                style={{
                  textShadow: "0 0 30px rgba(168, 85, 247, 0.3)",
                  filter: "drop-shadow(0 0 20px rgba(168, 85, 247, 0.2))",
                }}
              >
                MONEYMAP
              </h1>
            </div>
            <p className="text-white/60 font-light tracking-widest text-sm uppercase">Financial Intelligence</p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-950/40 border border-red-500/30 rounded-lg text-red-200 text-sm backdrop-blur-sm">
              ⚠️ {error}
            </div>
          )}

          <form onSubmit={isSignUp ? handleSignUp : handleLogin} className="space-y-4">
            {isSignUp && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-white/70 mb-2 uppercase tracking-wider">
                      First Name
                    </label>
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="w-full px-3 py-2 border border-white/10 rounded-lg bg-white/5 text-white focus:outline-none focus:border-purple-500/50 focus:bg-white/10 transition-all backdrop-blur-sm"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-white/70 mb-2 uppercase tracking-wider">
                      Last Name
                    </label>
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="w-full px-3 py-2 border border-white/10 rounded-lg bg-white/5 text-white focus:outline-none focus:border-purple-500/50 focus:bg-white/10 transition-all backdrop-blur-sm"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-white/70 mb-2 uppercase tracking-wider">
                    Currency
                  </label>
                  <select
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    className="w-full px-3 py-2 border border-white/10 rounded-lg bg-white/5 text-white focus:outline-none focus:border-purple-500/50 focus:bg-white/10 transition-all backdrop-blur-sm"
                  >
                    {CURRENCIES.map((curr) => (
                      <option key={curr.code} value={curr.code}>
                        {curr.name} ({curr.symbol})
                      </option>
                    ))}
                  </select>
                </div>
              </>
            )}

            <div>
              <label className="block text-xs font-semibold text-white/70 mb-2 uppercase tracking-wider">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-white/10 rounded-lg bg-white/5 text-white focus:outline-none focus:border-purple-500/50 focus:bg-white/10 transition-all backdrop-blur-sm"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-white/70 mb-2 uppercase tracking-wider">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-white/10 rounded-lg bg-white/5 text-white focus:outline-none focus:border-purple-500/50 focus:bg-white/10 transition-all backdrop-blur-sm"
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-semibold py-2 rounded-lg transition-all duration-300 transform hover:scale-105 uppercase tracking-wider"
            >
              {isSignUp ? "Create Account" : "Enter"}
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-white/10">
            <button
              onClick={() => {
                setIsSignUp(!isSignUp)
                setError("")
              }}
              className="w-full text-center text-white/60 hover:text-white transition-colors text-sm font-semibold uppercase tracking-wider hover:underline"
            >
              {isSignUp ? "Back to Sign In" : "Create New Account"}
            </button>
          </div>
        </Card>
      </div>
    </div>
  )
}
