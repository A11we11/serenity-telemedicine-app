import { z } from "zod";

export const consultationSchema = z.object({
  chiefComplaint: z
    .string()
    .min(1, "Please describe your concern")
    .min(10, "Please provide more details (at least 10 characters)")
    .max(500, "Description is too long (max 500 characters)"),

  symptoms: z.array(z.string()).min(1, "Please select at least one symptom"),

  duration: z
    .string()
    .min(1, "Please specify how long you have had these symptoms"),

  severity: z
    .string()
    .min(1, "Please rate the severity")
    .refine((val) => ["mild", "moderate", "severe"].includes(val), {
      message: "Invalid severity value",
    }),

  medicalHistory: z.string().optional(),

  currentMedications: z.string().optional(),

  allergies: z.string().optional(),

  photos: z
    .array(
      z.object({
        file: z.instanceof(File),
        preview: z.string(),
        description: z.string().optional(),
      }),
    )
    .max(5, "You can upload a maximum of 5 photos")
    .optional(),

  preferredContactMethod: z
    .string()
    .min(1, "Please select a contact method")
    .refine((val) => ["sms", "whatsapp", "email"].includes(val), {
      message: "Invalid contact method",
    }),

  phoneNumber: z
    .string()
    .regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number format")
    .optional(),
});

export type ConsultationFormData = z.infer<typeof consultationSchema>;
