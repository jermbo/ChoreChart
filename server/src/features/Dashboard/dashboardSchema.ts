import { z } from "zod";
import {
  chores,
  children,
  choreAssignments,
  // activityLog,
} from "../../db/schema.js";

export const DashboardStatsSchema = z.object({
  totalChores: z.number(),
  completedChores: z.number(),
  pendingChores: z.number(),
  inProgressChores: z.number(),
  verifiedChores: z.number(),
  totalEarnings: z.number(),
  recentActivity: z.array(
    z.object({
      id: z.string(),
      type: z.enum(["chore_completed", "chore_verified", "allowance_earned"]),
      description: z.string(),
      timestamp: z.string(),
      value: z.number().optional(),
    })
  ),
});

export const ChildDashboardResponseSchema = z.object({
  stats: DashboardStatsSchema,
  chores: z.array(
    z.object({
      id: z.string(),
      title: z.string(),
      description: z.string(),
      value: z.number(),
      dueDate: z.string(),
      status: z.enum(["pending", "in_progress", "completed", "verified"]),
      created_at: z.string(),
      updated_at: z.string(),
    })
  ),
});

export const ParentDashboardResponseSchema = z.object({
  stats: z.object({
    totalChildren: z.number(),
    totalChores: z.number(),
    activeChores: z.number(),
    completedChores: z.number(),
    totalAllowancePaid: z.number(),
  }),
  children: z.array(
    z.object({
      id: z.string(),
      firstName: z.string(),
      lastName: z.string(),
      completedChores: z.number(),
      pendingChores: z.number(),
      totalEarnings: z.number(),
    })
  ),
  recentActivity: z.array(
    z.object({
      id: z.string(),
      type: z.enum([
        "chore_created",
        "chore_completed",
        "chore_verified",
        "allowance_paid",
      ]),
      description: z.string(),
      timestamp: z.string(),
      childId: z.string().optional(),
      value: z.number().optional(),
    })
  ),
});

// Drizzle types
export type Chore = typeof chores.$inferSelect;
export type Child = typeof children.$inferSelect;
export type ChoreAssignment = typeof choreAssignments.$inferSelect;
//export type ActivityLog = typeof activityLog.$inferSelect;
