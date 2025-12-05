import type {
  Request,
  Response,
  NextFunction,
  ErrorRequestHandler,
} from "express";
import logger from "../utils/logger.js";
import { StatusCodes } from "http-status-codes";
import type { CustomError } from "../types/error.types.js";
import type { requestWithUser } from "../types/requestWithUser.types.js";

export default function errorHandler(
  err: CustomError,
  req: requestWithUser,
  res: Response,
  next: NextFunction
) {
  console.error(err);
  const status = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  const message = err.message || "Internal server error";
  logger.error("Error occurred: " + JSON.stringify(err));
  res.status(status).json({ error: message });
}
