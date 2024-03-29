import { Router } from "express";
import auth from "../../middlewares/auth";
import { ProfileControllers } from "./profile.controllers";
import validateRequiestHandler from "../../middlewares/validateRequiestHandler";
import { ProfileValidations } from "./profile.validation";

const router = Router();

router.get("/", auth(), ProfileControllers.getProfile);

router.put(
  "/",
  validateRequiestHandler(ProfileValidations.updateProfileValidationSchema),
  auth(),
  ProfileControllers.updateProfile
);

export const ProfileRoutes = router;
