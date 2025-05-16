import type { Config } from "drizzle-kit";
import * as dotenv from "dotenv";

dotenv.config();

export default {
	schema: "./src/db/schema.ts",
	out: "./src/db/migrations",
	driver: "pg",
	dbCredentials: {
		connectionString:
			process.env.DATABASE_URL ||
			"postgres://admin:adminpass@localhost:5432/chorechart",
	},
	verbose: true,
	strict: true,
} satisfies Config;
