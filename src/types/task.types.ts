export type SubTask = {
  title: string;
  done: boolean;
  assignees: string[];
};

export type createTaskRequest = {
  project?: string;
  title: string;
  description: string;
  creator: string;
  assignees: string[];
  status: "pending" | "in_progress" | "done" | "on_hold";
  priority?: "low" | "medium" | "high";
  dueDate?: string;
  subtasks?: SubTask[];
  attachments?: string[];
};

export type editTaskRequest = {
  project?: string;
  title?: string;
  description?: string;
  assignees?: string[];
  status?: "pending" | "in_progress" | "done" | "on_hold";
  priority?: "low" | "medium" | "high";
  dueDate?: string;
  subtasks?: SubTask[];
  attachments?: string[];
};
