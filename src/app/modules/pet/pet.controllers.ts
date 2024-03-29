import httpStatus from "http-status";
import catchAsyncHandler from "../../../shared/catchAsyncHandler";
import sendResponse from "../../../shared/sendResponse";
import { PetServices } from "./pet.services";
import pick from "../../../shared/pick";
import { petsFilterableFields } from "./pet.constants";

const addPet = catchAsyncHandler(async (req, res) => {
  const payload = req.body;
  const user = req.user;
  const result = await PetServices.addPetIntoDB(payload, user);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Pet added successfully",
    data: result,
  });
});

const getPets = catchAsyncHandler(async (req, res) => {
  const query = req.query;
  const filters = pick(query, petsFilterableFields);
  const options = pick(query, ["limit", "page", "sortBy", "sortOrder"]);
  const result = await PetServices.getPetsFromDB(filters, options);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Pets retrieved successfully",
    meta: result.meta,
    data: result.data,
  });
});

const updatePet = catchAsyncHandler(async (req, res) => {
  const payload = req.body;
  const user = req.user;
  const params = req.params?.petId;

  const result = await PetServices.updatePetIntoDB(params, payload, user);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Pet profile updated successfully",
    data: result,
  });
});

export const PetControllers = {
  addPet,
  getPets,
  updatePet,
};
