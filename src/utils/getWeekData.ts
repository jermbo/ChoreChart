import { DayInfo } from "../interfaces";

interface WeekData {
  weekInfo: DayInfo[];
  weekTimeStamp: string;
}

const getWeekData = (date: Date): WeekData => {
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

export default getWeekData;
