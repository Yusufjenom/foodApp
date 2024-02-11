import express, { Request, Response, NextFunction } from 'express';
import {
    getVendorProfile,
    updateVVendorProfile,
    updateVeendorServvice,
    vendorLogin
} from '../controllers/vendorController';
import { Authenticate } from '../middlewares/authMiddlware';

const vendorRouter = express.Router();


vendorRouter.post('/login-vendor', vendorLogin);

vendorRouter.use(Authenticate)

vendorRouter.get('/profile', getVendorProfile);

vendorRouter.patch('/profile', updateVVendorProfile);

vendorRouter.patch('/service', updateVeendorServvice);

export { vendorRouter as vendorRoute };