import { createContext, PropsWithChildren, useEffect, useState } from "react";
import {
  ChoreGroup,
  DailyChore,
  WeeklyChoreGroup,
  WeeklyChoreTrack,
} from "../interfaces";
import {
  buildLocalData,
  buildDailyChores,
  getWeekData,
  buildWeeklyChores,
} from "../utils/utils";

const CHORE_KEY = "chores";

const THE_DATE = new Date();
// const THE_DATE = new Date(2022, 11, 11);

interface TheChoreContext {
  weeklyChoreGroup: WeeklyChoreGroup;
  weeklyTimeStamp: string;
  updateWeeklyChore: () => void;
  updateDailyChore: (weeklyTimeStamp: string, chore: DailyChore) => void;
}

const DEFAULT_VALUES: TheChoreContext = {
  weeklyChoreGroup: {} as WeeklyChoreGroup,
  weeklyTimeStamp: "",
  updateWeeklyChore: () => {},
  updateDailyChore: () => {},
};

export const ChoreContext = createContext(DEFAULT_VALUES);

interface Props extends PropsWithChildren {}

const ChoreProvider: React.FC<Props> = ({ children }) => {
  const [weeklyChoreGroup, setWeeklyChoreGroup] = useState(
    {} as WeeklyChoreGroup
  );
  const [weeklyTimeStamp, setWeeklyTimeStamp] = useState("");

  useEffect(() => {
    init();
  }, []);

  function init() {
    console.clear();
    const { weekInfo, weekTimeStamp } = getWeekData(THE_DATE);
    setWeeklyTimeStamp(weekTimeStamp);

    let localData = getLocalData();
    // console.log("Local Data", localData);
    // debugger;

    if (!localData) {
      const weekly = buildWeeklyChores();
      const daily = buildDailyChores(weekInfo);
      const newLocalData = buildLocalData({ weekTimeStamp, daily, weekly });
      const newData = { ...newLocalData };
      console.log("does not have local data... so build it");
      console.log(newData);
      localData = newData;
      setLocalData(newData);
      // return;
    }

    const currentWeek: WeeklyChoreGroup = localData[weekTimeStamp];
    console.log("local data was found, checking for current week");
    if (!currentWeek) {
      const weekly = buildWeeklyChores();
      const daily = buildDailyChores(weekInfo);
      const newLocalData = buildLocalData({ weekTimeStamp, daily, weekly });
      const newData = { ...localData, ...newLocalData };

      console.log("has data, but not current week, so create that week");
      console.log(newLocalData);
      console.log(newData);
      setLocalData(newData);
      return;
    }

    setWeeklyChoreGroup(currentWeek);
  }

  function getLocalData(): ChoreGroup | null {
    const data = localStorage.getItem(CHORE_KEY);
    return data ? JSON.parse(data) : null;
  }

  function setLocalData(data: ChoreGroup) {
    console.log({ data });
    localStorage.setItem(CHORE_KEY, JSON.stringify(data));
  }

  function updateWeeklyChore(chore: WeeklyChoreTrack) {
    console.log("update weekly chore");
    console.log(weeklyChoreGroup);
  }

  function updateDailyChore(weekTimeStamp: string, updateChore: DailyChore) {
    let localData = getLocalData() || {};

    // Get Specific Week Data
    const currentWeekData: WeeklyChoreGroup = { ...localData[weekTimeStamp] };
    // Update Specific Week Info
    const updateDaily = currentWeekData.daily.map((chore) => {
      if (chore.name == updateChore.name) {
        return updateChore;
      }
      return chore;
    });
    // Combine New with the Old of Specific Week
    const allUpdated: WeeklyChoreGroup = {
      ...currentWeekData,
      daily: updateDaily,
    };
    // Update UI Store
    setWeeklyChoreGroup(allUpdated);

    const newLocalData: ChoreGroup = {
      ...localData,
    };
    newLocalData[weekTimeStamp] = allUpdated;

    setLocalData(newLocalData);
  }

  const values = {
    weeklyChoreGroup,
    weeklyTimeStamp,
    updateWeeklyChore,
    updateDailyChore,
  };
  return (
    <ChoreContext.Provider value={values}>
      <>{children}</>
    </ChoreContext.Provider>
  );
};

export default ChoreProvider;
