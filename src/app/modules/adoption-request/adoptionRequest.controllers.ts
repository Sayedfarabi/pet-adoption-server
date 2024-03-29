import httpStatus from "http-status";
import catchAsyncHandler from "../../../shared/catchAsyncHandler";
import sendResponse from "../../../shared/sendResponse";
import { AdoptionRequestServices } from "./adoptionRequest.services";

const createAdoption = catchAsyncHandler(async (req, res) => {
  const payload = req.body;
  const user = req.user;
  const result = await AdoptionRequestServices.createAdoptionRequestIntoDB(
    payload,
    user
  );
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Adoption request submitted successfully",
    data: result,
  });
});

export const AdoptionRequestControllers = {
  createAdoption,
};
