import { UserRole, UserStatus } from "@prisma/client";
import prisma from "../../../shared/prisma";

const getAllUsersFromDB = async () => {
  const result = await prisma.user.findMany({
    where: {
      role: UserRole.USER,
      status: UserStatus.ACTIVATE,
    },
    select: {
      name: true,
      email: true,
      role: true,
      status: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  return result;
};

export const UserServices = {
  getAllUsersFromDB,
};
