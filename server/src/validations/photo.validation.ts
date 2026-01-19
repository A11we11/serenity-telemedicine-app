import z from "zod";

export const uploadPhotoSchema = z.object({
  body: z.object({
    consultationId: z.string().cuid("Invalid consultation ID"),
    description: z.string().optional(),
    takenAt: z.string().datetime().optional(),
  }),
});
