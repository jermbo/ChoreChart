import { Hono } from "hono";
import { login, registerParent } from "../features/login/loginController.js";
import { createChild } from "../features/parent/childManagementController.js";

// Create the main router
const router = new Hono();

// Authentication routes
router.post("/register", registerParent);
router.post("/login", login);
router.post("/createchild", createChild);

export default router;
