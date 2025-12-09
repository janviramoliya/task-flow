import z from "zod";
import { paramsWithId } from "./workspace.validator.js";

export const createProjectSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  members: z
    .array(
      z.object({
        user: z.string(),
        role: z.enum(["admin", "member", "viewer"]).default("viewer"),
      })
    )
    .optional(),
  workspace: z.string(),
  visibility: z.enum(["public", "private", "Workspace"]).optional(),
});

export const editProjectSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  members: z.array(z.string()).optional(),
  workspace: z.string(),
  visibility: z.enum(["public", "private", "Workspace"]).optional(),
});

export { paramsWithId };
