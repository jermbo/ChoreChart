import { eq, and, desc } from "drizzle-orm";
import { chores, choreAssignments, users } from "../../db/schema.js";
import { db } from "../../db/index.js";
import type {
  CreateChoreData,
  UpdateChoreData,
  CreateChoreAssignmentData,
  UpdateChoreAssignmentData,
} from "./choreManagementSchema.js";
import type { InferSelectModel } from "drizzle-orm";

type ChoreAssignment = InferSelectModel<typeof choreAssignments>;
type Chore = InferSelectModel<typeof chores>;

export class ChoreManagementService {
  async getAllChores() {
    return await db.select().from(chores).orderBy(desc(chores.dueDate));
  }

  async createChore(data: CreateChoreData) {
    return await db.transaction(async (tx) => {
      // 1. Create the chore
      const [newChore] = await tx
        .insert(chores)
        .values({
          title: data.title,
          description: data.description,
          value: data.value.toFixed(2),
          dueDate: new Date(data.dueDate),
        })
        .returning();

      // 2. Create assignments for each child if provided
      let assignments: ChoreAssignment[] = [];
      if (data.childAssignments && data.childAssignments.length > 0) {
        assignments = await Promise.all(
          data.childAssignments.map(async (assignment) => {
            const [newAssignment] = await tx
              .insert(choreAssignments)
              .values({
                choreId: newChore.id,
                childId: assignment.childId,
                status: assignment.status,
              })
              .returning();
            return newAssignment;
          })
        );
      }

      return {
        ...newChore,
        assignments,
      };
    });
  }

  async updateChore(id: string, data: UpdateChoreData) {
    return await db.transaction(async (tx) => {
      // 1. Update the chore
      const updateData: Partial<Chore> = {};
      if (data.title) updateData.title = data.title;
      if (data.description !== undefined)
        updateData.description = data.description;
      if (data.value) updateData.value = data.value.toFixed(2);
      if (data.dueDate) updateData.dueDate = new Date(data.dueDate);

      const [updatedChore] = await tx
        .update(chores)
        .set(updateData)
        .where(eq(chores.id, id))
        .returning();

      // 2. If childAssignments are provided, update them
      if (data.childAssignments) {
        // Delete existing assignments
        await tx
          .delete(choreAssignments)
          .where(eq(choreAssignments.choreId, id));

        // Create new assignments
        const assignments = await Promise.all(
          data.childAssignments.map(async (assignment) => {
            const [newAssignment] = await tx
              .insert(choreAssignments)
              .values({
                choreId: id,
                childId: assignment.childId,
                status: assignment.status,
              })
              .returning();
            return newAssignment;
          })
        );

        return {
          ...updatedChore,
          assignments,
        };
      }

      // If no assignments provided, return chore with existing assignments
      const assignments: ChoreAssignment[] = await tx
        .select()
        .from(choreAssignments)
        .where(eq(choreAssignments.choreId, id));

      return {
        ...updatedChore,
        assignments,
      };
    });
  }

  async deleteChore(id: string) {
    // First delete all assignments for this chore
    await db.delete(choreAssignments).where(eq(choreAssignments.choreId, id));

    // Then delete the chore
    const [deletedChore] = await db
      .delete(chores)
      .where(eq(chores.id, id))
      .returning();

    return deletedChore;
  }

  async getChoreById(id: string) {
    const [chore] = await db.select().from(chores).where(eq(chores.id, id));

    if (!chore) return null;

    const assignments: ChoreAssignment[] = await db
      .select()
      .from(choreAssignments)
      .where(eq(choreAssignments.choreId, id));

    return {
      ...chore,
      assignments,
    };
  }

  async assignChore(data: CreateChoreAssignmentData) {
    const assignments = await Promise.all(
      data.childIds.map(async (childId) => {
        const [assignment] = await db
          .insert(choreAssignments)
          .values({
            choreId: data.choreId,
            childId,
          })
          .returning();
        return assignment;
      })
    );
    return assignments;
  }

  async updateChoreAssignment(
    choreId: string,

    data: UpdateChoreAssignmentData
  ) {
    const [updatedAssignment] = await db
      .update(choreAssignments)
      .set({
        status: data.status,
      })
      .where(
        and(
          eq(choreAssignments.choreId, choreId),
          eq(choreAssignments.childId, data.childId)
        )
      )
      .returning();

    return updatedAssignment;
  }

  async deleteChoreAssignment(choreId: string, childId: string) {
    const [deletedAssignment] = await db
      .delete(choreAssignments)
      .where(
        and(
          eq(choreAssignments.choreId, choreId),
          eq(choreAssignments.childId, childId)
        )
      )
      .returning();

    return deletedAssignment;
  }

  async getChoreAssignment(choreId: string, childId: string) {
    const [assignment] = await db
      .select()
      .from(choreAssignments)
      .where(
        and(
          eq(choreAssignments.choreId, choreId),
          eq(choreAssignments.childId, childId)
        )
      );

    return assignment;
  }
}
