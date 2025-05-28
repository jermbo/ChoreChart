import type { Context } from "hono";
import { validateRequestFormat } from "../../helpers/validation.js";
import { createChildSchema, type createChildData } from "./childSchema.js";
import {
  errorResponse,
  successResponse,
  validationErrorResponse,
} from "../../helpers/response.js";
import { childManagementService } from "./childManagementService.js";

const childService = new childManagementService();
export const createChild = async (context: Context) => {
  try {
    const requestBody = await context.req.json();
    const validationResult = validateRequestFormat<createChildData>(
      requestBody,
      createChildSchema
    );
    if (!validationResult.success) {
      return validationErrorResponse(context, validationResult.error.errors);
    }

    //check existing child
    const { email } = validationResult.data;
    const isExisting = await childService.checkIfExisting(email);
    //check if child already present
    if (isExisting) {
      return errorResponse(context, "Child already exists", 400);
    }
    const child = await childService.createChild(validationResult.data);

    return successResponse(
      context,
      {
        message: "Child created successful",
        child,
      },
      201
    );
  } catch (error: unknown) {
    console.error("Child registration error:", error);
    return errorResponse(
      context,
      "An error occurred during child registration",
      500
    );
  }
};
