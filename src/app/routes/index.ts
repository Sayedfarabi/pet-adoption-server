import { Router } from "express";
import { UserRoutes } from "../modules/user/user.routes";
import { RegisterRoutes } from "../modules/register/register.route";
import { AuthRoutes } from "../modules/auth/auth.routes";

const routes = Router();

const moduleRoutes = [
  {
    path: "/profile",
    route: UserRoutes,
  },
  {
    path: "/register",
    route: RegisterRoutes,
  },
  {
    path: "/login",
    route: AuthRoutes,
  },
];

moduleRoutes.forEach((route) => routes.use(route.path, route.route));

export default routes;
