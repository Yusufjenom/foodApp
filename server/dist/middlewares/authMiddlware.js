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
exports.AuthenticatUser = exports.Authenticate = void 0;
const SignToken_1 = require("../utility/SignToken");
const error_1 = require("../utility/error");
;
;
const Authenticate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const validate = yield (0, SignToken_1.validateToken)(req);
    //console.log(validate);
    if (validate) {
        next();
    }
    else {
        //throw new HandleError("user not authorized");
        throw new error_1.HandleError("vendor or admin unauthorized", 401);
    }
});
exports.Authenticate = Authenticate;
const AuthenticatUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const validate = yield (0, SignToken_1.validateUserToken)(req);
    if (validate) {
        next();
    }
    else {
        throw new error_1.HandleError("unauthorized user", 401);
    }
});
exports.AuthenticatUser = AuthenticatUser;
//# sourceMappingURL=authMiddlware.js.map