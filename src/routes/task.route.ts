import express from "express";
import {
  createTask,
  deleteTask,
  editTask,
  getAllTask,
  getTask,
} from "../controllers/task.controller.js";
import validateRequest from "../middlewares/validateRequest.js";
import { paramsWithId } from "../validators/workspace.validator.js";
import {
  createTaskSchema,
  editTaskSchema,
} from "../validators/task.validator.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.get("/", isAuthenticated, getAllTask);
router.post(
  "/",
  isAuthenticated,
  validateRequest(createTaskSchema),
  createTask
);
router.get(
  "/:id",
  isAuthenticated,
  validateRequest(paramsWithId, "params"),
  getTask
);
router.delete(
  "/:id",
  isAuthenticated,
  validateRequest(paramsWithId, "params"),
  deleteTask
);
router.patch(
  "/:id",
  isAuthenticated,
  validateRequest(paramsWithId, "params"),
  validateRequest(editTaskSchema),
  editTask
);

export default router;
