import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catch-async";
import sendResponse from "../../utils/sendResponse";
import { AdminService } from "./admin.service";

const blockUser = catchAsync(async (req, res, next) => {
  const { userId } = req.params;
  const { body } = req.body;
  const payload = {
    userId,
    body,
  };

  await AdminService.blockUserIntoDB(payload);

  sendResponse(res, {
    success: true,
    message: "User blocked successfully",
    statusCode: StatusCodes.OK,
    // data: response
  });
});

const deleteBlog = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  await AdminService.deleteBlogFromDB(id);

  sendResponse(res, {
    success: true,
    message: "Blog deleted successfully",
    statusCode: StatusCodes.OK,
    // data: response
  });
});

export const AdminController = {
  blockUser,
  deleteBlog,
};
