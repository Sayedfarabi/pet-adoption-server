import { Router } from "express";
import { PetValidations } from "./pet.validation";
import validateRequiestHandler from "../../middlewares/validateRequiestHandler";
import { PetControllers } from "./pet.controllers";
import auth from "../../middlewares/auth";

const router = Router();

router.post(
  "/",
  validateRequiestHandler(PetValidations.createPetValidationSchema),
  auth(),
  PetControllers.addPet
);

router.get("/", PetControllers.getPets);

export const PetRoutes = router;
