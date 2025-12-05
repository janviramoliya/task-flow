import z from "zod";

export const registerUserSchema = z.object({
  name: z.string(),
  email: z.email(),
  password: z.string(),
  role: z.enum(["admin", "user"]).optional().default("user"),
});

export const loginUserSchema = z.object({
  email: z.string(),
  password: z.string(),
});
