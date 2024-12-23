import mongoose from "mongoose";
import { TBlog } from "./blog.interface";
import { BlogModel } from "./blog.model";
import CustomError from "../../errors/Custom.error";
import { StatusCodes } from "http-status-codes";

const createBlogIntoDB = async (payload: TBlog) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    const createdBlog = await BlogModel.create(payload);
    const response = await BlogModel.findById(createdBlog?._id).select({title: 1, content: 1, author: 1}).populate(
      "author"
    );

    await session.commitTransaction();
    await session.endSession();

    return response;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new CustomError(StatusCodes.BAD_REQUEST, 'Failed to create blog');
  }
};

export const BlogServices = {
  createBlogIntoDB,
};
