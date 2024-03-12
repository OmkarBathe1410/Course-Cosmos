import express, { NextFunction, Request, Response } from "express";
import cookieParser from "cookie-parser";
import { ErrorMiddleWare } from "./middleware/error";
import cors from "cors";
require("dotenv").config();
import userRouter from "./routes/user.route";
import courseRouter from "./routes/course.route";
import orderRouter from "./routes/order.route";
import notificationRoute from "./routes/notification.route";
import analyticsRouter from "./routes/analytics.route";
import layoutRouter from "./routes/layout.route";

export const app = express();

// body parser:
// here we have set the limit for our body parser, because it is needed for cloudinary:
app.use(express.json({ limit: "50mb" }));

// cookie parser:
app.use(cookieParser());

// cors => cross origin resource sharing
app.use(
  cors({
    origin: process.env.ORIGIN,
  })
);

// routes:
app.use("/api/v1", userRouter, orderRouter, courseRouter, notificationRoute, analyticsRouter, layoutRouter);

// testing API:
app.get("/test", (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({
    success: true,
    message: "API is working",
  });
});

// unknown route:
app.all("*", (req: Request, res: Response, next: NextFunction) => {
  const err = new Error(`Route ${req.originalUrl} not found!`) as any;
  err.statusCode = 404;
  next(err);
});

app.use(ErrorMiddleWare);
