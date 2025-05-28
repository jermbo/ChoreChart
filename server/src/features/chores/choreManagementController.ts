import type { Context } from "hono";
import { validateRequestFormat } from "../../helpers/validation.js";
import {
  createChoreSchema,
  updateChoreSchema,
  type CreateChoreData,
  type UpdateChoreData,
} from "./choreManagementSchema.js";
import {
  errorResponse,
  successResponse,
  validationErrorResponse,
} from "../../helpers/response.js";
import { ChoreManagementService } from "./choreManagementService.js";

const choreService = new ChoreManagementService();

export const createChore = async (context: Context) => {
  try {
    const requestBody = await context.req.json();
    const validationResult = validateRequestFormat<CreateChoreData>(
      requestBody,
      createChoreSchema
    );

    if (!validationResult.success) {
      return validationErrorResponse(context, validationResult.error.errors);
    }

    const chore = await choreService.createChore(validationResult.data);
    return successResponse(
      context,
      {
        message: "Chore created successfully",
        chore,
      },
      201
    );
  } catch (error: unknown) {
    console.error("Chore creation error:", error);
    return errorResponse(
      context,
      "An error occurred during chore creation",
      500
    );
  }
};

export const updateChore = async (context: Context) => {
  try {
    const id = context.req.param("id");
    const requestBody = await context.req.json();
    const validationResult = validateRequestFormat<UpdateChoreData>(
      requestBody,
      updateChoreSchema
    );

    if (!validationResult.success) {
      return validationErrorResponse(context, validationResult.error.errors);
    }

    const existingChore = await choreService.getChoreById(id);
    if (!existingChore) {
      return errorResponse(context, "Chore not found", 404);
    }

    const updatedChore = await choreService.updateChore(
      id,
      validationResult.data
    );
    return successResponse(
      context,
      {
        message: "Chore updated successfully",
        chore: updatedChore,
      },
      200
    );
  } catch (error: unknown) {
    console.error("Chore update error:", error);
    return errorResponse(context, "An error occurred during chore update", 500);
  }
};

export const deleteChore = async (context: Context) => {
  try {
    const id = context.req.param("id");
    const existingChore = await choreService.getChoreById(id);

    if (!existingChore) {
      return errorResponse(context, "Chore not found", 404);
    }

    const deletedChore = await choreService.deleteChore(id);
    return successResponse(
      context,
      {
        message: "Chore deleted successfully",
        chore: deletedChore,
      },
      200
    );
  } catch (error: unknown) {
    console.error("Chore deletion error:", error);
    return errorResponse(
      context,
      "An error occurred during chore deletion",
      500
    );
  }
};
