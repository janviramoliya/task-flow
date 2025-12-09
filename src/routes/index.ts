import express from "express";
import userRoutes from "./user.route.js";
import workspaceRoutes from "./workspace.route.js";
import projectRoutes from "./project.route.js";
import taskRoutes from "./task.route.js";
import activityLogRoutes from "./activityLog.route.js";

const router = express.Router();

router.use("/auth", userRoutes);
router.use("/workspace", workspaceRoutes);
router.use("/projects", projectRoutes);
router.use("/tasks", taskRoutes);
router.use("/activity-logs", activityLogRoutes);

export default router;
