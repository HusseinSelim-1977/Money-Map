import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import type { Bill, Investment, Spending } from '../Schema/user.schema';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    create(createUserDto: CreateUserDto): Promise<import("../Schema/user.schema").UserDocument>;
    findAll(): Promise<import("../Schema/user.schema").User[]>;
    findOne(id: string): Promise<import("../Schema/user.schema").User>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<import("../Schema/user.schema").User>;
    remove(id: string): Promise<import("../Schema/user.schema").User>;
    addBill(userId: string, bill: Bill): Promise<import("../Schema/user.schema").User>;
    addInvestment(userId: string, investment: Investment): Promise<import("../Schema/user.schema").User>;
    addSpending(userId: string, spending: Spending): Promise<import("../Schema/user.schema").User>;
    updateBill(userId: string, billId: string, updates: Partial<Bill>): Promise<import("../Schema/user.schema").User>;
    updateInvestment(userId: string, investmentId: string, updates: Partial<Investment>): Promise<import("../Schema/user.schema").User>;
    updateSpending(userId: string, spendingId: string, updates: Partial<Spending>): Promise<import("../Schema/user.schema").User>;
    getTotals(userId: string): Promise<{
        billsTotal: number;
        investmentsTotal: number;
        spendingTotal: number;
    }>;
    getDashboardData(userId: string, month?: string): Promise<{
        month: string;
        monthlyData: import("./user.service").MonthlyFinancialData;
        leftover: number;
    }>;
    getMonthlyFinancialData(userId: string, month?: string): Promise<import("./user.service").MonthlyFinancialData>;
    getLeftoverAfterBills(userId: string): Promise<number>;
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
