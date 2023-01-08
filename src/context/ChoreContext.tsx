import { createContext, PropsWithChildren, useEffect, useState } from "react";
import {
  ChoreGroup,
  DailyChore,
  WeeklyChoreGroup,
  WeeklyChoreTrack,
} from "../interfaces";
import buildDailyChores from "../utils/buildDailyChores";
import buildLocalData from "../utils/buildLocalData";
import buildWeeklyChores from "../utils/buildWeeklyChores";
import getWeekData from "../utils/getWeekData";

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
    if (!localData) {
      localData = buildInitialData({
        weekInfo,
        weekTimeStamp,
      });
      setLocalData(localData);
    }

    const currentWeek: WeeklyChoreGroup = localData[weekTimeStamp];
    if (!currentWeek) {
      buildCurrentWeek({ weekInfo, weekTimeStamp, localData });
      return;
    }

    setWeeklyChoreGroup(currentWeek);
  }

  // TODO: Add proper types to parameters
  function buildInitialData({ weekInfo, weekTimeStamp }: any) {
    const weekly = buildWeeklyChores();
    const daily = buildDailyChores(weekInfo);
    const newLocalData = buildLocalData({ weekTimeStamp, daily, weekly });
    return { ...newLocalData };
  }

  // TODO: Add proper types to parameters
  function buildCurrentWeek({ weekInfo, weekTimeStamp, localData }: any) {
    const weekly = buildWeeklyChores();
    const daily = buildDailyChores(weekInfo);
    const newLocalData = buildLocalData({ weekTimeStamp, daily, weekly });
    const newData = { ...localData, ...newLocalData };
    setLocalData(newData);
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
