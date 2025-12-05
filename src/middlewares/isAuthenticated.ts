import type { NextFunction, Request, Response } from "express";
import unauthenticatedError from "../errors/unauthenticated.error.js";
import { getUserFromToken } from "../utils/getUser.js";
import type { requestWithUser } from "../types/requestWithUser.types.js";

const isAuthenticated = async (
  req: requestWithUser,
  res: Response,
  next: NextFunction
) => {
  const token = req.signedCookies["token"];

  if (token) {
    const user = await getUserFromToken(token);

    if (user) {
      req.user = user;
      next();
    } else {
      throw new unauthenticatedError("Failed to verify token");
    }
  } else {
    throw new unauthenticatedError("Token is not present in the cookies");
  }
};

// const verifyToken = async (token: string): Promise<boolean> => {
//   const user = await getUserFromToken(token);

//   if (user && user.name && user.userId) {
//     return true;
//   } else {
//     return false;
//   }
// };

export default isAuthenticated;
