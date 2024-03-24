"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminRoute = void 0;
const express_1 = __importDefault(require("express"));
const adminController_1 = require("../controllers/adminController");
const adminRouter = express_1.default.Router();
exports.adminRoute = adminRouter;
adminRouter.post('/vendor', adminController_1.createVendor);
adminRouter.get('/vendors', adminController_1.getVendors);
adminRouter.get('/vendor/:id', adminController_1.getVendorById);
adminRouter.post('/admin', adminController_1.createAdmin);
adminRouter.post('/admin-login', adminController_1.loginnAdmin);
//# sourceMappingURL=adminRoutes.js.map