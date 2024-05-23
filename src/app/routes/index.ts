import { Router } from "express";
import { RegisterRoutes } from "../modules/register/register.route";
import { AuthRoutes } from "../modules/auth/auth.routes";
import { PetRoutes } from "../modules/pet/pet.routes";
import { AdoptionRequestRoutes } from "../modules/adoption-request/adoptionRequest.routes";
import { AdoptionRequestsRoutes } from "../modules/adoption-requests/adoptionRequests.routes";
import { ProfileRoutes } from "../modules/profile/profile.routes";

const routes = Router();

const moduleRoutes = [
  {
    path: "/profile",
    route: ProfileRoutes,
  },
  {
    path: "/register",
    route: RegisterRoutes,
  },
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/pets",
    route: PetRoutes,
  },
  {
    path: "/adoption-request",
    route: AdoptionRequestRoutes,
  },
  {
    path: "/adoption-requests",
    route: AdoptionRequestsRoutes,
  },
];

moduleRoutes.forEach((route) => routes.use(route.path, route.route));

export default routes;
