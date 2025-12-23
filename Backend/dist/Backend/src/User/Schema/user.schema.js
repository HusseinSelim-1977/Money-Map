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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchema = exports.User = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose = require("mongoose");
let User = class User {
};
exports.User = User;
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        unique: true,
        default: () => new mongoose.Types.ObjectId().toString()
    }),
    __metadata("design:type", String)
], User.prototype, "id", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], User.prototype, "firstName", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], User.prototype, "lastName", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        unique: true,
        validate: {
            validator: function (email) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
            },
            message: "Please Enter A Valid Email"
        }
    }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        validate: {
            validator: function (pass) {
                return pass.length >= 8;
            },
            message: 'Password must be at least 8 characters'
        }
    }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, mongoose_1.Prop)({ validate: {
            validator: function (url) {
                if (!url)
                    return true;
                try {
                    new URL(url);
                    return /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(url);
                }
                catch {
                    return false;
                }
            },
            message: 'Profile picture must be a valid image URL (jpg, jpeg, png, gif, webp, svg)'
        }
    }),
    __metadata("design:type", String)
], User.prototype, "prof_pic", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 'USD' }),
    __metadata("design:type", String)
], User.prototype, "currency", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0, min: 0 }),
    __metadata("design:type", Number)
], User.prototype, "salary", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [Object], default: [] }),
    __metadata("design:type", Array)
], User.prototype, "bill", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [Object], default: [] }),
    __metadata("design:type", Array)
], User.prototype, "investment", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [Object], default: [] }),
    __metadata("design:type", Array)
], User.prototype, "spending", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [Object], default: [] }),
    __metadata("design:type", Array)
], User.prototype, "investmentCategories", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date, default: Date.now }),
    __metadata("design:type", Date)
], User.prototype, "createdAt", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date, default: Date.now }),
    __metadata("design:type", Date)
], User.prototype, "updatedAt", void 0);
exports.User = User = __decorate([
    (0, mongoose_1.Schema)()
], User);
exports.UserSchema = mongoose_1.SchemaFactory.createForClass(User);
exports.UserSchema.pre('save', function (next) {
    this.updatedAt = new Date();
    next();
});
//# sourceMappingURL=user.schema.js.map