import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import cookieParser from "cookie-parser";
//use
import authRouters from "./routes/auth.routes.js";
import userRouters from "./routes/user.routes.js";
import messageRouters from "./routes/message.routes.js";
import ConnectedDatabase from "./db/mongoDB.js";
import errorMiddleware from "./middleware/error.middleware.js";
import { app, server } from "./socketIO/server.js";
import path from "path";
app.use(cookieParser());
app.use(helmet());
dotenv.config();
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
const __dirname = path.resolve();
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting Down server due to uncaught expection`);
  process.exit(1);
});
//use
app.use("/api/auth", authRouters);
app.use("/api/user", userRouters);
app.use("/api/message", messageRouters);
//error middleware
app.use(errorMiddleware);

server.listen(process.env.PORT, () => {
  ConnectedDatabase();
  console.log(`server is running PORT:${process.env.PORT}`);
});
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

process.on("unhandledRejection", (err) => {
  console.log(`Error ${err.message}`);
  console.log(`Shutting Down server due to Unhandled Promise Rejection`);
  server.close(() => {
    process.exit(1);
  });
});
