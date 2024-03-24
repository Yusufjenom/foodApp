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
exports.getFood = exports.createFood = exports.updateVeendorServvice = exports.updateVendorProfilePhoto = exports.updateVVendorProfile = exports.getVendorProfile = exports.vendorLogin = void 0;
const CatchErrorFunc_1 = require("../utility/CatchErrorFunc");
const vendorModel_1 = require("../models/vendorModel");
const error_1 = require("../utility/error");
const comfirmPassword_1 = require("../utility/comfirmPassword");
const SignToken_1 = require("../utility/SignToken");
const food_1 = require("../models/food");
exports.vendorLogin = (0, CatchErrorFunc_1.CatchErrorFunc)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const vendor = yield vendorModel_1.VendorModel.findOne({ email });
    if (vendor) {
        const correctPassword = yield (0, comfirmPassword_1.ComfirmPassword)(password, vendor.password);
        if (correctPassword) {
            const vendorToken = yield (0, SignToken_1.SignToken)({
                _id: vendor._id,
                email: vendor.email,
                name: vendor.name,
                foodType: vendor.foodType
            });
            return res.status(200).json({
                success: true,
                vendorToken,
                //vendor
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
exports.getVendorProfile = (0, CatchErrorFunc_1.CatchErrorFunc)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    console.log(user);
    if (user) {
        const vendor = yield vendorModel_1.VendorModel.findById(user._id);
        return res.status(200).json({
            success: true,
            vendor
        });
    }
    else {
        throw new error_1.HandleError("vendor information not found", 404);
    }
}));
exports.updateVVendorProfile = (0, CatchErrorFunc_1.CatchErrorFunc)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, phone, foodType, address } = req.body;
    const user = req.user;
    if (user) {
        const vendor = yield vendorModel_1.VendorModel.findByIdAndUpdate(user._id, {
            name, phone, foodType, address
        });
        return res.status(200).json({
            success: true,
            vendor
        });
    }
    else {
        throw new error_1.HandleError("vendor details not found", 404);
    }
}));
exports.updateVendorProfilePhoto = (0, CatchErrorFunc_1.CatchErrorFunc)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    if (user) {
        const vendor = yield vendorModel_1.VendorModel.findById(user._id);
        if (vendor) {
            const files = req.files;
            const images = files.map((file) => file.filename);
            vendor.coverImages.push(...images);
            const result = yield vendor.save();
            return res.status(200).json({
                success: true,
                result
            });
        }
    }
}));
exports.updateVeendorServvice = (0, CatchErrorFunc_1.CatchErrorFunc)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    if (user) {
        console.log(user.foodType.length);
        //console.log(user);
        const vendor = yield vendorModel_1.VendorModel.findById(user._id);
        //   console.log(vendor)
        if (user.foodType.length > 0) {
            const updateService = yield vendorModel_1.VendorModel.findByIdAndUpdate(user._id, {
                serviceAvailable: !(vendor === null || vendor === void 0 ? void 0 : vendor.serviceAvailable)
            });
            return res.status(200).json({
                success: true,
                updateService
            });
        }
        throw new error_1.HandleError("unable to change user service status because there are no foods available on the system", 404);
    }
    else {
        throw new error_1.HandleError("vendor details not found", 404);
    }
}));
exports.createFood = (0, CatchErrorFunc_1.CatchErrorFunc)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    if (user) {
        const vendor = yield vendorModel_1.VendorModel.findById(user._id);
        console.log(vendor);
        const { name, foodType, price, readyTime, category, description } = req.body;
        const files = req.files;
        const images = files.map((file) => file.filename);
        const createdFood = yield food_1.FoodModel.create({
            name, foodType, price, description, readyTime, rating: 0, category,
            vendorId: vendor === null || vendor === void 0 ? void 0 : vendor._id, images
        });
        console.log(createdFood);
        vendor === null || vendor === void 0 ? void 0 : vendor.foods.push(createdFood);
        const result = yield (vendor === null || vendor === void 0 ? void 0 : vendor.save());
        return res.status(200).json({
            success: true,
            result
        });
    }
}));
exports.getFood = (0, CatchErrorFunc_1.CatchErrorFunc)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    if (user) {
        const foods = yield food_1.FoodModel.find({ vendorId: user._id });
        if (foods !== null) {
            return res.json(foods);
        }
        else {
            throw new error_1.HandleError("food not found", 404);
        }
    }
}));
//# sourceMappingURL=vendorController.js.map