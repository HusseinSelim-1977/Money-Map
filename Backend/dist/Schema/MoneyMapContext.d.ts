import type { ReactNode } from "react";
export interface Bill {
    id: string;
    title: string;
    amountNeeded: number;
    amountDeposited: number;
    dueDate: string;
}
export interface Investment {
    id: string;
    title: string;
    amountNeeded: number;
    amountDeposited: number;
}
export interface Spending {
    id: string;
    title: string;
    amountDeposited: number;
}
export interface UserProfile {
    firstName: string;
    lastName: string;
    email: string;
    currency: string;
    isSetup: boolean;
    monthlySalary: number;
}
export interface InvestmentCategory {
    id: string;
    name: string;
    percentage: number;
    description: string;
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
    userData: UserData;
    isLoading: boolean;
    isLoggedIn: boolean;
    updateProfile: (profile: Partial<UserProfile>) => void;
    addBill: (bill: Omit<Bill, "id">) => void;
    updateBill: (id: string, bill: Partial<Bill>) => void;
    deleteBill: (id: string) => void;
    addInvestment: (investment: Omit<Investment, "id">) => void;
    updateInvestment: (id: string, investment: Partial<Investment>) => void;
    deleteInvestment: (id: string) => void;
    addSpending: (spending: Omit<Spending, "id">) => void;
    updateSpending: (id: string, spending: Partial<Spending>) => void;
    deleteSpending: (id: string) => void;
    setInvestmentCategories: (categories: InvestmentCategory[]) => void;
    getMonthlyTotals: () => {
        totalBillsNeeded: number;
        totalBillsDeposited: number;
        totalInvestmentNeeded: number;
        totalInvestmentDeposited: number;
        totalSpending: number;
    };
    getSpendingAlerts: () => Array<{
        title: string;
        message: string;
        type: "shortage" | "warning";
    }>;
    getLeftoverAmount: () => number;
    login: (email: string, password: string) => boolean;
    signup: (firstName: string, lastName: string, email: string, password: string, currency: string) => boolean;
    logout: () => void;
    changeCurrency: (currency: string) => void;
}
export declare function MoneyMapProvider({ children }: {
    children: ReactNode;
}): import("react").FunctionComponentElement<import("react").ProviderProps<MoneyMapContextType | undefined>>;
export declare function useMoneyMap(): MoneyMapContextType;
export {};
