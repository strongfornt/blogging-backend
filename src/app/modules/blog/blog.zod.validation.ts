import { z } from "zod";

const blogValidationSchema = z.object({
  body: z.object({
    title: z.string({required_error: 'Title is required'}), 
    content: z.string({required_error: 'Content is required'}), 
    isPublished: z.boolean().default(true), 
  })
});

export const BlogValidation = {
    blogValidationSchema
}  