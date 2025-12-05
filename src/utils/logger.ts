import pino from "pino";
import path from "path";
import moment from "moment";
import { fileURLToPath } from "url";

const isDevelopment = process.env.NODE_ENV === "development";

// Get the current directory in ES module scope
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const logFilePath = path.join(
  __dirname,
  `../../logs/${moment().format("mm_dd_yyyy")}.log`
);

const logger = pino(
  {
    level: process.env.LOG_LEVEL || "info",
    ...(isDevelopment && {
      transport: {
        target: "pino-pretty",
        options: {
          colorize: true,
          translateTime: "yy-mm-dd HH:MM:ss:SSS",
          ignore: "pid,hostname",
        },
      },
    }),
  }
  // pino.destination(logFilePath)
);

export default logger;
