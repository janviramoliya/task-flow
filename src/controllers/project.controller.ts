import {
  createProjectService,
  deleteProjectById,
  editProjectById,
  getAllProjects,
  getProjectById,
} from "../services/project.service.js";
import { type Request, type Response } from "express";
import type { requestWithUser } from "../types/requestWithUser.types.js";
import type { TokenUser } from "../utils/getUser.js";
import type {
  createProjectRequest,
  editProjectRequest,
} from "../types/project.types.js";
import CustomAPIError from "../errors/customApi.error.js";

const createProject = async (req: requestWithUser, res: Response) => {
  const projectDetails = req.body as createProjectRequest;
  projectDetails.owner = req.user?.userId as string;

  const { message, error, statusCode } = await createProjectService(
    projectDetails
  );

  res.status(statusCode).json({ message, error });
};

const getAllProject = async (req: requestWithUser, res: Response) => {
  const { message, error, data, statusCode } = await getAllProjects(
    req.user as TokenUser
  );

  res.status(statusCode).json({ message, error, data });
};

const getProject = async (req: requestWithUser, res: Response) => {
  const { id } = req.params;

  if (!id) {
    throw new CustomAPIError("Id is not provided to fetch project");
  }

  const { message, error, data, statusCode } = await getProjectById(id);

  res.status(statusCode).json({ message, error, data });
};

const deleteProject = async (req: requestWithUser, res: Response) => {
  const { id } = req.params;

  if (!id) {
    throw new CustomAPIError("Id is not provided to delete project");
  }

  const { message, error, statusCode } = await deleteProjectById(id);

  res.status(statusCode).json({ message, error });
};

const editProject = async (req: requestWithUser, res: Response) => {
  const { id } = req.params;
  const editProjectDetails = req.body as editProjectRequest;

  if (!id) {
    throw new CustomAPIError("Id is not provided to edit project");
  }

  const { message, error, statusCode } = await editProjectById(
    id,
    editProjectDetails
  );

  res.status(statusCode).json({ message, error });
};

export { createProject, getAllProject, getProject, deleteProject, editProject };
