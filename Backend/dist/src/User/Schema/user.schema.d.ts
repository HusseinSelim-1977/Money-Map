import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
export type UserDocument = User & Document;
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
export interface InvestmentCategory {
    id: string;
    name: string;
    percentage: number;
    description: string;
}
export declare class User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    prof_pic: string;
    currency: string;
    salary: number;
    bill: Bill[];
    investment: Investment[];
    spending: Spending[];
}
export declare const UserSchema: mongoose.Schema<User, mongoose.Model<User, any, any, any, Document<unknown, any, User, any, {}> & User & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, User, Document<unknown, {}, mongoose.FlatRecord<User>, {}, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & mongoose.FlatRecord<User> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
