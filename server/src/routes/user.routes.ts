import { prisma } from "../config/database";
import { updateProfileSchema } from "../validations/user.validation";

const router = Router();

router.patch(
  "/profile",
  authenticate,
  validate(updateProfileSchema),
  async (req, res, next) => {
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
