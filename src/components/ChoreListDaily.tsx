import { ChangeEvent, useContext } from "react";
import { ChoreContext } from "../context/ChoreContext";
import { DailyChore } from "../interfaces";
import ChoreDays from "./ChoreListDays";
import Heading from "./Heading";

interface Props {}

const ChoreListDaily: React.FC<Props> = ({}) => {
  const { weeklyChoreGroup, weeklyTimeStamp, updateDailyChore } =
    useContext(ChoreContext);

  const doTheUpdate = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = e.target;
    const [weekday, choreName] = id.split("-");
    const specificChore = weeklyChoreGroup.daily.filter(
      (chore) => chore.name == choreName
    )[0];
    const updateWeekDayInfo = specificChore.weekDays.map((day) => {
      if (day.weekday == weekday) {
        day.completed = checked;
      }
      return day;
    });

    const updateDay: DailyChore = {
      ...specificChore,
      weekDays: updateWeekDayInfo,
    };

    updateDailyChore(weeklyTimeStamp, updateDay);
  };
  return (
    <section>
      <Heading />
      <table>
        <thead>
          <tr>
            <th>Chore Name</th>
            <th>Monday</th>
            <th>Tuesday</th>
            <th>Wednesday</th>
            <th>Thursday</th>
            <th>Friday</th>
            <th>Saturday</th>
            <th>Sunday</th>
          </tr>
        </thead>
        <tbody>
          {weeklyChoreGroup?.daily?.map((chore) => {
            return (
              <tr key={chore.name}>
                <td>{chore.name}</td>
                <ChoreDays
                  days={chore.weekDays}
                  choreName={chore.name}
                  handleChoreUpdate={doTheUpdate}
                />
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
};

export default ChoreListDaily;
