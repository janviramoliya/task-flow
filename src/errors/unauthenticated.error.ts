import { StatusCodes } from "http-status-codes";
import CustomAPIError from "./customApi.error.js";

class unauthenticatedError extends CustomAPIError {
  constructor(message: string) {
    super(message);
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}

export default unauthenticatedError;
