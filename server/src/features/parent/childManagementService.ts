import { eq } from "drizzle-orm";
import {
  allowanceTransactions,
  children,
  chores,
  users,
  choreAssignments,
} from "../../db/schema.js";
import { db } from "../../db/index.js";
import type { createChildData } from "./childSchema.js";
import bcrypt from "bcrypt";
import type { InferSelectModel } from "drizzle-orm";

type Chore = InferSelectModel<typeof chores>;
type ChoreAssignment = InferSelectModel<typeof choreAssignments>;
type AllowanceTransaction = InferSelectModel<typeof allowanceTransactions>;

export class childManagementService {
  async checkIfExisting(email: string) {
    const usersql = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .as("usersql");
    const result = await db
      .select()
      .from(children)
      .innerJoin(usersql, eq(children.id, usersql.id));

    return result.length > 0;
  }

  async createChild(data: createChildData) {
    const passwordHash = await bcrypt.hash(data.password, 10);

    // Start a transaction
    return await db.transaction(async (tx) => {
      // 1. Create the user
      const [newUser] = await tx
        .insert(users)
        .values({
          email: data.email,
          passwordHash,
          firstName: data.firstName,
          lastName: data.lastName,
        })
        .returning();

      // 2. Create the child record
      const [newChild] = await tx
        .insert(children)
        .values({
          userId: newUser.id,
          parentId: data.parentId,
          baseAllowance: data.baseAllowance.toFixed(2),
        })
        .returning();

      return newChild;
    });
  }

  async getChildrenWithDetails(parentId: string) {
    // First get all children for the parent
    const childrenList = await db
      .select({
        id: children.id,
        userId: children.userId,
        parentId: children.parentId,
        baseAllowance: children.baseAllowance,
        avatarUrl: children.avatarUrl,
        createdAt: children.createdAt,
        updatedAt: children.updatedAt,
        email: users.email,
        firstName: users.firstName,
        lastName: users.lastName,
      })
      .from(children)
      .innerJoin(users, eq(children.userId, users.id))
      .where(eq(children.parentId, parentId));

    // For each child, get their chores and allowance transactions
    const childrenWithDetails = await Promise.all(
      childrenList.map(async (child) => {
        // Get chores
        const childChores = await db
          .select({
            id: chores.id,
            title: chores.title,
            description: chores.description,
            value: chores.value,
            dueDate: chores.dueDate,
            status: choreAssignments.status,
          })
          .from(choreAssignments)
          .innerJoin(chores, eq(choreAssignments.choreId, chores.id))
          .where(eq(choreAssignments.childId, child.id));

        // Get allowance transactions
        const transactions = await db
          .select()
          .from(allowanceTransactions)
          .where(eq(allowanceTransactions.childId, child.id));

        return {
          ...child,
          chores: childChores,
          allowanceTransactions: transactions,
        };
      })
    );

    return childrenWithDetails;
  }
}
