import { Router } from "express";
import ProductController from "../contoller/product.controller";

class ProductRoutes {
  router = Router();
  controller = new ProductController();
  constructor() {
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get("/", this.controller.getProducts);
    this.router.post("/", this.controller.createProduct);
    this.router.get("/:id", this.controller.fetchById);
  }
}

export default new ProductRoutes().router;
