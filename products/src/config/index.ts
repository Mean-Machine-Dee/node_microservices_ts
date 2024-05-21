import { config } from "dotenv";
config({ path: `.env.${process.env.NODE_ENV || "dev"}` });

export const CREDENTIALS = process.env.CREDENTIALS === "true";

export const {
  EXPIRES_IN,
  NODE_ENV,
  PORT,
  DB_HOST,
  DB_PORT,
  DB_DATABASE,
  SECRET_KEY,
  LOG_FORMAT,
  LOG_DIR,
  ORIGIN,
  RABBITMQ_USER,
  RABBITMQ_PASS,
  RABBITMQ_HOST,
  RABBITMQ_NOTIFICATION_QUEUE,
} = process.env;
