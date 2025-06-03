import { sql } from "drizzle-orm";
import { pgTable, varchar } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  role: varchar("role", { length: 50 }).notNull().default("parent"),
});

export async function up(db: any) {
  await db.schema
    .alterTable("users")
    .addColumn("role", "varchar(50)")
    .notNull()
    .default("parent")
    .check(sql`role IN ('parent', 'child')`);
}

export async function down(db: any) {
  await db.schema.alterTable("users").dropColumn("role");
}
