import { sql } from "drizzle-orm";

export async function up(db: any) {
  // Create chore_assignments table
  await db.schema
    .createTable("chore_assignments")
    .addColumn("id", "uuid", {
      primaryKey: true,
      defaultValue: sql`gen_random_uuid()`,
    })
    .addColumn("chore_id", "uuid", { notNull: true, references: "chores.id" })
    .addColumn("child_id", "uuid", { notNull: true, references: "children.id" })
    .addColumn("created_at", "timestamp", {
      notNull: true,
      defaultValue: sql`now()`,
    })
    .addColumn("updated_at", "timestamp", {
      notNull: true,
      defaultValue: sql`now()`,
    })
    .execute();
}

export async function down(db: any) {
  // Drop chore_assignments table
  await db.schema.dropTable("chore_assignments").execute();
}
