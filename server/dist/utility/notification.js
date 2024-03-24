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
exports.onRequestOTP = void 0;
const onRequestOTP = (otp, toPhoneNumber) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const accountSid = "";
        const authToken = "";
        const client = require('twilio')(accountSid, authToken);
        const response = yield client.message.create({
            body: `your OTP is ${otp}`,
            from: '',
            to: toPhoneNumber
        });
        return response;
    }
    catch (err) {
        console.log(err.message);
    }
});
exports.onRequestOTP = onRequestOTP;
//# sourceMappingURL=notification.js.map