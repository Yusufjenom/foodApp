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
exports.getRestaurantById = exports.searchForFood = exports.getFoodIn30Min = exports.getTopRestaurants = exports.getAvailableFood = void 0;
const vendorModel_1 = require("../models/vendorModel");
const CatchErrorFunc_1 = require("../utility/CatchErrorFunc");
const error_1 = require("../utility/error");
exports.getAvailableFood = (0, CatchErrorFunc_1.CatchErrorFunc)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const pincode = req.params.pincode;
    const result = yield vendorModel_1.VendorModel.find({ pincode, serviceAvailable: false })
        .sort([['rating', 'descending']])
        .populate("foods");
    if (result.length > 0) {
        res.status(200).json({
            success: true,
            result
        });
    }
    else {
        throw new error_1.HandleError("Data not found", 404);
    }
}));
exports.getTopRestaurants = (0, CatchErrorFunc_1.CatchErrorFunc)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { pincode } = req.params;
    const result = yield vendorModel_1.VendorModel.find({ pincode, serviceAvailable: false })
        .sort([['rating', 'descending']])
        .limit(1);
    if (result.length > 0) {
        res.status(200).json({
            success: true,
            result
        });
    }
    else {
        throw new error_1.HandleError("Data not found", 404);
    }
}));
exports.getFoodIn30Min = (0, CatchErrorFunc_1.CatchErrorFunc)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { pincode } = req.params;
    const result = yield vendorModel_1.VendorModel.find({ pincode, serviceAvailable: false })
        .populate("foods");
    if (result.length > 0) {
        let foodResult = [];
        result.map(vendor => {
            const foods = vendor.foods;
            foodResult.push(...foods.filter(food => food.readyTime <= 30));
        });
        res.status(200).json({
            success: true,
            foodResult
        });
    }
    else {
        throw new error_1.HandleError("Data not found", 404);
    }
}));
exports.searchForFood = (0, CatchErrorFunc_1.CatchErrorFunc)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { pincode } = req.params;
    const result = yield vendorModel_1.VendorModel.find({ pincode, serviceAvailable: false })
        .populate("foods");
    if (result.length > 0) {
        let foods = [];
        result.map(food => foods.push(...food.foods));
        res.status(200).json({
            success: true,
            foods
        });
    }
    else {
        throw new error_1.HandleError("Data not found", 404);
    }
}));
exports.getRestaurantById = (0, CatchErrorFunc_1.CatchErrorFunc)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield vendorModel_1.VendorModel.findById(id)
        .populate("foods");
    if (result) {
        res.status(200).json({
            success: true,
            result
        });
    }
    else {
        throw new error_1.HandleError("Data not found", 404);
    }
}));
//# sourceMappingURL=clientShoppingController.js.map