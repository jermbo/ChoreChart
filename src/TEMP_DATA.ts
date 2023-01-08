import { Chore, DailyChore, WeeklyChoreTrack } from "./interfaces";

export const CHORES: Chore[] = [
  {
    id: 1,
    name: "Clean Room",
    price: 2,
    type: "weekly",
  },
  {
    id: 2,
    name: "Clean Living Room",
    price: 1,
    type: "weekly",
  },
  {
    id: 3,
    name: "Bathroom Trash Bins",
    price: 1.5,
    type: "weekly",
  },
  {
    id: 4,
    name: "Set Table",
    price: 0.5,
    type: "daily",
  },
  {
    id: 5,
    name: "Clear Table",
    price: 0.5,
    type: "daily",
  },
  {
    id: 6,
    name: "Vacuum Bedroom",
    price: 0.5,
    type: "weekly",
  },
  {
    id: 7,
    name: "Vacuum Living Room",
    price: 0.5,
    type: "weekly",
  },
  {
    id: 8,
    name: "Vacuum Back Room",
    price: 0.5,
    type: "weekly",
  },
  {
    id: 9,
    name: "Vacuum Craft Room",
    price: 0.5,
    type: "weekly",
  },
  {
    id: 10,
    name: "Walk Dog",
    price: 0.75,
    type: "daily",
  },
  {
    id: 11,
    name: "Feed / Water Dog",
    price: 0.25,
    type: "daily",
  },
  {
    id: 12,
    name: "Read 15 Minutes",
    price: 0.5,
    type: "daily",
  },
  {
    id: 13,
    name: "Complete Home Work",
    price: 0.5,
    type: "daily",
  },
];

const weeklyChores: WeeklyChoreTrack[] = [
  {
    id: 1,
    name: "asdasd",
    price: 0.5,
    type: "weekly",
    completed: false,
  },
];

const daily: DailyChore[] = [
  {
    id: 1,
    name: "asdasd",
    price: 0.5,
    type: "weekly",
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
