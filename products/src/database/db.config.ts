import { DB_HOST, DB_DATABASE, DB_PORT } from "../config";
import mongoose, { ConnectOptions } from "mongoose";

export const connectDb = async () => {
  const options = {};
  const mongod = await mongoose.connect(
    `mongodb://${DB_HOST}:${DB_PORT}/${DB_DATABASE}`,
    options as ConnectOptions
  );
  console.log("MongoDb Connected", mongod.connection.name);
};
