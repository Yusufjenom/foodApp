import {Request, Response, NextFunction} from 'express';
import { HandleError} from '../utility/error';

interface IObject{
    email:string,
    password: string
}



export const ErrorHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {
    //validation errors
   if(error.message.includes("E11000 duplicate key error ")){
    return res.status(400).json({
        success: false,
        message: "email already used try a new email"
    })
   }
   if(error.message.includes("Cast to ObjectId failed for value")){
    return res.status(404).json({
        success: false,
        message: "user not found"
    })
   }

    let errors:IObject  = {email: "", password: ""}
    if(error instanceof HandleError){

    }
   return res.status(400).json({
    success: false,
    error: error.message
   })
};