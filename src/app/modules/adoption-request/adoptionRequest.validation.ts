import { z } from "zod";

const createAdoptionValidationSchema = z.object({
  body: z.object({
    petId: z.string({ required_error: "Pet Id is required." }),
    petOwnershipExperience: z.string({
      required_error: "petOwnershipExperience is required.",
    }),
    references: z.string().optional(),
  }),
});

export const AdoptionRequiestValidations = {
  createAdoptionValidationSchema,
};
