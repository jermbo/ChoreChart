import { WeekDayInfo } from "../interfaces";

const getDaysOfCurrentWeek = (date: Date): WeekDayInfo[] => {
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const intl = new Intl.DateTimeFormat("en-US", options);
  const modifiedDate = new Date(date);
  const weekData: WeekDayInfo[] = [];
  modifiedDate.setDate(modifiedDate.getDate() - modifiedDate.getDay() + 1);

  for (let i = 1; i <= 7; i++) {
    const dataData: Intl.DateTimeFormatPart[] = intl
      .formatToParts(new Date(modifiedDate))
      .filter((d) => d.type != "literal");

    const newWeekDayInfo: WeekDayInfo = dataData.reduce((acc, d) => {
      //@ts-ignore
      acc[d.type] = d.value;
      return acc;
    }, {} as WeekDayInfo);
    weekData.push(newWeekDayInfo);
    modifiedDate.setDate(modifiedDate.getDate() + 1);
  }
  return weekData;
};
export default getDaysOfCurrentWeek;
