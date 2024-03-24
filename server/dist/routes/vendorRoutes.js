"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.vendorRoute = void 0;
const express_1 = __importDefault(require("express"));
const vendorController_1 = require("../controllers/vendorController");
const authMiddlware_1 = require("../middlewares/authMiddlware");
const multer_1 = __importDefault(require("multer"));
const vendorRouter = express_1.default.Router();
exports.vendorRoute = vendorRouter;
const imagesStorage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'images');
    },
    filename: function (req, file, cd) {
        cd(null, new Date().toISOString + "-" + file.originalname);
    }
});
const images = (0, multer_1.default)({ storage: imagesStorage }).array('images', 10);
vendorRouter.post('/login-vendor', vendorController_1.vendorLogin);
// vendorRouter.use(Authenticate)
vendorRouter.get('/profile', authMiddlware_1.Authenticate, vendorController_1.getVendorProfile);
vendorRouter.patch('/profile', authMiddlware_1.Authenticate, vendorController_1.updateVVendorProfile);
vendorRouter.patch('/cover-image', authMiddlware_1.Authenticate, images, vendorController_1.updateVendorProfilePhoto);
vendorRouter.patch('/service', authMiddlware_1.Authenticate, vendorController_1.updateVeendorServvice);
vendorRouter.post('/food', authMiddlware_1.Authenticate, images, vendorController_1.createFood);
vendorRouter.get('/foods', authMiddlware_1.Authenticate, vendorController_1.getFood);
//# sourceMappingURL=vendorRoutes.js.map