import express, {Request, Response, NextFunction} from 'express';
import { vendorLogin } from '../controllers/vendorController';

const vendorRouter = express.Router();


vendorRouter.post('/login-vendor', vendorLogin);

export {vendorRouter as vendorRoute};