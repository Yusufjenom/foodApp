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
exports.connectToDb = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const index_1 = require("../config/index");
function connectToDb() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (typeof index_1.MONGO_URL === "undefined") {
                throw new Error("invalid connection string");
            }
            else {
                yield mongoose_1.default.connect(index_1.MONGO_URL);
                console.log("db connected...");
            }
        }
        catch (err) {
            console.log(err.message);
        }
    });
}
exports.connectToDb = connectToDb;
//# sourceMappingURL=db.js.map