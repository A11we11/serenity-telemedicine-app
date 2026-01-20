import { Request, Response, NextFunction } from "express";
import { AuthRequest } from "../middleware/auth.middleware";
import { prisma } from "../config/database";
import { NotificationService } from "../services/notification.service";
import { successResponse } from "../utils/response.util";
import { getParamAsString } from "../utils/param.util";

// Create instance of NotificationService
const notificationService = new NotificationService();

export class MessageController {
  async create(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const message = await prisma.message.create({
        data: {
          consultationId: req.body.consultationId,
          senderId: req.user!.id,
          type: req.body.type,
          content: req.body.content,
          metadata: req.body.metadata,
        },
        include: {
          sender: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              role: true,
            },
          },
        },
      });

      // Get consultation for notification
      const consultation = await prisma.consultation.findUnique({
        where: { id: req.body.consultationId },
        include: {
          patient: { select: { phone: true, notificationPrefs: true } },
          doctor: { select: { phone: true, notificationPrefs: true } },
        },
      });

      // Send notification to recipient
      if (consultation) {
        const recipient =
          req.user!.role === "PATIENT"
            ? consultation.doctor
            : consultation.patient;

        if (recipient?.phone && recipient?.notificationPrefs) {
          const prefs = recipient.notificationPrefs as any;
          const notifMessage = `New message in your consultation from ${req.user!.role === "PATIENT" ? "patient" : "doctor"}`;

          if (prefs.sms) {
            notificationService
              .sendSMS(recipient.phone, notifMessage)
              .catch(console.error);
          }
          if (prefs.whatsapp) {
            notificationService
              .sendWhatsApp(recipient.phone, notifMessage)
              .catch(console.error);
          }
        }
      }

      return successResponse(res, message, "Message sent", 201);
    } catch (error) {
      next(error);
    }
  }

  async list(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const messages = await prisma.message.findMany({
        where: { consultationId: getParamAsString(req.params.consultationId) },
        include: {
          sender: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              role: true,
            },
          },
        },
        orderBy: { createdAt: "asc" },
      });

      return successResponse(res, messages);
    } catch (error) {
      next(error);
    }
  }
}
