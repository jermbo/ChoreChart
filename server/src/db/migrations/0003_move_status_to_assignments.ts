import { sql } from "drizzle-orm";
import { pgTable, varchar } from "drizzle-orm/pg-core";

export async function up(db: any): Promise<void> {
  // Add status column to chore_assignments
  await db.execute(sql`
    ALTER TABLE chore_assignments 
    ADD COLUMN status VARCHAR(50) NOT NULL DEFAULT 'pending'
  `);

  // Copy status from chores to chore_assignments
  await db.execute(sql`
    UPDATE chore_assignments ca
    SET status = c.status
    FROM chores c
    WHERE ca.chore_id = c.id
  `);

  // Remove status column from chores
  await db.execute(sql`
    ALTER TABLE chores 
    DROP COLUMN status
  `);
}

export async function down(db: any): Promise<void> {
  // Add status column back to chores
  await db.execute(sql`
    ALTER TABLE chores 
    ADD COLUMN status VARCHAR(50) NOT NULL DEFAULT 'pending'
  `);

  // Copy status back from chore_assignments to chores
  await db.execute(sql`
    UPDATE chores c
    SET status = ca.status
    FROM chore_assignments ca
    WHERE c.id = ca.chore_id
  `);

  // Remove status column from chore_assignments
  await db.execute(sql`
    ALTER TABLE chore_assignments 
    DROP COLUMN status
  `);
}
