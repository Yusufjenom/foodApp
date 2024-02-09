import express, { Request, Response, NextFunction } from 'express';
import {
    createAdmin,
    createVendor,
    getVendorById,
    getVendors,
    loginnAdmin
} from '../controllers/adminController';

const adminRouter = express.Router();

adminRouter.post('/vendor', createVendor);

adminRouter.get('/vendors', getVendors);

adminRouter.get('/vendor/:id', getVendorById);

adminRouter.post('/admin', createAdmin);

adminRouter.post('/admin-login', loginnAdmin);

export { adminRouter as adminRoute };