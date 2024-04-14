import * as z from "zod";

export const DocumentValidation = z.object({
  file1: z.string().url().nonempty({ message: "Please upload the first PDF document." }),
  file2: z.string().url().nonempty({ message: "Please upload the second PDF document." }),
  website: z.string().url().nonempty({ message: "Please enter a valid URL." }),
  description: z.string().max(200, { message: "Maximum 200 characters." }).optional(),
});