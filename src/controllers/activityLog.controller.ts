import {
  createActivityLogService,
  deleteActivityLogById,
  editActivityLogById,
  getAllActivityLogs,
  getActivityLogById,
} from "../services/activityLog.service.js";
import { type Request, type Response } from "express";
import type { requestWithUser } from "../types/requestWithUser.types.js";
import type { TokenUser } from "../utils/getUser.js";
import type {
  createActivityLogRequest,
  editActivityLogRequest,
} from "../types/activityLog.types.js";
import CustomAPIError from "../errors/customApi.error.js";

const createActivityLog = async (req: requestWithUser, res: Response) => {
  const activityDetails = req.body as createActivityLogRequest;
  activityDetails.actor = req.user?.userId as string;

  const { message, error, statusCode } = await createActivityLogService(
    activityDetails
  );

  res.status(statusCode).json({ message, error });
};

const getAllActivityLog = async (req: requestWithUser, res: Response) => {
  const { message, error, data, statusCode } = await getAllActivityLogs(
    req.user as TokenUser
  );

  res.status(statusCode).json({ message, error, data });
};

const getActivityLog = async (req: requestWithUser, res: Response) => {
  const { id } = req.params;

  if (!id) {
    throw new CustomAPIError("Id is not provided to fetch activity log");
  }

  const { message, error, data, statusCode } = await getActivityLogById(id);

  res.status(statusCode).json({ message, error, data });
};

const deleteActivityLog = async (req: requestWithUser, res: Response) => {
  const { id } = req.params;

  if (!id) {
    throw new CustomAPIError("Id is not provided to delete activity log");
  }

  const { message, error, statusCode } = await deleteActivityLogById(id);

  res.status(statusCode).json({ message, error });
};

const editActivityLog = async (req: requestWithUser, res: Response) => {
  const { id } = req.params;
  const editActivityDetails = req.body as editActivityLogRequest;

  if (!id) {
    throw new CustomAPIError("Id is not provided to edit activity log");
  }

  const { message, error, statusCode } = await editActivityLogById(
    id,
    editActivityDetails
  );

  res.status(statusCode).json({ message, error });
};

export {
  createActivityLog,
  getAllActivityLog,
  getActivityLog,
  deleteActivityLog,
  editActivityLog,
};
