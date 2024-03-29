import { JwtPayload } from "jsonwebtoken";
import prisma from "../../../shared/prisma";
import { Adoption } from "@prisma/client";

const getAdoptionRequestsFromDB = async (user: JwtPayload) => {
  await prisma.user.findUniqueOrThrow({
    where: {
      email: user.email,
    },
  });

  const result = await prisma.adoption.findMany();
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
  getAdoptionRequestsFromDB,
  updateAdoptionRequestsFromDB,
};
