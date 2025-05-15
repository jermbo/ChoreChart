import { ChangeEvent, useContext } from "react";
import { ChoreContext } from "../context/ChoreContext";
import { WeeklyChoreTrack } from "../interfaces";
import Heading from "./Heading";

interface Props {}

const ChoreListWeekly: React.FC<Props> = ({}) => {
	const { weeklyChoreGroup, weeklyTimeStamp, updateWeeklyChore } = useContext(ChoreContext);

	const handleChoreUpdate = (e: ChangeEvent<HTMLInputElement>) => {
		const { id: choreName, checked } = e.target;
		const specificChore = weeklyChoreGroup.weekly.filter((chore) => chore.name == choreName)[0];

		const updatedChore: WeeklyChoreTrack = {
			...specificChore,
			completed: checked,
		};

		updateWeeklyChore(weeklyTimeStamp, updatedChore);
	};

	return (
		<section>
			<Heading cursive="weekly" />
			<table>
				<thead>
					<tr>
						<th>Chore Name</th>
						<th>Completed</th>
					</tr>
				</thead>
				<tbody>
					{weeklyChoreGroup.weekly?.map((chore) => {
						return (
							<tr key={chore.name}>
								<td>{chore.name}</td>
								<td>
									<div className="custom-check">
										<input id={chore.name} type="checkbox" checked={chore.completed} onChange={handleChoreUpdate} />
										<label htmlFor={chore.name}></label>
									</div>
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</section>
	);
};

export default ChoreListWeekly;
