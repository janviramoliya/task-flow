import { StatusCodes } from "http-status-codes";
import type { response } from "../types/response.js";
import logger from "../utils/logger.js";
import activityLogModel from "../models/activityLog.model.js";
import type { TokenUser } from "../utils/getUser.js";
import type {
  createActivityLogRequest,
  editActivityLogRequest,
} from "../types/activityLog.types.js";

const createActivityLogService = async (
  createObject: createActivityLogRequest
): Promise<response> => {
  logger.info("Creating activity log");

  const created = await activityLogModel.create(createObject);

  if (created)
    return {
      message: "Activity log created",
      statusCode: StatusCodes.CREATED,
    };
  else
    return {
      message: "Failed to create activity log",
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
    };
};

const deleteActivityLogById = async (id: string): Promise<response> => {
  const deleted = await activityLogModel.findByIdAndDelete(id);

  if (deleted)
    return { message: "Activity log deleted", statusCode: StatusCodes.OK };
  return { message: "Failed to delete", statusCode: StatusCodes.BAD_REQUEST };
};

const editActivityLogById = async (
  id: string,
  details: editActivityLogRequest
): Promise<response> => {
  const edited = await activityLogModel.findByIdAndUpdate(id, details, {
    new: true,
  });

  if (edited)
    return { message: "Edited", data: edited, statusCode: StatusCodes.OK };
  return { message: "Failed to edit", statusCode: StatusCodes.BAD_REQUEST };
};

const getAllActivityLogs = async (user: TokenUser): Promise<response> => {
  // Return logs for workspaces the user is part of OR all logs if none found.
  const logs = await activityLogModel.find({ actor: user.userId });

  if (logs && logs.length > 0)
    return {
      message: "Fetched activity logs",
      data: logs,
      statusCode: StatusCodes.OK,
    };

  return {
    message: "No activity logs found",
    statusCode: StatusCodes.NOT_FOUND,
  };
};

const getActivityLogById = async (id: string): Promise<response> => {
  const log = await activityLogModel.findById(id);
  if (log) return { message: "Fetched", data: log, statusCode: StatusCodes.OK };
  return { message: "Not found", statusCode: StatusCodes.NOT_FOUND };
};

export {
  createActivityLogService,
  deleteActivityLogById,
  editActivityLogById,
  getAllActivityLogs,
  getActivityLogById,
};
