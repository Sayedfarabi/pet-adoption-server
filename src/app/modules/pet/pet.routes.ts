import { Router } from "express";
import { PetValidations } from "./pet.validation";
import validateRequiestHandler from "../../middlewares/validateRequiestHandler";
import { PetControllers } from "./pet.controllers";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";

const router = Router();

router.post(
  "/",
  validateRequiestHandler(PetValidations.createPetValidationSchema),
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  PetControllers.addPet
);

router.get("/", PetControllers.getPets);

router.get(
  "/:petId",
  auth(UserRole.USER, UserRole.SUPER_ADMIN, UserRole.ADMIN),
  PetControllers.getPet
);

router.put(
  "/:petId",
  validateRequiestHandler(PetValidations.updatePetValidationSchema),
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  PetControllers.updatePet
);

router.delete(
  "/:petId",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  PetControllers.deletePet
);

export const PetRoutes = router;
