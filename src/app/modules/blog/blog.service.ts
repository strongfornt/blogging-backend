import mongoose from "mongoose";
import { IBlogUpdate, TBlog } from "./blog.interface";
import { BlogModel } from "./blog.model";
import CustomError from "../../errors/Custom.error";
import { StatusCodes } from "http-status-codes";
import QueryBuilder from "../../builder/Query.builder";
import { BlogSearchAbleFields } from "./blog.constant";

const createBlogIntoDB = async (payload: TBlog) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    const createdBlog = await BlogModel.create(payload);
    const response = await BlogModel.findById(createdBlog?._id)
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

  const isBlogExist = await BlogModel.findById(blogId);
  const authorId = isBlogExist?.author.toString();

  if (user?.role === "user") {
    if (user?.userId !== authorId) {
      throw new CustomError(
        StatusCodes.FORBIDDEN,
        "You are not authorized to update this blog!"
      );
    }
  }

  const blog = await BlogModel.findByIdAndUpdate(
    blogId,
    { $set: { ...body } },
    { new: true, runValidators: true }
  ).select("-isPublished -createdAt -updatedAt").populate('author');

  console.log(blog);
  

  return blog;
};

const getAllBlogsFromDB = async (query: Record<string, unknown>) => {
  const response = new QueryBuilder(BlogModel.find(), query).search(
    BlogSearchAbleFields
  );
};

export const BlogServices = {
  createBlogIntoDB,
  getAllBlogsFromDB,
  updateBlogIntoDB,
};
