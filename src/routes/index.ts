import express from "express";
import userRoutes from "./user.route.js";
import workspaceRoutes from "./workspace.route.js";
import projectRoutes from "./project.route.js";
import taskRoutes from "./task.route.js";
import activityLogRoutes from "./activityLog.route.js";

const router = express.Router();

router.use("/auth", userRoutes);
router.use("/workspace", workspaceRoutes);
router.use("/task", taskRoutes);
router.use("/project", projectRoutes);
router.use("/activity-log", activityLogRoutes);

export default router;
