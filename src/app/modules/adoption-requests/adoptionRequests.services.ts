import { JwtPayload } from "jsonwebtoken";
import prisma from "../../../shared/prisma";
import { Adoption, UserStatus } from "@prisma/client";

const getAllAdoptionRequestsFromDB = async (user: JwtPayload) => {
  await prisma.user.findUniqueOrThrow({
    where: {
      email: user.email,
    },
  });

  const result = await prisma.adoption.findMany();
  return result;
};

const getUserAdoptionRequestsFromDB = async (user: JwtPayload) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: user.email,
      status: UserStatus.ACTIVATE,
    },
  });

  const result = await prisma.adoption.findMany({
    where: {
      userId: userData.id,
    },
  });
  return result;
};

const updateAdoptionRequestsFromDB = async (
  user: JwtPayload,
  requestId: string,
  payload: Partial<Adoption>
) => {
  await prisma.user.findUniqueOrThrow({
    where: {
      email: user.email,
    },
  });

  const result = await prisma.adoption.update({
    where: {
      id: requestId,
    },
    data: payload,
  });
  return result;
};

export const AdoptionRequestsServices = {
  getAllAdoptionRequestsFromDB,
  updateAdoptionRequestsFromDB,
  getUserAdoptionRequestsFromDB,
};
