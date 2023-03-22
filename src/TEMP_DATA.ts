import { Chore, DailyChore, WeeklyChoreTrack } from "./interfaces";

export const CHORES: Chore[] = [
	{
		id: 1,
		name: "Clean Room",
		price: 2,
		frequency: "weekly",
	},
	{
		id: 2,
		name: "Clean Living Room",
		price: 1,
		frequency: "weekly",
	},
	{
		id: 3,
		name: "Bathroom Trash Bins",
		price: 1.5,
		frequency: "weekly",
	},
	{
		id: 4,
		name: "Set Table",
		price: 0.5,
		frequency: "daily",
	},
	{
		id: 5,
		name: "Clear Table",
		price: 0.5,
		frequency: "daily",
	},
	{
		id: 6,
		name: "Vacuum Bedroom",
		price: 0.5,
		frequency: "weekly",
	},
	{
		id: 7,
		name: "Vacuum Living Room",
		price: 0.5,
		frequency: "weekly",
	},
	{
		id: 8,
		name: "Vacuum Back Room",
		price: 0.5,
		frequency: "weekly",
	},
	{
		id: 9,
		name: "Vacuum Craft Room",
		price: 0.5,
		frequency: "weekly",
	},
	{
		id: 10,
		name: "Walk Dog",
		price: 0.75,
		frequency: "daily",
	},
	{
		id: 11,
		name: "Feed / Water Dog",
		price: 0.25,
		frequency: "daily",
	},
	{
		id: 12,
		name: "Read 15 Minutes",
		price: 0.5,
		frequency: "daily",
	},
	{
		id: 13,
		name: "Complete Home Work",
		price: 0.5,
		frequency: "daily",
	},
];

const weeklyChores: WeeklyChoreTrack[] = [
	{
		id: 1,
		name: "asdasd",
		price: 0.5,
		frequency: "weekly",
		completed: false,
	},
];

const daily: DailyChore[] = [
	{
		id: 1,
		name: "asdasd",
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
