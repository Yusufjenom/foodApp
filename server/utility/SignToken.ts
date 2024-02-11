import { VendorPayload } from "../dto/vendor.dto";
import jwt from 'jsonwebtoken';
import {Request, Response, NextFunction} from 'express'
import { AuthPayload } from "../dto/auth.dto";

const period: number = 60 * 60 * 24

export async function SignToken(payload: VendorPayload) {
    try {
        const token = await jwt.sign( payload , "secret", { expiresIn: period });
        return token;
    } catch (err: any) {
        return err.message;
    }

};

export async function VerifyToken(token: string) {
    try {
        const verified = await jwt.verify(token, "secret");
        return verified;
    }
    catch (err: any) {
        return err.message;
    }

};

export const validateToken = async (req:Request) => {
   const token = req.get('Authorization');
   //console.log(token);
   if(token){
    const payload = await jwt.verify(token.split(' ')[1], "secret", ) as AuthPayload;
    req.user = payload;
    return true
   }
   return false;
}