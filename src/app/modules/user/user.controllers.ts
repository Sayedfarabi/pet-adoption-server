import httpStatus from "http-status";
import catchAsyncHandler from "../../../shared/catchAsyncHandler";
import sendResponse from "../../../shared/sendResponse";
import { UserServices } from "./user.services";

const getUsers = catchAsyncHandler(async (req, res) => {
  const result = await UserServices.getAllUsersFromDB();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Users retrieve successfully",
    data: result,
  });
});

export const UserControllers = {
  getUsers,
};
