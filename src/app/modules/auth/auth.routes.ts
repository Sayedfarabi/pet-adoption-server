import { Router } from "express";
import validateRequiestHandler from "../../middlewares/validateRequiestHandler";
import { AuthValidations } from "./auth.validation";
import { AuthControllers } from "./auth.controllers";

const router = Router();

router.post(
  "/login",
  validateRequiestHandler(AuthValidations.loginValidationSchema),
  AuthControllers.userLogin
);

router.post(
  "/change-password",
  validateRequiestHandler(AuthValidations.changePasswordValidationSchema),
  AuthControllers.changePassword
);

export const AuthRoutes = router;
