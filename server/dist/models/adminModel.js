"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const adminSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    pin: {
        type: Number,
    },
    address: {
        type: String,
        required: true
    },
    number: {
        type: Number,
        required: true
    }
}, { timestamps: true, toJSON: {
        transform(doc, ret) {
            delete ret.password;
        }
    } });
exports.AdminModel = mongoose_1.default.model('admin', adminSchema);
//# sourceMappingURL=adminModel.js.map