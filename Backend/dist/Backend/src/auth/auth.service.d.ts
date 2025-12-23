import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { UserDocument } from '../User/Schema/user.schema';
import { LoginDto } from './dto/login.dto';
import { SignUpDto } from './dto/signup.dto';
import { ForgotPasswordDto } from './dto/forgotPassword.dto';
import { LogoutDto } from './dto/logout.dto';
export declare class AuthService {
    private userModel;
    private jwtService;
    constructor(userModel: Model<UserDocument>, jwtService: JwtService);
    signup(signUpDto: SignUpDto): Promise<{
        message: string;
        token: string;
        user: {
            id: string;
            firstName: string;
            lastName: string;
            email: string;
            currency: string;
            salary: number;
            prof_pic: string;
        };
    }>;
    login(loginDto: LoginDto): Promise<{
        message: string;
        token: string;
        user: {
            id: string;
            firstName: string;
            lastName: string;
            email: string;
            currency: string;
            salary: number;
            prof_pic: string;
        };
    }>;
    logout(logoutDto: LogoutDto): Promise<{
        message: string;
    }>;
    forgotPassword(forgotPasswordDto: ForgotPasswordDto): Promise<{
        message: string;
    }>;
    validateUser(email: string, password: string): Promise<any>;
    findByEmail(email: string): Promise<{
        id: string;
        firstName: string;
        lastName: string;
        email: string;
        currency: string;
        salary: number;
        prof_pic: string;
        bill: import("../User/Schema/user.schema").Bill[];
        investment: import("../User/Schema/user.schema").Investment[];
        spending: import("../User/Schema/user.schema").Spending[];
        investmentCategories: import("../User/Schema/user.schema").InvestmentCategory[];
    }>;
    private generateToken;
}
