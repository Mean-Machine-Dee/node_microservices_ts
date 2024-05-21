import express, { Application } from "express";
import cors, { CorsOptions } from "cors";
import morgan from "morgan";
import errorHandler from "./middleware/errorHandler";
import Routes from "./routes";
import { connectDb } from "./database/db.config";

export default class Server {
  constructor(app: Application) {
    this.config(app);
    new Routes(app);
    this.initializeErrorHandling(app);
  }

  private config(app: Application): void {
    const corsOptions: CorsOptions = {};

    app.use(cors(corsOptions));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(morgan("tiny"));
    console.log("caling tthis middleware");

    connectDb();
  }

  private initializeErrorHandling(app: Application) {
    app.use(errorHandler);
  }
}
