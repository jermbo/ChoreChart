import { WeekDay, Month, CHORE_TYPE } from "./types";

export interface Chore {
  id: number;
  name: string;
  price: number;
  type: CHORE_TYPE;
}

export interface DayInfo {
  weekday: WeekDay;
  day: number;
  month: Month;
  year: number;
}

export interface DailyChoreTrack extends DayInfo {
  completed: boolean;
}

export interface DailyChore extends Chore {
  weekDays: DailyChoreTrack[];
}

export interface WeeklyChoreTrack extends Chore {
  completed: boolean;
}

export interface WeeklyChoreGroup {
  weekTimeStamp: string;
  daily: DailyChore[];
  weekly: WeeklyChoreTrack[];
}

export interface ChoreGroup {
  [key: string]: WeeklyChoreGroup;
}
