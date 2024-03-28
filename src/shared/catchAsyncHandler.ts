import { NextFunction, Request, RequestHandler, Response } from "express";

const catchAsyncHandler = (fn: RequestHandler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch((err) => next(err));
  };
};

export default catchAsyncHandler;
