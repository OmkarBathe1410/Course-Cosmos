import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../utils/ErrorHandler";

export const ErrorMiddleWare = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  // Invalid MongoDB ID Error:
  if (err.name === "CastError") {
    const message = `Resource not found. Invalid: ${err.path}`;
    err = new ErrorHandler(message, 400);
  }

  // Duplicate Mongoose Key Error:
  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
    err = new ErrorHandler(message, 400);
  }

  // Invalid JWT Error:
  if (err.name === "JsonWebTokenError") {
    const message = "JSON Web Token is Invalid, Try again!";
    err = new ErrorHandler(message, 400);
  }

  // JWT Token Expired Error:
  if (err.name == "TokenExpiredError") {
    const message = "JSON Web Token Expired, Try again!";
    err = new ErrorHandler(message, 400);
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};
