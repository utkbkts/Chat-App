import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import cookieParser from "cookie-parser";
//use
import authRouters from "./routes/auth.routes.js";
import ConnectedDatabase from "./db/mongoDB.js";
import errorMiddleware from "./middleware/error.middleware.js";
const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(helmet());
dotenv.config();
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting Down server due to uncaught expection`);
  process.exit(1);
});
//use
app.use("/api/auth", authRouters);
//error middleware
app.use(errorMiddleware);
const server = app.listen(process.env.PORT, () => {
  ConnectedDatabase();
  console.log(`server is running PORT:${process.env.PORT}`);
});

process.on("unhandledRejection", (err) => {
  console.log(`Error ${err.message}`);
  console.log(`Shutting Down server due to Unhandled Promise Rejection`);
  server.close(() => {
    process.exit(1);
  });
});
