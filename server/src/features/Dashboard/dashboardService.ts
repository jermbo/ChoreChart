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

    const choresData = childChores.map((c) => c.chores);
    return choresData;
  }

  static async getParentDashboard(parentId: string) {
    // Get children
    const parentChildren = await db
      .select()
      .from(children)
      .where(eq(children.parentId, parentId));

    // Get all chores for all children
    const allChores = await db
      .select()
      .from(chores)
      .innerJoin(choreAssignments, eq(chores.id, choreAssignments.choreId))
      .innerJoin(children, eq(choreAssignments.childId, children.id))
      .innerJoin(users, eq(children.userId, users.id))
      .where(eq(children.parentId, parentId));

    // Calculate stats
    const stats = {
      totalChildren: parentChildren.length,
      totalChores: allChores.length,
      activeChores: allChores.filter((c) =>
        ["pending", "in_progress"].includes(c.chore_assignments.status)
      ).length,
      completedChores: allChores.filter((c) =>
        ["completed", "verified"].includes(c.chore_assignments.status)
      ).length,
      totalAllowancePaid: allChores
        .filter((c) => c.chore_assignments.status === "verified")
        .reduce((sum, c) => sum + Number(c.chores.value), 0),
    };

    //Calculate child-specific stats
    const childrenWithStats = await Promise.all(
      parentChildren.map(async (child) => {
        const childChores = allChores.filter(
          (c) => c.chore_assignments.childId === child.id
        );
        return {
          id: child.id,
          // firstName: child.users.firstName,
          // lastName: child.users.lastName,
          avatarUrl: child.avatarUrl,
          completedChores: childChores.filter((c) =>
            ["completed", "verified"].includes(c.chore_assignments.status)
          ).length,
          pendingChores: childChores.filter((c) =>
            ["pending", "in_progress"].includes(c.chore_assignments.status)
          ).length,
          totalEarnings: childChores
            .filter((c) => c.chore_assignments.status === "verified")
            .reduce((sum, c) => sum + Number(c.chores.value), 0),
        };
      })
    );

    return {
      stats,
      children: childrenWithStats,
      recentActivity: [],
      // await this.getParentRecentActivity(parentId),
    };
  }
}
