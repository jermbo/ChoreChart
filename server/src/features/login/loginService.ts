import { db } from "../../db/index.js";
import { users, parents } from "../../db/schema.js";
import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";
import type { LoginData, RegisterData } from "./loginSchema.js";

export class LoginService {
  async existingUser(email: string) {
    const existingUser = await db.query.users.findFirst({
      where: eq(users.email, email),
    });
    return existingUser;
  }

  async createUser(data: RegisterData) {
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

      // 2. Create the parent record
      const [newParent] = await tx
        .insert(parents)
        .values({
          userId: newUser.id,
        })
        .returning();

      // 4. Return user data and token
      const { passwordHash: _, ...userWithoutPassword } = newUser;
      return {
        user: {
          ...userWithoutPassword,
          parentId: newParent.id,
        },
      };
    });
  }

  async loginUser(data: LoginData) {
    // 1. Find user by email
    const user = await this.existingUser(data.email);
    if (!user) {
      throw new Error("User not found");
    }

    // 2. Verify password
    const isValidPassword = await bcrypt.compare(
      data.password,
      user.passwordHash
    );
    if (!isValidPassword) {
      throw new Error("Invalid credentials");
    }

    // 3. Find parent record
    const parent = await db.query.parents.findFirst({
      where: eq(parents.userId, user.id),
    });

    if (!parent) {
      throw new Error("Parent record not found");
    }

    // 4. Return user data and token
    const { passwordHash: _, ...userWithoutPassword } = user;
    return {
      user: {
        ...userWithoutPassword,
        parentId: parent.id,
      },
    };
  }
}
