import { sql } from "drizzle-orm";
import {
	pgTable,
	uuid,
	varchar,
	timestamp,
	decimal,
	text,
} from "drizzle-orm/pg-core";

export async function up(db: any) {
	await db.schema
		.createTable("parents")
		.addColumn("id", "uuid", {
			primaryKey: true,
			defaultValue: sql`gen_random_uuid()`,
		})
		.addColumn("email", "varchar(255)", { notNull: true, unique: true })
		.addColumn("password_hash", "varchar(255)", { notNull: true })
		.addColumn("first_name", "varchar(100)", { notNull: true })
		.addColumn("last_name", "varchar(100)", { notNull: true })
		.addColumn("role", "varchar(50)", { notNull: true, defaultValue: "parent" })
		.addColumn("created_at", "timestamp", {
			notNull: true,
			defaultValue: sql`now()`,
		})
		.addColumn("updated_at", "timestamp", {
			notNull: true,
			defaultValue: sql`now()`,
		})
		.execute();

	await db.schema
		.createTable("children")
		.addColumn("id", "uuid", {
			primaryKey: true,
			defaultValue: sql`gen_random_uuid()`,
		})
		.addColumn("parent_id", "uuid", { notNull: true, references: "parents.id" })
		.addColumn("first_name", "varchar(100)", { notNull: true })
		.addColumn("last_name", "varchar(100)", { notNull: true })
		.addColumn("base_allowance", "decimal(10,2)", {
			notNull: true,
			defaultValue: "0",
		})
		.addColumn("avatar_url", "text")
		.addColumn("created_at", "timestamp", {
			notNull: true,
			defaultValue: sql`now()`,
		})
		.addColumn("updated_at", "timestamp", {
			notNull: true,
			defaultValue: sql`now()`,
		})
		.execute();

	await db.schema
		.createTable("chores")
		.addColumn("id", "uuid", {
			primaryKey: true,
			defaultValue: sql`gen_random_uuid()`,
		})
		.addColumn("child_id", "uuid", { notNull: true, references: "children.id" })
		.addColumn("title", "varchar(255)", { notNull: true })
		.addColumn("description", "text")
		.addColumn("value", "decimal(10,2)", { notNull: true })
		.addColumn("due_date", "timestamp", { notNull: true })
		.addColumn("status", "varchar(50)", {
			notNull: true,
			defaultValue: "pending",
		})
		.addColumn("created_at", "timestamp", {
			notNull: true,
			defaultValue: sql`now()`,
		})
		.addColumn("updated_at", "timestamp", {
			notNull: true,
			defaultValue: sql`now()`,
		})
		.execute();

	await db.schema
		.createTable("allowance_transactions")
		.addColumn("id", "uuid", {
			primaryKey: true,
			defaultValue: sql`gen_random_uuid()`,
		})
		.addColumn("child_id", "uuid", { notNull: true, references: "children.id" })
		.addColumn("amount", "decimal(10,2)", { notNull: true })
		.addColumn("type", "varchar(50)", { notNull: true })
		.addColumn("description", "text")
		.addColumn("transaction_date", "timestamp", { notNull: true })
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
	await db.schema.dropTable("allowance_transactions").execute();
	await db.schema.dropTable("chores").execute();
	await db.schema.dropTable("children").execute();
	await db.schema.dropTable("parents").execute();
}
