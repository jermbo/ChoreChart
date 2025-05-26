import { z } from "zod";

export const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  firstName: z.string().min(2),
  lastName: z.string().min(2),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export type RegisterData = z.infer<typeof registerSchema>;
export type LoginData = z.infer<typeof loginSchema>;

export type ValidationResult<T> =
  | {
      success: true;
      data: T;
    }
  | {
      success: false;
      error: z.ZodError;
    };
