import userModel from "../models/user.model.js";
import logger from "../utils/logger.js";
import type { response } from "../types/response.js";
import type { loginRequest, registerRequest } from "../types/user.types.js";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import { getUserFromToken } from "../utils/getUser.js";

const registerUser = async (
  registerObject: registerRequest
): Promise<response> => {
  logger.info("Registering user");

  const existingUser = await userModel.findOne({ email: registerObject.email });

  if (existingUser) {
    return {
      message: "User already exists, please login",
      statusCode: StatusCodes.BAD_REQUEST,
    };
  }

  const createdUser = await userModel.create(registerObject);

  console.log(createdUser);

  if (!createdUser) {
    return {
      message: "Failed to create user",
      error: "Failed to create user",
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
    };
  }

  return {
    message: "User registered successfully, please login",
    statusCode: StatusCodes.CREATED,
  };
};

const loginUser = async (loginObject: loginRequest): Promise<response> => {
  const { email, password } = loginObject;

  const existingUser = await userModel.findOne({ email });

  if (!existingUser) {
    return {
      message: "Invalid username or password",
      statusCode: StatusCodes.UNAUTHORIZED,
    };
  }

  const isPasswordVerified = existingUser.comparePassword(password);

  if (!isPasswordVerified) {
    return {
      message: "Invalid username or password",
      statusCode: StatusCodes.UNAUTHORIZED,
    };
  }

  const jwtToken = existingUser.createJWT();

  return {
    message: "User logged in successfully",
    statusCode: StatusCodes.OK,
    data: { token: jwtToken },
  };
};

const getUserDetails = async (token: string) => {
  const { userId } = await getUserFromToken(token);

  const user = await userModel.findById(userId);
};

export { registerUser, loginUser };
