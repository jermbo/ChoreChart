import { useEffect, useState, useMemo } from "react";
import { Chore } from "../interfaces";
import ChoreForm from "../components/ChoreForm";
import Heading from "../components/Heading";
import { storage } from "../utils/storage";
import { CHORES } from "../TEMP_DATA";

type SortField = "name" | "price" | "frequency";
type SortOrder = "asc" | "desc";

interface SortConfig {
	field: SortField;
	order: SortOrder;
}

interface Props {}

const EditChores = ({}: Props) => {
	const [chores, setChores] = useState<Chore[]>([]);
	const [editingChore, setEditingChore] = useState<Chore | undefined>();
	const [isFormVisible, setIsFormVisible] = useState(false);
	const [searchTerm, setSearchTerm] = useState("");
	const [sortConfig, setSortConfig] = useState<SortConfig>({
		field: "name",
		order: "asc",
	});

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

	const handleSort = (field: SortField) => {
		setSortConfig((prev) => ({
			field,
			order: prev.field === field && prev.order === "asc" ? "desc" : "asc",
		}));
	};

	// Filter and sort chores
	const filteredAndSortedChores = useMemo(() => {
		let result = [...chores];

		// Apply search filter
		if (searchTerm) {
			const searchLower = searchTerm.toLowerCase();
			result = result.filter(
				(chore) =>
					chore.name.toLowerCase().includes(searchLower) || chore.description.toLowerCase().includes(searchLower)
			);
		}

		// Apply sorting
		result.sort((a, b) => {
			if (sortConfig.field === "price") {
				return sortConfig.order === "asc" ? a.price - b.price : b.price - a.price;
			}

			const aValue = a[sortConfig.field].toLowerCase();
			const bValue = b[sortConfig.field].toLowerCase();

			if (sortConfig.order === "asc") {
				return aValue.localeCompare(bValue);
			}
			return bValue.localeCompare(aValue);
		});

		return result;
	}, [chores, searchTerm, sortConfig]);

	useEffect(() => {
		getChores();
	}, []);

	return (
		<>
			<Heading cursive="edit" block="chores" />

			<div className="chores-container">
				<div className="chores-header">
					<div className="action-buttons">
						<button className="btn" onClick={() => setIsFormVisible(true)}>
							<span>Add New Chore</span>
						</button>
						<button className="btn" onClick={handleResetToDefault}>
							<span>Reset to Default</span>
						</button>
					</div>
					<div className="chores-controls">
						<input
							type="text"
							placeholder="Search chores..."
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							className="search-input"
						/>
						<div className="sort-buttons">
							<button
								className={`btn-sort ${sortConfig.field === "name" ? "active" : ""}`}
								onClick={() => handleSort("name")}
								title={`Sort by name ${sortConfig.field === "name" ? `(${sortConfig.order})` : ""}`}
							>
								<span>Name {sortConfig.field === "name" && (sortConfig.order === "asc" ? "↑" : "↓")}</span>
							</button>
							<button
								className={`btn-sort ${sortConfig.field === "price" ? "active" : ""}`}
								onClick={() => handleSort("price")}
								title={`Sort by price ${sortConfig.field === "price" ? `(${sortConfig.order})` : ""}`}
							>
								<span>Price {sortConfig.field === "price" && (sortConfig.order === "asc" ? "↑" : "↓")}</span>
							</button>
							<button
								className={`btn-sort ${sortConfig.field === "frequency" ? "active" : ""}`}
								onClick={() => handleSort("frequency")}
								title={`Sort by frequency ${sortConfig.field === "frequency" ? `(${sortConfig.order})` : ""}`}
							>
								<span>Frequency {sortConfig.field === "frequency" && (sortConfig.order === "asc" ? "↑" : "↓")}</span>
							</button>
						</div>
					</div>
				</div>

				{(isFormVisible || editingChore) && (
					<div className="chores-form-container">
						<ChoreForm updateChore={updateChore} editingChore={editingChore} onCancel={handleCancel} />
					</div>
				)}

				{filteredAndSortedChores.length === 0 && (
					<p className="no-chores">
						{searchTerm ? "No chores match your search." : "No chores found. Add your first chore to get started!"}
					</p>
				)}

				{filteredAndSortedChores.length > 0 && (
					<div className="chores-grid">
						{filteredAndSortedChores.map((chore) => (
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
