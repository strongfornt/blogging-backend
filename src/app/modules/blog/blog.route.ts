import express from "express";
import authMiddleware from "../../middleware/auth";
import { validationMiddleWare } from "../../middleware/validateRequest";
import { User_Role } from "../user/user.constant";
import { BlogController } from "./blog.controller";
import { BlogValidation } from "./blog.zod.validation";

const route = express.Router();

route
  .route("/")
  .post(
    authMiddleware(User_Role.user),
    validationMiddleWare(BlogValidation.blogValidationSchema),
    BlogController.createBlog
  )
  .get(BlogController.getAllBlog);

route
  .route("/:id")
  .patch(
    authMiddleware(User_Role.user),
    validationMiddleWare(BlogValidation.updateBlogValidationSchema),
    BlogController.updateBlog
  )
  .delete(authMiddleware(User_Role.user), BlogController.deleteBlog);

export const BlogRoute = route;
