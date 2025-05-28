import { eq } from "drizzle-orm";
import { children, users } from "../../db/schema.js";
import { db } from "../../db/index.js";
import type { createChildData } from "./childSchema.js";
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

      return newChild;
    });
  }
}
