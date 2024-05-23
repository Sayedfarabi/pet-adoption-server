import httpStatus from "http-status";
import catchAsyncHandler from "../../../shared/catchAsyncHandler";
import sendResponse from "../../../shared/sendResponse";
import { AdoptionRequestsServices } from "./adoptionRequests.services";

const getAllAdoptionRequests = catchAsyncHandler(async (req, res) => {
  const user = req.user;
  const result = await AdoptionRequestsServices.getAllAdoptionRequestsFromDB(
    user
  );
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Adoption requests retrieved successfully",
    data: result,
  });
});

const getUserAdoptionRequests = catchAsyncHandler(async (req, res) => {
  const user = req.user;
  const result = await AdoptionRequestsServices.getUserAdoptionRequestsFromDB(
    user
  );
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Adoption requests retrieved successfully",
    data: result,
  });
});

const updateAdoptionRequests = catchAsyncHandler(async (req, res) => {
  const user = req.user;
  const payload = req.body;
  const requestId = req.params.requestId;
  const result = await AdoptionRequestsServices.updateAdoptionRequestsFromDB(
    user,
    requestId,
    payload
  );
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Adoption request updated successfully",
    data: result,
  });
});

export const AdoptionRequestsControllers = {
  getAllAdoptionRequests,
  updateAdoptionRequests,
  getUserAdoptionRequests,
};
