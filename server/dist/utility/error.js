"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HandleError = void 0;
class HandleError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.statusCode = statusCode;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.HandleError = HandleError;
;
//# sourceMappingURL=error.js.map