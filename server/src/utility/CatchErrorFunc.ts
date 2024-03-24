import { Request, Response, NextFunction } from 'express';


export const CatchErrorFunc = (controller: any) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        await controller(req, res)
    }
    catch (err) {
        next(err)
    }
};
