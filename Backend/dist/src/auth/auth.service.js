"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("../User/Schema/user.schema");
const bcrypt = __importStar(require("bcrypt"));
let AuthService = class AuthService {
    userModel;
    constructor(userModel) {
        this.userModel = userModel;
    }
    async signup(signUpDto) {
        const existingUser = await this.userModel.findOne({ email: signUpDto.email }).exec();
        if (existingUser) {
            throw new common_1.ConflictException('User with this email already exists');
        }
        const hashedPassword = await bcrypt.hash(signUpDto.password, 10);
        const newUser = new this.userModel({
            firstName: signUpDto.firstName,
            lastName: signUpDto.lastName,
            email: signUpDto.email,
            password: hashedPassword,
            currency: signUpDto.currency || 'USD',
            salary: 0,
            bill: [],
            investment: [],
            spending: []
        });
        const savedUser = await newUser.save();
        return {
            message: 'User registered successfully',
            user: {
                id: savedUser.id,
                firstName: savedUser.firstName,
                lastName: savedUser.lastName,
                email: savedUser.email,
                currency: savedUser.currency
            }
        };
    }
    async login(loginDto) {
        const user = await this.userModel.findOne({ email: loginDto.email }).exec();
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);
        if (!isPasswordValid) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const token = this.generateToken();
        return {
            message: 'Login successful',
            token,
            user: {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                currency: user.currency,
                salary: user.salary,
                prof_pic: user.prof_pic
            }
        };
    }
    async logout(logoutDto) {
        const user = await this.userModel.findOne({ id: logoutDto.userId }).exec();
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        return {
            message: 'Logout successful'
        };
    }
    async forgotPassword(forgotPasswordDto) {
        const user = await this.userModel.findOne({ id: forgotPasswordDto.userId }).exec();
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        const isCurrentPasswordValid = await bcrypt.compare(forgotPasswordDto.currentPassword, user.password);
        if (!isCurrentPasswordValid) {
            throw new common_1.UnauthorizedException('Current password is incorrect');
        }
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/;
        if (!passwordRegex.test(forgotPasswordDto.newPassword)) {
            throw new common_1.BadRequestException('New password must contain at least one uppercase letter, one lowercase letter, and one number');
        }
        const hashedNewPassword = await bcrypt.hash(forgotPasswordDto.newPassword, 10);
        user.password = hashedNewPassword;
        await user.save();
        return {
            message: 'Password updated successfully'
        };
    }
    async findByEmail(email) {
        const user = await this.userModel.findOne({ email }).exec();
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        return {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            currency: user.currency,
            salary: user.salary,
            prof_pic: user.prof_pic,
            bill: user.bill,
            investment: user.investment,
            spending: user.spending
        };
    }
    generateToken() {
        return Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2);
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], AuthService);
//# sourceMappingURL=auth.service.js.map