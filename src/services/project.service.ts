import { StatusCodes } from "http-status-codes";
import type { response } from "../types/response.js";
import logger from "../utils/logger.js";
import projectModel from "../models/project.model.js";
import type { TokenUser } from "../utils/getUser.js";
import type {
  createProjectRequest,
  editProjectRequest,
} from "../types/project.types.js";
import workspaceModel from "../models/workspace.model.js";
import CustomAPIError from "../errors/customApi.error.js";

const createProjectService = async (
  createProjectObject: createProjectRequest
): Promise<response> => {
  logger.info("Creating project");

  const projectDetails = {
    ...createProjectObject,
  };

  const { workspace } = projectDetails;

  const workspaceExist = await workspaceModel.findById(workspace);

  if (!workspaceExist) {
    throw new CustomAPIError("Workspace does not exist with Id: " + workspace);
  }

  const createdProject = await projectModel.create(projectDetails);
  logger.info(`Project created with details: ${createdProject}`);

  if (createdProject)
    return {
      message: "Project created",
      statusCode: StatusCodes.CREATED,
    };
  else {
    return {
      message: "Failed to create project",
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
    };
  }
};

const deleteProjectById = async (projectId: string): Promise<response> => {
  const deletedProject = await projectModel.findByIdAndDelete(projectId);

  if (deletedProject) {
    return {
      message: "Project deleted",
      statusCode: StatusCodes.OK,
    };
  } else {
    return {
      message: "Failed to delete project",
      statusCode: StatusCodes.BAD_REQUEST,
    };
  }
};

const editProjectById = async (
  projectId: string,
  projectDetails: editProjectRequest
): Promise<response> => {
  const editedProject = await projectModel.findByIdAndUpdate(
    projectId,
    projectDetails,
    { new: true }
  );

  if (editedProject) {
    return {
      message: "Project edited",
      data: editedProject,
      statusCode: StatusCodes.OK,
    };
  } else {
    return {
      message: "Failed to edit project",
      statusCode: StatusCodes.BAD_REQUEST,
    };
  }
};

const getAllProjects = async (user: TokenUser): Promise<response> => {
  const projects = await projectModel.find({
    $or: [{ owner: user.userId }, { members: user.userId }],
  });

  if (projects && projects.length > 0)
    return {
      message: "Fetched projects",
      data: projects,
      statusCode: StatusCodes.OK,
    };
  else
    return {
      message: "No projects found",
      statusCode: StatusCodes.NOT_FOUND,
    };
};

const getProjectById = async (projectId: string): Promise<response> => {
  const project = await projectModel.findById(projectId);

  if (project)
    return {
      message: "Fetched project",
      data: project,
      statusCode: StatusCodes.OK,
    };
  else
    return {
      message: "No project found with id: " + projectId,
      statusCode: StatusCodes.NOT_FOUND,
    };
};

export {
  createProjectService,
  deleteProjectById,
  editProjectById,
  getAllProjects,
  getProjectById,
};
