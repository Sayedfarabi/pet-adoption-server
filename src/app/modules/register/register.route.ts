import { Router } from "express";
import validateRequiestHandler from "../../middlewares/validateRequiestHandler";
import { RegisterValidations } from "./register.validation";
import { RegisterControllers } from "./register.controllers";
import { RegisterServices } from "./register.services";

const router = Router();

router.post(
  "/",
  validateRequiestHandler(RegisterValidations.registerValidationSchema),
  RegisterControllers.createUser,
  RegisterServices.createUserFromDB
);

export const RegisterRoutes = router;
