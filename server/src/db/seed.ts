import { db } from "./index.js";
import {
	users,
	parents,
	children,
	chores,
	choreAssignments,
	allowanceTransactions,
} from "./schema.js";
import { v4 as uuidv4 } from "uuid";
import * as bcrypt from "bcrypt";

async function seed() {
	const now = new Date();
	const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

	// Create test parent user
	const parentUserId = uuidv4();
	await db.insert(users).values({
		id: parentUserId,
		email: "test.parent@example.com",
		passwordHash: await bcrypt.hash("test1234", 10),
		firstName: "Test",
		lastName: "Parent",
		createdAt: oneWeekAgo,
		updatedAt: oneWeekAgo,
	});

	// Create parent record
	const parentId = uuidv4();
	await db.insert(parents).values({
		id: parentId,
		userId: parentUserId,
		createdAt: oneWeekAgo,
		updatedAt: oneWeekAgo,
	});

	// Create test child user
	const childUserId = uuidv4();
	await db.insert(users).values({
		id: childUserId,
		email: "test.child@example.com",
		passwordHash: await bcrypt.hash("test1234", 10),
		firstName: "Test",
		lastName: "Child",
		role: "child",
		createdAt: oneWeekAgo,
		updatedAt: oneWeekAgo,
	});

	// Create child record
	const childId = uuidv4();
	await db.insert(children).values({
		id: childId,
		userId: childUserId,
		parentId: parentId,
		baseAllowance: "10.00",
		avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=TestChild",
		createdAt: oneWeekAgo,
		updatedAt: oneWeekAgo,
	});

	// Create three chores
	const choreDate1 = new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000);
	const choreDate2 = new Date(now.getTime() + 1 * 24 * 60 * 60 * 1000);
	const choreDate3 = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000);

	const chore1Id = uuidv4();
	const chore2Id = uuidv4();
	const chore3Id = uuidv4();

	await db.insert(chores).values([
		{
			id: chore1Id,
			title: "Clean Room",
			description: "Make bed, vacuum floor, organize desk",
			value: "5.00",
			dueDate: choreDate1,
			createdAt: oneWeekAgo,
			updatedAt: now,
		},
		{
			id: chore2Id,
			title: "Do Laundry",
			description: "Wash, dry, and fold clothes",
			value: "3.00",
			dueDate: choreDate2,
			createdAt: oneWeekAgo,
			updatedAt: oneWeekAgo,
		},
		{
			id: chore3Id,
			title: "Take Out Trash",
			description: "Empty all trash bins and replace bags",
			value: "2.00",
			dueDate: choreDate3,
			createdAt: oneWeekAgo,
			updatedAt: oneWeekAgo,
		},
	]);

	// Create chore assignments
	await db.insert(choreAssignments).values([
		{
			id: uuidv4(),
			choreId: chore1Id,
			childId: childId,
			status: "completed",
			createdAt: oneWeekAgo,
			updatedAt: now,
		},
		{
			id: uuidv4(),
			choreId: chore2Id,
			childId: childId,
			status: "pending",
			createdAt: oneWeekAgo,
			updatedAt: oneWeekAgo,
		},
		{
			id: uuidv4(),
			choreId: chore3Id,
			childId: childId,
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
			id: uuidv4(),
			childId: childId,
			amount: "5.00",
			type: "chore_completion",
			description: "Completed room cleaning",
			transactionDate: transDate1,
			createdAt: transDate1,
			updatedAt: transDate1,
		},
		{
			id: uuidv4(),
			childId: childId,
			amount: "3.00",
			type: "chore_completion",
			description: "Completed laundry",
			transactionDate: transDate2,
			createdAt: transDate2,
			updatedAt: transDate2,
		},
		{
			id: uuidv4(),
			childId: childId,
			amount: "2.00",
			type: "base_allowance",
			description: "Weekly base allowance",
			transactionDate: transDate3,
			createdAt: transDate3,
			updatedAt: transDate3,
		},
	]);

	console.log("Seed data inserted successfully!");
}

seed().catch(console.error);
