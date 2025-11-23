import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument, Bill, Investment, Spending } from '../Schema/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>
  ) { }
  
  async create(createUserDto: CreateUserDto): Promise<UserDocument> {
    const newUser = new this.userModel(createUserDto);
    return newUser.save();
  }

  async getUser(id: string): Promise<User | null> {
    return this.userModel.findById(id);
  }

  async updateUser(id: string, updates: UpdateUserDto): Promise<User | null> {
    return this.userModel.findByIdAndUpdate(id, updates, { new: true });
  }

  async addBill(userId: string, bill: Bill): Promise<User | null> {
    return this.userModel.findByIdAndUpdate(
      userId,
      { $push: { bills: bill } },
      { new: true }
    );
  }

  async addInvestment(userId: string, investment: Investment): Promise<User | null> {
    return this.userModel.findByIdAndUpdate(
      userId,
      { $push: { investments: investment } },
      { new: true }
    );
  }

  async addSpending(userId: string, spending: Spending): Promise<User | null> {
    return this.userModel.findByIdAndUpdate(
      userId,
      { $push: { spendings: spending } },
      { new: true }
    );
  }

  async getTotals(userId: string) {
    const user = await this.getUser(userId);
    if (!user) {
      throw new Error('User not found');
    }
    
    const billsTotal = user.bill.reduce((sum, bill) => sum + bill.amountNeeded, 0);
    const investmentsTotal = user.investment.reduce((sum, inv) => sum + inv.amountNeeded, 0);
    const spendingTotal = user.spending.reduce((sum, spend) => sum + spend.amountDeposited, 0);
    
    return { billsTotal, investmentsTotal, spendingTotal };
  }
}