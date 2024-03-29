import httpStatus from "http-status";
import catchAsyncHandler from "../../../shared/catchAsyncHandler";
import sendResponse from "../../../shared/sendResponse";
import { AuthServices } from "./auth.services";

const userLogin = catchAsyncHandler(async (req, res) => {
  const payload = req.body;
  const result = await AuthServices.userLoginIntoDB(payload);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User logged in successfully",
    data: result,
  });
});

export const AuthControllers = {
  userLogin,
};
