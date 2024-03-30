/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { TErrorDetails } from "../interfaces/error";
import { ZodError } from "zod";
import handleZodError from "../errors/handleZodError";
import AppError from "../errors/appError";

const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode: number = httpStatus.INTERNAL_SERVER_ERROR;
  let message: string = "Something went wrong!";

  let errorDetails: TErrorDetails = [
    {
      field: "",
      message: "Something went wrong!",
    },
  ];

  if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err);
    // console.log(simplifiedError)
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorDetails = simplifiedError?.errorDetails;
  } else if (err instanceof AppError) {
    statusCode = err?.statusCode;
    message = err?.message;
    errorDetails = [
      {
        field: "",
        message: err.message,
      },
    ];
  }

  res.status(statusCode).json({
    success: false,
    message: message,
    errorDetails,
  });
};

export default globalErrorHandler;
