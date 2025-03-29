import localforage from "localforage";
import { ChoreGroup } from "../interfaces";

// Configure localforage to use IndexedDB
localforage.config({
	name: "chorechart",
	storeName: "chores",
	driver: localforage.INDEXEDDB,
});

const CHORE_KEY = "chores";

export const storage = {
	async getChores(): Promise<ChoreGroup | null> {
		try {
			const data = await localforage.getItem(CHORE_KEY);
			return data as ChoreGroup | null;
		} catch (error) {
			console.error("Error getting chores from IndexedDB:", error);
			return null;
		}
	},

	async setChores(data: ChoreGroup): Promise<void> {
		try {
			await localforage.setItem(CHORE_KEY, data);
		} catch (error) {
			console.error("Error saving chores to IndexedDB:", error);
		}
	},

	async getChoreList(): Promise<any[]> {
		try {
			const data = await localforage.getItem("chore-list");
			return (data as any[]) || [];
		} catch (error) {
			console.error("Error getting chore list from IndexedDB:", error);
			return [];
		}
	},

	async setChoreList(chores: any[]): Promise<void> {
		try {
			await localforage.setItem("chore-list", chores);
		} catch (error) {
			console.error("Error saving chore list to IndexedDB:", error);
		}
	},
};
