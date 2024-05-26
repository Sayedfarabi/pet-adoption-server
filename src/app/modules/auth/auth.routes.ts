import { Router } from "express";
import validateRequiestHandler from "../../middlewares/validateRequiestHandler";
import { AuthValidations } from "./auth.validation";
import { AuthControllers } from "./auth.controllers";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";

const router = Router();

router.post(
  "/login",
  validateRequiestHandler(AuthValidations.loginValidationSchema),
  AuthControllers.userLogin
);

router.post(
  "/change-password",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN, UserRole.USER),
  validateRequiestHandler(AuthValidations.changePasswordValidationSchema),
  AuthControllers.changePassword
);

export const AuthRoutes = router;
