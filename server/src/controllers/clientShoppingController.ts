import { VendorModel } from "../models/vendorModel";
import { CatchErrorFunc } from "../utility/CatchErrorFunc";
import { Request, Response } from "express";
import { HandleError } from "../utility/error";
import { FoodDoc } from "../models/food";

export const getAvailableFood = CatchErrorFunc(
  async (req: Request, res: Response) => {
    const pincode = req.params.pincode;
    const result = await VendorModel.find({ pincode, serviceAvailable: false })
      .sort([["rating", "descending"]])
      .populate("foods");

    if (result.length > 0) {
      res.status(200).json({
        success: true,
        result,
      });
    } else {
      throw new HandleError("Data not found", 404);
    }
  }
);

export const getTopRestaurants = CatchErrorFunc(
  async (req: Request, res: Response) => {
    const { pincode } = req.params;
    const result = await VendorModel.find({ pincode, serviceAvailable: false })
      .sort([["rating", "descending"]])
      .limit(1);
    if (result.length > 0) {
      res.status(200).json({
        success: true,
        result,
      });
    } else {
      throw new HandleError("Data not found", 404);
    }
  }
);

export const getFoodIn30Min = CatchErrorFunc(
  async (req: Request, res: Response) => {
    const { pincode } = req.params;
    const result = await VendorModel.find({
      pincode,
      serviceAvailable: false,
    }).populate("foods");
    if (result.length > 0) {
      let foodResult: any = [];
      result.map((vendor) => {
        const foods = vendor.foods as [FoodDoc];
        foodResult.push(...foods.filter((food) => food.readyTime <= 30));
      });
      res.status(200).json({
        success: true,
        foodResult,
      });
    } else {
      throw new HandleError("Data not found", 404);
    }
  }
);

export const searchForFood = CatchErrorFunc(
  async (req: Request, res: Response) => {
    const { pincode } = req.params;
    const result = await VendorModel.find({
      pincode,
      serviceAvailable: false,
    }).populate("foods");

    if (result.length > 0) {
      let foods: any = [];
      result.map((food) => foods.push(...food.foods));
      res.status(200).json({
        success: true,
        foods,
      });
    } else {
      throw new HandleError("Data not found", 404);
    }
  }
);

export const getRestaurantById = CatchErrorFunc(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await VendorModel.findById(id).populate("foods");

    if (result) {
      res.status(200).json({
        success: true,
        result,
      });
    } else {
      throw new HandleError("Data not found", 404);
    }
  }
);
