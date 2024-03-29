import { JwtPayload } from "jsonwebtoken";
import prisma from "../../../shared/prisma";
import { User } from "@prisma/client";

const getProfileFromDB = async (user: JwtPayload) => {
  const result = await prisma.user.findUniqueOrThrow({
    where: {
      email: user.email,
    },
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

const updateProfileIntoDB = async (
  user: JwtPayload,
  payload: Partial<User>
) => {
  await prisma.user.findUniqueOrThrow({
    where: {
      email: user.email,
    },
  });

  const result = await prisma.user.update({
    where: {
      email: user.email,
      name: user.name,
    },
    data: payload,
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

export const ProfileServices = {
  getProfileFromDB,
  updateProfileIntoDB,
};
