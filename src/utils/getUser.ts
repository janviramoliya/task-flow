import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";
import unauthenticatedError from "../errors/unauthenticated.error.js";

export type TokenUser = {
  userId: string;
  name: string;
};

export const getUserFromToken = async (token: string): Promise<TokenUser> => {
  const JWT_SECRET = process.env.JWT_SECRET || "jwtSecret";

  const { userId, name } = jwt.verify(token, JWT_SECRET) as {
    userId: string;
    name: string;
  };

  if (userId && name) {
    const userExisting = await userModel.findOne({ name, _id: userId });

    if (userExisting) {
      return { name, userId };
    } else {
      throw new unauthenticatedError("Invalid token");
    }
  } else {
    throw new unauthenticatedError("Invalid token");
  }
};
