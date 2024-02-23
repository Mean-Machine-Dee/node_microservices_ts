
import authHandler from "../utils/auth";
import { Request,Response,NextFunction } from "express";
export const userAuth = async (req: Request, res: Response, next: NextFunction) =>{
    const isAuthorized = await authHandler.validateToken(req)
    if(isAuthorized){
        
        return next()
    }

   res.status(401).json({message:"UnAuthorised"})

}