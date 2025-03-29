import { useEffect, useState } from "react";
import { Chore } from "../interfaces";
import ChoreForm from "../components/ChoreForm";
import Heading from "../components/Heading";
import { storage } from "../utils/storage";
import { CHORES } from "../TEMP_DATA";

interface Props {}

const EditChores = ({}: Props) => {
	const [chores, setChores] = useState<Chore[]>([]);
	const [editingChore, setEditingChore] = useState<Chore | undefined>();
	const [isFormVisible, setIsFormVisible] = useState(false);

	// get chores from IndexedDB
	const getChores = async () => {
		const chores = await storage.getChoreList();
		if (chores && chores.length > 0) {
			setChores(chores);
		} else {
			// If no chores exist, seed with default data
			await seedDefaultChores();
		}
	};

	const seedDefaultChores = async () => {
		await storage.setChoreList(CHORES);
		setChores(CHORES);
	};

	// create function to update chore list
	const updateChore = async (chore: Chore) => {
		// add chore if does not exist in array
		if (!chores.find((c) => c.id === chore.id)) {
			const newChores = [...chores, chore];
			setChores(newChores);
			await storage.setChoreList(newChores);
			return;
		}
		// update chore if it already exists in array
		const updatedChores = chores.map((c) => (c.id === chore.id ? chore : c));
		setChores(updatedChores);
		await storage.setChoreList(updatedChores);
	};

	const deleteChore = async (choreId: string) => {
		const updatedChores = chores.filter((c) => c.id !== choreId);
		setChores(updatedChores);
		await storage.setChoreList(updatedChores);
	};

	const handleEdit = (chore: Chore) => {
		setEditingChore(chore);
		setIsFormVisible(true);
	};

	const handleCancel = () => {
		setEditingChore(undefined);
		setIsFormVisible(false);
	};

	const handleResetToDefault = async () => {
		if (window.confirm("Are you sure you want to reset to default chores? This will delete all current chores.")) {
			await seedDefaultChores();
		}
	};

	useEffect(() => {
		getChores();
	}, []);

	return (
		<>
			<Heading cursive="edit" block="chores" />

			<div className="chores-container">
				<div className="chores-header">
					<button className="btn" onClick={() => setIsFormVisible(true)}>
						Add New Chore
					</button>
					<button className="btn" onClick={handleResetToDefault}>
						Reset to Default
					</button>
				</div>

				{(isFormVisible || editingChore) && (
					<div className="chores-form-container">
						<ChoreForm updateChore={updateChore} editingChore={editingChore} onCancel={handleCancel} />
					</div>
				)}

				{chores.length == 0 && <p className="no-chores">No chores found. Add your first chore to get started!</p>}

				{chores.length > 0 && (
					<div className="chores-grid">
						{chores.map((chore) => (
							<div key={chore.id} className="chore-card">
								<div className="chore-header">
									<h3>{chore.name}</h3>
									<div className="chore-actions">
										<button className="btn-icon" onClick={() => handleEdit(chore)} title="Edit chore">
											✎
										</button>
										<button className="btn-icon btn-danger" onClick={() => deleteChore(chore.id)} title="Delete chore">
											×
										</button>
									</div>
								</div>
								<p className="chore-description">{chore.description}</p>
								<div className="chore-details">
									<span className="chore-price">${chore.price}</span>
									<span className={`chore-frequency ${chore.frequency}`}>{chore.frequency}</span>
								</div>
							</div>
						))}
					</div>
				)}
			</div>
		</>
	);
};

export default EditChores;
