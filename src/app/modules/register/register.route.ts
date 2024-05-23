import { Router } from "express";
import validateRequiestHandler from "../../middlewares/validateRequiestHandler";
import { RegisterValidations } from "./register.validation";
import { RegisterControllers } from "./register.controllers";

const router = Router();

router.post(
  "/create-user",
  validateRequiestHandler(RegisterValidations.registerValidationSchema),
  RegisterControllers.createUser
);

router.post(
  "/create-admin",
  validateRequiestHandler(RegisterValidations.registerValidationSchema),
  RegisterControllers.createAdmin
);

export const RegisterRoutes = router;
