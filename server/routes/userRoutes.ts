import express from 'express';
import {
    getUserProfile,
    userSignp,
    userLogin,
    verifyUser,
    requestUserOTP,
    updateUserProfile
} from '../controllers/userController';

const userRouter = express.Router();

/** signup */
userRouter.post('/signup-customer', userSignp);

/** Login  */
userRouter.post('/login-customer', userLogin);

/**verify customer account*/
userRouter.patch('/verify-customer', verifyUser);

/** requeesting OTP*/
userRouter.get('/otp', requestUserOTP);

/**get Profile */
userRouter.get('/customer-profile', getUserProfile);

/**update Profile */
userRouter.patch('/update-customer-profile', updateUserProfile);

/** cart*/


/** order */


/**paymeent */


export { userRouter as userRoute };