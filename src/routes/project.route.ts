import express from "express";
import {
  createProject,
  deleteProject,
  editProject,
  getAllProject,
  getProject,
} from "../controllers/project.controller.js";
import validateRequest from "../middlewares/validateRequest.js";
import { paramsWithId } from "../validators/workspace.validator.js";
import {
  createProjectSchema,
  editProjectSchema,
} from "../validators/project.validator.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.get("/", isAuthenticated, getAllProject);
router.post(
  "/",
  isAuthenticated,
  validateRequest(createProjectSchema),
  createProject
);
router.get(
  "/:id",
  isAuthenticated,
  validateRequest(paramsWithId, "params"),
  getProject
);
router.delete(
  "/:id",
  isAuthenticated,
  validateRequest(paramsWithId, "params"),
  deleteProject
);
router.patch(
  "/:id",
  isAuthenticated,
  validateRequest(paramsWithId, "params"),
  validateRequest(editProjectSchema),
  editProject
);

export default router;
