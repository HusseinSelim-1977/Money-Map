"use client"

import type React from "react"

import { useState } from "react"
import { useMoneyMap } from "@/context/money-map-context"
import { Button } from "@/components/ui/button"

interface TransactionFormProps {
  month: string
  onClose: () => void
}

export default function TransactionForm({ month, onClose }: TransactionFormProps) {
  const { userData, addTransaction } = useMoneyMap()
  const [type, setType] = useState<"income" | "expense">("expense")
  const [category, setCategory] = useState("")
  const [amount, setAmount] = useState("")
  const [description, setDescription] = useState("")

  const categories = userData.categories.filter((c) => c.type === type)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!category || !amount) return

    addTransaction({
      type,
      category,
      amount: Number.parseFloat(amount),
      description,
      date: new Date().toISOString().split("T")[0],
      month,
    })

    setAmount("")
    setDescription("")
    setCategory("")
    onClose()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Type</label>
          <select
            value={type}
            onChange={(e) => {
              setType(e.target.value as "income" | "expense")
              setCategory("")
            }}
            className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
          >
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
          >
            <option value="">Select category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Amount</label>
        <input
          type="number"
          step="0.01"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="0.00"
          className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Description</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Optional description"
          className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
        />
      </div>

      <div className="flex gap-3">
        <Button type="submit" className="flex-1 bg-emerald-600 hover:bg-emerald-700">
          Add Transaction
        </Button>
        <Button type="button" onClick={onClose} className="flex-1 bg-slate-300 hover:bg-slate-400 text-slate-900">
          Cancel
        </Button>
      </div>
    </form>
  )
}
