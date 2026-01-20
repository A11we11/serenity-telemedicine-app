// controllers/photo.controller.ts
import { NextFunction, Response } from "express";
import { prisma } from "../config/database";
import { AuthRequest } from "../middleware/auth.middleware";
import { StorageService } from "../services/storage.service";
import { errorResponse, successResponse } from "../utils/response.util";
import { getParamAsString } from "../utils/param.util";

const storageService = new StorageService();

export class PhotoController {
  async upload(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      if (!req.file) {
        return errorResponse(res, "No file provided", 400);
      }

      const uploadResult = await storageService.uploadPhoto(req.file);

      const photo = await prisma.photo.create({
        data: {
          consultationId: req.body.consultationId,
          userId: req.user!.id,
          url: uploadResult.url,
          thumbnailUrl: uploadResult.thumbnailUrl,
          description: req.body.description,
          takenAt: req.body.takenAt ? new Date(req.body.takenAt) : new Date(),
          metadata: uploadResult.metadata,
        },
      });

      return successResponse(res, photo, "Photo uploaded", 201);
    } catch (error) {
      next(error);
    }
  }

  async list(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const photos = await prisma.photo.findMany({
        where: { consultationId: getParamAsString(req.params.consultationId) },
        orderBy: { takenAt: "desc" },
      });

      return successResponse(res, photos);
    } catch (error) {
      next(error);
    }
  }
}
