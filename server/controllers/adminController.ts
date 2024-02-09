import { Request, Response, NextFunction } from "express";
import { CatchErrorFunc } from "../utility/CatchErrorFunc";
import { HandleError } from "../utility/error";
import { CreateVendorInput } from "../dto/vendor.dto";
import { VendorModel } from "../models/vendorModel";
import { hashPassword } from "../utility/hashPassword";




export const createVendor = CatchErrorFunc(async (req: Request, res: Response) => {
    const { name, address, pincode, foodType, email, password, ownerName, phone } = <CreateVendorInput>req.body;
    const hashedPassword = await hashPassword(password);
    const vendor = await VendorModel.create({
        name, address, pincode,
        foodType, password: hashedPassword, email, ownerName, phone, rating: 7, serviceAvailable: false, coverImages: []
    });

    res.status(201).json({
        success: true,
        vendor
    })
});

export const getVendors = CatchErrorFunc(async (req: Request, res: Response) => {
   const vendors = await VendorModel.find().sort({createdAt: -1});
   if(vendors.length === 0){
    throw new HandleError("sorry no record found");
   }
   res.status(200).json({
    success: true,
    vendors
   })
});

export const getVendorById = CatchErrorFunc(async (req: Request, res: Response) => {
   const {id} = req.params;
   const vendor = await VendorModel.findById(id);
   res.status(200).json({
    success: true,
    vendor
   });
});