import { MessageController } from "../controllers/message.controller";
import { createMessageSchema } from "../validations/message.validation";

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
