import { z } from "zod";

const updateAdoptionValidationSchema = z.object({
  body: z.object({
    petId: z.string({ required_error: "Pet Id is required." }).optional(),
    petOwnershipExperience: z
      .string({
        required_error: "petOwnershipExperience is required.",
      })
      .optional(),
    references: z.string().optional(),
  }),
});

export const AdoptionRequestsValidations = {
  updateAdoptionValidationSchema,
};
