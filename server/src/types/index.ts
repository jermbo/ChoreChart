import type { ZodError } from "zod";

export type ValidationResult<T> =
  | {
      success: true;
      data: T;
    }
  | {
      success: false;
      error: ZodError;
    };
