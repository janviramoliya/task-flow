import express from "express";
import userRoutes from "./user.route.js";

const router = express.Router();

router.use("/auth", userRoutes);

export default router;
