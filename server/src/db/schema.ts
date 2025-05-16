import {
	pgTable,
	uuid,
	varchar,
	timestamp,
	decimal,
	text,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

// Example schema - we'll expand this later
export const users = pgTable("users", {
	id: uuid("id").primaryKey().defaultRandom(),
	email: text("email").notNull().unique(),
	name: text("name").notNull(),
	createdAt: timestamp("created_at").defaultNow().notNull(),
	updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const parents = pgTable("parents", {
	id: uuid("id").primaryKey().defaultRandom(),
	email: varchar("email", { length: 255 }).unique().notNull(),
	passwordHash: varchar("password_hash", { length: 255 }).notNull(),
	firstName: varchar("first_name", { length: 100 }).notNull(),
	lastName: varchar("last_name", { length: 100 }).notNull(),
	role: varchar("role", { length: 50 }).notNull().default("parent"),
	createdAt: timestamp("created_at").defaultNow().notNull(),
	updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const children = pgTable("children", {
	id: uuid("id").primaryKey().defaultRandom(),
	parentId: uuid("parent_id")
		.references(() => parents.id)
		.notNull(),
	firstName: varchar("first_name", { length: 100 }).notNull(),
	lastName: varchar("last_name", { length: 100 }).notNull(),
	baseAllowance: decimal("base_allowance", { precision: 10, scale: 2 })
		.notNull()
		.default("0"),
	avatarUrl: text("avatar_url"),
	createdAt: timestamp("created_at").defaultNow().notNull(),
	updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const chores = pgTable("chores", {
	id: uuid("id").primaryKey().defaultRandom(),
	childId: uuid("child_id")
		.references(() => children.id)
		.notNull(),
	title: varchar("title", { length: 255 }).notNull(),
	description: text("description"),
	value: decimal("value", { precision: 10, scale: 2 }).notNull(),
	dueDate: timestamp("due_date").notNull(),
	status: varchar("status", { length: 50 }).notNull().default("pending"),
	createdAt: timestamp("created_at").defaultNow().notNull(),
	updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const allowanceTransactions = pgTable("allowance_transactions", {
	id: uuid("id").primaryKey().defaultRandom(),
	childId: uuid("child_id")
		.references(() => children.id)
		.notNull(),
	amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
	type: varchar("type", { length: 50 }).notNull(),
	description: text("description"),
	transactionDate: timestamp("transaction_date").notNull(),
	createdAt: timestamp("created_at").defaultNow().notNull(),
	updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
