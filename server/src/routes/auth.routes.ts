import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { validate } from "../middleware/validation.middleware";
import { authenticate } from "../middleware/auth.middleware";
import { authLimiter } from "../middleware/rate-limit.middleware";
import { registerSchema, loginSchema } from "../validations/auth.validation";

const router = Router();
const authController = new AuthController();

router.post(
  "/register",
  authLimiter,
  validate(registerSchema),
  authController.register,
);

router.post("/login", authLimiter, validate(loginSchema), authController.login);

router.get("/profile", authenticate, authController.getProfile);

export default router;
