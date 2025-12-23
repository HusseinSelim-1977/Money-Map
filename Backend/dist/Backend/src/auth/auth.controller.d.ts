import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { SignUpDto } from './dto/signup.dto';
import { ForgotPasswordDto } from './dto/forgotPassword.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signup(signUpDto: SignUpDto): Promise<{
        message: string;
        token: string;
        user: {
            id: any;
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
            id: any;
            firstName: string;
            lastName: string;
            email: string;
            currency: string;
            salary: number;
            prof_pic: string;
        };
    }>;
    logout(body: {
        userId: string;
    }): Promise<{
        message: string;
    }>;
    forgotPassword(forgotPasswordDto: ForgotPasswordDto): Promise<{
        message: string;
    }>;
    findByEmail(email: string): Promise<{
        id: any;
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
}
