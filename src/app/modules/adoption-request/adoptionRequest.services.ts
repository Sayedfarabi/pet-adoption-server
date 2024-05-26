import { Adoption } from "@prisma/client";
import { JwtPayload } from "jsonwebtoken";
import prisma from "../../../shared/prisma";

const createAdoptionRequestIntoDB = async (
  payload: Adoption,
  user: JwtPayload
) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: user.email,
    },
  });

  const { petId } = payload;

  await prisma.pet.findUniqueOrThrow({
    where: {
      id: petId,
      isDeleted: false,
    },
  });

  const adoptionData = {
    ...payload,
    userId: userData.id,
  };

  const result = await prisma.adoption.create({
    data: adoptionData,
  });

  return result;
};

export const AdoptionRequestServices = {
  createAdoptionRequestIntoDB,
};
