import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../config/custom-error.model';
import { errorConstants } from '../config/constants';


function handleError(
  err: TypeError | CustomError,
  _: Request,
  res: Response,
  next: NextFunction
) {
  let customError = err;

  if (!(err instanceof CustomError)) {
    customError = new CustomError(
      'Oh no, this is embarrasing. We are having troubles my friend',
      500
    );
  }
  const statusCode = (customError as CustomError).status
  
  switch(statusCode){
          case errorConstants.CUSTOMER_ERROR:
            res.json({title:"Validation failed",message:err.message,
            stackTrace: err.message})
            next()
            break
            case errorConstants.VALIDATION_ERROR:
              res.status(statusCode).json({title:"Validation failed",message:err.message,
                 stackTrace: err.message})
                break
            case errorConstants.NOT_FOUND:
              res.status(statusCode).json({title:"Not found",message:err.message, stackTrace: renderStack(err)})
                break
            case errorConstants.UNAUTHORIZED:
              res.status(statusCode).json({title:"UnAuthorized access",message:err.message, stackTrace: renderStack(err)})
                break
            case errorConstants.FORBIDDEN:
              res.status(statusCode).json({title:"Forbidden Access",message:err.message, stackTrace: renderStack(err)})
                break
            case errorConstants.SERVER_ERROR:
              res.status(statusCode).json({title:"Server Error",message:err.message, stackTrace: renderStack(err)})
                break;
            default:
               console.log("No error")
            }


  // res.status((customError as CustomError).status).send(customError);
};


const renderStack = (err: any) =>{
  console.log(err)
    return err.additionalInfo
    // return process.env.ENV === "dev"? 
    // err.stackTrace: null
   }
export default handleError;

// import { Request, Response, NextFunction } from "express"
// import { errorConstants } from "../config/constants"
// export const errorHandler = (err: any, req: Request,res:Response, next: NextFunction): any =>{
//     console.log("called", err, res.status, res.statusCode)
//     const statusCode: number = res.statusCode ? res.statusCode : 500
//     switch(statusCode){
//         case errorConstants.VALIDATION_ERROR:
//             res.json({title:"Validation failed",message:err.message,
//              stackTrace: err.stackTrace})
//             break
//         case errorConstants.NOT_FOUND:
//             res.json({title:"Not found",message:err.message, stackTrace: renderStack(err)})
//             break
//         case errorConstants.UNAUTHORIZED:
//             res.json({title:"UnAuthorized access",message:err.message, stackTrace: renderStack(err)})
//             break
//         case errorConstants.FORBIDDEN:
//             res.json({title:"Forbidden Access",message:err.message, stackTrace: renderStack(err)})
//             break
//         case errorConstants.SERVER_ERROR:
//             res.json({title:"Server Error",message:err.message, stackTrace: renderStack(err)})
//             break;
//         default:
//            console.log("No error")
//         }
// }

