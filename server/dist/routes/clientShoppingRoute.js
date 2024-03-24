"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.clientShoppingRoute = void 0;
const express_1 = __importDefault(require("express"));
const clientShoppingController_1 = require("../controllers/clientShoppingController");
const clientShoppingRouter = express_1.default.Router();
exports.clientShoppingRoute = clientShoppingRouter;
/** food available*/
clientShoppingRouter.get('/:pincode', clientShoppingController_1.getAvailableFood);
/**top restaurants */
clientShoppingRouter.get('/top-restaurants/:pincode', clientShoppingController_1.getTopRestaurants);
/** food available by time*/
clientShoppingRouter.get('/food-in-30-min/:pincode', clientShoppingController_1.getFoodIn30Min);
/**search for food */
clientShoppingRouter.get('/search/:pincode', clientShoppingController_1.searchForFood);
/**find a restaurant or vvendor by ID */
clientShoppingRouter.get('/restaurant/:id', clientShoppingController_1.getRestaurantById);
//# sourceMappingURL=clientShoppingRoute.js.map