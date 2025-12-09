import mongoose, { Document, Schema } from "mongoose";

export interface IProject extends Document {
  name: string;
  owner: Schema.Types.ObjectId;
  members: Schema.Types.ObjectId[];
  description: string;
  workspace: Schema.Types.ObjectId;
  visibility: "public" | "private" | "workspace";
  createdAt: Date;
  updatedAt: Date;
}

const projectSchema = new mongoose.Schema<IProject>(
  {
    name: {
      type: String,
      require: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
    members: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    workspace: {
      type: Schema.Types.ObjectId,
      ref: "workspace",
    },
    description: {
      type: String,
    },
    visibility: {
      type: String,
      enum: ["public", "private", "workspace"],
      default: "private",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IProject>("Project", projectSchema);
