import { DayInfo, Chore, DailyChore } from "../interfaces";
import { CHORES } from "../TEMP_DATA";

const buildDailyChores = (weekInfo: DayInfo[]) => {
	const dailyGroup: Chore[] = CHORES.filter((chore) => chore.frequency == "daily");
	const dailyChores: DailyChore[] = dailyGroup.map((chore) => {
		const data: DailyChore = {
			...chore,
			weekDays: weekInfo.map((w) => ({ ...w, completed: false })),
		};
		return data;
	});
	return dailyChores;
};

export default buildDailyChores;
