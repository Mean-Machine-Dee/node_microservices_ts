import { Request,Response } from "express";


export const welcome = (req:Request, res: Response): Response  => {
    return res.json({ message:"Wecome to the shopping mall"})
}