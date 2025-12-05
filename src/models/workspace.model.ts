import mongoose, { Schema } from "mongoose";

const workspaceMemberSchema = new mongoose.Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      require: true,
      index: true,
    },
    role: {
      type: String,
      enum: ["owner", "admin", "member", "viewer"],
      default: "member",
    },
  },
  {
    timestamps: true,
  }
);

const workspaceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
      trim: true,
      index: true,
    },
    description: {
      type: String,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      require: true,
      index: true,
    },
    members: [workspaceMemberSchema],
    projects: [{ type: Schema.Types.ObjectId, ref: "Project", index: true }],
    activityLog: [
      {
        type: Schema.Types.ObjectId,
        ref: "ActivityLog",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("workspace", workspaceSchema);
