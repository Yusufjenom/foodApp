import {Request, Response, NextFunction} from 'express';
import { CatchErrorFunc } from '../utility/CatchErrorFunc';
import { EditVendorInputs, VendorLoginInput } from '../dto/vendor.dto';
import { VendorModel } from '../models/vendorModel';
import { HandleError } from '../utility/error';
import { ComfirmPassword } from '../utility/comfirmPassword';
import { SignToken } from '../utility/SignToken';
import { CreateFoodInputs } from '../dto/food.dto';
import { FoodModel } from '../models/food';


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
        throw new HandleError("invalid password", 400)
     }
   }else{
    throw new HandleError("invalid email", 400)
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
      throw new HandleError("vendor information not found", 404);
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
      throw new HandleError("vendor details not found", 404);
    }
});

export const updateVendorProfilePhoto = CatchErrorFunc(async (req:Request, res: Response) => {
   const user = req.user;
   if(user){
      const vendor = await VendorModel.findById(user._id);
      if(vendor){
         const files = req.files as [Express.Multer.File]
         const images = files.map((file: Express.Multer.File) => file.filename);
         vendor.coverImages.push(...images);
         const result = await vendor.save()
         return res.status(200).json({
            success: true,
            result
         })
      }
   }
})

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
      throw new HandleError("unable to change user service status because there are no foods available on the system", 404)
   }else{
      throw new HandleError("vendor details not found", 404);
   }

});

export const createFood = CatchErrorFunc(async (req:Request, res:Response) => {
   const user = req.user;

   if(user){
      const vendor = await VendorModel.findById(user._id)
      console.log(vendor)
      const {name, foodType, price, readyTime, category, description} = <CreateFoodInputs>req.body;
      const files = req.files as [Express.Multer.File];
      const images = files.map((file: Express.Multer.File) => file.filename);
      const createdFood = await FoodModel.create({
         name, foodType, price, description, readyTime, rating: 0, category,
         vendorId: vendor?._id, images
      });
      console.log(createdFood)
      vendor?.foods.push(createdFood);
      const result = await vendor?.save();
      return res.status(200).json({
         success: true,
         result
      })
   }
});

export const getFood = CatchErrorFunc(async (req: Request, res: Response) => {
     const user = req.user;
     if(user){
      const foods = await FoodModel.find({vendorId: user._id})
      if(foods !== null){
         return res.json(foods)
      }else{
         throw new HandleError("food not found", 404);
      }
     }
});