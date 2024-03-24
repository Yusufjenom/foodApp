"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorHandler = void 0;
const error_1 = require("../utility/error");
const ErrorHandler = (error, req, res, next) => {
    //validation errors
    if (error.message.includes("E11000 duplicate key error ")) {
        return res.status(400).json({
            success: false,
            message: "email already used try a new email"
        });
    }
    //    if(error.message.includes("Cast to ObjectId failed for value")){
    //     return res.status(404).json({
    //         success: false,
    //         message: "user not found"
    //     })
    //    }
    let errors = { email: "", password: "" };
    if (error instanceof error_1.HandleError) {
        //   if(error.message === "user not authorized"){
        //     return res.status(401).json({
        //         success: false,
        //         message: error.message
        //     })
        //   }
    }
    return res.status(400).json({
        success: false,
        error: error.message
    });
};
exports.ErrorHandler = ErrorHandler;
//# sourceMappingURL=ErrorHandler.js.map