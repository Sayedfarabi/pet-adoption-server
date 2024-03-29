import { Router } from "express";
import auth from "../../middlewares/auth";
import { AdoptionRequestsControllers } from "./adoptionRequests.controllers";
import validateRequiestHandler from "../../middlewares/validateRequiestHandler";
import { AdoptionRequestsValidations } from "./adoptionRequests.validation";

const router = Router();

router.get("/", auth(), AdoptionRequestsControllers.getAdoptionRequests);

router.put(
  "/:requestId",
  validateRequiestHandler(
    AdoptionRequestsValidations.updateAdoptionValidationSchema
  ),
  auth(),
  AdoptionRequestsControllers.updateAdoptionRequests
);

export const AdoptionRequestsRoutes = router;
