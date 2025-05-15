import { useContext } from "react";
import { ChoreContext } from "../context/ChoreContext";

interface Props {}

const WeekSwitcher: React.FC<Props> = ({}) => {
	const { allWeeklyTimeStamps, updateCurrentWeek } = useContext(ChoreContext);

	return (
		<div>
			<select onChange={updateCurrentWeek}>
				{allWeeklyTimeStamps.map((stamp) => {
					return (
						<option key={stamp} value={stamp}>
							{stamp}
						</option>
					);
				})}
			</select>
		</div>
	);
};

export default WeekSwitcher;
