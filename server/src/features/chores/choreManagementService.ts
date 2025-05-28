import { eq } from "drizzle-orm";
import { chores } from "../../db/schema.js";
import { db } from "../../db/index.js";
import type {
  CreateChoreData,
  UpdateChoreData,
} from "./choreManagementSchema.js";

export class ChoreManagementService {
  async createChore(data: CreateChoreData) {
    const [newChore] = await db
      .insert(chores)
      .values({
        title: data.title,
        description: data.description,
        value: data.value.toFixed(2),
        dueDate: new Date(data.dueDate),
        status: data.status,
      })
      .returning();

    return newChore;
  }

  async updateChore(id: string, data: UpdateChoreData) {
    const updateData: any = {};

    if (data.title) updateData.title = data.title;
    if (data.description !== undefined)
      updateData.description = data.description;
    if (data.value) updateData.value = data.value.toFixed(2);
    if (data.dueDate) updateData.dueDate = new Date(data.dueDate);
    if (data.status) updateData.status = data.status;

    const [updatedChore] = await db
      .update(chores)
      .set(updateData)
      .where(eq(chores.id, id))
      .returning();

    return updatedChore;
  }

  async deleteChore(id: string) {
    const [deletedChore] = await db
      .delete(chores)
      .where(eq(chores.id, id))
      .returning();

    return deletedChore;
  }

  async getChoreById(id: string) {
    const [chore] = await db.select().from(chores).where(eq(chores.id, id));

    return chore;
  }
}
