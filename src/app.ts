import express from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import cookieParser from "cookie-parser";
import compression from "compression";
import notFound from "./middlewares/notFound.js";
import errorHandler from "./middlewares/errorHandler.js";
import allRoutes from "./routes/index.js";
import { jwt } from "zod/mini";

const app = express();

const JWT_SECRET: string = process.env.JWT_SECRET || "jwtSecret";

// --- Security Headers ---
app.use(helmet());

// --- CORS ---
const allowedOrigins = (process.env.CORS_ORIGINS || "")
  .split(",")
  .map((s) => s.trim());
const corsOptions: cors.CorsOptions =
  allowedOrigins.length > 0
    ? {
        origin: (origin, callback) => {
          if (!origin) return callback(null, true);
          if (allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
          } else {
            callback(new Error("Not allowed by CORS"));
          }
        },
      }
    : { origin: true, credentials: true };

// app.use(cors(corsOptions));
app.use(cors());

// --- Logging ---
// if (process.env.NODE_ENV !== "test") {
//   app.use(morgan("combined"));
// }

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(limiter);

// body parser
app.use(express.json({ limit: "1mb" }));
app.use(cookieParser(JWT_SECRET));

// compression
app.use(compression());

app.use("/api/v1", allRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
