import type { role } from "./role.types.js";

export type createWorkspaceRequest = {
  owner: string;
  name: string;
  description: string;
  members?: {
    user: string;
    role: role;
  }[];
};

export type editWorkspaceRequest = {
  owner?: string;
  name?: string;
  description?: string;
  members?: {
    user: string;
    role: role;
  }[];
};
