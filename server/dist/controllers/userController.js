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
exports.updateUserProfile = exports.getUserProfile = exports.requestUserOTP = exports.verifyUser = exports.userLogin = exports.userSignp = void 0;
const CatchErrorFunc_1 = require("../utility/CatchErrorFunc");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const user_dto_1 = require("../dto/user.dto");
const error_1 = require("../utility/error");
const hashPassword_1 = require("../utility/hashPassword");
const userModel_1 = require("../models/userModel");
const generateOTP_1 = require("../utility/generateOTP");
const SignToken_1 = require("../utility/SignToken");
const comfirmPassword_1 = require("../utility/comfirmPassword");
//import { UserLoginInputs } from '../dto/user.dto'; 
exports.userSignp = (0, CatchErrorFunc_1.CatchErrorFunc)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userInputs = (0, class_transformer_1.plainToClass)(user_dto_1.CreateUserInputs, req.body);
    const inputErrors = yield (0, class_validator_1.validate)(userInputs, { validationError: { target: true } });
    if (inputErrors.length > 0) {
        throw new error_1.HandleError(inputErrors, 400);
    }
    else {
        const { email, phone, password, address, firstname, lastname } = userInputs;
        const hashedPassword = yield (0, hashPassword_1.hashPassword)(password);
        const { otp, expiry } = yield (0, generateOTP_1.genOTP)();
        const newUser = yield userModel_1.UserModel.create({
            email,
            password: hashedPassword,
            otp,
            otp_expiry: expiry,
            firstname,
            lastname,
            address,
            phone,
            verified: false,
            lat: 0,
            lon: 0
        });
        if (newUser) {
            //send OTP to user
            // await onRequestOTP(otp, phone);
            //generate the signature
            const signature = yield (0, SignToken_1.generateUserSignedPayload)({
                _id: newUser._id,
                email: newUser.email,
                verified: newUser.verified
            });
            //send response back to the user
            res.status(201).json({
                success: true,
                signature,
                verified: newUser.verified,
                email: newUser.email,
                otp
            });
        }
        else {
            throw new error_1.HandleError("an error occured during the signup process", 400);
        }
    }
}));
exports.userLogin = (0, CatchErrorFunc_1.CatchErrorFunc)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const loginInputs = (0, class_transformer_1.plainToClass)(user_dto_1.UserLoginInputs, req.body);
    const loginErrors = yield (0, class_validator_1.validate)(loginInputs, { validationError: { target: false } });
    if (loginErrors.length > 0) {
        throw new error_1.HandleError(loginErrors, 400);
    }
    else {
        const { email, password } = loginInputs;
        const user = yield userModel_1.UserModel.findOne({ email });
        if (user) {
            const isPassword = yield (0, comfirmPassword_1.ComfirmPassword)(password, user.password);
            if (isPassword) {
                const token = yield (0, SignToken_1.generateUserSignedPayload)({
                    _id: user._id,
                    email: user.email,
                    verified: user.verified
                });
                res.status(200).json({
                    success: true,
                    token,
                    verified: user.verified,
                    email: user.email
                });
            }
            else {
                throw new error_1.HandleError("Invalid password", 400);
            }
        }
        else {
            throw new error_1.HandleError("Invalid email address", 404);
        }
    }
}));
exports.verifyUser = (0, CatchErrorFunc_1.CatchErrorFunc)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { otp } = req.body;
    const user = req.userCustomer;
    if (user) {
        const profile = yield userModel_1.UserModel.findById(user._id);
        if (profile) {
            if (profile.otp === Number(otp) && profile.otp_expiry >= new Date()) {
                profile.verified = true;
                const updateedUserResponse = yield profile.save();
                //generate signature
                const signature = yield (0, SignToken_1.generateUserSignedPayload)({
                    _id: updateedUserResponse._id,
                    email: updateedUserResponse.email,
                    verified: updateedUserResponse.verified
                });
                res.status(200).json({
                    success: true,
                    signature,
                    verified: updateedUserResponse.verified,
                    email: updateedUserResponse.email
                });
            }
            else {
                throw new error_1.HandleError("incorrect or expired otp", 400);
            }
        }
    }
}));
exports.requestUserOTP = (0, CatchErrorFunc_1.CatchErrorFunc)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.userCustomer;
    if (user) {
        const profile = yield userModel_1.UserModel.findById(user._id);
        if (profile) {
            const { otp, expiry } = yield (0, generateOTP_1.genOTP)();
            profile.otp = otp;
            profile.otp_expiry = expiry;
            yield profile.save();
            //sned the otp
            // await onRequestOTP(otp, profile.phone);
            res.status(200).json({
                success: true,
                message: "OTP has been sent to your registereed phone number",
                otp,
                num: profile.phone
            });
        }
    }
}));
exports.getUserProfile = (0, CatchErrorFunc_1.CatchErrorFunc)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.userCustomer;
    if (user) {
        const profile = yield userModel_1.UserModel.findById(user._id);
        if (profile) {
            res.status(200).json({
                success: true,
                profile
            });
        }
        else {
            throw new error_1.HandleError("error in fetching user information", 404);
        }
    }
    else {
        throw new error_1.HandleError('wrong credentials', 400);
    }
}));
exports.updateUserProfile = (0, CatchErrorFunc_1.CatchErrorFunc)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.userCustomer;
    console.log(user);
    console.log(req.body);
    const profileInputs = (0, class_transformer_1.plainToClass)(user_dto_1.EditProfileInput, req.body);
    console.log(profileInputs);
    const profileErrors = yield (0, class_validator_1.validate)(profileInputs, { validationError: { target: false } });
    console.log(profileErrors);
    if (profileErrors.length > 0) {
        throw new error_1.HandleError(profileErrors, 400);
    }
    else {
        const { firstname, lastname, address } = profileInputs;
        if (user) {
            console.log(user);
            const profile = yield userModel_1.UserModel.findById(user._id);
            console.log(profile);
            if (profile) {
                profile.firstname = firstname;
                profile.lastname = lastname;
                profile.address = address;
                const updatedResult = yield profile.save();
                res.status(200).json({
                    success: true,
                    updatedResult
                });
            }
            else {
                throw new error_1.HandleError("user not found", 404);
            }
        }
        else {
            throw new error_1.HandleError('wrong credentials', 400);
        }
    }
}));
//# sourceMappingURL=userController.js.map