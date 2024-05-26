/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";
import { Secret } from "jsonwebtoken";
import httpStatus from "http-status";
import AppError from "../errors/appError";
import { jwtHelpers } from "../../helpers/jwtHelpers";
import config from "../../config";
import { UserRole, UserStatus } from "@prisma/client";
import prisma from "../../shared/prisma";

const auth = (...requiredRoles: UserRole[]) => {
  return async (
    req: Request & { user?: any },
    res: Response,
    next: NextFunction
  ) => {
    try {
      const token = req.headers.authorization;

      // console.log(requiredRoles);

      if (!token) {
        throw new AppError(httpStatus.UNAUTHORIZED, "Unauthorized Access");
      }

      const verifiedUser = jwtHelpers.verifyToken(
        token,
        config.jwt_access_secret as Secret
      );

      const { role, email } = verifiedUser;

      // console.log(role);

      const userData = await prisma.user.findUnique({
        where: {
          email: email,
          status: UserStatus.ACTIVATE,
        },
      });

      if (!userData) {
        throw new AppError(httpStatus.NOT_FOUND, "User does not exists!");
      }

      if (requiredRoles && !requiredRoles.includes(role)) {
        throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized!");
      }

      req.user = verifiedUser;

      // console.log(verifiedUser);

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
