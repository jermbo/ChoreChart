import type { Context } from "hono";
import { db } from "../db/index.js";
import { parents } from "../db/schema.js";
import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";
import { fieldValidations } from "../helpers/validation.js";
import {
  successResponse,
  errorResponse,
  validationErrorResponse,
} from "../helpers/response.js";
import { z } from "zod";

// Registration validation schema
const registerSchema = z.object({
  email: fieldValidations.email,
  password: fieldValidations.password,
  firstName: fieldValidations.name,
  lastName: fieldValidations.name,
});

// Type for registration data
export type RegisterData = z.infer<typeof registerSchema>;

// Validation result types
type ValidationSuccess = {
  success: true;
  data: RegisterData;
};

type ValidationError = {
  success: false;
  error: z.ZodError;
};

type ValidationResult = ValidationSuccess | ValidationError;

const checkIfUserExists = async (email: string) => {
  const existingUser = await db.query.parents.findFirst({
    where: eq(parents.email, email),
  });
  return !!existingUser;
};

export const registerParent = async (context: Context) => {
  try {
    // 1. Get the request body
    const requestBody = await context.req.json();

    // 2. Validate the data using our schema
    const validationResult = validateRegistrationRequestFormat(requestBody);

    if (!validationResult.success) {
      return validationErrorResponse(context, validationResult.error.errors);
    }

    const { data: validatedData } = validationResult;

    // 3. Check if user already exists
    const userExists = await checkIfUserExists(validatedData.email);

    if (userExists) {
      return errorResponse(
        context,
        "An account with this email already exists",
        400
      );
    }

    // 4. Hash the password
    const passwordHash = await bcrypt.hash(validatedData.password, 10);

    // 5. Create the new parent
    const [newParent] = await db
      .insert(parents)
      .values({
        email: validatedData.email,
        passwordHash,
        firstName: validatedData.firstName,
        lastName: validatedData.lastName,
      })
      .returning();

    // 6. Remove sensitive data from response
    const { passwordHash: _, ...parentWithoutPassword } = newParent;

    // 7. Return success response
    return successResponse(
      context,
      {
        message: "Registration successful",
        user: parentWithoutPassword,
      },
      201
    );
  } catch (error: unknown) {
    // Handle other errors
    console.error("Registration error:", error);
    return errorResponse(context, "An error occurred during registration", 500);
  }
};

// Validation helper function
const validateRegistrationRequestFormat = (data: unknown): ValidationResult => {
  const result = registerSchema.safeParse(data);
  if (result.success) {
    return { success: true, data: result.data };
  }
  return { success: false, error: result.error };
};
