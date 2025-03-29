import { Chore, DailyChore, WeeklyChoreTrack } from "./interfaces";

export const CHORES: Chore[] = [
	{
		id: "1",
		name: "Clean Room",
		description:
			"Clean and organize your bedroom, including making the bed, picking up clothes, dusting, and organizing belongings",
		price: 3,
		frequency: "weekly",
	},
	{
		id: "2",
		name: "Vacuum Living Room",
		description: "Vacuum the living room floor thoroughly, including under furniture",
		price: 2,
		frequency: "weekly",
	},
	{
		id: "3",
		name: "Clean Bathroom",
		description: "Clean the bathroom including toilet, sink, mirror, and floor",
		price: 4,
		frequency: "weekly",
	},
	{
		id: "4",
		name: "Empty Trash Bins",
		description: "Empty and replace trash bags in all household trash bins",
		price: 2,
		frequency: "weekly",
	},
	{
		id: "5",
		name: "Set Dinner Table",
		description: "Set the table for dinner with plates, utensils, napkins, and glasses",
		price: 1,
		frequency: "daily",
	},
	{
		id: "6",
		name: "Clear Dinner Table",
		description: "Clear and clean the table after dinner, including wiping down",
		price: 1,
		frequency: "daily",
	},
	{
		id: "7",
		name: "Load Dishwasher",
		description: "Load the dishwasher with dirty dishes and start it",
		price: 1,
		frequency: "daily",
	},
	{
		id: "8",
		name: "Unload Dishwasher",
		description: "Unload clean dishes from the dishwasher and put them away",
		price: 1,
		frequency: "daily",
	},
	{
		id: "9",
		name: "Clean Kitchen Counters",
		description: "Wipe down all kitchen counters and clean up any spills",
		price: 2,
		frequency: "daily",
	},
	{
		id: "10",
		name: "Walk Dog",
		description: "Take the dog for a 15-minute walk around the neighborhood",
		price: 2,
		frequency: "daily",
	},
	{
		id: "11",
		name: "Feed & Water Pets",
		description: "Fill water bowls and give food to all pets",
		price: 1,
		frequency: "daily",
	},
	{
		id: "12",
		name: "Read 20 Minutes",
		description: "Read a book or educational material for at least 20 minutes",
		price: 1,
		frequency: "daily",
	},
	{
		id: "13",
		name: "Complete Homework",
		description: "Complete all assigned homework for the day",
		price: 2,
		frequency: "daily",
	},
	{
		id: "14",
		name: "Clean Pet Areas",
		description: "Clean litter boxes, pet beds, or other pet areas",
		price: 3,
		frequency: "weekly",
	},
	{
		id: "15",
		name: "Dust Living Room",
		description: "Dust all surfaces in the living room including shelves and electronics",
		price: 2,
		frequency: "weekly",
	},
	{
		id: "16",
		name: "Clean Windows",
		description: "Clean all windows in the house, inside and out",
		price: 4,
		frequency: "weekly",
	},
	{
		id: "17",
		name: "Organize Backpack",
		description: "Organize backpack for school, including homework and supplies",
		price: 1,
		frequency: "daily",
	},
	{
		id: "18",
		name: "Clean Car",
		description: "Clean the inside of the car, including vacuuming and wiping surfaces",
		price: 5,
		frequency: "weekly",
	},
	{
		id: "19",
		name: "Water Plants",
		description: "Water all indoor and outdoor plants",
		price: 1,
		frequency: "weekly",
	},
	{
		id: "20",
		name: "Sort Laundry",
		description: "Sort dirty laundry into appropriate piles (whites, colors, etc.)",
		price: 1,
		frequency: "weekly",
	},
];

const weeklyChores: WeeklyChoreTrack[] = CHORES.filter((chore) => chore.frequency === "weekly").map((chore) => ({
	...chore,
	completed: false,
}));

const daily: DailyChore[] = CHORES.filter((chore) => chore.frequency === "daily").map((chore) => ({
	...chore,
	weekDays: [],
}));

export { weeklyChores, daily };
