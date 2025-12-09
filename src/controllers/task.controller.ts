import {
  createTaskService,
  deleteTaskById,
  editTaskById,
  getAllTasks,
  getTaskById,
} from "../services/task.service.js";
import { type Request, type Response } from "express";
import type { requestWithUser } from "../types/requestWithUser.types.js";
import type { TokenUser } from "../utils/getUser.js";
import type {
  createTaskRequest,
  editTaskRequest,
} from "../types/task.types.js";
import CustomAPIError from "../errors/customApi.error.js";

const createTask = async (req: requestWithUser, res: Response) => {
  const taskDetails = req.body as createTaskRequest;
  taskDetails.creator = req.user?.userId as string;

  const { message, error, statusCode } = await createTaskService(taskDetails);

  res.status(statusCode).json({ message, error });
};

const getAllTask = async (req: requestWithUser, res: Response) => {
  const { message, error, data, statusCode } = await getAllTasks(
    req.user as TokenUser
  );

  res.status(statusCode).json({ message, error, data });
};

const getTask = async (req: requestWithUser, res: Response) => {
  const { id } = req.params;

  if (!id) {
    throw new CustomAPIError("Id is not provided to fetch task");
  }

  const { message, error, data, statusCode } = await getTaskById(id);

  res.status(statusCode).json({ message, error, data });
};

const deleteTask = async (req: requestWithUser, res: Response) => {
  const { id } = req.params;

  if (!id) {
    throw new CustomAPIError("Id is not provided to delete task");
  }

  const { message, error, statusCode } = await deleteTaskById(id);

  res.status(statusCode).json({ message, error });
};

const editTask = async (req: requestWithUser, res: Response) => {
  const { id } = req.params;
  const editTaskDetails = req.body as editTaskRequest;

  if (!id) {
    throw new CustomAPIError("Id is not provided to edit task");
  }

  const { message, error, statusCode } = await editTaskById(
    id,
    editTaskDetails
  );

  res.status(statusCode).json({ message, error });
};

export { createTask, getAllTask, getTask, deleteTask, editTask };
