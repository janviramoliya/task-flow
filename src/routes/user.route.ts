import { Router } from "express";
import { login, register } from "../controllers/user.controller.js";
import validateRequest from "../middlewares/validateRequest.js";
import {
  loginUserSchema,
  registerUserSchema,
} from "../validators/user.validator.js";

const router = Router();

router.post("/register", validateRequest(registerUserSchema, "body"), register);
router.post("/login", validateRequest(loginUserSchema, "body"), login);

export default router;
