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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUserToken = exports.validateToken = exports.VerifyToken = exports.generateUserSignedPayload = exports.SignToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const period = 60 * 60 * 24;
function SignToken(payload) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const token = yield jsonwebtoken_1.default.sign(payload, "secret", { expiresIn: period });
            return token;
        }
        catch (err) {
            return err.message;
        }
    });
}
exports.SignToken = SignToken;
;
function generateUserSignedPayload(payload) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const token = yield jsonwebtoken_1.default.sign(payload, "secret", { expiresIn: period });
            return token;
        }
        catch (err) {
            console.log(err.message);
        }
    });
}
exports.generateUserSignedPayload = generateUserSignedPayload;
;
function VerifyToken(token) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const verified = yield jsonwebtoken_1.default.verify(token, "secret");
            return verified;
        }
        catch (err) {
            return err.message;
        }
    });
}
exports.VerifyToken = VerifyToken;
;
const validateToken = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.get('Authorization');
    console.log(token);
    if (token) {
        const payload = yield jsonwebtoken_1.default.verify(token.split(' ')[1], "secret");
        console.log(payload);
        req.user = payload;
        return true;
    }
    return false;
});
exports.validateToken = validateToken;
const validateUserToken = (req) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.get('Authorization');
        if (token) {
            const payload = yield jsonwebtoken_1.default.verify(token.split(' ')[1], "secret");
            req.userCustomer = payload;
            return true;
        }
        return false;
    }
    catch (err) {
        console.log(err.message);
    }
});
exports.validateUserToken = validateUserToken;
//# sourceMappingURL=SignToken.js.map