import { useState, useEffect } from "react";
import ChoreForm from "../components/ChoreForm";
import Heading from "../components/Heading";
import { Chore } from "../interfaces";

interface Props {}
const LOCAL_STORAGE_KEYS = {
	choreList: "chore-list",
};
const EditChores = ({}: Props) => {
	const [chores, setChores] = useState<Chore[]>([]);

	// get chores from local storage
	const getChores = () => {
		const chores = localStorage.getItem(LOCAL_STORAGE_KEYS.choreList);
		if (chores) {
			setChores(JSON.parse(chores));
		}
	};

	// create function to update chore list
	const updateChore = (chore: Chore) => {
		// add chore if does not exist in array
		if (!chores.find((c) => c.id === chore.id)) {
			setChores([...chores, chore]);
			localStorage.setItem(LOCAL_STORAGE_KEYS.choreList, JSON.stringify([...chores, chore]));
			return;
		}
		// update chore if it already exists in array
		const updatedChores = chores.map((c) => (c.id === chore.id ? chore : c));
		setChores(updatedChores);
		localStorage.setItem(LOCAL_STORAGE_KEYS.choreList, JSON.stringify(updatedChores));
	};

	useEffect(() => {
		getChores();
	}, []);

	return (
		<>
			<Heading cursive="edit" block="chores" />
			<div className="chores-form">
				<ChoreForm updateChore={updateChore} />
			</div>
			<div className="chores-list">
				{chores.length &&
					chores.map((chore, index) => (
						<div key={index}>
							<h3>{chore.name}</h3>
							<p>{chore.description}</p>
						</div>
					))}
				{!chores.length && <p>No chores found</p>}
			</div>
		</>
	);
};

export default EditChores;
