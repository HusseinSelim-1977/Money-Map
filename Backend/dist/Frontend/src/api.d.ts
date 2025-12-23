import { User, Bill, Investment, Spending, LoginResponse, SignupResponse, DashboardData, MonthlyFinancialData, TotalsResponse, UpdateUserDto, SignupDto, AddBillDto, AddInvestmentDto, AddSpendingDto } from './types';
export declare const authAPI: {
    login: (email: string, password: string) => Promise<LoginResponse>;
    signup: (userData: SignupDto) => Promise<SignupResponse>;
    logout: (userId: string) => Promise<{
        message: string;
    }>;
    forgotPassword: (email: string, currentPassword: string, newPassword: string) => Promise<{
        message: string;
    }>;
    getProfileByEmail: (email: string) => Promise<User>;
};
export declare const userAPI: {
    getAllUsers: () => Promise<User[]>;
    getUser: (userId: string) => Promise<User>;
    updateUser: (userId: string, updates: UpdateUserDto) => Promise<User>;
    deleteUser: (userId: string) => Promise<User>;
    getDashboard: (userId: string, month?: string) => Promise<DashboardData>;
    getMonthlyFinancialData: (userId: string, month?: string) => Promise<MonthlyFinancialData>;
    getLeftoverAfterBills: (userId: string) => Promise<number>;
    getTotals: (userId: string) => Promise<TotalsResponse>;
    getInvestmentCategories: (userId: string) => Promise<any[]>;
    getUserProfile: (userId: string) => Promise<any>;
    addBill: (userId: string, bill: AddBillDto) => Promise<User>;
    updateBill: (userId: string, billId: string, updates: Partial<Bill>) => Promise<User>;
    addInvestment: (userId: string, investment: AddInvestmentDto) => Promise<User>;
    updateInvestment: (userId: string, investmentId: string, updates: Partial<Investment>) => Promise<User>;
    addSpending: (userId: string, spending: AddSpendingDto) => Promise<User>;
    updateSpending: (userId: string, spendingId: string, updates: Partial<Spending>) => Promise<User>;
};
export declare const healthAPI: {
    checkHealth: () => Promise<{
        status: string;
    }>;
    checkServer: () => Promise<{
        message: string;
    }>;
};
export declare const api: {
    auth: {
        login: (email: string, password: string) => Promise<LoginResponse>;
        signup: (userData: SignupDto) => Promise<SignupResponse>;
        logout: (userId: string) => Promise<{
            message: string;
        }>;
        forgotPassword: (email: string, currentPassword: string, newPassword: string) => Promise<{
            message: string;
        }>;
        getProfileByEmail: (email: string) => Promise<User>;
    };
    user: {
        getAllUsers: () => Promise<User[]>;
        getUser: (userId: string) => Promise<User>;
        updateUser: (userId: string, updates: UpdateUserDto) => Promise<User>;
        deleteUser: (userId: string) => Promise<User>;
        getDashboard: (userId: string, month?: string) => Promise<DashboardData>;
        getMonthlyFinancialData: (userId: string, month?: string) => Promise<MonthlyFinancialData>;
        getLeftoverAfterBills: (userId: string) => Promise<number>;
        getTotals: (userId: string) => Promise<TotalsResponse>;
        getInvestmentCategories: (userId: string) => Promise<any[]>;
        getUserProfile: (userId: string) => Promise<any>;
        addBill: (userId: string, bill: AddBillDto) => Promise<User>;
        updateBill: (userId: string, billId: string, updates: Partial<Bill>) => Promise<User>;
        addInvestment: (userId: string, investment: AddInvestmentDto) => Promise<User>;
        updateInvestment: (userId: string, investmentId: string, updates: Partial<Investment>) => Promise<User>;
        addSpending: (userId: string, spending: AddSpendingDto) => Promise<User>;
        updateSpending: (userId: string, spendingId: string, updates: Partial<Spending>) => Promise<User>;
    };
    health: {
        checkHealth: () => Promise<{
            status: string;
        }>;
        checkServer: () => Promise<{
            message: string;
        }>;
    };
};
export default api;
