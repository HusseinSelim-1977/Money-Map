import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../User/Schema/user.schema';

@Injectable()
export class AuthService {
  forgotPassword: any;
  logout: any;
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>
  ) { }

  async signup(userData: any): Promise<User> {
    const user = new this.userModel(userData);
    return user.save();
  }

  async login(email: string, password: string): Promise<User | null> {
    const user = await this.userModel.findOne({ email });
    if (user && user.password === password) {
      return user;
    }
    return null;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email });
  }
}