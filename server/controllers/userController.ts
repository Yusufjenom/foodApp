import express, {Request, Response, NextFunction} from 'express';
import { CatchErrorFunc } from '../utility/CatchErrorFunc';
import {plainToClass} from 'class-transformer'
import {validate} from 'class-validator';
import { CreateUserInputs } from '../dto/user.dto';



export const userSignp = CatchErrorFunc(async (req:Request, res:Response) => {

 const userInputs = plainToClass(CreateUserInputs, req.body);
const inputErrors = validate(userInputs, {validationError: {target: true}});
});

export const userLogin = CatchErrorFunc(async (req:Request, res:Response) => {

});

export const verifyUser = CatchErrorFunc(async (req:Request, res:Response) => {

});

export const requestUserOTP = CatchErrorFunc(async (req:Request, res:Response) => {

});

export const getUserProfile = CatchErrorFunc(async (req:Request, res:Response) => {

});

export const updateUserProfile = CatchErrorFunc(async (req:Request, res:Response) => {

});