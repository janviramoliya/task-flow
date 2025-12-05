import {
  createWorkspaceService,
  deleteWorkspaceById,
  editWorkspaceById,
  getAllWorkspaces,
  getWorkspaceById,
} from "../services/workspace.service.js";
import { type Request, type Response } from "express";
import type { requestWithUser } from "../types/requestWithUser.types.js";
import type { TokenUser } from "../utils/getUser.js";
import CustomAPIError from "../errors/customApi.error.js";

const createWorkspace = async (req: requestWithUser, res: Response) => {
  const workspaceDetails = req.body;
  workspaceDetails.owner = req.user?.userId;
  const { message, error, statusCode } = await createWorkspaceService(
    workspaceDetails
  );

  res.status(statusCode).json({ message, error });
};

const getAllWorkspace = async (req: requestWithUser, res: Response) => {
  const { message, error, data, statusCode } = await getAllWorkspaces(
    req.user as TokenUser
  );

  res.status(statusCode).json({ message, error, data });
};

const getWorkspace = async (req: requestWithUser, res: Response) => {
  const { id } = req.params;

  if (!id) {
    throw new CustomAPIError("Id is not provided to edit workspace");
  }

  const { message, error, data, statusCode } = await getWorkspaceById(id);

  res.status(statusCode).json({ message, error, data });
};

const deleteWorkspace = async (req: requestWithUser, res: Response) => {
  const { id } = req.params;

  if (!id) {
    throw new CustomAPIError("Id is not provided to edit workspace");
  }

  const { message, error, statusCode } = await deleteWorkspaceById(id);

  res.status(statusCode).json({ message, error });
};

const editWorkspace = async (req: requestWithUser, res: Response) => {
  const { id } = req.params;
  const editWorkspaceDetails = req.body;

  if (!id) {
    throw new CustomAPIError("Id is not provided to edit workspace");
  }

  const { message, error, statusCode } = await editWorkspaceById(
    id,
    editWorkspaceDetails
  );

  res.status(statusCode).json({ message, error });
};

export {
  createWorkspace,
  getAllWorkspace,
  getWorkspace,
  deleteWorkspace,
  editWorkspace,
};
