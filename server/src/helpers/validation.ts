import { z } from "zod";

// Common validation schemas
export const fieldValidation = {
  email: z.string().email("Please provide a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  // .regex(
  //   /^(?=.*[a-z])(?=.*[A-Z])/,
  //   "Password must contain at least one uppercase letter, one lowercase letter, and one number"
  // ),
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters"),
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
};
