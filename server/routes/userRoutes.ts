import express from 'express';
import {
    getUserProfile,
    userSignp,
    userLogin,
    verifyUser,
    requestUserOTP
} from '../controllers/userController';

const userRouter = express.Router();

/** signup */
userRouter.post('/signup-customer');

/** Login  */
userRouter.post('/login-customer');

/**verify customer account*/
userRouter.patch('/verify-customer');

/** requeesting OTP*/
userRouter.get('/otp');

/**get Profile */
userRouter.get('/customer-profile');

/**update Profile */
userRouter.patch('/update-customer-profile');

/** cart*/


/** order */


/**paymeent */


export { userRouter as userRoute };