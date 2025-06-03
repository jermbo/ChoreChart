import z from "zod";
import { fieldValidation } from "../../helpers/validation.js";

export const createChoreSchema = z.object({
  title: z.string().min(1, "Title is required").max(255),
  description: z.string().optional(),
  value: z.number().min(0).multipleOf(0.01),
  dueDate: z.string().datetime(),
  childAssignments: z
    .array(
      z.object({
        childId: z.string().uuid(),
        status: z
          .enum(["pending", "completed", "cancelled"])
          .default("pending"),
      })
    )
    .optional(),
});

export const updateChoreSchema = z.object({
  title: z.string().min(1, "Title is required").max(255).optional(),
  description: z.string().optional(),
  value: z.number().min(0).multipleOf(0.01).optional(),
  dueDate: z.string().datetime().optional(),
  childAssignments: z
    .array(
      z.object({
        childId: z.string().uuid(),
        status: z
          .enum(["pending", "completed", "cancelled"])
          .default("pending"),
      })
    )
    .optional(),
});

export const createChoreAssignmentSchema = z.object({
  choreId: z.string().uuid(),
  childIds: z.array(z.string().uuid()),
});

export const updateChoreAssignmentSchema = z.object({
  assignmentId: z.string().uuid(),
  status: z.enum(["pending", "in progress", "completed", "verified"]),
});

export const updateChoreStatusSchema = z.object({
  childId: z.string(),
  status: z.enum(["pending", "completed", "cancelled"]),
});

export type UpdateChoreStatusRequestData = z.infer<
  typeof updateChoreStatusSchema
>;

export type CreateChoreData = z.infer<typeof createChoreSchema>;
export type UpdateChoreData = z.infer<typeof updateChoreSchema>;
export type CreateChoreAssignmentData = z.infer<
  typeof createChoreAssignmentSchema
>;
export type UpdateChoreAssignmentData = z.infer<
  typeof updateChoreAssignmentSchema
>;
