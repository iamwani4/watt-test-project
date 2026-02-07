import * as z from "zod";
import { Gender } from "../generated/prisma/enums";

export const applicationSchema = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 characters" }),
  email: z.email({ message: "Must be a valid email address" }),
  gender: z
    .enum(Gender, { message: "Please select a valid gender" })
    .optional(),
  age: z.number().min(17, { message: "You must be over 16" }),
});

export type ApplicationData = z.infer<typeof applicationSchema>;
