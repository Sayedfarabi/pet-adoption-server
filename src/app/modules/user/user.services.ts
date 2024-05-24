import { UserRole, UserStatus } from "@prisma/client";
import prisma from "../../../shared/prisma";

const getAllUsersFromDB = async () => {
  const result = await prisma.user.findMany({
    where: {
      role: UserRole.USER,
      status: UserStatus.ACTIVATE,
    },
  });
  return result;
};

export const UserServices = {
  getAllUsersFromDB,
};
