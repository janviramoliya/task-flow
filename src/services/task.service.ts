import { StatusCodes } from "http-status-codes";
import type { response } from "../types/response.js";
import logger from "../utils/logger.js";
import taskModel from "../models/task.model.js";
import type { TokenUser } from "../utils/getUser.js";
import type {
  createTaskRequest,
  editTaskRequest,
} from "../types/task.types.js";
import workspaceModel from "../models/workspace.model.js";
import CustomAPIError from "../errors/customApi.error.js";

const createTaskService = async (
  createTaskObject: createTaskRequest
): Promise<response> => {
  logger.info("Creating task");

  const taskDetails = {
    ...createTaskObject,
  };

  const { workspace } = taskDetails;

  const workspaceExist = await workspaceModel.findById(workspace);

  if (!workspaceExist) {
    throw new CustomAPIError("Workspace does not exist with Id: " + workspace);
  }

  const createdTask = await taskModel.create(taskDetails);
  logger.info(`Task created with details: ${createdTask}`);

  if (createdTask)
    return {
      message: "Task created",
      statusCode: StatusCodes.CREATED,
    };
  else {
    return {
      message: "Failed to create task",
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
    };
  }
};

const deleteTaskById = async (taskId: string): Promise<response> => {
  const deletedTask = await taskModel.findByIdAndDelete(taskId);

  if (deletedTask) {
    return {
      message: "Task deleted",
      statusCode: StatusCodes.OK,
    };
  } else {
    return {
      message: "Failed to delete task",
      statusCode: StatusCodes.BAD_REQUEST,
    };
  }
};

const editTaskById = async (
  taskId: string,
  taskDetails: editTaskRequest
): Promise<response> => {
  const editedTask = await taskModel.findByIdAndUpdate(taskId, taskDetails, {
    new: true,
  });

  if (editedTask) {
    return {
      message: "Task edited",
      data: editedTask,
      statusCode: StatusCodes.OK,
    };
  } else {
    return {
      message: "Failed to edit task",
      statusCode: StatusCodes.BAD_REQUEST,
    };
  }
};

const getAllTasks = async (user: TokenUser): Promise<response> => {
  const tasks = await taskModel.find({
    $or: [{ creator: user.userId }, { assignees: user.userId }],
  });

  if (tasks && tasks.length > 0)
    return {
      message: "Fetched tasks",
      data: tasks,
      statusCode: StatusCodes.OK,
    };
  else
    return {
      message: "No tasks found",
      statusCode: StatusCodes.NOT_FOUND,
    };
};

const getTaskById = async (taskId: string): Promise<response> => {
  const task = await taskModel.findById(taskId);

  if (task)
    return {
      message: "Fetched task",
      data: task,
      statusCode: StatusCodes.OK,
    };
  else
    return {
      message: "No task found with id: " + taskId,
      statusCode: StatusCodes.NOT_FOUND,
    };
};

export {
  createTaskService,
  deleteTaskById,
  editTaskById,
  getAllTasks,
  getTaskById,
};
