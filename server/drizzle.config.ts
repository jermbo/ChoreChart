import type { Config } from "drizzle-kit";
import * as dotenv from "dotenv";

dotenv.config();

export default {
  schema: "./src/db/schema.ts",
  out: "./src/db/migrations",
  dialect: "postgresql",
  dbCredentials: {
    host: "postgres",
    port: 5432,
    user: "admin",
    password: "adminpass",
    database: "chorechart",
    ssl: false,
  },
  verbose: true,
  strict: true,
} satisfies Config;
