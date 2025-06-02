import type { Context } from "hono";
import { DashboardService } from "./dashboardService.js";
import {
  ChildDashboardResponseSchema,
  ParentDashboardResponseSchema,
} from "./dashboardSchema.js";

export async function getChildDashboard(c: Context) {
  try {
    const childId = c.get("user")?.childId;
    if (!childId) {
      return c.json({ error: "Access denied. Not a child account." }, 403);
    }

    const dashboard = await DashboardService.getChildDashboard(childId);
    const validatedData = ChildDashboardResponseSchema.parse(dashboard);

    return c.json(validatedData);
  } catch (error) {
    console.error("Error fetching child dashboard:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
}

export async function getParentDashboard(c: Context) {
  try {
    const parentId = c.get("user")?.parentId;
    if (!parentId) {
      return c.json({ error: "Access denied. Not a parent account." }, 403);
    }

    const dashboard = await DashboardService.getParentDashboard(parentId);
    const validatedData = ParentDashboardResponseSchema.parse(dashboard);

    return c.json(validatedData);
  } catch (error) {
    console.error("Error fetching parent dashboard:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
}
