import express from "express";
import { BlogController } from "./blog.controller";
import { validationMiddleWare } from "../../middleware/validateRequest";
import { BlogValidation } from "./blog.zod.validation";
import authMiddleware from "../../middleware/auth";
import { User_Role } from "../user/user.constant";

const route = express.Router();

route
  .route("/")
  .post(
    authMiddleware(User_Role.user),
    validationMiddleWare(BlogValidation.blogValidationSchema),
    BlogController.createBlog
  )
  .get(
    BlogController.getAllBlog
  )

route.route("/:id")
      .patch(authMiddleware(User_Role.user, User_Role.admin),BlogController.updateBlog)

export const BlogRoute = route;
