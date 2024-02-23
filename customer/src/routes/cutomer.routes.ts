import { Router } from "express";
import CustomerController from "../controllers/customers.controller";
import { validate } from "../middlewares/validate";
import { customerSchema,loginSchema } from "../schemas/customer";
import asyncHandler from "express-async-handler";
import { userAuth } from "../middlewares/auth_middleware";


class CustomerRoutes {
    router = Router()
    controller = new CustomerController()

    constructor(){
        this.initializeRoutes()
    }

    initializeRoutes(){
        this.router.post("/signup",validate(customerSchema), this.controller.create)
        this.router.post("/sign-in",validate(loginSchema), this.controller.login)
        this.router.post("/address", userAuth,  this.controller.createAddress)
    }
}

export default new CustomerRoutes().router