import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import type { Bill, Investment, Spending } from '../Schema/user.schema';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    create(createUserDto: CreateUserDto): Promise<import("../Schema/user.schema").UserDocument>;
    findAll(): Promise<import("../Schema/user.schema").User[]>;
    findOne(id: string): Promise<import("../Schema/user.schema").User | null>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<import("../Schema/user.schema").User | null>;
    remove(id: string): Promise<import("../Schema/user.schema").User | null>;
    addBill(userId: string, bill: Bill): Promise<import("../Schema/user.schema").User | null>;
    addInvestment(userId: string, investment: Investment): Promise<import("../Schema/user.schema").User | null>;
    addSpending(userId: string, spending: Spending): Promise<import("../Schema/user.schema").User | null>;
    updateBill(userId: string, billId: string, updates: Partial<Bill>): Promise<import("../Schema/user.schema").User | null>;
    updateInvestment(userId: string, investmentId: string, updates: Partial<Investment>): Promise<import("../Schema/user.schema").User | null>;
    updateSpending(userId: string, spendingId: string, updates: Partial<Spending>): Promise<import("../Schema/user.schema").User | null>;
    getTotals(userId: string): Promise<{
        billsTotal: number;
        investmentsTotal: number;
        spendingTotal: number;
    }>;
}
