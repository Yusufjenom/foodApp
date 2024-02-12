import { Request, Response, NextFunction } from "express";
import { CatchErrorFunc } from "../utility/CatchErrorFunc";
import { HandleError } from "../utility/error";
import { CreateVendorInput } from "../dto/vendor.dto";
import { VendorModel } from "../models/vendorModel";
import { hashPassword } from "../utility/hashPassword";
import { AdminModel } from "../models/adminModel";
import { ComfirmPassword } from "../utility/comfirmPassword";
import { SignToken, VerifyToken } from "../utility/SignToken";




export const createVendor = CatchErrorFunc(async (req: Request, res: Response) => {
    console.log(req.body)
    const { name, address, pincode, foodType, email, password, ownerName, phone } = <CreateVendorInput>req.body;
    const hashedPassword = await hashPassword(password);
    console.log(hashedPassword)
    const vendor = await VendorModel.create({
        name, address, pincode,
        foodType, password: hashedPassword, email, ownerName,
         phone, rating: 7, serviceAvailable: false, coverImages: [],foods:[]
    });
    console.log(vendor);
    res.status(201).json({
        success: true,
        vendor
    })
});

export const getVendors = CatchErrorFunc(async (req: Request, res: Response) => {
    const vendors = await VendorModel.find().sort({ createdAt: -1 });
    if (vendors.length === 0) {
        throw new HandleError("sorry no record found");
    }
    res.status(200).json({
        success: true,
        vendors
    })
});

export const getVendorById = CatchErrorFunc(async (req: Request, res: Response) => {
    const { id } = req.params;
    const vendor = await VendorModel.findById(id);
    res.status(200).json({
        success: true,
        vendor
    });
});

//CREATE ADMIN FUNCS

export const createAdmin = CatchErrorFunc(async (req: Request, res: Response) => {
  const {name, email, pin, address, number, password} = req.body;
  const hashedPassword = await hashPassword(password);
  const newAdmin = await AdminModel.create({
    name, email, password: hashedPassword, number,pin, address
  });
  return res.status(201).json({
    success: true,
    newAdmin
  });
});

export const loginnAdmin = CatchErrorFunc(async (req: Request, res: Response) =>{
    const {email, password} = req.body;
    const user = await AdminModel.findOne({email});
    if(user){
        const correctPassword = await ComfirmPassword(password, user.password);
        if(correctPassword){
           const signedAdminToken = await SignToken(user.id);
           return res.status(200).json({
            success: true,
            signedAdminToken,
            user
           });
        }else{
            throw new HandleError("invalid password");
        }
    }else{
        throw new HandleError("invalid email");
    }
});