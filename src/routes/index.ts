import express from "express";
import userRoutes from "./user.route.js";
import workspaceRoutes from "./workspace.route.js";

const router = express.Router();

router.use("/auth", userRoutes);
router.use("/workspace", workspaceRoutes);

export default router;
