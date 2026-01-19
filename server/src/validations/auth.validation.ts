import { z } from "zod";

export const registerSchema = z.object({
  body: z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    phone: z.string().optional(),
    role: z.enum(["PATIENT", "DOCTOR"]).default("PATIENT"),
    language: z.string().default("en"),
  }),
});

export const loginSchema = z.object({
  body: z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(1, "Password is required"),
  }),
});

// validations/consultation.validation.ts
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

// validations/message.validation.ts
export const createMessageSchema = z.object({
  body: z.object({
    consultationId: z.string().cuid("Invalid consultation ID"),
    type: z.enum(["TEXT", "VIDEO", "IMAGE", "SYSTEM"]).default("TEXT"),
    content: z.string().min(1, "Message content is required"),
    metadata: z.record(z.any()).optional(),
  }),
});

// validations/photo.validation.ts
export const uploadPhotoSchema = z.object({
  body: z.object({
    consultationId: z.string().cuid("Invalid consultation ID"),
    description: z.string().optional(),
    takenAt: z.string().datetime().optional(),
  }),
});

// validations/user.validation.ts
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

export type RegisterInput = z.infer<typeof registerSchema>["body"];
export type LoginInput = z.infer<typeof loginSchema>["body"];
export type CreateConsultationInput = z.infer<
  typeof createConsultationSchema
>["body"];
export type CreateMessageInput = z.infer<typeof createMessageSchema>["body"];
