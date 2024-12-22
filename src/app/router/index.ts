import { Router } from "express";
import { UserRoute } from "../modules/user/user.route";

const router = Router();

const modulesRoutes = [
  {
    path: "/auth",
    route: UserRoute
  },
];

modulesRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
