import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema.js";

// Initialize the connection pool
const DATABASE_URL = "postgres://admin:adminpass@localhost:5432/chorechart";
const pool = new Pool({
  connectionString: DATABASE_URL,
  max: 10,
  ssl: false,
});

// Create the database instance
export const db = drizzle(pool, { schema });

// Export the schema for use in other files
export * from "./schema.js";
