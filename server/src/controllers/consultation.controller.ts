import { ConsultationService } from "../services/consultation.service";
import { NotificationService } from "../services/notification.service";
import type { AuthRequest } from "../middleware/auth.middleware";

const consultationService = new ConsultationService();
const notificationService = new NotificationService();

export class ConsultationController {
  async create(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const consultation = await consultationService.create(
        req.user!.id,
        req.body,
      );

      // Send notification to admins/doctors (async)
      if (req.body.priority === "urgent") {
        // Implement your notification logic here
      }

      return successResponse(
        res,
        consultation,
        "Consultation created successfully",
        201,
      );
    } catch (error) {
      next(error);
    }
  }

  async getById(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const consultation = await consultationService.getById(
        req.params.id,
        req.user!.id,
        req.user!.role,
      );

      return successResponse(res, consultation);
    } catch (error: any) {
      if (error.message === "Consultation not found") {
        return errorResponse(res, "Consultation not found", 404);
      }
      if (error.message === "Unauthorized") {
        return errorResponse(res, "Unauthorized access", 403);
      }
      next(error);
    }
  }

  async list(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const consultations = await consultationService.list(
        req.user!.id,
        req.user!.role,
      );

      return successResponse(res, consultations);
    } catch (error) {
      next(error);
    }
  }

  async update(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const consultation = await consultationService.update(
        req.params.id,
        req.body,
      );

      return successResponse(res, consultation, "Consultation updated");
    } catch (error) {
      next(error);
    }
  }
}
