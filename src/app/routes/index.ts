import { Router } from "express";
import { UserRoutes } from "../modules/user/user.routes";

const routes = Router();

const moduleRoutes = [
  {
    path: "/",
    route: UserRoutes,
  },
];

moduleRoutes.forEach((route) => routes.use(route.path, route.route));

export default routes;
