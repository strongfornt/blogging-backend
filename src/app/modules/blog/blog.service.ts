import { StatusCodes } from "http-status-codes";
import mongoose from "mongoose";
import QueryBuilder from "../../builder/Query.builder";
import CustomError from "../../errors/Custom.error";
import { BlogSearchAbleFields } from "./blog.constant";
import { IBlogUpdate, ICreateBlog, IDeleteBlog, TBlog } from "./blog.interface";
import { BlogModel } from "./blog.model";

const createBlogIntoDB = async (payload: ICreateBlog) => {
  const session = await mongoose.startSession();
const {body, user} = payload;
const blog = {
  ...body,
  author: user?.userId,
}
  try {
    session.startTransaction();

    if(user?.role === 'admin') {
      throw new CustomError(StatusCodes.FORBIDDEN, "Only user can create blog!");
    }
    const resBlog = await BlogModel.create(blog);

    
    const response = await BlogModel.findById(resBlog?._id)
      .select({ title: 1, content: 1, author: 1 })
      .populate("author");

    await session.commitTransaction();
    await session.endSession();

    return response;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new CustomError(StatusCodes.BAD_REQUEST, "Failed to create blog");
  }
};

const updateBlogIntoDB = async (payload: IBlogUpdate) => {
  const { body, blogId, user } = payload;

  // console.log(user);

  const isBlogExist = await BlogModel.findById(blogId);

  if (!isBlogExist) {
    throw new CustomError(StatusCodes.NOT_FOUND, "Blog not found!");
  }

  const authorId = isBlogExist?.author.toString();

  if (user?.role === "admin") {
    throw new CustomError(StatusCodes.FORBIDDEN, "You cannot update any blog!");
  }

  if (user?.userId !== authorId) {
    throw new CustomError(
      StatusCodes.FORBIDDEN,
      "You are not authorized to update this blog!"
    );
  }

  const blog = await BlogModel.findByIdAndUpdate(
    blogId,
    { $set: { ...body } },
    { new: true, runValidators: true }
  )
    .select("-isPublished -createdAt -updatedAt")
    .populate("author");

  // console.log(blog);

  return blog;
};

const deleteBlogFromDB = async (payload: IDeleteBlog) => {
  const { blogId, user } = payload;

  const isBlogExist = await BlogModel.findById(blogId);

  if (!isBlogExist) {
    throw new CustomError(StatusCodes.NOT_FOUND, "Blog not found!");
  }

  const authorId = isBlogExist?.author.toString();

  if(user?.role === 'admin') {
    throw new CustomError(StatusCodes.FORBIDDEN, "You cannot delete any blog!");
  }

  if (user?.userId !== authorId) {
    throw new CustomError(
      StatusCodes.FORBIDDEN,
      "You are not authorized to delete this blog!"
    );
  }

  const response = await BlogModel.findByIdAndDelete(blogId);

  return response;
};

const getAllBlogsFromDB = async (query: Record<string, unknown>) => {
  const response = new QueryBuilder(BlogModel.find(), query)
    .search(BlogSearchAbleFields)
    .filter()
    .sort()
    .sortOrder()
    .excludeFields('-createdAt -updatedAt');
  const result = await response.modelQuery;
  return result;
};

export const BlogServices = {
  createBlogIntoDB,
  getAllBlogsFromDB,
  updateBlogIntoDB,
  deleteBlogFromDB,
};
