import { sql } from "drizzle-orm";
import { db } from "./index.js";
import { parents, children, chores, allowanceTransactions } from "./schema.js";
import { v4 as uuidv4 } from "uuid";
import * as bcrypt from "bcrypt";

async function seed() {
	const now = new Date();
	const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

	// Create test parent
	const parentId = uuidv4();
	await db.insert(parents).values({
		email: "test.parent@example.com",
		passwordHash: await bcrypt.hash("test123", 10),
		firstName: "Test",
		lastName: "Parent",
		role: "parent",
		createdAt: oneWeekAgo,
		updatedAt: oneWeekAgo,
	});

	// Create test child
	const childId = uuidv4();
	await db.insert(children).values({
		parentId,
		firstName: "Test",
		lastName: "Child",
		baseAllowance: "10.00",
		avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=TestChild",
		createdAt: oneWeekAgo,
		updatedAt: oneWeekAgo,
	});

	// Create three chores with different statuses
	const choreDate1 = new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000);
	const choreDate2 = new Date(now.getTime() + 1 * 24 * 60 * 60 * 1000);
	const choreDate3 = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000);

	await db.insert(chores).values([
		{
			childId,
			title: "Clean Room",
			description: "Make bed, vacuum floor, organize desk",
			value: "5.00",
			dueDate: choreDate1,
			status: "completed",
			createdAt: oneWeekAgo,
			updatedAt: now,
		},
		{
			childId,
			title: "Do Laundry",
			description: "Wash, dry, and fold clothes",
			value: "3.00",
			dueDate: choreDate2,
			status: "pending",
			createdAt: oneWeekAgo,
			updatedAt: oneWeekAgo,
		},
		{
			childId,
			title: "Take Out Trash",
			description: "Empty all trash bins and replace bags",
			value: "2.00",
			dueDate: choreDate3,
			status: "pending",
			createdAt: oneWeekAgo,
			updatedAt: oneWeekAgo,
		},
	]);

	// Create three allowance transactions
	const transDate1 = new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000);
	const transDate2 = new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000);
	const transDate3 = new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000);

	await db.insert(allowanceTransactions).values([
		{
			childId,
			amount: "10.00",
			type: "allowance",
			description: "Weekly allowance",
			transactionDate: transDate1,
			createdAt: transDate1,
			updatedAt: transDate1,
		},
		{
			childId,
			amount: "5.00",
			type: "chore",
			description: "Completed: Clean Room",
			transactionDate: transDate2,
			createdAt: transDate2,
			updatedAt: transDate2,
		},
		{
			childId,
			amount: "-8.00",
			type: "withdrawal",
			description: "Toy purchase",
			transactionDate: transDate3,
			createdAt: transDate3,
			updatedAt: transDate3,
		},
	]);

	console.log("Seed data inserted successfully!");
}

seed().catch(console.error);
