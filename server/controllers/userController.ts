import express, { Request, Response, NextFunction } from 'express';
import { CatchErrorFunc } from '../utility/CatchErrorFunc';
import { plainToClass } from 'class-transformer'
import { validate } from 'class-validator';
import { CreateUserInputs, EditProfileInput, UserLoginInputs } from '../dto/user.dto';
import { HandleError } from '../utility/error';
import { hashPassword } from '../utility/hashPassword';
import { UserModel } from '../models/userModel';
import { genOTP } from '../utility/generateOTP';
import { onRequestOTP } from '../utility/notification';
import { generateUserSignedPayload } from '../utility/SignToken';
import { ComfirmPassword } from '../utility/comfirmPassword';
//import { UserLoginInputs } from '../dto/user.dto'; 



export const userSignp = CatchErrorFunc(async (req: Request, res: Response) => {

    const userInputs = plainToClass(CreateUserInputs, req.body);
    const inputErrors = await validate(userInputs, { validationError: { target: true } });
    if (inputErrors.length > 0) {
        throw new HandleError(inputErrors, 400);
    } else {
        const { email, phone, password, address, firstname, lastname } = userInputs;
        const hashedPassword = await hashPassword(password);
        const { otp, expiry } = await genOTP();


        const newUser = await UserModel.create({
            email,
            password: hashedPassword,
            otp,
            otp_expiry: expiry,
            firstname,
            lastname,
            address,
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
                email: newUser.email,
                otp
            })
        } else {
            throw new HandleError("an error occured during the signup process", 400);
        }
    }
});

export const userLogin = CatchErrorFunc(async (req: Request, res: Response) => {
    const loginInputs = plainToClass(UserLoginInputs, req.body);
    const loginErrors = await validate(loginInputs, { validationError: { target: false } });
    if (loginErrors.length > 0) {
        throw new HandleError(loginErrors, 400)
    } else {
        const { email, password } = loginInputs;
        const user = await UserModel.findOne({ email });

        if (user) {
            const isPassword = await ComfirmPassword(password, user.password);
            if (isPassword) {
                const token = await generateUserSignedPayload({
                    _id: user._id,
                    email: user.email,
                    verified: user.verified
                });

                res.status(200).json({
                    success: true,
                    token,
                    verified: user.verified,
                    email: user.email
                });

            } else {
                throw new HandleError("Invalid password", 400)
            }
        } else {
            throw new HandleError("Invalid email address", 404)
        }
    }
});

export const verifyUser = CatchErrorFunc(async (req: Request, res: Response) => {
    const { otp } = req.body;
    const user = req.userCustomer;

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
    const user = req.userCustomer;
    if (user) {
        const profile = await UserModel.findById(user._id);

        if (profile) {
            const { otp, expiry } = await genOTP();

            profile.otp = otp;
            profile.otp_expiry = expiry;

            await profile.save();

            //sned the otp
            // await onRequestOTP(otp, profile.phone);

            res.status(200).json({
                success: true,
                message: "OTP has been sent to your registereed phone number",
                otp,
                num: profile.phone
            });
        }
    }
});

export const getUserProfile = CatchErrorFunc(async (req: Request, res: Response) => {
    const user = req.userCustomer;
    const profileInputs = plainToClass(EditProfileInput, req.body);
    if (user) {
      const profile = await UserModel.findById(user._id);
      if(profile){


      }else{
        throw new HandleError("user not found", 404);
      }
    }else{
        throw new HandleError('wrong credentials', 400);
    }
});

export const updateUserProfile = CatchErrorFunc(async (req: Request, res: Response) => {

});