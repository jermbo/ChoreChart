import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";

const app = new Hono();

// Enable CORS
app.use(
  "/*",
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:3000",
    credentials: true,
  })
);

// Mount parent routes

// Health check endpoint
app.get("/health", (c) => {
  return c.json({ status: "ok" });
});

const port = process.env.API_PORT ? parseInt(process.env.API_PORT, 10) : 4000;
const host = process.env.API_HOST || "localhost";

serve(
  {
    fetch: app.fetch,
    port,
    hostname: host,
  },
  (info) => {
    console.log(`Server is running on http://${host}:${info.port}`);
  }
);
