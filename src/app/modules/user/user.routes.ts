import { Router } from "express";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";
import { UserControllers } from "./user.controllers";

const router = Router();

router.get(
  "/",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  UserControllers.getUsers
);
router.get("/me", auth(UserRole.USER, UserRole.ADMIN, UserRole.SUPER_ADMIN));

export const UserRouter = router;
