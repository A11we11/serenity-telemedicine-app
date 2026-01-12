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

  severity: z.enum(["mild", "moderate", "severe"], {
    required_error: "Please rate the severity",
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
      })
    )
    .max(5, "You can upload a maximum of 5 photos")
    .optional(),

  preferredContactMethod: z.enum(["sms", "whatsapp", "email"], {
    required_error: "Please select a contact method",
  }),

  phoneNumber: z
    .string()
    .regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number format")
    .optional(),
});

export type ConsultationFormData = z.infer<typeof consultationSchema>;
