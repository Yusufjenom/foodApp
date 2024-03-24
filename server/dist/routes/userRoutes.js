"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoute = void 0;
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const authMiddlware_1 = require("../middlewares/authMiddlware");
const userRouter = express_1.default.Router();
exports.userRoute = userRouter;
/** signup */
userRouter.post('/signup-customer', userController_1.userSignp);
/** Login  */
userRouter.post('/login-customer', userController_1.userLogin);
// userRouter.use(AuthenticatUser);
/**verify customer account*/
userRouter.patch('/verify-customer', authMiddlware_1.AuthenticatUser, userController_1.verifyUser);
/** requeesting OTP*/
userRouter.get('/otp', authMiddlware_1.AuthenticatUser, userController_1.requestUserOTP);
/**get Profile */
userRouter.get('/customer-profile', authMiddlware_1.AuthenticatUser, userController_1.getUserProfile);
/**update Profile */
userRouter.patch('/update-customer-profile', authMiddlware_1.AuthenticatUser, userController_1.updateUserProfile);
//# sourceMappingURL=userRoutes.js.map