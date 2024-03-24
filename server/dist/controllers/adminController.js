"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginnAdmin = exports.createAdmin = exports.getVendorById = exports.getVendors = exports.createVendor = void 0;
const CatchErrorFunc_1 = require("../utility/CatchErrorFunc");
const error_1 = require("../utility/error");
const vendorModel_1 = require("../models/vendorModel");
const hashPassword_1 = require("../utility/hashPassword");
const adminModel_1 = require("../models/adminModel");
const comfirmPassword_1 = require("../utility/comfirmPassword");
const SignToken_1 = require("../utility/SignToken");
exports.createVendor = (0, CatchErrorFunc_1.CatchErrorFunc)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    const { name, address, pincode, foodType, email, password, ownerName, phone } = req.body;
    const hashedPassword = yield (0, hashPassword_1.hashPassword)(password);
    console.log(hashedPassword);
    const vendor = yield vendorModel_1.VendorModel.create({
        name, address, pincode,
        foodType, password: hashedPassword, email, ownerName,
        phone, rating: 7, serviceAvailable: false, coverImages: [], foods: []
    });
    console.log(vendor);
    res.status(201).json({
        success: true,
        vendor
    });
}));
exports.getVendors = (0, CatchErrorFunc_1.CatchErrorFunc)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const vendors = yield vendorModel_1.VendorModel.find().sort({ createdAt: -1 });
    if (vendors.length === 0) {
        throw new error_1.HandleError("sorry no record found", 404);
    }
    res.status(200).json({
        success: true,
        vendors
    });
}));
exports.getVendorById = (0, CatchErrorFunc_1.CatchErrorFunc)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const vendor = yield vendorModel_1.VendorModel.findById(id);
    res.status(200).json({
        success: true,
        vendor
    });
}));
//CREATE ADMIN FUNCS
exports.createAdmin = (0, CatchErrorFunc_1.CatchErrorFunc)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, pin, address, number, password } = req.body;
    const hashedPassword = yield (0, hashPassword_1.hashPassword)(password);
    const newAdmin = yield adminModel_1.AdminModel.create({
        name, email, password: hashedPassword, number, pin, address
    });
    return res.status(201).json({
        success: true,
        newAdmin
    });
}));
exports.loginnAdmin = (0, CatchErrorFunc_1.CatchErrorFunc)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield adminModel_1.AdminModel.findOne({ email });
    if (user) {
        const correctPassword = yield (0, comfirmPassword_1.ComfirmPassword)(password, user.password);
        if (correctPassword) {
            const signedAdminToken = yield (0, SignToken_1.SignToken)(user.id);
            return res.status(200).json({
                success: true,
                signedAdminToken,
                user
            });
        }
        else {
            throw new error_1.HandleError("invalid password", 400);
        }
    }
    else {
        throw new error_1.HandleError("invalid email", 400);
    }
}));
//# sourceMappingURL=adminController.js.map