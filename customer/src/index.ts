import express, { Application } from "express";
import cors, { CorsOptions } from "cors";
import Routes from "./routes";
import { NODE_ENV, PORT } from "./config";
import { connectDb } from "./datatabase";
import errorHandler from "./middlewares/errorMiddleware";
import mqpConnection from "./utils/rabbit";
import { config } from "dotenv";
config({ path: `.env.${process.env.NODE_ENV || "dev"}` });

export default class Server {
  public app: Application;
  public env: string;
  public port: string | number;
  constructor() {
    this.app = express();
    this.config();
    new Routes(this.app);
    this.connectToDatabase();
    this.env = NODE_ENV || "development";
    this.port = PORT || 8001;
    this.initializeErrorHandling();
    this.initializeRabbitMq();
  }

  async initializeRabbitMq() {
    await mqpConnection.connect();
  }

  private config(): void {
    const corsOptions: CorsOptions = {};

    this.app.use(cors(corsOptions));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    console.log("caling tthis middleware");
  }

  private initializeErrorHandling() {
    this.app.use(errorHandler);
  }

  private async connectToDatabase() {
    await connectDb();
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`======= ENV: ${this.env} =======`);
      console.log(`🚀 App listening on the port ${this.port}`);
    });
  }
}
