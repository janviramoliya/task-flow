import type { Request, Response } from "express";
import logger from "../utils/logger.js";
import { StatusCodes } from "http-status-codes";

export default function notFound(req: Request, res: Response) {
  logger.error("Route not found: " + req.path);
  res.status(StatusCodes.NOT_FOUND).json({ error: "Not found" });
}
