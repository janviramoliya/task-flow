import mongoose, { Schema } from "mongoose";

const activityLogSchema = new mongoose.Schema(
  {
    // Who performed the action
    actor: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    // Workspace context (required for multi-workspace setups)
    workspace: {
      type: Schema.Types.ObjectId,
      ref: "Workspace",
      required: true,
      index: true,
    },
    // Project context (optional)
    project: {
      type: Schema.Types.ObjectId,
      ref: "Project",
      index: true,
    },
    // Target entity info (generic)
    entity: {
      type: String, // 'Task', 'Project', 'Comment', 'Workspace'
      required: true,
      index: true,
    },
    entityId: {
      type: Schema.Types.ObjectId, // references the actual item
      required: true,
      index: true,
    },
    /*
    Type of action:
    Examples:
    - created
    - updated
    - deleted
    - assigned
    - moved
    - comment_added
    - status_changed
    - permission_changed
  */
    action: {
      type: String,
      required: true,
      index: true,
    },
    details: {
      type: Schema.Types.Mixed,
      default: null,
    },
    // Optional user-friendly text for UI display
    message: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("ActivityLog", activityLogSchema);
