import { StatusCodes } from "http-status-codes";
import CustomError from "../../errors/Custom.error";
import { UserModel } from "../user/user.model";
import { IBlockUserPayload } from "./admin.interface";

const blockUserIntoDB = async (payload: IBlockUserPayload) => {
  const { userId, body } = payload;
  const isUserExist = await UserModel.findById(userId);

  if (!isUserExist) {
    throw new CustomError(StatusCodes.NOT_FOUND, "User not found!");
  }

  const response = await UserModel.findByIdAndUpdate(
    userId,
    { $set: { ...body } },
    { runValidators: true }
  );

  return response;
};

export const AdminService = {
  blockUserIntoDB,
};
