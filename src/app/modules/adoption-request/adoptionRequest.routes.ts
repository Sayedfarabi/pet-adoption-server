import { Router } from "express";
import validateRequiestHandler from "../../middlewares/validateRequiestHandler";
import { AdoptionRequiestValidations } from "./adoptionRequest.validation";
import auth from "../../middlewares/auth";
import { AdoptionRequestControllers } from "./adoptionRequest.controllers";

const router = Router();

router.post(
  "/",
  validateRequiestHandler(
    AdoptionRequiestValidations.createAdoptionValidationSchema
  ),
  auth(),
  AdoptionRequestControllers.createAdoption
);

export const AdoptionRequestRoutes = router;
