import { User } from "@prisma/client";
import prisma from "../../../shared/prisma";
import AppError from "../../errors/appError";
import httpStatus from "http-status";
import bcrypt from "bcrypt";
import config from "../../../config";

const createUserFromDB = async (payload: User) => {
  console.log(payload);

  const isExistsUser = await prisma.user.findUnique({
    where: {
      email: payload.email,
    },
  });

  if (isExistsUser) {
    throw new AppError(httpStatus.BAD_REQUEST, "User already existing!");
  }

  const hashedPassword: string = await bcrypt.hash(
    payload.password,
    Number(config.bcrypt_salt_rounds)
  );

  const userData = {
    name: payload.name,
    email: payload.email,
    password: hashedPassword,
  };

  const result = await prisma.user.create({
    data: userData,
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return result;
};

export const RegisterServices = {
  createUserFromDB,
};
