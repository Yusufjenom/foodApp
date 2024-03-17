import express, { Request, Response, NextFunction } from 'express';
import {
    getAvailableFood,
    getRestaurantById,
    getFoodIn30Min,
    getTopRestaurants,
    searchForFood
} from '../controllers/clientShoppingController'

const clientShoppingRouter = express.Router();

/** food available*/
clientShoppingRouter.get('/:pincode', getAvailableFood);

/**top restaurants */
clientShoppingRouter.get('/top-restaurants/:pincode', getTopRestaurants);

/** food available by time*/
clientShoppingRouter.get('/food-in-30-min/:pincode', getFoodIn30Min);

/**search for food */
clientShoppingRouter.get('/search/:pincode', searchForFood);

/**find a restaurant or vvendor by ID */
clientShoppingRouter.get('/restaurant/:id', getRestaurantById);



export {clientShoppingRouter as clientShoppingRoute};