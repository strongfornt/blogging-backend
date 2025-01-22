import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catch-async";
import sendResponse from "../../utils/sendResponse";
import { IDeleteBlog } from "./blog.interface";
import { BlogServices } from "./blog.service";

const createBlog = catchAsync(async (req, res, next) => {
  const { body } = req.body;
  const user = req?.user;
  const payload = {
    ...body,
    author:user?.userId,
  };

  const result = await BlogServices.createBlogIntoDB(payload);
  sendResponse(res, {
    success: true,
    message: "Blog created successfully",
    statusCode: 201,
    data: result,
  });
});

const updateBlog = catchAsync(async (req, res, next) => {
  const { body, params } = req;
  const user = req?.user;
  const blogId = params.id;
  const payload = {
    ...body,
    blogId,
    user,
  };
  // console.log(payload);

  const result = await BlogServices.updateBlogIntoDB(payload);
  sendResponse(res, {
    success: true,
    message: "Blog updated successfully",
    statusCode: 200,
    data: result,
  });
});

const deleteBlog = catchAsync(async (req, res, next) => {
  const { params } = req;
  const user = req?.user;
  const blogId = params.id;

  const payload = {
    blogId,
    user,
  };

  console.log("from 58", user);

  await BlogServices.deleteBlogFromDB(payload as IDeleteBlog);

  sendResponse(res, {
    success: true,
    message: "Blog deleted successfully",
    statusCode: 200,
    // data: result,
  });
});

const getAllBlog = catchAsync(async (req, res, next) => {
  const result = await BlogServices.getAllBlogsFromDB(req?.query);
  sendResponse(res, {
    success: true,
    message: "Blogs fetched successfully",
    statusCode: StatusCodes.OK,
    data: result,
  });
});

export const BlogController = {
  createBlog,
  getAllBlog,
  updateBlog,
  deleteBlog,
};
