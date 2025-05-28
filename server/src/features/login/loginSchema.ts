import { z } from "zod";
import { fieldValidation } from "../../helpers/validation.js";

export const registerSchema = z.object({
  email: fieldValidation.email,
  password: fieldValidation.password,
  firstName: fieldValidation.firstName,
  lastName: fieldValidation.lastName,
});

export const loginSchema = z.object({
  email: fieldValidation.email,
  password: fieldValidation.password,
});

export type RegisterData = z.infer<typeof registerSchema>;
export type LoginData = z.infer<typeof loginSchema>;
