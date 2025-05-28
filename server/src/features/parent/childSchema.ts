import z from "zod";
import { fieldValidation } from "../../helpers/validation.js";

export const createChildSchema = z.object({
  email: fieldValidation.email,
  password: fieldValidation.password,
  firstName: fieldValidation.firstName,
  lastName: fieldValidation.lastName,
  baseAllowance: z.number().min(0).multipleOf(0.01),
  parentId: z.string().uuid(),
});

export type createChildData = z.infer<typeof createChildSchema>;
