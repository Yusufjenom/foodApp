import {Request, Response, NextFunction} from 'express';
import { CatchErrorFunc } from '../utility/CatchErrorFunc';
import { EditVendorInputs, VendorLoginInput } from '../dto/vendor.dto';
import { VendorModel } from '../models/vendorModel';
import { HandleError } from '../utility/error';
import { ComfirmPassword } from '../utility/comfirmPassword';
import { SignToken } from '../utility/SignToken';


export const vendorLogin = CatchErrorFunc(async (req: Request, res: Response) => {
   const {email, password} = <VendorLoginInput>req.body;

   const vendor = await VendorModel.findOne({email});
   if(vendor){
     const correctPassword = await ComfirmPassword(password, vendor.password);
     if(correctPassword){
        const vendorToken = await SignToken({
         _id: vendor._id,
         email: vendor.email,
         name: vendor.name,
         foodType: vendor.foodType
        });
        return res.status(200).json({
            success: true,
            vendorToken,
            //vendor
        })
     }else{
        throw new HandleError("invalid password")
     }
   }else{
    throw new HandleError("invalid email")
   }
});

export const getVendorProfile = CatchErrorFunc(async (req:Request, res:Response) => {
    const user = req.user;
    //console.log(user)
    if(user){
      const vendor = await VendorModel.findById(user._id)
      return res.status(200).json({
         success: true,
         vendor
      })
    }else{
      throw new HandleError("vendor information not found");
    }
});

export const updateVVendorProfile = CatchErrorFunc(async (req:Request, res:Response) => {
    const {name, phone, foodType, address} = <EditVendorInputs>req.body;
    const user = req.user;
    if(user){
      const vendor = await VendorModel.findByIdAndUpdate(user._id, {
         name, phone, foodType, address
      });
      return res.status(200).json({
         success: true,
         vendor
      })
    }else{
      throw new HandleError("vendor details not found");
    }
});

export const updateVeendorServvice = CatchErrorFunc(async (req:Request, res:Response) => {
   const user = req.user;
   if(user){
     console.log(user.foodType.length)
       if(user.foodType.length > 0){
         const updateService = await VendorModel.findByIdAndUpdate(user._id, {
            serviceAvailable: true
         });
         return res.status(200).json({
            success: true,
            updateService
         })
       }
      throw new HandleError("unable to change user service status because there are no foods available on the system")
   }else{
      throw new HandleError("vendor details not found");
   }

});