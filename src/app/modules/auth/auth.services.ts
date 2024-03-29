import config from "../../../config";
import { jwtHelpers } from "../../../helpers/jwtHelpers";
import prisma from "../../../shared/prisma";
import bcrypt from "bcrypt";

const userLoginIntoDB = async (payload: {
  email: string;
  password: string;
}) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: payload.email,
    },
  });

  const isCorrectPassword: boolean = await bcrypt.compare(
    payload.password,
    userData.password
  );

  if (!isCorrectPassword) {
    throw new Error("Password incorrect!");
  }

  const accessToken = jwtHelpers.generateToken(
    {
      email: userData.email,
      name: userData.name,
    },
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string
  );

  return {
    id: userData.id,
    name: userData.name,
    email: userData.email,
    accessToken,
  };
};

export const AuthServices = {
  userLoginIntoDB,
};
