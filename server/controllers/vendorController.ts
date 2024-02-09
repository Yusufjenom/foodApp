import {Request, Response, NextFunction} from 'express';
import { CatchErrorFunc } from '../utility/CatchErrorFunc';
import { VendorLoginInput } from '../dto/vendor.dto';
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
        const vendorToken = await SignToken(vendor.id);
        return res.status(200).json({
            success: true,
            vendorToken,
            vendor
        })
     }else{
        throw new HandleError("invalid password")
     }
   }else{
    throw new HandleError("invalid email")
   }
});