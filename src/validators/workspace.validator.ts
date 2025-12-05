import z from "zod";

export const createWorkspaceSchema = z.object({
  name: z.string(),
  description: z.string(),
  members: z
    .array(
      z.object({
        user: z.string(),
        role: z.enum(["admin", "member", "viewer"]).default("viewer"),
      })
    )
    .optional(),
});

export const paramsWithId = z.object({
  id: z.string(),
});

export const editWorkspaceSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  members: z
    .array(
      z.object({
        user: z.string(),
        role: z.enum(["admin", "member", "viewer"]).default("viewer"),
      })
    )
    .optional(),
});
