import z from "zod";
import { fieldValidation } from "../../helpers/validation.js";

export const createChoreSchema = z.object({
  title: z.string().min(1, "Title is required").max(255),
  description: z.string().optional(),
  value: z.number().min(0).multipleOf(0.01),
  dueDate: z.string().datetime(),
  status: z.enum(["pending", "completed", "cancelled"]).default("pending"),
});

export const updateChoreSchema = createChoreSchema.partial();

export type CreateChoreData = z.infer<typeof createChoreSchema>;
export type UpdateChoreData = z.infer<typeof updateChoreSchema>;
