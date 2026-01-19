import z from "zod";

export const updateProfileSchema = z.object({
  body: z.object({
    firstName: z.string().min(1).optional(),
    lastName: z.string().min(1).optional(),
    phone: z.string().optional(),
    language: z.string().optional(),
    notificationPrefs: z
      .object({
        sms: z.boolean().optional(),
        whatsapp: z.boolean().optional(),
        email: z.boolean().optional(),
      })
      .optional(),
  }),
});
