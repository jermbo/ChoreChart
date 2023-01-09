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
						<div className={`custom-check ${day.weekday.toLocaleLowerCase()}`}>
							<input
								title={uniqueId}
								id={uniqueId}
								type="checkbox"
								onChange={handleChoreUpdate}
								checked={day.completed}
							/>
							<label htmlFor={uniqueId}></label>
						</div>
					</td>
				);
			})}
		</>
	);
};

export default ChoreDays;
