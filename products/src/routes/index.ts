import { Application } from "express";
import productsRoute from "./products.route";

export default class Routes {
  constructor(app: Application) {
    app.use("/products", productsRoute);
  }
}
