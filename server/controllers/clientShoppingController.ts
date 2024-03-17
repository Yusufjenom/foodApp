import { VendorModel } from "../models/vendorModel";
import { CatchErrorFunc } from "../utility/CatchErrorFunc";
import {Request, Response, NextFunction} from 'express';


export const getAvailableFood = CatchErrorFunc(async(req: Request, res: Response) => {
    const pincode = req.params.pincode;
    const result = (await VendorModel.find({pincode, serviceAvailable: true}))
    // .sort([["rating", "descending"]])
    // .populate("foods")
});


export const getTopRestaurants = CatchErrorFunc(async (req:Request, res:Response) => {

});

export const getFoodIn30Min = CatchErrorFunc(async (req:Request, res:Response) => {
    
});

export const searchForFood = CatchErrorFunc(async (req:Request, res:Response) => {

});
  
export const getRestaurantById = CatchErrorFunc(async (req:Request, res:Response) => {

});
  