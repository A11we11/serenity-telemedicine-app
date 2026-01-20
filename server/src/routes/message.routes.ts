import { Router } from "express";
import { MessageController } from "../controllers/message.controller";
import { createMessageSchema } from "../validations/message.validation";
import { authenticate } from "../middleware/auth.middleware";
import { validate } from "../middleware/validation.middleware";

const router = Router();
const messageController = new MessageController();

router.post(
  "/",
  authenticate,
  validate(createMessageSchema),
  messageController.create,
);

router.get(
  "/consultation/:consultationId",
  authenticate,
  messageController.list,
);

export default router;
