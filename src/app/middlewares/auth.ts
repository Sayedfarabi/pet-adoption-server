/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";
import { Secret } from "jsonwebtoken";
import httpStatus from "http-status";
import AppError from "../errors/appError";
import { jwtHelpers } from "../../helpers/jwtHelpers";
import config from "../../config";

const auth = () => {
  return async (
    req: Request & { user?: any },
    res: Response,
    next: NextFunction
  ) => {
    try {
      const token = req.headers.authorization;

      if (!token) {
        throw new AppError(httpStatus.UNAUTHORIZED, "Unauthorized Access");
      }

      const verifiedUser = jwtHelpers.verifyToken(
        token,
        config.jwt_access_secret as Secret
      );

      req.user = verifiedUser;

      console.log(verifiedUser);

      if (!verifiedUser.email) {
        throw new AppError(httpStatus.FORBIDDEN, "Forbidden Token!");
      }
      next();
    } catch (err) {
      next(err);
    }
  };
};

export default auth;
