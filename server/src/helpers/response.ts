import type { Context } from "hono";

export const successResponse = (
  context: Context,
  data: unknown,
  status = 200
) => {
  return context.json(
    {
      success: true,
      data,
    },
    status
  );
};

export const errorResponse = (
  context: Context,
  message: string,
  status = 400
) => {
  return context.json(
    {
      success: false,
      error: {
        message,
      },
    },
    status
  );
};

export const validationErrorResponse = (
  context: Context,
  errors: { message: string }[]
) => {
  return context.json(
    {
      success: false,
      error: {
        message: "Validation failed",
        details: errors,
      },
    },
    400
  );
};
