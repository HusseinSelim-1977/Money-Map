import type { ReactNode } from "react";
import { Bill, Investment, Spending, InvestmentCategory, DashboardData, MonthlyFinancialData, AddBillDto, AddInvestmentDto, AddSpendingDto } from "../../Frontend/src/types";
export interface UserProfile {
    firstName: string;
    lastName: string;
    email: string;
    currency: string;
    isSetup: boolean;
    monthlySalary: number;
}
export interface UserData {
    userId: string;
    profile: UserProfile;
    bills: Bill[];
    investments: Investment[];
    spendings: Spending[];
    investmentCategories: InvestmentCategory[];
}
interface MoneyMapContextType {
    userData: UserData | null;
    isLoading: boolean;
    isLoggedIn: boolean;
    updateProfile: (profile: Partial<UserProfile>) => Promise<void>;
    addBill: (bill: AddBillDto) => Promise<void>;
    updateBill: (id: string, bill: Partial<Bill>) => Promise<void>;
    deleteBill: (id: string) => void;
    addInvestment: (investment: AddInvestmentDto) => Promise<void>;
    updateInvestment: (id: string, investment: Partial<Investment>) => Promise<void>;
    deleteInvestment: (id: string) => void;
    addSpending: (spending: AddSpendingDto) => Promise<void>;
    updateSpending: (id: string, spending: Partial<Spending>) => Promise<void>;
    deleteSpending: (id: string) => void;
    setInvestmentCategories: (categories: InvestmentCategory[]) => void;
    getMonthlyTotals: () => Promise<{
        totalBillsNeeded: number;
        totalBillsDeposited: number;
        totalInvestmentNeeded: number;
        totalInvestmentDeposited: number;
        totalSpending: number;
    }>;
    getSpendingAlerts: () => Promise<Array<{
        title: string;
        message: string;
        type: "shortage" | "warning";
    }>>;
    getLeftoverAmount: () => Promise<number>;
    getDashboardData: (month?: string) => Promise<DashboardData | null>;
    getMonthlyFinancialData: (month?: string) => Promise<MonthlyFinancialData | null>;
    login: (email: string, password: string) => Promise<boolean>;
    signup: (firstName: string, lastName: string, email: string, password: string, currency: string) => Promise<boolean>;
    logout: () => void;
    changeCurrency: (currency: string) => Promise<void>;
    fetchUserData: () => Promise<void>;
}
export declare function MoneyMapProvider({ children }: {
    children: ReactNode;
}): import("react").FunctionComponentElement<import("react").ProviderProps<MoneyMapContextType>>;
export declare function useMoneyMap(): MoneyMapContextType;
export {};
