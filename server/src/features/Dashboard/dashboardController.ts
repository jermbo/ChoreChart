import type { Context } from "hono";
import { DashboardService } from "./dashboardService.js";
import { validationErrorResponse } from "../../helpers/response.js";
import { validateRequestFormat } from "../../helpers/validation.js";

export async function getChildDashboard(context: Context) {
  try {
    const childId = context.req.param("childId");

    if (!childId) {
      return context.json(
        { error: "Access denied. Not a child account." },
        403
      );
    }

    const dashboard = await DashboardService.getChildDashboard(childId);
    return context.json(dashboard, 200);
  } catch (error) {
    console.error("Error fetching child dashboard:", error);
    return context.json({ error: "Internal server error" }, 500);
  }
}

export async function getParentDashboard(context: Context) {
  try {
    const parentId = context.req.param("parentId");

    if (!parentId) {
      return context.json(
        { error: "Access denied. Not a parent account." },
        403
      );
    }

    const dashboard = await DashboardService.getParentDashboard(parentId);

    return context.json(dashboard);
  } catch (error) {
    console.error("Error fetching parent dashboard:", error);
    return context.json({ error: "Internal server error" }, 500);
  }
}
