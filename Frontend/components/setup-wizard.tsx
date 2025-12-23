"use client"

import type React from "react"
import { useState, useCallback } from "react"
import { useMoneyMap } from "../../Schema/MoneyMapContext"
import { Button } from "../components/ui/button"
import { Card } from "../components/ui/card"

const CURRENCIES = [
  { code: "USD", symbol: "$", name: "US Dollar" },
  { code: "EUR", symbol: "€", name: "Euro" },
  { code: "GBP", symbol: "£", name: "British Pound" },
  { code: "INR", symbol: "₹", name: "Indian Rupee" },
  { code: "JPY", symbol: "¥", name: "Japanese Yen" },
  { code: "AUD", symbol: "A$", name: "Australian Dollar" },
  { code: "CAD", symbol: "C$", name: "Canadian Dollar" },
  { code: "CHF", symbol: "CHF", name: "Swiss Franc" },
] as const

interface FormData {
  email: string
  password: string
  firstName: string
  lastName: string
  currency: string
}

export default function LoginPage() {
  const { login, signup } = useMoneyMap()
  const [isSignUp, setIsSignUp] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    currency: "USD"
  })
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = useCallback((field: keyof FormData) => 
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setFormData(prev => ({ ...prev, [field]: e.target.value }))
      setError("")
    }, [])

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      const success = await login(formData.email, formData.password)
      if (!success) {
        setError("Invalid email or password")
      }
    } catch (err) {
      console.error("Login error:", err)
      setError("An unexpected error occurred while signing in")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      const success = await signup(
        formData.firstName, 
        formData.lastName, 
        formData.email, 
        formData.password, 
        formData.currency
      )
      if (!success) {
        setError("Email already exists")
      }
    } catch (err) {
      console.error("Signup error:", err)
      setError("An unexpected error occurred while creating the account")
    } finally {
      setIsLoading(false)
    }
  }

  const toggleAuthMode = useCallback(() => {
    setIsSignUp(prev => !prev)
    setError("")
    setFormData(prev => ({ ...prev, firstName: "", lastName: "" }))
  }, [])

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
              <h1 className="text-5xl font-black bg-gradient-to-r from-purple-300 via-white to-blue-300 bg-clip-text text-transparent mb-2 tracking-wider drop-shadow-[0_0_30px_rgba(168,85,247,0.3)]">
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
                      value={formData.firstName}
                      onChange={handleInputChange('firstName')}
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
                      value={formData.lastName}
                      onChange={handleInputChange('lastName')}
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
                    value={formData.currency}
                    onChange={handleInputChange('currency')}
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
                value={formData.email}
                onChange={handleInputChange('email')}
                className="w-full px-3 py-2 border border-white/10 rounded-lg bg-white/5 text-white focus:outline-none focus:border-purple-500/50 focus:bg-white/10 transition-all backdrop-blur-sm"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-white/70 mb-2 uppercase tracking-wider">Password</label>
              <input
                type="password"
                value={formData.password}
                onChange={handleInputChange('password')}
                className="w-full px-3 py-2 border border-white/10 rounded-lg bg-white/5 text-white focus:outline-none focus:border-purple-500/50 focus:bg-white/10 transition-all backdrop-blur-sm"
                required
                minLength={8}
              />
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-semibold py-2 rounded-lg transition-all duration-300 transform hover:scale-105 uppercase tracking-wider disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Processing..." : isSignUp ? "Create Account" : "Enter"}
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-white/10">
            <button
              onClick={toggleAuthMode}
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