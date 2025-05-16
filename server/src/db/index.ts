import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema.js";

// Initialize the connection pool
const pool = new Pool({
	connectionString: process.env.DATABASE_URL,
	max: 10,
});

// Create the database instance
export const db = drizzle(pool, { schema });

// Export the schema for use in other files
export * from "./schema.js";
