export type createProjectRequest = {
  owner: string;
  name: string;
  description: string;
  members: string[];
  workspace: string;
  visibility: "public" | "private" | "workspace";
};

export type editProjectRequest = {
  owner?: string;
  name?: string;
  description?: string;
  members?: string[];
  workspace: string;
  visibility?: "public" | "private" | "workspace";
};
