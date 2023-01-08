import { ChangeEvent, useEffect, useState } from "react";
import { DailyChore } from "../interfaces";
import { CHORES } from "../TEMP_DATA";
import { getDaysOfCurrentWeek } from "../utils/utils";

interface Props {}

const ChoreList: React.FC<Props> = ({}) => {
  const [currentChores, setCurrentChores] = useState<DailyChore[]>([]);
  const [currentWeekStamp, setCurrentWeekStamp] = useState("");

  useEffect(() => {
    console.clear();
    const weekInfo = getDaysOfCurrentWeek(new Date()).map((i) => ({
      ...i,
      completed: false,
    }));

    const tempChoreList: DailyChore[] = CHORES.map((chore) => {
      return {
        ...chore,
        weekDays: weekInfo,
      };
    });
    const weekStamp = `${weekInfo[0].day}-${weekInfo[0].month}-${weekInfo[0].year}`;
    setCurrentWeekStamp(weekStamp);
    const local = localStorage.getItem(weekStamp);

    if (local) {
      const localChores = JSON.parse(local) as DailyChore[];
      setCurrentChores(localChores);
      return;
    }
    localStorage.setItem(weekStamp, JSON.stringify(tempChoreList));
    setCurrentChores(tempChoreList);
  }, []);

  const updateChoreForDay = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = e.target;
    const [weekday, choreName] = id.split("-");
    const updatedChore: DailyChore[] = currentChores.map((chore) => {
      return {
        ...chore,
        weekDays: chore.weekDays.map((day) => {
          const currentChoreAndDay =
            chore.name == choreName && day.weekday === weekday;
          return {
            ...day,
            completed: currentChoreAndDay ? checked : day.completed,
          };
        }),
      };
    });
    setCurrentChores(updatedChore);
    localStorage.setItem(currentWeekStamp, JSON.stringify(updatedChore));
  };

  return (
    <table className="chores">
      <tbody>
        {currentChores.map((currentWeekChore) => {
          return (
            <tr key={currentWeekChore.id}>
              <td>{currentWeekChore.name}</td>
              {currentWeekChore.weekDays.map((weekDay) => {
                const uniqueId = `${weekDay.weekday}-${currentWeekChore.name}`;
                return (
                  <td key={weekDay.weekday}>
                    <input
                      id={uniqueId}
                      type="checkbox"
                      onChange={updateChoreForDay}
                      checked={weekDay.completed}
                    />
                    <br />
                    <label htmlFor={uniqueId}>
                      {uniqueId} - {JSON.stringify(weekDay.completed)}
                    </label>
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default ChoreList;
