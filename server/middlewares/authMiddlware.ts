import { NextFunction ,Request, Response,} from "express";
import { AuthPayload } from "../dto/auth.dto";
import { validateToken } from "../utility/SignToken";
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
    res.status(401).json({
        success: false,
        message:"user unauthorised"
    })
  }
};