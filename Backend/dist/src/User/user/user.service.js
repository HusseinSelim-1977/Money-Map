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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("../Schema/user.schema");
let UserService = class UserService {
    userModel;
    constructor(userModel) {
        this.userModel = userModel;
    }
    async create(createUserDto) {
        const newUser = new this.userModel(createUserDto);
        return newUser.save();
    }
    async findAll() {
        return this.userModel.find();
    }
    async getUser(id) {
        return this.userModel.findById(id);
    }
    async updateUser(id, updates) {
        return this.userModel.findByIdAndUpdate(id, updates, { new: true });
    }
    async remove(id) {
        return this.userModel.findByIdAndDelete(id);
    }
    async addBill(userId, bill) {
        return this.userModel.findByIdAndUpdate(userId, { $push: { bill: bill } }, { new: true });
    }
    async updateBill(userId, billId, updates) {
        return this.userModel.findOneAndUpdate({ _id: userId, 'bill.id': billId }, { $set: { 'bill.$': { ...updates, id: billId } } }, { new: true });
    }
    async addInvestment(userId, investment) {
        return this.userModel.findByIdAndUpdate(userId, { $push: { investment: investment } }, { new: true });
    }
    async updateInvestment(userId, investmentId, updates) {
        return this.userModel.findOneAndUpdate({ _id: userId, 'investment.id': investmentId }, { $set: { 'investment.$': { ...updates, id: investmentId } } }, { new: true });
    }
    async addSpending(userId, spending) {
        return this.userModel.findByIdAndUpdate(userId, { $push: { spending: spending } }, { new: true });
    }
    async updateSpending(userId, spendingId, updates) {
        return this.userModel.findOneAndUpdate({ _id: userId, 'spending.id': spendingId }, { $set: { 'spending.$': { ...updates, id: spendingId } } }, { new: true });
    }
    async getTotals(userId) {
        const user = await this.getUser(userId);
        if (!user) {
            throw new Error('User not found');
        }
        const billsTotal = user.bill.reduce((sum, bill) => sum + bill.amountNeeded, 0);
        const investmentsTotal = user.investment.reduce((sum, inv) => sum + inv.amountNeeded, 0);
        const spendingTotal = user.spending.reduce((sum, spend) => sum + spend.amountDeposited, 0);
        return { billsTotal, investmentsTotal, spendingTotal };
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], UserService);
//# sourceMappingURL=user.service.js.map