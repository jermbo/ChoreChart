import { ChangeEvent, createContext, PropsWithChildren, useEffect, useState } from "react";
import { ChoreGroup, DailyChore, WeeklyChoreGroup, WeeklyChoreTrack } from "../interfaces";
import buildDailyChores from "../utils/buildDailyChores";
import buildLocalData from "../utils/buildLocalData";
import buildWeeklyChores from "../utils/buildWeeklyChores";
import getWeekData from "../utils/getWeekData";
import { storage } from "../utils/storage";

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
		const loadWeekData = async () => {
			const localData = (await storage.getChores()) || {};
			const other = localData[weeklyTimeStamp];
			if (other) {
				setWeeklyChoreGroup(other);
			}
		};
		loadWeekData();
	}, [weeklyTimeStamp]);

	async function init(): Promise<void> {
		const { weekInfo, weekTimeStamp } = getWeekData(THE_DATE);
		setWeeklyTimeStamp(weekTimeStamp);

		let localData = await storage.getChores();
		if (!localData) {
			localData = buildInitialData({
				weekInfo,
				weekTimeStamp,
			});
			await storage.setChores(localData);
		}

		const currentWeek: WeeklyChoreGroup = localData[weekTimeStamp];
		if (!currentWeek) {
			await buildCurrentWeek({ weekInfo, weekTimeStamp, localData });
			return;
		}

		setWeeklyChoreGroup(currentWeek);
		getWeeklyStamps();
	}

	function buildInitialData({ weekInfo, weekTimeStamp }: any): ChoreGroup {
		const weekly = buildWeeklyChores();
		const daily = buildDailyChores(weekInfo);
		const newLocalData = buildLocalData({ weekTimeStamp, daily, weekly });
		return { ...newLocalData };
	}

	async function buildCurrentWeek({ weekInfo, weekTimeStamp, localData }: any): Promise<void> {
		const weekly = buildWeeklyChores();
		const daily = buildDailyChores(weekInfo);
		const newLocalData = buildLocalData({ weekTimeStamp, daily, weekly });
		const newData = { ...localData, ...newLocalData };
		await storage.setChores(newData);
	}

	async function updateWeeklyChore(weekTimeStamp: string, updatedChore: WeeklyChoreTrack): Promise<void> {
		const localData = (await storage.getChores()) || {};
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
		await updateLocalChores(weekTimeStamp, allUpdated);
	}

	async function updateDailyChore(weekTimeStamp: string, updatedChore: DailyChore): Promise<void> {
		const localData = (await storage.getChores()) || {};
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
		await updateLocalChores(weekTimeStamp, allUpdated);
	}

	async function updateLocalChores(weekTimeStamp: string, allUpdated: WeeklyChoreGroup): Promise<void> {
		const localData = (await storage.getChores()) || {};
		const newLocalData: ChoreGroup = {
			...localData,
		};
		newLocalData[weekTimeStamp] = allUpdated;
		await storage.setChores(newLocalData);
	}

	async function getWeeklyStamps(): Promise<void> {
		const localData = (await storage.getChores()) || {};
		const weeks = Object.keys(localData);
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
