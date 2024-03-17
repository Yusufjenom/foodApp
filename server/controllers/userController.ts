import express, { Request, Response, NextFunction } from 'express';
import { CatchErrorFunc } from '../utility/CatchErrorFunc';
import { plainToClass } from 'class-transformer'
import { validate } from 'class-validator';
import { CreateUserInputs } from '../dto/user.dto';
import { HandleError } from '../utility/error';
import { hashPassword } from '../utility/hashPassword';
import { UserModel } from '../models/userModel';
import { genOTP } from '../utility/generateOTP';
import { onRequestOTP } from '../utility/notification';
import { generateUserSignedPayload } from '../utility/SignToken';



export const userSignp = CatchErrorFunc(async (req: Request, res: Response) => {

    const userInputs = plainToClass(CreateUserInputs, req.body);
    const inputErrors = await validate(userInputs, { validationError: { target: true } });
    if (inputErrors.length > 0) {
        throw new HandleError(inputErrors, 400);
    } else {
        const { email, phone, password } = userInputs;
        const hashedPassword = await hashPassword(password);
        const { otp, expiry } = await genOTP();
        const otp_expiry = new Date();

        const newUser = await UserModel.create({
            email,
            password: hashedPassword,
            otp,
            otp_expiry: expiry,
            firstname: "",
            lastname: "",
            address: "",
            phone,
            verified: false,
            lat: 0,
            lon: 0
        });

        if (newUser) {
            //send OTP to user
            // await onRequestOTP(otp, phone);

            //generate the signature
            const signature = await generateUserSignedPayload({
                _id: newUser._id,
                email: newUser.email,
                verified: newUser.verified
            });

            //send response back to the user
            res.status(201).json({
                success: true,
                signature,
                verified: newUser.verified,
                email: newUser.email
            })
        } else {
            throw new HandleError("an error occured during the signup process", 400);
        }
    }
});

export const userLogin = CatchErrorFunc(async (req: Request, res: Response) => {

});

export const verifyUser = CatchErrorFunc(async (req: Request, res: Response) => {
    const { otp } = req.body;
    const user = req.user;
   
    if (user) {
        const profile = await UserModel.findById(user._id);
        
        if (profile) {
            if (profile.otp === Number(otp) && profile.otp_expiry >= new Date()) {
                profile.verified = true;

                const updateedUserResponse = await profile.save();

                //generate signature
                const signature = await generateUserSignedPayload({
                    _id: updateedUserResponse._id,
                    email: updateedUserResponse.email,
                    verified: updateedUserResponse.verified
                });

                res.status(200).json({
                    success: true,
                    signature,
                    verified: updateedUserResponse.verified,
                    email: updateedUserResponse.email

                })
            } else {
                throw new HandleError("incorrect or expired otp", 400)
            }
        }
    }
});

export const requestUserOTP = CatchErrorFunc(async (req: Request, res: Response) => {

});

export const getUserProfile = CatchErrorFunc(async (req: Request, res: Response) => {

});

export const updateUserProfile = CatchErrorFunc(async (req: Request, res: Response) => {

});