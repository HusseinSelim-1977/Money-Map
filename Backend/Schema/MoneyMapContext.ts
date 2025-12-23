"use client"

import type { ReactNode } from "react"
import { createContext, useContext, useState, useEffect, createElement } from "react"
import { api } from "../../Frontend/src/api"
import { 
  User, 
  Bill, 
  Investment, 
  Spending, 
  InvestmentCategory,
  LoginResponse,
  SignupDto,
  DashboardData,
  MonthlyFinancialData,
  AddBillDto,
  AddInvestmentDto,
  AddSpendingDto
} from "../../Frontend/src/types"

export interface UserProfile {
  firstName: string
  lastName: string
  email: string
  currency: string
  isSetup: boolean
  monthlySalary: number
}

export interface UserData {
  userId: string
  profile: UserProfile
  bills: Bill[]
  investments: Investment[]
  spendings: Spending[]
  investmentCategories: InvestmentCategory[]
}

interface MoneyMapContextType {
  userData: UserData | null
  isLoading: boolean
  isLoggedIn: boolean
  updateProfile: (profile: Partial<UserProfile>) => Promise<void>
  addBill: (bill: AddBillDto) => Promise<void>
  updateBill: (id: string, bill: Partial<Bill>) => Promise<void>
  deleteBill: (id: string) => void
  addInvestment: (investment: AddInvestmentDto) => Promise<void>
  updateInvestment: (id: string, investment: Partial<Investment>) => Promise<void>
  deleteInvestment: (id: string) => void
  addSpending: (spending: AddSpendingDto) => Promise<void>
  updateSpending: (id: string, spending: Partial<Spending>) => Promise<void>
  deleteSpending: (id: string) => void
  setInvestmentCategories: (categories: InvestmentCategory[]) => void
  getMonthlyTotals: () => Promise<{
    totalBillsNeeded: number
    totalBillsDeposited: number
    totalInvestmentNeeded: number
    totalInvestmentDeposited: number
    totalSpending: number
  }>
  getSpendingAlerts: () => Promise<Array<{ title: string; message: string; type: "shortage" | "warning" }>>
  getLeftoverAmount: () => Promise<number>
  getDashboardData: (month?: string) => Promise<DashboardData | null>
  getMonthlyFinancialData: (month?: string) => Promise<MonthlyFinancialData | null>
  login: (email: string, password: string) => Promise<boolean>
  signup: (firstName: string, lastName: string, email: string, password: string, currency: string) => Promise<boolean>
  logout: () => void
  changeCurrency: (currency: string) => Promise<void>
  fetchUserData: () => Promise<void>
}

const MoneyMapContext = createContext<MoneyMapContextType | undefined>(undefined) as React.Context<MoneyMapContextType | undefined>

const DEFAULT_INVESTMENT_CATEGORIES: InvestmentCategory[] = [
  { id: "1", name: "Stocks", percentage: 40, description: "Equity investments" },
  { id: "2", name: "Bonds", percentage: 30, description: "Fixed income securities" },
  { id: "3", name: "Real Estate", percentage: 20, description: "Property investments" },
  { id: "4", name: "Crypto", percentage: 10, description: "Digital assets" },
  { id: "5", name: "Other", percentage: 0, description: "Custom investment category" }
]

function mapBackendUserToFrontend(user: User): UserData {
  return {
    userId: user.id,
    profile: {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      currency: user.currency,
      isSetup: true,
      monthlySalary: user.salary
    },
    bills: user.bill.map(bill => ({
      id: bill.id,
      title: bill.title,
      amountNeeded: bill.amountNeeded,
      amountDeposited: bill.amountDeposited,
      dueDate: bill.dueDate,
      category: bill.category ?? "bill"
    })),
    investments: user.investment.map(inv => ({
      id: inv.id,
      title: inv.title,
      amountNeeded: inv.amountNeeded,
      amountDeposited: inv.amountDeposited
    })),
    spendings: user.spending.map(spending => ({
      id: spending.id,
      title: spending.title,
      amountDeposited: spending.amountDeposited,
      category: spending.category ?? "spending",
      date: spending.date ?? new Date().toISOString().split('T')[0]
    })),
    investmentCategories: user.investmentCategories && user.investmentCategories.length > 0 
      ? user.investmentCategories 
      : DEFAULT_INVESTMENT_CATEGORIES
  }
}

function mapFrontendUserToBackend(userData: UserData): Partial<User> {
  return {
    firstName: userData.profile.firstName,
    lastName: userData.profile.lastName,
    email: userData.profile.email,
    currency: userData.profile.currency,
    salary: userData.profile.monthlySalary,
    bill: userData.bills.map(bill => ({
      id: bill.id,
      title: bill.title,
      amountNeeded: bill.amountNeeded,
      amountDeposited: bill.amountDeposited,
      dueDate: bill.dueDate,
      category: 'bill' // Default category
    })),
    investment: userData.investments.map(inv => ({
      id: inv.id,
      title: inv.title,
      amountNeeded: inv.amountNeeded,
      amountDeposited: inv.amountDeposited
    })),
    spending: userData.spendings.map(spending => ({
      id: spending.id,
      title: spending.title,
      amountDeposited: spending.amountDeposited,
      category: 'spending', // Default category
      date: new Date().toISOString().split('T')[0]
    })),
    investmentCategories: userData.investmentCategories
  }
}

export function MoneyMapProvider({ children }: { children: ReactNode }) {
  const [userData, setUserData] = useState<UserData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem("token")
    const savedUser = localStorage.getItem("user")
    
    if (token && savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser)
        setUserData(mapBackendUserToFrontend(parsedUser))
        setIsLoggedIn(true)
      } catch (e) {
        console.error("Failed to load saved data:", e)
        localStorage.removeItem("token")
        localStorage.removeItem("user")
      }
    }
    setIsLoading(false)
  }, [])

  const fetchUserData = async () => {
    if (!userData?.userId) return
    
    try {
      const user = await api.user.getUser(userData.userId)
      setUserData(mapBackendUserToFrontend(user))
      localStorage.setItem("user", JSON.stringify(user))
    } catch (error) {
      console.error("Failed to fetch user data:", error)
    }
  }

  const updateProfile = async (profile: Partial<UserProfile>) => {
    if (!userData?.userId) return
    
    try {
      const updates = {
        firstName: profile.firstName,
        lastName: profile.lastName,
        email: profile.email,
        currency: profile.currency,
        salary: profile.monthlySalary
      }
      
      const updatedUser = await api.user.updateUser(userData.userId, updates)
      setUserData(mapBackendUserToFrontend(updatedUser))
      localStorage.setItem("user", JSON.stringify(updatedUser))
    } catch (error) {
      console.error("Failed to update profile:", error)
    }
  }

  const addBill = async (bill: AddBillDto) => {
    if (!userData?.userId) return
    
    try {
      const newBill = {
        ...bill,
        id: Date.now().toString()
      }
      
      const updatedUser = await api.user.addBill(userData.userId, newBill)
      setUserData(mapBackendUserToFrontend(updatedUser))
      localStorage.setItem("user", JSON.stringify(updatedUser))
    } catch (error) {
      console.error("Failed to add bill:", error)
    }
  }

  const updateBill = async (id: string, bill: Partial<Bill>) => {
    if (!userData?.userId) return
    
    try {
      const updatedUser = await api.user.updateBill(userData.userId, id, bill)
      setUserData(mapBackendUserToFrontend(updatedUser))
      localStorage.setItem("user", JSON.stringify(updatedUser))
    } catch (error) {
      console.error("Failed to update bill:", error)
    }
  }

  const deleteBill = (id: string) => {
    setUserData(prev => {
      if (!prev) return prev
      return {
        ...prev,
        bills: prev.bills.filter(b => b.id !== id)
      }
    })
  }

  const addInvestment = async (investment: AddInvestmentDto) => {
    if (!userData?.userId) return
    
    try {
      const newInvestment = {
        ...investment,
        id: Date.now().toString()
      }
      
      const updatedUser = await api.user.addInvestment(userData.userId, newInvestment)
      setUserData(mapBackendUserToFrontend(updatedUser))
      localStorage.setItem("user", JSON.stringify(updatedUser))
    } catch (error) {
      console.error("Failed to add investment:", error)
    }
  }

  const updateInvestment = async (id: string, investment: Partial<Investment>) => {
    if (!userData?.userId) return
    
    try {
      const updatedUser = await api.user.updateInvestment(userData.userId, id, investment)
      setUserData(mapBackendUserToFrontend(updatedUser))
      localStorage.setItem("user", JSON.stringify(updatedUser))
    } catch (error) {
      console.error("Failed to update investment:", error)
    }
  }

  const deleteInvestment = (id: string) => {
    setUserData(prev => {
      if (!prev) return prev
      return {
        ...prev,
        investments: prev.investments.filter(inv => inv.id !== id)
      }
    })
  }

  const addSpending = async (spending: AddSpendingDto) => {
    if (!userData?.userId) return
    
    try {
      const newSpending = {
        ...spending,
        id: Date.now().toString()
      }
      
      const updatedUser = await api.user.addSpending(userData.userId, newSpending)
      setUserData(mapBackendUserToFrontend(updatedUser))
      localStorage.setItem("user", JSON.stringify(updatedUser))
    } catch (error) {
      console.error("Failed to add spending:", error)
    }
  }

  const updateSpending = async (id: string, spending: Partial<Spending>) => {
    if (!userData?.userId) return
    
    try {
      const updatedUser = await api.user.updateSpending(userData.userId, id, spending)
      setUserData(mapBackendUserToFrontend(updatedUser))
      localStorage.setItem("user", JSON.stringify(updatedUser))
    } catch (error) {
      console.error("Failed to update spending:", error)
    }
  }

  const deleteSpending = (id: string) => {
    setUserData(prev => {
      if (!prev) return prev
      return {
        ...prev,
        spendings: prev.spendings.filter(s => s.id !== id)
      }
    })
  }

  const setInvestmentCategories = (categories: InvestmentCategory[]) => {
    setUserData(prev => {
      if (!prev) return prev
      return {
        ...prev,
        investmentCategories: categories
      }
    })
  }

  const getMonthlyTotals = async () => {
    if (!userData?.userId) {
      return {
        totalBillsNeeded: 0,
        totalBillsDeposited: 0,
        totalInvestmentNeeded: 0,
        totalInvestmentDeposited: 0,
        totalSpending: 0
      }
    }
    
    try {
      const totals = await api.user.getTotals(userData.userId)
      return {
        totalBillsNeeded: totals.billsTotal,
        totalBillsDeposited: userData.bills.reduce((sum, b) => sum + b.amountDeposited, 0),
        totalInvestmentNeeded: totals.investmentsTotal,
        totalInvestmentDeposited: userData.investments.reduce((sum, inv) => sum + inv.amountDeposited, 0),
        totalSpending: totals.spendingTotal
      }
    } catch (error) {
      console.error("Failed to get totals:", error)
      return {
        totalBillsNeeded: 0,
        totalBillsDeposited: 0,
        totalInvestmentNeeded: 0,
        totalInvestmentDeposited: 0,
        totalSpending: 0
      }
    }
  }

  const getSpendingAlerts = async () => {
    const alerts: Array<{ title: string; message: string; type: "shortage" | "warning" }> = []
    
    if (!userData) return alerts
    
    const totals = await getMonthlyTotals()
    const currency = userData.profile.currency

    if (totals.totalBillsDeposited < totals.totalBillsNeeded) {
      alerts.push({
        title: "Bills Shortage",
        message: `You're short by ${currency} ${(totals.totalBillsNeeded - totals.totalBillsDeposited).toFixed(2)} for bills this month`,
        type: "shortage",
      })
    }

    if (totals.totalInvestmentDeposited < totals.totalInvestmentNeeded) {
      alerts.push({
        title: "Investment Shortage",
        message: `You're short by ${currency} ${(totals.totalInvestmentNeeded - totals.totalInvestmentDeposited).toFixed(2)} for investments`,
        type: "warning",
      })
    }

    if (totals.totalSpending > totals.totalBillsNeeded) {
      alerts.push({
        title: "High Spending Alert",
        message: `Your spending (${currency} ${totals.totalSpending.toFixed(2)}) exceeds bills needed`,
        type: "warning",
      })
    }

    return alerts
  }

  const getLeftoverAmount = async () => {
    if (!userData?.userId) return 0
    
    try {
      const leftover = await api.user.getLeftoverAfterBills(userData.userId)
      return leftover
    } catch (error) {
      console.error("Failed to get leftover amount:", error)
      return 0
    }
  }

  const getDashboardData = async (month?: string) => {
    if (!userData?.userId) return null
    
    try {
      return await api.user.getDashboard(userData.userId, month)
    } catch (error) {
      console.error("Failed to get dashboard data:", error)
      return null
    }
  }

  const getMonthlyFinancialData = async (month?: string) => {
    if (!userData?.userId) return null
    
    try {
      return await api.user.getMonthlyFinancialData(userData.userId, month)
    } catch (error) {
      console.error("Failed to get monthly financial data:", error)
      return null
    }
  }

  const login = async (email: string, password: string) => {
    try {
      const data: LoginResponse = await api.auth.login(email, password)
      
      localStorage.setItem("token", data.token)
      localStorage.setItem("user", JSON.stringify(data.user))
      
      const frontendUserData = mapBackendUserToFrontend(data.user as User)
      setUserData(frontendUserData)
      setIsLoggedIn(true)
      localStorage.setItem("moneymap-logged-in", "true")
      return true
    } catch (error) {
      console.error("Login error:", error)
      return false
    }
  }

  const signup = async (firstName: string, lastName: string, email: string, password: string, currency: string) => {
    try {
      const signupData: SignupDto = { firstName, lastName, email, password, currency }
      const data = await api.auth.signup(signupData)
      
      localStorage.setItem("token", data.token)
      localStorage.setItem("user", JSON.stringify(data.user))
      
      const frontendUserData = mapBackendUserToFrontend(data.user as User)
      setUserData(frontendUserData)
      setIsLoggedIn(true)
      localStorage.setItem("moneymap-logged-in", "true")
      return true
    } catch (error) {
      console.error("Signup error:", error)
      return false
    }
  }

  const logout = () => {
    if (userData?.userId) {
      api.auth.logout(userData.userId).catch(console.error)
    }
    
    setIsLoggedIn(false)
    localStorage.setItem("moneymap-logged-in", "false")
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    setUserData(null)
  }

  const changeCurrency = async (currency: string) => {
    if (!userData?.userId) return
    
    try {
      const updatedUser = await api.user.updateUser(userData.userId, { currency })
      setUserData(mapBackendUserToFrontend(updatedUser))
      localStorage.setItem("user", JSON.stringify(updatedUser))
    } catch (error) {
      console.error("Failed to change currency:", error)
    }
  }

  return createElement(
    MoneyMapContext.Provider,
    {
      value: {
        userData,
        isLoading,
        isLoggedIn,
        updateProfile,
        addBill,
        updateBill,
        deleteBill,
        addInvestment,
        updateInvestment,
        deleteInvestment,
        addSpending,
        updateSpending,
        deleteSpending,
        setInvestmentCategories,
        getMonthlyTotals,
        getSpendingAlerts,
        getLeftoverAmount,
        getDashboardData,
        getMonthlyFinancialData,
        login,
        signup,
        logout,
        changeCurrency,
        fetchUserData,
      },
    },
    children
  )
}

export function useMoneyMap() {
  const schema = useContext(MoneyMapContext)
  if (!schema) {
    throw new Error("useMoneyMap must be used within MoneyMapProvider")
  }
  return schema
}