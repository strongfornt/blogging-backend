import { z } from "zod";

const updateUserStatusZodValidation = z.object({
  body: z.object({
    isBlocked: z
      .literal(true, { required_error: "isBlocked is required" })
  }),
});

export const AdminZodValidationSchema = {
  updateUserStatusZodValidation,
};
