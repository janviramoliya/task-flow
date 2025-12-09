import express from "express";
import {
  createActivityLog,
  deleteActivityLog,
  editActivityLog,
  getAllActivityLog,
  getActivityLog,
} from "../controllers/activityLog.controller.js";
import validateRequest from "../middlewares/validateRequest.js";
import { paramsWithId } from "../validators/workspace.validator.js";
import {
  createActivityLogSchema,
  editActivityLogSchema,
} from "../validators/activityLog.validator.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.get("/", isAuthenticated, getAllActivityLog);
router.post(
  "/",
  isAuthenticated,
  validateRequest(createActivityLogSchema),
  createActivityLog
);
router.get(
  "/:id",
  isAuthenticated,
  validateRequest(paramsWithId, "params"),
  getActivityLog
);
router.delete(
  "/:id",
  isAuthenticated,
  validateRequest(paramsWithId, "params"),
  deleteActivityLog
);
router.put(
  "/:id",
  isAuthenticated,
  validateRequest(paramsWithId, "params"),
  validateRequest(editActivityLogSchema),
  editActivityLog
);

export default router;
