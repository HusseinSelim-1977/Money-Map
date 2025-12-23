export interface Bill {
    id: string;
    title: string;
    amountNeeded: number;
    amountDeposited: number;
    dueDate: string;
    category: string;
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
    category: string;
    date: string;
}
export interface InvestmentCategory {
    id: string;
    name: string;
    percentage: number;
    description: string;
}
export interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    password?: string;
    prof_pic?: string;
    currency: string;
    salary: number;
    bill: Bill[];
    investment: Investment[];
    spending: Spending[];
    investmentCategories: InvestmentCategory[];
    createdAt?: Date;
    updatedAt?: Date;
}
export interface MonthlyFinancialData {
    month: string;
    income: number;
    expenses: number;
    byCategory: Record<string, number>;
}
export interface DashboardData {
    month: string;
    monthlyData: MonthlyFinancialData;
    leftover: number;
}
export interface LoginResponse {
    message: string;
    token: string;
    user: {
        id: string;
        firstName: string;
        lastName: string;
        email: string;
        currency: string;
        salary: number;
        prof_pic?: string;
    };
}
export interface SignupResponse {
    message: string;
    token: string;
    user: {
        id: string;
        firstName: string;
        lastName: string;
        email: string;
        currency: string;
        salary: number;
        prof_pic?: string;
    };
}
export interface ApiError {
    message: string;
    statusCode: number;
    error?: string;
}
export interface TotalsResponse {
    billsTotal: number;
    investmentsTotal: number;
    spendingTotal: number;
}
export interface CreateUserDto {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    currency?: string;
}
export interface UpdateUserDto {
    firstName?: string;
    lastName?: string;
    email?: string;
    currency?: string;
    salary?: number;
    prof_pic?: string;
}
export interface LoginDto {
    email: string;
    password: string;
}
export interface SignupDto {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    currency: string;
}
export interface ForgotPasswordDto {
    email: string;
    currentPassword: string;
    newPassword: string;
}
export interface AddBillDto {
    title: string;
    amountNeeded: number;
    amountDeposited?: number;
    dueDate: string;
    category: string;
}
export interface AddInvestmentDto {
    title: string;
    amountNeeded: number;
    amountDeposited?: number;
}
export interface AddSpendingDto {
    title: string;
    amountDeposited: number;
    category: string;
    date: string;
}
