import httpStatus from "http-status";
import catchAsyncHandler from "../../../shared/catchAsyncHandler";
import sendResponse from "../../../shared/sendResponse";
import { ProfileServices } from "./profile.services";

const getProfile = catchAsyncHandler(async (req, res) => {
  const user = req.user;
  const result = await ProfileServices.getProfileFromDB(user);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User profile retrieved successfully",
    data: result,
  });
});

const updateProfile = catchAsyncHandler(async (req, res) => {
  const user = req.user;
  const payload = req.body;
  const result = await ProfileServices.updateProfileIntoDB(user, payload);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User profile updated successfully",
    data: result,
  });
});

export const ProfileControllers = {
  getProfile,
  updateProfile,
};
