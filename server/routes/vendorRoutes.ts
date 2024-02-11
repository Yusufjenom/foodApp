import express, { Request, Response, NextFunction } from 'express';
import {
    createFood,
    getFood,
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

vendorRouter.post('/food', createFood);

vendorRouter.get('/foods', getFood);

export { vendorRouter as vendorRoute };