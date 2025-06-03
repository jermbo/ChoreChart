import { db } from "../../db/index.js";
import { chores, children, choreAssignments, users } from "../../db/schema.js";
import { eq, and, desc, sql } from "drizzle-orm";

export class DashboardService {
  static async getChildDashboard(childId: string) {
    // Get chores for the child
    const childChores = await db
      .select()
      .from(chores)
      .innerJoin(choreAssignments, eq(chores.id, choreAssignments.choreId))
      .where(eq(choreAssignments.childId, childId))
      .orderBy(desc(chores.dueDate));

    const choresData = childChores.map((c) => {
      return {
        ...c.chores,
        status: c.chore_assignments.status,
        assignmentId: c.chore_assignments.id,
        varifiedAt: c.chore_assignments.verifiedAt,
        comments: c.chore_assignments.comment,
      };
    });
    return choresData;
  }

  static async getParentDashboard(parentId: string) {
    // Get all chores for all children
    return await db
      .select({
        id: chores.id,
        title: chores.title,
        description: chores.description,
        value: chores.value,
        dueDate: chores.dueDate,
        status: choreAssignments.status,
        assignmentId: choreAssignments.id,
        childId: children.id,
        childName: sql<string>`CONCAT(${users.firstName}, ' ', ${users.lastName})`,
      })
      .from(chores)
      .innerJoin(choreAssignments, eq(chores.id, choreAssignments.choreId))
      .innerJoin(children, eq(choreAssignments.childId, children.id))
      .innerJoin(users, eq(children.userId, users.id))
      .where(eq(children.parentId, parentId));
  }
}
