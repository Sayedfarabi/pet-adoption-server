import { Router } from "express";
import auth from "../../middlewares/auth";
import { ProfileControllers } from "./profile.controllers";
import validateRequiestHandler from "../../middlewares/validateRequiestHandler";
import { ProfileValidations } from "./profile.validation";
import { UserRole } from "@prisma/client";

const router = Router();

router.get(
  "/",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN, UserRole.USER),
  ProfileControllers.getProfile
);

router.put(
  "/",
  validateRequiestHandler(ProfileValidations.updateProfileValidationSchema),
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN, UserRole.USER),
  ProfileControllers.updateProfile
);

export const ProfileRoutes = router;
