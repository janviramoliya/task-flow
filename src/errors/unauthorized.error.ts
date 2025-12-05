import { StatusCodes } from "http-status-codes";
import CustomAPIError from "./customApi.error.js";

class unauthorized extends CustomAPIError {
  constructor(message: string) {
    super(message);
    this.statusCode = StatusCodes.FORBIDDEN;
  }
}

export default unauthorized;
