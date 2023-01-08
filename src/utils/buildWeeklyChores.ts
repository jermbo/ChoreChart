import { Chore, WeeklyChoreTrack } from "../interfaces";
import { CHORES } from "../TEMP_DATA";

const buildWeeklyChores = () => {
	const weeklyGroup: Chore[] = CHORES.filter((chore) => chore.type == "weekly");
	const weeklyChores: WeeklyChoreTrack[] = weeklyGroup.map((chore) => {
		const data: WeeklyChoreTrack = {
			...chore,
			completed: false,
		};
		return data;
	});
	return weeklyChores;
};

export default buildWeeklyChores;
