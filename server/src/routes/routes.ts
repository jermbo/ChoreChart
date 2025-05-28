import { Hono } from "hono";
import { login, registerParent } from "../features/login/loginController.js";
import { createChild } from "../features/parent/childManagementController.js";
import {
  createChore,
  deleteChore,
  updateChore,
} from "../features/chores/choreManagementController.js";

// Create the main router
const router = new Hono();

// Authentication routes
router.post("/register", registerParent);
router.post("/login", login);
router.post("/createchild", createChild);
router.post("/createchore", createChore);
router.put("/updatechore/:id", updateChore);
router.delete("/deletechore/:id", deleteChore);

export default router;
