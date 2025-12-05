import { Schema, model, Document } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: "user" | "admin";
  createdAt: Date;
  updatedAt: Date;
  comparePassword(password: string): boolean;
  createJWT(): string;
}

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minLength: 2,
      maxLength: 80,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.createJWT = function () {
  const JWT_SECRET: string = process.env.JWT_SECRET || "jwtSecret";
  return jwt.sign({ userId: this._id, name: this.name }, JWT_SECRET, {
    expiresIn: "1d",
  });
};

userSchema.methods.comparePassword = async function (password: string) {
  return await bcrypt.compare(this.password, password);
};

export default model<IUser>("User", userSchema);
