import * as z from "zod";

export const DocumentValidation = z.object({
  file: z.string().url().nonempty({ message: "Please upload a PDF document." }),
  name: z
    .string()
    .min(3, { message: "Minimum 3 characters." })
    .max(30, { message: "Maximum 30 characters." }),
  description: z
    .string()
    .max(200, { message: "Maximum 200 characters." })
    .optional(),
});