import express, { Request, Response, NextFunction } from 'express';
import {
    createFood,
    getFood,
    getVendorProfile,
    updateVVendorProfile,
    updateVeendorServvice,
    vendorLogin,
    updateVendorProfilePhoto
} from '../controllers/vendorController';
import { Authenticate } from '../middlewares/authMiddlware';
import multer from 'multer';

const vendorRouter = express.Router();

const imagesStorage = multer.diskStorage({
    destination: function(req, file, cb){
    cb(null, 'images')
    },
    filename: function(req, file, cd){
        cd(null, new Date().toISOString+"-"+file.originalname)
    }
});

const images = multer({storage: imagesStorage}).array('images', 10)


vendorRouter.post('/login-vendor', vendorLogin);

// vendorRouter.use(Authenticate)

vendorRouter.get('/profile',Authenticate, getVendorProfile);

vendorRouter.patch('/profile',Authenticate, updateVVendorProfile);

vendorRouter.patch('/cover-image',Authenticate, images, updateVendorProfilePhoto)

vendorRouter.patch('/service',Authenticate, updateVeendorServvice);

vendorRouter.post('/food',Authenticate, images,  createFood);

vendorRouter.get('/foods',Authenticate, getFood);

export { vendorRouter as vendorRoute };