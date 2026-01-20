import { ConsultationController } from "../controllers/consultation.controller";
import {
  createConsultationSchema,
  updateConsultationSchema,
} from "../validations/consultation.validation";
import { authenticate, authorize } from "../middleware/auth.middleware";
import { Router } from "express";
import { validate } from "../middleware/validation.middleware";

const router = Router();
const consultationController = new ConsultationController();

router.post(
  "/",
  authenticate,
  authorize("PATIENT"),
  validate(createConsultationSchema),
  consultationController.create,
);

router.get("/", authenticate, consultationController.list);

router.get("/:id", authenticate, consultationController.getById);

router.patch(
  "/:id",
  authenticate,
  authorize("DOCTOR", "ADMIN"),
  validate(updateConsultationSchema),
  consultationController.update,
);

export default router;
