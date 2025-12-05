import { registerUser, loginUser } from "../services/user.services.js";
import type { Request, Response } from "express";

const register = async (req: Request, res: Response) => {
  const registerDetails = req.body;
  const { message, error, statusCode } = await registerUser(registerDetails);
  res.status(statusCode).json({ message, error });
};

const login = async (req: Request, res: Response) => {
  const loginDetails = req.body;

  const { message, error, statusCode, data } = await loginUser(loginDetails);

  let token;
  if (data) token = data.token;

  res.cookie("token", token, {
    httpOnly: true,
    // 1 day
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    secure: process.env.NODE_ENV === "production",
    signed: true,
  });

  res.status(statusCode).json({ message, error });
};

export { register, login };
