import { z } from "zod";

export const customerSchema  =  z.object({
    body: z.object({
        email:z.string({required_error:"Email is required"}).email("Not a valid email"),
        password: z.string({required_error:"Enter password"}).min(5),
        confirm: z.string({required_error:"Enter password"}).min(5),
        phone:z.string({required_error:"Enter phone"}).min(10),
    }).refine((data) => data.password === data.confirm, {
        message:"Password mismatch"
    })
})

export const loginSchema = z.object({
    body: z.object({
        email:z.string({required_error:"Email is required"}).email("Not a valid email"),
        password: z.string({required_error:"Enter password"}).min(5),
    })
})