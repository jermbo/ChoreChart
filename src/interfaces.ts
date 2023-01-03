import { WeekDay, Month } from "./types";

export interface Chore {
  id: number;
  name: string;
  price: number;
}

export interface WeekDayInfo {
  weekday: WeekDay;
  day: number;
  month: Month;
  year: number;
}

export interface WeekTrack extends WeekDayInfo {
  completed: boolean;
}

export interface WeeklyChores extends Chore {
  weekDays: WeekTrack[];
}
