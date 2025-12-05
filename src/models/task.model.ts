import mongoose, { Document, Schema } from "mongoose";

export interface ITask extends Document {
  project: Schema.Types.ObjectId;
  title: string;
  description: string;
  creator: Schema.Types.ObjectId;
  assignees: Schema.Types.ObjectId[];
  status: "pending" | "in_progress" | "completed" | "on_hold";
  priority: "low" | "medium" | "high";
  dueDate: Date;
  subtasks: ISubTask[];
  attachments: Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export interface ISubTask extends Document {
  title: string;
  done: boolean;
  assignees: Schema.Types.ObjectId[];
}

const SubtaskSchema = new mongoose.Schema<ISubTask>({
  title: { type: String, required: true },
  done: { type: Boolean, default: false },
  assignees: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

const taskSchema = new mongoose.Schema<ITask>(
  {
    project: { type: Schema.Types.ObjectId, ref: "Project", index: true },
    title: { type: String, required: true, index: true },
    description: String,
    creator: { type: Schema.Types.ObjectId, ref: "User", required: true },
    assignees: [{ type: Schema.Types.ObjectId, ref: "User", index: true }],
    status: {
      type: String,
      enum: ["pending", "in_progress", "done", "on_hold"],
      default: "pending",
      index: true,
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
    dueDate: { type: Date, index: true },
    subtasks: [SubtaskSchema],
    attachments: [{ type: Schema.Types.ObjectId, ref: "Attachment" }],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Task", taskSchema);
