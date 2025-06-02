import { Hono } from "hono";
import { login, registerParent } from "../features/login/loginController.js";
import {
  createChild,
  deleteChild,
  getChildrenWithDetails,
  updateChild,
} from "../features/parent/childManagementController.js";
import {
  createChore,
  deleteChore,
  getAllChores,
  assignChore,
  updateChore,
} from "../features/chores/choreManagementController.js";

// Create the main router
const router = new Hono();

// Authentication routes
router.post("/register", registerParent);
router.post("/login", login);

router.get("/getchildrenwithdetails", getChildrenWithDetails);
router.post("/createchild", createChild);
router.put("/updatechild", updateChild);
router.delete("/deletechild/:id", deleteChild);

router.get("/getallchores", getAllChores);
router.post("/createchore", createChore);
router.put("/updatechore/:id", updateChore);
router.delete("/deletechore/:id", deleteChore);
router.post("/assignchore", assignChore);

export default router;
