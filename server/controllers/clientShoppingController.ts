import { VendorModel } from "../models/vendorModel";
import { CatchErrorFunc } from "../utility/CatchErrorFunc";
import {Request, Response, NextFunction} from 'express';
import { HandleError } from "../utility/error";


export const getAvailableFood = CatchErrorFunc(async(req: Request, res: Response) => {
    const pincode = req.params.pincode;
    const result = await VendorModel.find({pincode, serviceAvailable: true})
    .sort([['rating', 'descending']])
    .populate("foods")
     
    if(result.length > 0){
        res.status(200).json({
            success: true,
            result
        })
    }else{
        throw new HandleError("Data not found", 404);
    }
    
});


export const getTopRestaurants = CatchErrorFunc(async (req:Request, res:Response) => {

});

export const getFoodIn30Min = CatchErrorFunc(async (req:Request, res:Response) => {
    
});

export const searchForFood = CatchErrorFunc(async (req:Request, res:Response) => {

});
  
export const getRestaurantById = CatchErrorFunc(async (req:Request, res:Response) => {

});
  