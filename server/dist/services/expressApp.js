"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = require("../routes");
const ErrorHandler_1 = require("../middlewares/ErrorHandler");
const path_1 = __importDefault(require("path"));
exports.default = (app) => __awaiter(void 0, void 0, void 0, function* () {
    app.use(express_1.default.urlencoded({ extended: true }));
    app.use(express_1.default.static(path_1.default.join(__dirname, 'images')));
    app.use(express_1.default.json());
    app.use(routes_1.userRoute);
    app.use(routes_1.adminRoute);
    app.use(routes_1.vendorRoute);
    app.use(routes_1.clientShoppingRoute);
    app.use(ErrorHandler_1.ErrorHandler);
    return app;
});
//# sourceMappingURL=expressApp.js.map