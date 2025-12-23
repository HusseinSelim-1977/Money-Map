"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("../User/Schema/user.schema");
const bcrypt = require("bcrypt");
let AuthService = class AuthService {
    constructor(userModel, jwtService) {
        this.userModel = userModel;
        this.jwtService = jwtService;
    }
    async signup(signUpDto) {
        const existingUser = await this.userModel.findOne({ email: signUpDto.email }).exec();
        if (existingUser) {
            throw new common_1.ConflictException('User with this email already exists');
        }
        if (signUpDto.password.length < 8) {
            throw new common_1.BadRequestException('Password must be at least 8 characters');
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
            spending: [],
            investmentCategories: []
        });
        const savedUser = await newUser.save();
        const token = this.generateToken(savedUser);
        return {
            message: 'User registered successfully',
            token,
            user: {
                id: savedUser.id,
                firstName: savedUser.firstName,
                lastName: savedUser.lastName,
                email: savedUser.email,
                currency: savedUser.currency,
                salary: savedUser.salary,
                prof_pic: savedUser.prof_pic
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
        const token = this.generateToken(user);
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
        const user = await this.userModel.findOne({ email: forgotPasswordDto.email }).exec();
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        const isCurrentPasswordValid = await bcrypt.compare(forgotPasswordDto.currentPassword, user.password);
        if (!isCurrentPasswordValid) {
            throw new common_1.UnauthorizedException('Current password is incorrect');
        }
        if (forgotPasswordDto.newPassword.length < 8) {
            throw new common_1.BadRequestException('New password must be at least 8 characters');
        }
        const hashedNewPassword = await bcrypt.hash(forgotPasswordDto.newPassword, 10);
        user.password = hashedNewPassword;
        await user.save();
        return {
            message: 'Password updated successfully'
        };
    }
    async validateUser(email, password) {
        const user = await this.userModel.findOne({ email }).exec();
        if (user && await bcrypt.compare(password, user.password)) {
            const { password, ...result } = user.toObject();
            return result;
        }
        return null;
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
            spending: user.spending,
            investmentCategories: user.investmentCategories
        };
    }
    generateToken(user) {
        const payload = {
            email: user.email,
            sub: user.id,
            firstName: user.firstName,
            lastName: user.lastName
        };
        return this.jwtService.sign(payload);
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map