import { NextFunction, Request, Response } from "express";
import productRepository from "../database/repository/product.repository";
import { CustomError } from "../utils/custom_error";

export default class ProductController {
  getProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const products = await productRepository.products();
      return res.status(200).json({ products });
    } catch (err) {
      next();
    }
  };
  createProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const created = await productRepository.save(req.body);
      return res.status(200).json({ product: created });
    } catch (err: any) {
      next(err as CustomError);
    }
  };

  fetchById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const params = req.params;
      console.log("Params " + JSON.stringify(params));
      const item = await productRepository.product(params.id);
      return res.status(200).json({ product: item });
    } catch (err: any) {
      next(new CustomError("Product not found", 404, err.stackTrace));
    }
  };


  addWishlist = async (req:Request, res: Response, next: NextFunction) =>{
    try{
      const params = req.body
    }
  }
}
