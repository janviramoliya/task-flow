import z from "zod";
import { paramsWithId } from "./workspace.validator.js";

export const createActivityLogSchema = z.object({
  workspace: z.string(),
  project: z.string().optional(),
  entity: z.enum(["Task", "Project", "Comment", "Workspace"]),
  entityId: z.string(),
  action: z.string(),
  details: z.any().optional(),
  message: z.string(),
});

export const editActivityLogSchema = z.object({
  workspace: z.string().optional(),
  project: z.string().optional(),
  entity: z.enum(["Task", "Project", "Comment", "Workspace"]),
  entityId: z.string().optional(),
  action: z.string().optional(),
  details: z.any().optional(),
  message: z.string().optional(),
});

export { paramsWithId };
