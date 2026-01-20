import z from "zod";

export const createMessageSchema = z.object({
  body: z.object({
    consultationId: z.string().cuid("Invalid consultation ID"),
    type: z.enum(["TEXT", "VIDEO", "IMAGE", "SYSTEM"]).default("TEXT"),
    content: z.string().min(1, "Message content is required"),
    metadata: z.record(z.any()).optional(),
  }),
});

export type CreateMessageInput = z.infer<typeof createMessageSchema>["body"];
