import express from "express";
import {
  createWorkspace,
  deleteWorkspace,
  editWorkspace,
  getAllWorkspace,
  getWorkspace,
} from "../controllers/workspace.controller.js";
import validateRequest from "../middlewares/validateRequest.js";
import {
  createWorkspaceSchema,
  editWorkspaceSchema,
  paramsWithId,
} from "../validators/workspace.validator.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.get("/", isAuthenticated, getAllWorkspace);
router.post(
  "/",
  isAuthenticated,
  validateRequest(createWorkspaceSchema),
  createWorkspace
);
router.get(
  "/:id",
  isAuthenticated,
  validateRequest(paramsWithId, "params"),
  getWorkspace
);
router.delete(
  "/:id",
  isAuthenticated,
  validateRequest(paramsWithId, "params"),
  deleteWorkspace
);
router.put(
  "/:id",
  isAuthenticated,
  validateRequest(paramsWithId, "params"),
  validateRequest(editWorkspaceSchema),
  editWorkspace
);

export default router;
