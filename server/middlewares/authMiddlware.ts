import { NextFunction ,Request, Response,} from "express";
import { AuthPayload } from "../dto/auth.dto";
import { validateToken, validateUserToken } from "../utility/SignToken";
import { HandleError } from "../utility/error";


declare global{
    namespace Express{
        interface Request{
            user?: AuthPayload
        }
    }
};

export const Authenticate = async (req: Request, res:Response, next:NextFunction) => {
  const validate = await validateToken(req);
  //console.log(validate);
  if(validate){
     next();
  }else{
    //throw new HandleError("user not authorized");
        throw new HandleError("vendor or admin unauthorized", 401);
  }
};

export const AuthenticatUser = async (req: Request, res:Response, next:NextFunction) => {
  const validate = await validateUserToken(req);
  if(validate){
    next();
  }else{
    throw new HandleError("unauthorized user", 401)
  }
}