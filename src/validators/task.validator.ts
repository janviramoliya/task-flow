import z from "zod";
import { paramsWithId } from "./workspace.validator.js";

const subTask = z.object({
  title: z.string(),
  done: z.boolean().optional(),
  assignees: z.array(z.string()).optional(),
});

export const createTaskSchema = z.object({
  project: z.string().optional(),
  title: z.string(),
  description: z.string().optional(),
  assignees: z
    .array(
      z.object({
        user: z.string(),
        role: z.enum(["admin", "member", "viewer"]).default("viewer"),
      })
    )
    .optional(),
  status: z.enum(["pending", "in_progress", "done", "on_hold"]).optional(),
  priority: z.enum(["low", "medium", "high"]).optional(),
  dueDate: z.string().optional(),
  subtasks: z.array(subTask).optional(),
  attachments: z.array(z.string()).optional(),
});

export const editTaskSchema = z.object({
  project: z.string().optional(),
  title: z.string().optional(),
  description: z.string().optional(),
  assignees: z
    .array(
      z.object({
        user: z.string(),
        role: z.enum(["admin", "member", "viewer"]).default("viewer"),
      })
    )
    .optional(),
  status: z.enum(["pending", "in_progress", "done", "on_hold"]).optional(),
  priority: z.enum(["low", "medium", "high"]).optional(),
  dueDate: z.string().optional(),
  subtasks: z.array(subTask).optional(),
  attachments: z.array(z.string()).optional(),
});

export { paramsWithId };
