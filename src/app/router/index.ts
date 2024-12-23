import { Router } from "express";
import { UserRoute } from "../modules/user/user.route";
import { AuthRoutes } from "../modules/auth/auth.route";
import { BlogRoute } from "../modules/blog/blog.route";

const router = Router();

const modulesRoutes = [
  {
    path: "/auth/register",
    route: UserRoute
  },
  {
    path:'/auth',
    route: AuthRoutes
  },
  {
    path:'/blogs',
    route: BlogRoute
  },
];

modulesRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
