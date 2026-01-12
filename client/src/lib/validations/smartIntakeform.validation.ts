import { z } from "zod";

export const smartIntakeSchema = z
  .object({
    chiefComplaint: z.string().min(10).max(500),
    symptoms: z.array(z.string()).min(1),
    duration: z.string().min(1),
    severity: z.enum(["mild", "moderate", "severe"]),

    // Conditional fields based on severity
    emergencyContact: z.string().optional(),

    // Photo comparison for skin conditions
    hasSkinIssue: z.boolean().default(false),
    skinPhotos: z.array(z.instanceof(File)).max(5).optional(),

    // Video message option
    videoMessageUrl: z.string().url().optional(),

    preferredContactMethod: z.enum(["sms", "whatsapp", "email"]),
    phoneNumber: z.string().optional(),
  })
  .refine(
    (data) => {
      // If severe, require emergency contact
      if (data.severity === "severe" && !data.emergencyContact) {
        return false;
      }
      return true;
    },
    {
      message: "Emergency contact is required for severe symptoms",
      path: ["emergencyContact"],
    }
  )
  .refine(
    (data) => {
      // If SMS or WhatsApp, require phone number
      if (
        (data.preferredContactMethod === "sms" ||
          data.preferredContactMethod === "whatsapp") &&
        !data.phoneNumber
      ) {
        return false;
      }
      return true;
    },
    {
      message: "Phone number is required for SMS/WhatsApp notifications",
      path: ["phoneNumber"],
    }
  );

export type SmartIntakeFormData = z.infer<typeof smartIntakeSchema>;
