import type { Request } from "express";
import type { TokenUser } from "../utils/getUser.js";

export interface requestWithUser extends Request {
  user?: TokenUser;
}
