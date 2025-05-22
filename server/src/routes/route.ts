import { Hono } from "hono";
import { registerParent } from "../controllers/parent.controller.js";

// Create a new router for auth endpoints
const route = new Hono();

// Parent registration endpoint
route.post("/register", registerParent);

export default route;
