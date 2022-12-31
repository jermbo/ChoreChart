const getDaysOfCurrentWeek = (date: Date): Intl.DateTimeFormatPart[][] => {
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const intl = new Intl.DateTimeFormat("en-US", options);
  const modifiedDate = new Date(date);
  const weekData: Intl.DateTimeFormatPart[][] = [];
  modifiedDate.setDate(modifiedDate.getDate() - modifiedDate.getDay() + 1);
  for (let i = 1; i <= 7; i++) {
    const data: Intl.DateTimeFormatPart[] = intl
      .formatToParts(new Date(modifiedDate))
      .filter((d) => d.type != "literal");
    weekData.push(data);
    modifiedDate.setDate(modifiedDate.getDate() + 1);
  }
  return weekData;
};
export default getDaysOfCurrentWeek;
// const daysOfTheWeek = getDaysOfCurrentWeek(today);
// console.log(daysOfTheWeek);
