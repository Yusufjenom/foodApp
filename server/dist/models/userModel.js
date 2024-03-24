"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
;
const userSchema = new mongoose_1.default.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    firstname: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    verified: {
        type: Boolean,
        required: true
    },
    // coverImages:{
    //     type: [String],
    //     //required: true
    // },
    otp: {
        type: Number,
        required: true
    },
    otp_expiry: {
        type: Number,
        required: true
    },
    lon: {
        type: Number,
        //required: true
    },
    lat: {
        type: Number,
        //required: true
    },
}, { timestamps: true, toJSON: {
        transform(doc, ret) {
            delete ret.password;
        }
    } });
exports.UserModel = mongoose_1.default.model('user', userSchema);
//# sourceMappingURL=userModel.js.map