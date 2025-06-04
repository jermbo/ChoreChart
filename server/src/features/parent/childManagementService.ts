import { eq, sql } from "drizzle-orm";
import { children, users } from "../../db/schema.js";
import { db } from "../../db/index.js";
import type { createChildData, updateChildData } from "./childSchema.js";
import bcrypt from "bcrypt";

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

      return {
        ...newChild,
        email: newUser.email,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
      };
    });
  }

  async getChildrenWithDetails(parentId: string) {
    // First get all children for the parent
    const childrenList = await db
      .select({
        id: children.id,
        userId: children.userId,
        parentId: children.parentId,
        baseAllowance: sql<number>`CAST(${children.baseAllowance} AS FLOAT)`,
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

    return childrenList;
  }

  async updateChild(data: updateChildData) {
    // Start a transaction to update both tables
    return await db.transaction(async (tx) => {
      // First get the child to get the userId
      const [childDetails] = await tx
        .select()
        .from(children)
        .where(eq(children.id, data.id));

      if (!childDetails) {
        throw new Error("Child not found");
      }

      // Update the user details
      const [updatedUser] = await tx
        .update(users)
        .set({
          email: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
          updatedAt: new Date(),
        })
        .where(eq(users.id, childDetails.userId))
        .returning();

      // Update the child details
      const [updatedChild] = await tx
        .update(children)
        .set({
          baseAllowance: sql<number>`CAST(${data.baseAllowance} AS FLOAT)`,
          updatedAt: new Date(),
        })
        .where(eq(children.id, data.id))
        .returning();

      // Return combined data
      return {
        ...updatedChild,
        email: updatedUser.email,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
      };
    });
  }

  async deleteChild(id: string) {
    const child = await db
      .delete(children)
      .where(eq(children.id, id))
      .returning();
    return child;
  }
}
