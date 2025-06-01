import type { Context } from "hono";
import { validateRequestFormat } from "../../helpers/validation.js";
import {
  createChildSchema,
  updateChildSchema,
  type createChildData,
  type updateChildData,
} from "./childSchema.js";
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

    const { email } = validationResult.data;
    const isExisting = await childService.checkIfExisting(email);
    if (isExisting) {
      throw new Error("Child already exists");
    }

    const child = await childService.createChild(validationResult.data);
    return successResponse(context, child, 201);
  } catch (error: unknown) {
    console.error("Error creating child:", error);
    return errorResponse(context, "An error occurred", 500);
  }
};
//get all child with chore and allowance details for a parent
export const getChildrenWithDetails = async (context: Context) => {
  try {
    //get parent id from query parameter
    const parentId = context.req.query("parentId");

    if (!parentId) {
      return errorResponse(context, "Parent ID is required", 400);
    }

    const children = await childService.getChildrenWithDetails(parentId);
    return successResponse(context, children, 200);
  } catch (error: unknown) {
    console.error("Error fetching child with chore and allowance:", error);
    return errorResponse(context, "An error occurred", 500);
  }
};

//update child
export const updateChild = async (context: Context) => {
  try {
    const requestBody = await context.req.json();
    const validationResult = validateRequestFormat<updateChildData>(
      requestBody,
      updateChildSchema
    );
    if (!validationResult.success) {
      return validationErrorResponse(context, validationResult.error.errors);
    }
    const child = await childService.updateChild(validationResult.data);
    return successResponse(context, child, 200);
  } catch (error: unknown) {
    console.error("Error updating child:", error);
    return errorResponse(context, "An error occurred", 500);
  }
};

//delete child
export const deleteChild = async (context: Context) => {
  try {
    const id = context.req.param("id");
    if (!id) {
      return errorResponse(context, "Child ID is required", 400);
    }
    const child = await childService.deleteChild(id);
    return successResponse(context, child, 200);
  } catch (error: unknown) {
    console.error("Error deleting child:", error);
    return errorResponse(context, "An error occurred", 500);
  }
};
