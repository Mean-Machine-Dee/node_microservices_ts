import { Request, Response, NextFunction } from "express";
import { IAddress, ICustomer, LoginResponse } from "../interfaces/customer";
import customerRepository from "../datatabase/repository/customer.repository";
import { CustomError } from "../config/custom-error.model";

import authHandler from "../utils/auth";


export default class CustomerController{

    async login(req:Request, res:Response, next: NextFunction){
        try{
            const {email, password}  = req.body
       
            const customer = await customerRepository.findCustomer(email);
            if(customer){
                const validPassword = await authHandler.validatePassword(password, customer.password,customer.salt)
                if(validPassword){
                    const token = await authHandler.generateToken({email: customer.email, _id: customer._id})
                    const response : LoginResponse = {
                        user: customer._id,
                        email: customer.email,
                        token
                    }
                   res.status(200).json(response)
                }
            }
        }catch(err: any){
            next( new CustomError(err.message, 500, err.stackTrace))
        }
    }

    async create(req: Request, res: Response, next: NextFunction){
        try{
            const customer: ICustomer = req.body
            const savedCustomer = await customerRepository.save(customer)
            res.status(200).json(savedCustomer)
        }catch(err :any){
            next(new CustomError(err.message,500, err.stackTrace))
        }
    }

    async createAddress(req: Request, res: Response, next: NextFunction){
       
        try{

            const address: IAddress = req.body
            const savedAddress = await customerRepository.addAddress("65a37ca7fe8f1036394ee850",address);
            res.status(200).json(savedAddress)
        }catch(err :any){
            next(new CustomError(err.message,500, err.stackTrace))
        }
    }


     addWishlist = async (data:any) => {
        await customerRepository.handleWishList(data)
    }

     handleIncomingRabbitMessage  = (message: any) =>{
        const parsedMessage = JSON.parse(message.content);
        console.log(parsedMessage)
        const action = parsedMessage["action"]
        const data = parsedMessage["data"]
        switch(action){
            case "ADD_WITHLIST":
            case "REMOVE_FROM_WISHLIST":
                this.addWishlist(data)
                break;

        }
        
    
     }
     
}