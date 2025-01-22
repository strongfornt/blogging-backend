import express from "express";
import authMiddleware from "../../middleware/auth";
import { User_Role } from "../user/user.constant";
import { validationMiddleWare } from "../../middleware/validateRequest";
import { AdminZodValidationSchema } from "./admin.zod.validation";
import { AdminController } from "./admin.controller";

const routes = express.Router();

routes.patch(
  "/users/:userId/block",
  authMiddleware(User_Role.admin),
  validationMiddleWare(AdminZodValidationSchema.updateUserStatusZodValidation),
  AdminController.blockUser
);

export const AdminRoute = routes;
