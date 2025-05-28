import type { Context } from "hono";
import { validateRequestFormat } from "../../helpers/validation.js";
import {
  createChoreSchema,
  updateChoreSchema,
  createChoreAssignmentSchema,
  updateChoreAssignmentSchema,
  type CreateChoreData,
  type UpdateChoreData,
  type CreateChoreAssignmentData,
  type UpdateChoreAssignmentData,
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
        message: "Chore created successfully with assignments",
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

export const assignChore = async (context: Context) => {
  try {
    const requestBody = await context.req.json();
    const validationResult = validateRequestFormat<CreateChoreAssignmentData>(
      requestBody,
      createChoreAssignmentSchema
    );

    if (!validationResult.success) {
      return validationErrorResponse(context, validationResult.error.errors);
    }

    const assignment = await choreService.assignChore(validationResult.data);
    return successResponse(
      context,
      {
        message: "Chore assigned successfully",
        assignment,
      },
      201
    );
  } catch (error: unknown) {
    console.error("Chore assignment error:", error);
    return errorResponse(
      context,
      "An error occurred during chore assignment",
      500
    );
  }
};

export const updateChoreAssignment = async (context: Context) => {
  try {
    const choreId = context.req.param("choreId");
    const childId = context.req.param("childId");
    const requestBody = await context.req.json();
    const validationResult = validateRequestFormat<UpdateChoreAssignmentData>(
      requestBody,
      updateChoreAssignmentSchema
    );

    if (!validationResult.success) {
      return validationErrorResponse(context, validationResult.error.errors);
    }

    const existingAssignment = await choreService.getChoreAssignment(
      choreId,
      childId
    );
    if (!existingAssignment) {
      return errorResponse(context, "Chore assignment not found", 404);
    }

    const updatedAssignment = await choreService.updateChoreAssignment(
      choreId,
      childId,
      validationResult.data
    );
    return successResponse(
      context,
      {
        message: "Chore assignment updated successfully",
        assignment: updatedAssignment,
      },
      200
    );
  } catch (error: unknown) {
    console.error("Chore assignment update error:", error);
    return errorResponse(
      context,
      "An error occurred during chore assignment update",
      500
    );
  }
};

export const deleteChoreAssignment = async (context: Context) => {
  try {
    const choreId = context.req.param("choreId");
    const childId = context.req.param("childId");

    const existingAssignment = await choreService.getChoreAssignment(
      choreId,
      childId
    );
    if (!existingAssignment) {
      return errorResponse(context, "Chore assignment not found", 404);
    }

    const deletedAssignment = await choreService.deleteChoreAssignment(
      choreId,
      childId
    );
    return successResponse(
      context,
      {
        message: "Chore assignment deleted successfully",
        assignment: deletedAssignment,
      },
      200
    );
  } catch (error: unknown) {
    console.error("Chore assignment deletion error:", error);
    return errorResponse(
      context,
      "An error occurred during chore assignment deletion",
      500
    );
  }
};
