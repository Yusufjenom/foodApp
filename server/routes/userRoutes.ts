import express from 'express';
import {
    getUserProfile,
    userSignp,
    userLogin,
    verifyUser,
    requestUserOTP,
    updateUserProfile
} from '../controllers/userController';
import {AuthenticatUser} from '../middlewares/authMiddlware';

const userRouter = express.Router();

/** signup */
userRouter.post('/signup-customer', userSignp);

/** Login  */
userRouter.post('/login-customer', userLogin);


// userRouter.use(AuthenticatUser);
/**verify customer account*/
userRouter.patch('/verify-customer',AuthenticatUser, verifyUser);

/** requeesting OTP*/
userRouter.get('/otp',AuthenticatUser, requestUserOTP);

/**get Profile */
userRouter.get('/customer-profile',AuthenticatUser, getUserProfile);

/**update Profile */
userRouter.patch('/update-customer-profile',AuthenticatUser, updateUserProfile);

/** cart*/


/** order */


/**paymeent */


export { userRouter as userRoute };