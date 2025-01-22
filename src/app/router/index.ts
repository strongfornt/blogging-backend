import { Router } from "express";
import { UserRoute } from "../modules/user/user.route";
import { AuthRoutes } from "../modules/auth/auth.route";
import { BlogRoute } from "../modules/blog/blog.route";
import { AdminRoute } from "../modules/admin/admin.route";

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
  {
    path:'/admin',
    route: AdminRoute
  },
];

modulesRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
