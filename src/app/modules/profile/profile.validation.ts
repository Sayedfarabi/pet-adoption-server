import { z } from "zod";

const updateProfileValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    email: z.string().email().optional(),
  }),
});

export const ProfileValidations = {
  updateProfileValidationSchema,
};
