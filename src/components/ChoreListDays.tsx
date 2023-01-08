import { ChangeEvent } from "react";
import { DailyChoreTrack } from "../interfaces";

interface Props {
	days: DailyChoreTrack[];
	choreName: string;
	handleChoreUpdate: (e: ChangeEvent<HTMLInputElement>) => void;
}
const ChoreDays: React.FC<Props> = ({ days, choreName, handleChoreUpdate }) => {
	return (
		<>
			{days.map((day) => {
				const uniqueId = `${day.weekday}-${choreName}`;
				return (
					<td key={uniqueId}>
						<input id={uniqueId} type="checkbox" onChange={handleChoreUpdate} checked={day.completed} />
					</td>
				);
			})}
		</>
	);
};

export default ChoreDays;
