/* eslint-disable @typescript-eslint/no-explicit-any */
import { Pet, Prisma, UserStatus } from "@prisma/client";
import { JwtPayload } from "jsonwebtoken";
import prisma from "../../../shared/prisma";
import { TPetsFilterRequest } from "./pet.interfaces";
import { TPaginationOptions } from "../../interfaces/paginations";
import { paginationHelper } from "../../../helpers/paginations";
import { petsSearchAbleFields } from "./pet.constants";

const addPetIntoDB = async (payload: Pet, user: JwtPayload) => {
  await prisma.user.findUniqueOrThrow({
    where: {
      email: user?.email,
    },
  });

  const result = prisma.pet.create({
    data: payload,
  });

  return result;
};

const getPetsFromDB = async (
  params: TPetsFilterRequest,
  options: TPaginationOptions
) => {
  const { page, limit, skip } = paginationHelper.calculatePagination(options);

  const { searchTerm, ...filterData } = params;

  const andCondions: Prisma.PetWhereInput[] = [];

  if (searchTerm) {
    andCondions.push({
      OR: petsSearchAbleFields.map((field) => ({
        [field]: {
          contains: searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }

  if (filterData.age) {
    filterData.age = Number(filterData.age);
  }

  if (Object.keys(filterData).length > 0) {
    andCondions.push({
      AND: Object.keys(filterData).map((key) => ({
        [key]: {
          equals: (filterData as any)[key],
        },
      })),
    });
  }

  const whereConditons: Prisma.PetWhereInput = { AND: andCondions };

  const result = await prisma.pet.findMany({
    where: whereConditons,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? {
            [options.sortBy]: options.sortOrder,
          }
        : {
            createdAt: "desc",
          },
  });

  const total = await prisma.pet.count({
    where: whereConditons,
  });

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getPetFromDB = async (user: JwtPayload, id: string) => {
  await prisma.user.findUniqueOrThrow({
    where: {
      email: user.email,
      status: UserStatus.ACTIVATE,
    },
  });

  const result = prisma.pet.findUnique({
    where: {
      id: id,
    },
  });

  return result;
};

const updatePetIntoDB = async (
  id: string,
  payload: Partial<Pet>,
  user: JwtPayload
) => {
  await prisma.user.findUniqueOrThrow({
    where: {
      email: user.email,
    },
  });

  const result = await prisma.pet.update({
    where: {
      id: id,
    },
    data: payload,
  });

  return result;
};

const deletePetFromDB = async (id: string, user: JwtPayload) => {
  await prisma.user.findUniqueOrThrow({
    where: {
      email: user.email,
    },
  });

  const result = await prisma.pet.update({
    where: {
      id: id,
    },
    data: {
      isDeleted: true,
    },
  });

  return result;
};

export const PetServices = {
  addPetIntoDB,
  getPetsFromDB,
  getPetFromDB,
  updatePetIntoDB,
  deletePetFromDB,
};
