import httpStatus from "http-status";
import catchAsyncHandler from "../../../shared/catchAsyncHandler";
import sendResponse from "../../../shared/sendResponse";
import { RegisterServices } from "./register.services";

const createUser = catchAsyncHandler(async (req, res) => {
  const payload = req.body;
  const result = await RegisterServices.createUserIntoDB(payload);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "User registered successfully",
    data: result,
  });
});

const createAdmin = catchAsyncHandler(async (req, res) => {
  const payload = req.body;
  const result = await RegisterServices.createAdminIntoDB(payload);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Admin registered successfully",
    data: result,
  });
});

export const RegisterControllers = {
  createUser,
  createAdmin,
};
