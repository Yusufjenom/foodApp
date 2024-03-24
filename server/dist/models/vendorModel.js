"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendorModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
;
const vendorSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true
    },
    ownerName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String,
        //required: true
    },
    pincode: {
        type: String,
        required: true
    },
    foodType: {
        type: [String],
        //required: true
    },
    phone: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    serviceAvailable: {
        type: Boolean,
        //required: true
    },
    coverImages: {
        type: [String],
        //required: true
    },
    rating: {
        type: Number,
        //required: true
    },
    foods: [{
            type: mongoose_1.default.SchemaTypes.ObjectId,
            ref: 'food'
        }],
}, { timestamps: true, toJSON: {
        transform(doc, ret) {
            delete ret.password;
        }
    } });
exports.VendorModel = mongoose_1.default.model('vendor', vendorSchema);
//# sourceMappingURL=vendorModel.js.map