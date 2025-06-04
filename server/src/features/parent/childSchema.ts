import z from "zod";
import { fieldValidation } from "../../helpers/validation.js";
import { any } from "zod/v4";

export const createChildSchema = z.object({
  email: fieldValidation.email,
  password: fieldValidation.password,
  firstName: fieldValidation.firstName,
  lastName: fieldValidation.lastName,
  baseAllowance: z.number().min(0),
  parentId: z.string().uuid(),
});

export type createChildData = z.infer<typeof createChildSchema>;

export const updateChildSchema = z.object({
  id: z.string().uuid(),
  email: fieldValidation.email,
  firstName: fieldValidation.firstName,
  lastName: fieldValidation.lastName,
  baseAllowance: z.number().min(0),
});

export type updateChildData = z.infer<typeof updateChildSchema>;
