import { Router } from "express";
import auth from "../../middlewares/auth";
import { AdoptionRequestsControllers } from "./adoptionRequests.controllers";
import validateRequiestHandler from "../../middlewares/validateRequiestHandler";
import { AdoptionRequestsValidations } from "./adoptionRequests.validation";
import { UserRole } from "@prisma/client";

const router = Router();

router.get(
  "/",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  AdoptionRequestsControllers.getAllAdoptionRequests
);

router.get(
  "/user-adoptions",
  auth(UserRole.USER),
  AdoptionRequestsControllers.getUserAdoptionRequests
);

router.put(
  "/:requestId",
  validateRequiestHandler(
    AdoptionRequestsValidations.updateAdoptionValidationSchema
  ),
  auth(UserRole.USER),
  AdoptionRequestsControllers.updateAdoptionRequests
);

export const AdoptionRequestsRoutes = router;
