export type createActivityLogRequest = {
  actor?: string;
  workspace: string;
  project?: string;
  entity: "Task" | "Project" | "Comment" | "Workspace";
  entityId: string;
  action: string;
  details?: any;
  message?: string;
};

export type editActivityLogRequest = {
  actor?: string;
  workspace?: string;
  project?: string;
  entity?: "Task" | "Project" | "Comment" | "Workspace";
  entityId?: string;
  action?: string;
  details?: any;
  message?: string;
};
