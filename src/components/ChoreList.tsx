import { ChangeEvent, useEffect, useState } from "react";
import { WeeklyChores } from "../interfaces";
import { CHORES } from "../TEMP_DATA";
import getDaysOfCurrentWeek from "../utils/getDaysOfCurrentWeek";

interface Props {}

const ChoreList: React.FC<Props> = ({}) => {
  const [currentWeekChores, setCurrentWeekChores] = useState<WeeklyChores[]>(
    []
  );
  const [currentWeekStamp, setCurrentWeekStamp] = useState("");

  useEffect(() => {
    console.clear();
    const weekInfo = getDaysOfCurrentWeek(new Date()).map((i) => ({
      ...i,
      completed: false,
    }));

    const tempChoreList: WeeklyChores[] = CHORES.map((chore) => {
      return {
        ...chore,
        weekDays: weekInfo,
      };
    });
    const weekStamp = `${weekInfo[0].day}-${weekInfo[0].month}-${weekInfo[0].year}`;
    setCurrentWeekStamp(weekStamp);
    const local = localStorage.getItem(weekStamp);

    if (local) {
      const localChores = JSON.parse(local) as WeeklyChores[];
      setCurrentWeekChores(localChores);
      return;
    }
    localStorage.setItem(weekStamp, JSON.stringify(tempChoreList));
    setCurrentWeekChores(tempChoreList);
  }, []);

  const updateChoreForDay = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = e.target;
    const [weekday, choreName] = id.split("-");
    const updatedChore: WeeklyChores[] = currentWeekChores.map((chore) => {
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
    setCurrentWeekChores(updatedChore);
    localStorage.setItem(currentWeekStamp, JSON.stringify(updatedChore));
  };

  return (
    <table className="chores">
      <tbody>
        {currentWeekChores.map((currentWeekChore) => {
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
