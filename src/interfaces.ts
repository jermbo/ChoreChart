export interface User {
	id: string;
	name: string;
	color: string;
}

export interface Chore {
	id: string;
	name: string;
	description: string;
	pay: number;
	frequency: "weekly" | "daily";
}
