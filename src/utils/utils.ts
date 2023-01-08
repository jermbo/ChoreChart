import {
  Chore,
  ChoreGroup,
  DailyChore,
  DayInfo,
  WeeklyChoreTrack,
} from "../interfaces";
import { CHORES } from "../TEMP_DATA";

interface WeekData {
  weekInfo: DayInfo[];
  weekTimeStamp: string;
}
export const getWeekData = (date: Date): WeekData => {
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const intl = new Intl.DateTimeFormat("en-US", options);
  const modifiedDate = new Date(date);
  const weekInfo: DayInfo[] = [];
  modifiedDate.setDate(modifiedDate.getDate() - modifiedDate.getDay() + 1);

  for (let i = 1; i <= 7; i++) {
    const dataData: Intl.DateTimeFormatPart[] = intl
      .formatToParts(new Date(modifiedDate))
      .filter((d) => d.type != "literal");

    const newWeekDayInfo: DayInfo = dataData.reduce((acc, d) => {
      //@ts-ignore
      acc[d.type] = d.value;
      return acc;
    }, {} as DayInfo);
    weekInfo.push(newWeekDayInfo);
    modifiedDate.setDate(modifiedDate.getDate() + 1);
  }

  const weekTimeStamp = `${weekInfo[0].day}-${weekInfo[0].month}-${weekInfo[0].year}`;
  return { weekInfo, weekTimeStamp };
};

interface BuildLocalDataParams {
  weekTimeStamp: string;
  weekly: WeeklyChoreTrack[];
  daily: DailyChore[];
}
export const buildLocalData = ({
  weekTimeStamp,
  daily,
  weekly,
}: BuildLocalDataParams): ChoreGroup => {
  const data: ChoreGroup = {};
  data[weekTimeStamp] = {
    weekTimeStamp,
    daily,
    weekly,
  };
  return data;
};

export const buildDailyChores = (weekInfo: DayInfo[]) => {
  const dailyGroup: Chore[] = CHORES.filter((chore) => chore.type == "daily");
  const dailyChores: DailyChore[] = dailyGroup.map((chore) => {
    const data: DailyChore = {
      ...chore,
      weekDays: weekInfo.map((w) => ({ ...w, completed: false })),
    };
    return data;
  });
  return dailyChores;
};

export const buildWeeklyChores = () => {
  const weeklyGroup: Chore[] = CHORES.filter((chore) => chore.type == "weekly");
  const weeklyChores: WeeklyChoreTrack[] = weeklyGroup.map((chore) => {
    const data: WeeklyChoreTrack = {
      ...chore,
      completed: false,
    };
    return data;
  });
  return weeklyChores;
};
