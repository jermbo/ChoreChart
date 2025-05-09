import { useState, ChangeEvent } from "react";
import { Chore } from "../interfaces";

interface ChoreFormProps {
	updateChore: (chore: Chore) => void;
}

const ChoreForm = ({ updateChore }: ChoreFormProps) => {
	// create default chore object with default values
	const defaultChore: Chore = {
		id: 0,
		name: "",
		description: "",
		price: 0,
		frequency: "daily",
	};

	// capture local chore state
	const [chore, setChore] = useState<Chore>(defaultChore);

	// create a single function that updates the chore object
	const setChoreValue = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
		const { name, value } = e.target;
		setChore({ ...chore, [name]: value });
	};

	// create submit function that triggers updateChore if all fields are filled out
	const submitChore = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!chore.name && !chore.description && !chore.price && !chore.frequency) {
			alert("Need to fill out all fields");
			return;
		}

		// create chore copy object with unique guid
		const newChore: Chore = { ...chore, id: Math.random().toString(36).slice(2, 9) };

		updateChore(newChore);
		setChore(defaultChore);
	};
	return (
		<>
			{/* Form for adding chore using the chore object */}
			<form className="chore-form" onSubmit={submitChore}>
				<label htmlFor="name">Chore Name</label>
				<input type="text" id="name" name="name" value={chore.name} onChange={setChoreValue} />

				<label htmlFor="description">Chore Description</label>
				<textarea id="description" name="description" value={chore.description} onChange={setChoreValue}></textarea>

				<label htmlFor="price">Chore Price</label>
				<textarea id="price" name="price" value={chore.price} onChange={setChoreValue}></textarea>

				{/* select field with options on Chore Type */}
				<label htmlFor="type">Chore Type</label>

				{/* select field with options on Chore Frequency */}
				<label htmlFor="frequency">Chore Frequency</label>
				<select id="frequency" name="frequency" value={chore.frequency} onChange={setChoreValue}>
					<option value="daily">Daily</option>
					<option value="weekly">Weekly</option>
					<option value="monthly">Monthly</option>
				</select>

				<button className="btn" type="submit">
					Add Chore
				</button>
			</form>
			<pre>{JSON.stringify(chore)}</pre>
		</>
	);
};

export default ChoreForm;
