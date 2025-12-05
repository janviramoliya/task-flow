import { StatusCodes } from "http-status-codes";
import type { response } from "../types/response.js";
import logger from "../utils/logger.js";
import type { role } from "../types/role.types.js";
import workspaceModel from "../models/workspace.model.js";
import type {
  createWorkspaceRequest,
  editWorkspaceRequest,
} from "../types/workspace.types.js";
import type { TokenUser } from "../utils/getUser.js";

const createWorkspaceService = async (
  createWorkspaceObject: createWorkspaceRequest
): Promise<response> => {
  logger.info("Creating workspace");

  let { owner, members } = createWorkspaceObject;

  if (members?.length) {
    members = [...members, { user: owner, role: "owner" }];
  } else {
    members = [{ user: owner, role: "owner" }];
  }

  const workspaceDetails = {
    ...createWorkspaceObject,
    owner: owner,
    members: members,
  };

  const createdWorkspace = await workspaceModel.create(workspaceDetails);
  logger.info(`Workspace created with details: ${createdWorkspace}`);

  if (createdWorkspace)
    return {
      message: "Workspace created",
      statusCode: StatusCodes.CREATED,
    };
  else {
    return {
      message: "Failed to create workspace",
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
    };
  }
};

const deleteWorkspaceById = async (workspaceId: string): Promise<response> => {
  const deletedWorkspace = await workspaceModel.findByIdAndDelete(workspaceId);

  if (deletedWorkspace) {
    return {
      message: "Workspace deleted",
      statusCode: StatusCodes.OK,
    };
  } else {
    return {
      message: "Failed to delete workspace",
      statusCode: StatusCodes.BAD_REQUEST,
    };
  }
};

const editWorkspaceById = async (
  workspaceId: string,
  workspaceDetails: editWorkspaceRequest
): Promise<response> => {
  const editedWorkspace = await workspaceModel.findByIdAndUpdate(
    workspaceId,
    workspaceDetails,
    {
      new: true,
    }
  );

  if (editedWorkspace) {
    return {
      message: "Workspace edited",
      data: editedWorkspace,
      statusCode: StatusCodes.OK,
    };
  } else {
    return {
      message: "Failed to edit workspace",
      statusCode: StatusCodes.BAD_REQUEST,
    };
  }
};

const getAllWorkspaces = async (user: TokenUser): Promise<response> => {
  const workspaces = await workspaceModel.find({
    $or: [{ owner: user.userId }, { "members.user": user.userId }],
  });

  if (workspaces && workspaces.length > 0)
    return {
      message: "Fetched workspaces",
      data: workspaces,
      statusCode: StatusCodes.OK,
    };
  else
    return {
      message: "No workspaces found",
      statusCode: StatusCodes.NOT_FOUND,
    };
};

const getWorkspaceById = async (workspaceId: string): Promise<response> => {
  const workspace = await workspaceModel.findById(workspaceId);

  if (workspace)
    return {
      message: "Fetched workspace",
      data: workspace,
      statusCode: StatusCodes.OK,
    };
  else
    return {
      message: "No workspaces found with id: " + workspaceId,
      statusCode: StatusCodes.NOT_FOUND,
    };
};

export {
  createWorkspaceService,
  deleteWorkspaceById,
  editWorkspaceById,
  getAllWorkspaces,
  getWorkspaceById,
};
