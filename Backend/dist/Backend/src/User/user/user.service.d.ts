import { Model } from 'mongoose';
import { User, UserDocument, Bill, Investment, Spending } from '../Schema/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export interface MonthlyFinancialData {
    month: string;
    income: number;
    expenses: number;
    byCategory: Record<string, number>;
}
export declare class UserService {
    private userModel;
    constructor(userModel: Model<UserDocument>);
    create(createUserDto: CreateUserDto): Promise<UserDocument>;
    findAll(): Promise<User[]>;
    getUser(id: string): Promise<User | null>;
    updateUser(id: string, updates: UpdateUserDto): Promise<User | null>;
    remove(id: string): Promise<User | null>;
    addBill(userId: string, bill: Bill): Promise<User | null>;
    updateBill(userId: string, billId: string, updates: Partial<Bill>): Promise<User | null>;
    addInvestment(userId: string, investment: Investment): Promise<User | null>;
    updateInvestment(userId: string, investmentId: string, updates: Partial<Investment>): Promise<User | null>;
    addSpending(userId: string, spending: Spending): Promise<User | null>;
    updateSpending(userId: string, spendingId: string, updates: Partial<Spending>): Promise<User | null>;
    getMonthlyFinancialData(userId: string, month?: string): Promise<MonthlyFinancialData>;
    getLeftoverAfterBills(userId: string): Promise<number>;
    getDashboardData(userId: string, month?: string): Promise<{
        month: string;
        monthlyData: MonthlyFinancialData;
        leftover: number;
    }>;
    private categorizeExpenses;
    getTotals(userId: string): Promise<{
        billsTotal: number;
        investmentsTotal: number;
        spendingTotal: number;
    }>;
    getInvestmentCategories(userId: string): Promise<{
        id: string;
        name: string;
        percentage: number;
        description: string;
    }[]>;
    getUserProfile(userId: string): Promise<{
        currency: string;
        firstName: string;
        lastName: string;
        email: string;
        prof_pic: string;
    }>;
}
