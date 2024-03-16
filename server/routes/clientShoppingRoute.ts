import express, {Request, Response, NextFunction} from 'express';

const clientShoppingRouter = express.Router();

/** food available*/
clientShoppingRouter.get('/:pincode');

/**top restaurants */
clientShoppingRouter.get('/top-restaurants/:pincode');

/** food available by time*/
clientShoppingRouter.get('/food-in-30-min/:pincode');

/**search for food */
clientShoppingRouter.get('/search/:pincode');

/**find a restaurant or vvendor by ID */
clientShoppingRouter.get('/restaurant/:id');



export default clientShoppingRouter;