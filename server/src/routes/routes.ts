import { Hono } from "hono";
import { login, registerParent } from "../features/login/loginController.js";

// Create the main router
const router = new Hono();

// Authentication routes
router.post("/register", registerParent);
router.post("/login", login);

export default router;
