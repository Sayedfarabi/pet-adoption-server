import { Router } from "express";
import validateRequiestHandler from "../../middlewares/validateRequiestHandler";
import { AuthValidations } from "./auth.validation";
import { AuthControllers } from "./auth.controllers";

const router = Router();

router.post(
  "/",
  validateRequiestHandler(AuthValidations.loginValidationSchema),
  AuthControllers.userLogin
);

export const AuthRoutes = router;
