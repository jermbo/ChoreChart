import { Chore, DailyChore, WeeklyChoreTrack } from "./interfaces";

export const CHORES: Chore[] = [
	{
		id: "1",
		name: "Clean Room",
		description: "Clean and organize your bedroom, including making the bed, picking up clothes, and dusting",
		price: 2,
		frequency: "weekly",
	},
	{
		id: "2",
		name: "Clean Living Room",
		description: "Clean the living room by vacuuming, dusting, and organizing items",
		price: 1,
		frequency: "weekly",
	},
	{
		id: "3",
		name: "Bathroom Trash Bins",
		description: "Empty and replace trash bags in all bathroom trash bins",
		price: 1.5,
		frequency: "weekly",
	},
	{
		id: "4",
		name: "Set Table",
		description: "Set the table for dinner with plates, utensils, and napkins",
		price: 0.5,
		frequency: "daily",
	},
	{
		id: "5",
		name: "Clear Table",
		description: "Clear and clean the table after dinner",
		price: 0.5,
		frequency: "daily",
	},
	{
		id: "6",
		name: "Vacuum Bedroom",
		description: "Vacuum your bedroom floor thoroughly",
		price: 0.5,
		frequency: "weekly",
	},
	{
		id: "7",
		name: "Vacuum Living Room",
		description: "Vacuum the living room floor thoroughly",
		price: 0.5,
		frequency: "weekly",
	},
	{
		id: "8",
		name: "Vacuum Back Room",
		description: "Vacuum the back room floor thoroughly",
		price: 0.5,
		frequency: "weekly",
	},
	{
		id: "9",
		name: "Vacuum Craft Room",
		description: "Vacuum the craft room floor thoroughly",
		price: 0.5,
		frequency: "weekly",
	},
	{
		id: "10",
		name: "Walk Dog",
		description: "Take the dog for a walk around the neighborhood",
		price: 0.75,
		frequency: "daily",
	},
	{
		id: "11",
		name: "Feed / Water Dog",
		description: "Fill the dog's water bowl and give them their food",
		price: 0.25,
		frequency: "daily",
	},
	{
		id: "12",
		name: "Read 15 Minutes",
		description: "Read a book or educational material for at least 15 minutes",
		price: 0.5,
		frequency: "daily",
	},
	{
		id: "13",
		name: "Complete Home Work",
		description: "Complete all assigned homework for the day",
		price: 0.5,
		frequency: "daily",
	},
];

const weeklyChores: WeeklyChoreTrack[] = [
	{
		id: "1",
		name: "asdasd",
		description: "Test weekly chore",
		price: 0.5,
		frequency: "weekly",
		completed: false,
	},
];

const daily: DailyChore[] = [
	{
		id: "1",
		name: "asdasd",
		description: "Test daily chore",
		price: 0.5,
		frequency: "weekly",
		weekDays: [
			{
				completed: true,
				day: 1,
				weekday: "Friday",
				month: "April",
				year: 2022,
			},
		],
	},
];
