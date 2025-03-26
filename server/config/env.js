import { configDotenv } from "dotenv";

configDotenv({
  path: "./.env",
});

export const {
  MONGODB_URI,
  PORT,
  ORIGIN,
  NODE_ENV,
  ACCESS_TOKEN_SECRET,
  ACCESS_TOKEN_EXPIRES_IN,
  REFRESH_TOKEN_SECRET,
  REFRESH_TOKEN_EXPIRES_IN,
} = process.env;
