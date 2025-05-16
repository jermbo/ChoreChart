import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { Pool } from "pg";
import * as dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Database connection
const pool = new Pool({
	connectionString: process.env.DATABASE_URL,
});

// Initialize Drizzle
const db = drizzle(pool);

// Run migrations
async function main() {
	console.log("Running migrations...");

	await migrate(db, { migrationsFolder: "./src/db/migrations" });

	console.log("Migrations completed!");
	await pool.end();
}

main().catch((err) => {
	console.error("Migration failed!", err);
	process.exit(1);
});
