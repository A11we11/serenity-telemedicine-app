import { prisma } from "../config/database";
import { authenticate } from "../middleware/auth.middleware";
import { validate } from "../middleware/validation.middleware";
import { successResponse } from "../utils/response.util";
import { updateProfileSchema } from "../validations/user.validation";
import { Request, Response, NextFunction, Router } from "express";

const router = Router();

router.patch(
  "/profile",
  authenticate,
  validate(updateProfileSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await prisma.user.update({
        where: { id: req.user!.id },
        data: req.body,
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          phone: true,
          role: true,
          language: true,
          notificationPrefs: true,
        },
      });

      return successResponse(res, user, "Profile updated");
    } catch (error) {
      next(error);
    }
  },
);

export default router;
