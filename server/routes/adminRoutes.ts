import express, {Request, Response, NextFunction} from 'express';
import { createVendor, getVendorById, getVendors } from '../controllers/adminController';

const adminRouter = express.Router();

adminRouter.post('/vendor', createVendor);

adminRouter.get('/vendors', getVendors);

adminRouter.get('/vendor/:id', getVendorById);

export {adminRouter as adminRoute};