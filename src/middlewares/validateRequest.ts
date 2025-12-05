import type { NextFunction, Request, RequestHandler, Response } from "express";
import { type ZodSchema } from "zod";
import { ZodError } from "zod/v3";

type Source = "body" | "params" | "query" | "headers";

const validateRequest =
  (schema: ZodSchema, source: Source = "body"): RequestHandler =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const parsed = schema.parse(req[source as keyof Request]);
      // overwrite the source with the parsed / coerced value
      req[source] = parsed;
      return next();
    } catch (err) {
      if (err instanceof ZodError) {
        const details = err.errors.map((e) => ({
          path: e.path.join("."),
          message: e.message,
        }));
        return res.status(400).json({ error: "Validation failed", details });
      }
      return next(`Invalid request ${source}`);
    }
  };

export default validateRequest;
