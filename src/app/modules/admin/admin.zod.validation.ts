import { z } from "zod";

const updateUserStatusZodValidation = z.object({
  isBlocked: z
  .literal(true, { required_error: "isBlocked is required" })
  
}).strict();

export const AdminZodValidationSchema = {
  updateUserStatusZodValidation,
};
