import { StatusCodes } from "http-status-codes";
import CustomError from "../../errors/Custom.error";
import { UserModel } from "../user/user.model";
import { IBlockUserPayload } from "./admin.interface";
import { BlogModel } from "../blog/blog.model";

const blockUserIntoDB = async (payload: IBlockUserPayload) => {
  const { userId, body } = payload;

  const response = await UserModel.findByIdAndUpdate(
    userId,
    { $set: { ...body } },
    { runValidators: true }
  );

  return response;
};

const deleteBlogFromDB = async (id: string) => {
  const isBlogExist = await BlogModel.findById(id);

  if (!isBlogExist) {
    throw new CustomError(StatusCodes.NOT_FOUND, "Blog not found!");
  }

  const response = await BlogModel.findByIdAndDelete(id);

  return response;
};

export const AdminService = {
  blockUserIntoDB,
  deleteBlogFromDB,
};
