import { ChangeEvent, FormEvent, useState, useEffect } from "react";
import { Chore } from "../interfaces";

interface ChoreFormProps {
	updateChore: (chore: Chore) => Promise<void>;
	editingChore?: Chore;
	onCancel?: () => void;
}

const ChoreForm = ({ updateChore, editingChore, onCancel }: ChoreFormProps) => {
	// create default chore object with default values
	const defaultChore: Chore = {
		id: "",
		name: "",
		description: "",
		price: 0,
		frequency: "daily",
	};

	// capture local chore state
	const [chore, setChore] = useState<Chore>(editingChore || defaultChore);

	// Update form when editingChore changes
	useEffect(() => {
		if (editingChore) {
			setChore(editingChore);
		}
	}, [editingChore]);

	// create a single function that updates the chore object
	const setChoreValue = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
		const { name, value } = e.target;
		setChore({ ...chore, [name]: value });
	};

	// create submit function that triggers updateChore if all fields are filled out
	const submitChore = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!chore.name || !chore.description || chore.price <= 0 || !chore.frequency) {
			alert("Please fill out all fields correctly");
			return;
		}

		// If no ID exists, create one
		const choreToSubmit = {
			...chore,
			id: chore.id || Math.random().toString(36).slice(2, 9),
		};

		await updateChore(choreToSubmit);
		setChore(defaultChore);
		if (onCancel) onCancel();
	};

	return (
		<form onSubmit={submitChore} className="chore-form">
			<div className="form-group">
				<label htmlFor="name">Chore Name</label>
				<input
					type="text"
					id="name"
					name="name"
					value={chore.name}
					onChange={setChoreValue}
					required
					placeholder="Enter chore name"
				/>
			</div>

			<div className="form-group">
				<label htmlFor="description">Description</label>
				<textarea
					id="description"
					name="description"
					value={chore.description}
					onChange={setChoreValue}
					required
					placeholder="Enter chore description"
					rows={3}
				/>
			</div>

			<div className="form-group">
				<label htmlFor="price">Price/Reward</label>
				<input
					type="number"
					id="price"
					name="price"
					value={chore.price}
					onChange={setChoreValue}
					required
					min="0"
					step="0.5"
					placeholder="Enter price/reward"
				/>
			</div>

			<div className="form-group">
				<label htmlFor="frequency">Frequency</label>
				<select id="frequency" name="frequency" value={chore.frequency} onChange={setChoreValue} required>
					<option value="daily">Daily</option>
					<option value="weekly">Weekly</option>
				</select>
			</div>

			<div className="form-actions">
				<button type="submit" className="btn btn-primary">
					{editingChore ? "Update Chore" : "Add Chore"}
				</button>
				{onCancel && (
					<button type="button" className="btn btn-secondary" onClick={onCancel}>
						Cancel
					</button>
				)}
			</div>
		</form>
	);
};

export default ChoreForm;
