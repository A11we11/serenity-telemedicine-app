import z from "zod";

export const createConsultationSchema = z.object({
  body: z.object({
    chiefComplaint: z
      .string()
      .min(10, "Please provide more details about your concern"),
    priority: z.enum(["normal", "urgent"]).default("normal"),
    scheduledAt: z.string().datetime().optional(),
    intakeData: z.object({
      symptoms: z.array(z.string()).min(1, "Select at least one symptom"),
      duration: z.string().min(1, "Duration is required"),
      severity: z.enum(["mild", "moderate", "severe"]),
      medications: z.string().optional(),
      allergies: z.string().optional(),
      medicalHistory: z.string().optional(),
      additionalNotes: z.string().optional(),
    }),
  }),
});

export const updateConsultationSchema = z.object({
  params: z.object({
    id: z.string().cuid("Invalid consultation ID"),
  }),
  body: z.object({
    status: z
      .enum([
        "PENDING",
        "IN_PROGRESS",
        "AWAITING_RESPONSE",
        "COMPLETED",
        "CANCELLED",
      ])
      .optional(),
    doctorId: z.string().cuid().optional(),
  }),
});

export type CreateConsultationInput = z.infer<
  typeof createConsultationSchema
>["body"];
