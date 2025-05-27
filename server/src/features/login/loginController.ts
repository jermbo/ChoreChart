import type { Context } from "hono";
import {
  loginSchema,
  registerSchema,
  type RegisterData,
  type LoginData,
} from "./loginSchema.js";
import { LoginService } from "./loginService.js";
import {
  successResponse,
  errorResponse,
  validationErrorResponse,
} from "../../helpers/response.js";
import type { ValidationResult } from "../../types/index.js";

const loginService = new LoginService();

// Validation helper function
const validateRequestFormat = <T>(
  data: unknown,
  schema: any
): ValidationResult<T> => {
  const result = schema.safeParse(data);
  if (result.success) {
    return { success: true, data: result.data };
  }
  return { success: false, error: result.error };
};

export const registerParent = async (context: Context) => {
  try {
    // 1. Get the request body
    const requestBody = await context.req.json();

    // 2. Validate the data using our schema
    const validationResult = validateRequestFormat<RegisterData>(
      requestBody,
      registerSchema
    );

    if (!validationResult.success) {
      return validationErrorResponse(context, validationResult.error.errors);
    }

    const { email } = validationResult.data;
    const userExists = await loginService.existingUser(email);

    if (!!userExists) {
      return errorResponse(
        context,
        "An account with this email already exists",
        400
      );
    }

    // 4. Create the user and parent
    const user = await loginService.createUser(validationResult.data);

    // 5. Return success response
    return successResponse(
      context,
      {
        message: "Registration successful",
        user,
      },
      201
    );
  } catch (error: unknown) {
    console.error("Registration error:", error);
    return errorResponse(context, "An error occurred during registration", 500);
  }
};

export const login = async (context: Context) => {
  try {
    // 1. Get the request body
    const requestBody = await context.req.json();

    // 2. Validate the data using our schema
    const validationResult = validateRequestFormat<LoginData>(
      requestBody,
      loginSchema
    );

    if (!validationResult.success) {
      return validationErrorResponse(context, validationResult.error.errors);
    }

    const user = await loginService.loginUser(validationResult.data);

    // 4. Return success response
    return successResponse(
      context,
      {
        message: "Login successful",
        user,
      },
      200
    );
  } catch (error: unknown) {
    console.error("Login error:", error);
    if (error instanceof Error && error.message === "Invalid credentials") {
      return errorResponse(context, "Invalid email or password", 401);
    }
    return errorResponse(context, "An error occurred during login", 500);
  }
};
