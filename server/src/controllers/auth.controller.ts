import { Request, Response, NextFunction } from "express";
import { AuthService } from "../services/auth.service";
import { successResponse, errorResponse } from "../utils/response.util";
import { prisma } from "../config/database";

const authService = new AuthService();

export class AuthController {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await authService.register(req.body);
      return successResponse(res, result, "Registration successful", 201);
    } catch (error: any) {
      if (error.code === "P2002") {
        return errorResponse(res, "Email already exists", 409);
      }
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await authService.login(req.body);
      return successResponse(res, result, "Login successful");
    } catch (error: any) {
      if (error.message === "Invalid credentials") {
        return errorResponse(res, "Invalid email or password", 401);
      }
      next(error);
    }
  }

  async getProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await prisma.user.findUnique({
        where: { id: req.user!.id },
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          phone: true,
          role: true,
          language: true,
          notificationPrefs: true,
          createdAt: true,
        },
      });

      return successResponse(res, user);
    } catch (error) {
      next(error);
    }
  }
}
