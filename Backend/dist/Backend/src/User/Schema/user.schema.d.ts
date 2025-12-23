import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
export type UserDocument = User & Document;
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
    investmentCategories: InvestmentCategory[];
    createdAt: Date;
    updatedAt: Date;
}
export declare const UserSchema: mongoose.Schema<User, mongoose.Model<User, any, any, any, Document<unknown, any, User, any, mongoose.DefaultSchemaOptions> & User & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, any, User>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, User, Document<unknown, {}, User, {}, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & User & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, {
    id?: mongoose.SchemaDefinitionProperty<string, User, Document<unknown, {}, User, {}, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & User & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    firstName?: mongoose.SchemaDefinitionProperty<string, User, Document<unknown, {}, User, {}, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & User & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    lastName?: mongoose.SchemaDefinitionProperty<string, User, Document<unknown, {}, User, {}, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & User & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    email?: mongoose.SchemaDefinitionProperty<string, User, Document<unknown, {}, User, {}, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & User & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    password?: mongoose.SchemaDefinitionProperty<string, User, Document<unknown, {}, User, {}, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & User & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    prof_pic?: mongoose.SchemaDefinitionProperty<string, User, Document<unknown, {}, User, {}, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & User & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    currency?: mongoose.SchemaDefinitionProperty<string, User, Document<unknown, {}, User, {}, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & User & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    salary?: mongoose.SchemaDefinitionProperty<number, User, Document<unknown, {}, User, {}, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & User & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    bill?: mongoose.SchemaDefinitionProperty<Bill[], User, Document<unknown, {}, User, {}, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & User & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    investment?: mongoose.SchemaDefinitionProperty<Investment[], User, Document<unknown, {}, User, {}, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & User & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    spending?: mongoose.SchemaDefinitionProperty<Spending[], User, Document<unknown, {}, User, {}, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & User & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    investmentCategories?: mongoose.SchemaDefinitionProperty<InvestmentCategory[], User, Document<unknown, {}, User, {}, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & User & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    createdAt?: mongoose.SchemaDefinitionProperty<Date, User, Document<unknown, {}, User, {}, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & User & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    updatedAt?: mongoose.SchemaDefinitionProperty<Date, User, Document<unknown, {}, User, {}, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & User & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
}, User>;
