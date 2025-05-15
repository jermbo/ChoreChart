import { ChangeEvent, createContext, PropsWithChildren, useEffect, useState } from "react";
import { ChoreGroup, DailyChore, WeeklyChoreGroup, WeeklyChoreTrack } from "../interfaces";
import buildDailyChores from "../utils/buildDailyChores";
import buildLocalData from "../utils/buildLocalData";
import buildWeeklyChores from "../utils/buildWeeklyChores";
import getWeekData from "../utils/getWeekData";

const CHORE_KEY = "chores";

const THE_DATE = new Date();

interface TheChoreContext {
	weeklyChoreGroup: WeeklyChoreGroup;
	weeklyTimeStamp: string;
	updateWeeklyChore: (weeklyTimeStamp: string, chore: WeeklyChoreTrack) => void;
	updateDailyChore: (weeklyTimeStamp: string, chore: DailyChore) => void;
	allWeeklyTimeStamps: string[];
	updateCurrentWeek: (e: ChangeEvent<HTMLSelectElement>) => void;
}

const DEFAULT_VALUES: TheChoreContext = {
	weeklyChoreGroup: {} as WeeklyChoreGroup,
	weeklyTimeStamp: "",
	updateWeeklyChore: () => {},
	updateDailyChore: () => {},
	allWeeklyTimeStamps: [],
	updateCurrentWeek: () => {},
};

export const ChoreContext = createContext(DEFAULT_VALUES);

interface Props extends PropsWithChildren {}

const ChoreProvider: React.FC<Props> = ({ children }) => {
	const [weeklyChoreGroup, setWeeklyChoreGroup] = useState({} as WeeklyChoreGroup);
	const [weeklyTimeStamp, setWeeklyTimeStamp] = useState("");
	const [allWeeklyTimeStamps, setAllWeeklyTimeStamps] = useState<string[]>([]);

	useEffect(() => {
		init();
	}, []);

	useEffect(() => {
		const localData = getLocalData() || {};
		const other = localData[weeklyTimeStamp];
		if (other) {
			setWeeklyChoreGroup(other);
		}
	}, [weeklyTimeStamp]);

	function init(): void {
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
		getWeeklyStamps();
	}

	// TODO: Add proper types to parameters
	function buildInitialData({ weekInfo, weekTimeStamp }: any): ChoreGroup {
		const weekly = buildWeeklyChores();
		const daily = buildDailyChores(weekInfo);
		const newLocalData = buildLocalData({ weekTimeStamp, daily, weekly });
		return { ...newLocalData };
	}

	// TODO: Add proper types to parameters
	function buildCurrentWeek({ weekInfo, weekTimeStamp, localData }: any): void {
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

	function setLocalData(data: ChoreGroup): void {
		localStorage.setItem(CHORE_KEY, JSON.stringify(data));
	}

	function updateWeeklyChore(weekTimeStamp: string, updatedChore: WeeklyChoreTrack): void {
		const localData = getLocalData() || {};
		// Get Specific Week Data
		const currentWeekData: WeeklyChoreGroup = { ...localData[weekTimeStamp] };
		// Update Specific Week Info
		const updateWeekly = currentWeekData.weekly.map((chore) => {
			if (chore.name == updatedChore.name) {
				return updatedChore;
			}
			return chore;
		});
		// Combine New with the Old of Specific Week
		const allUpdated: WeeklyChoreGroup = {
			...currentWeekData,
			weekly: updateWeekly,
		};
		// Update UI Store
		setWeeklyChoreGroup(allUpdated);
		updateLocalChores(weekTimeStamp, allUpdated);
	}

	function updateDailyChore(weekTimeStamp: string, updatedChore: DailyChore): void {
		const localData = getLocalData() || {};
		// Get Specific Week Data
		const currentWeekData: WeeklyChoreGroup = { ...localData[weekTimeStamp] };
		// Update Specific Week Info
		const updateDaily = currentWeekData.daily.map((chore) => {
			if (chore.name == updatedChore.name) {
				return updatedChore;
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
		updateLocalChores(weekTimeStamp, allUpdated);
	}

	function updateLocalChores(weekTimeStamp: string, allUpdated: WeeklyChoreGroup): void {
		const localData = getLocalData() || {};
		const newLocalData: ChoreGroup = {
			...localData,
		};
		newLocalData[weekTimeStamp] = allUpdated;
		setLocalData(newLocalData);
	}

	function getWeeklyStamps(): void {
		const localStorage = getLocalData() || {};
		const weeks = Object.keys(localStorage);
		setAllWeeklyTimeStamps(weeks);
	}

	function updateCurrentWeek(e: ChangeEvent<HTMLSelectElement>): void {
		setWeeklyTimeStamp(e.target.value);
	}

	const values = {
		weeklyChoreGroup,
		weeklyTimeStamp,
		updateWeeklyChore,
		updateDailyChore,
		allWeeklyTimeStamps,
		updateCurrentWeek,
	};
	return (
		<ChoreContext.Provider value={values}>
			<>{children}</>
		</ChoreContext.Provider>
	);
};

export default ChoreProvider;
