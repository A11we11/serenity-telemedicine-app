import twilio from "twilio";
import { env } from "../config/env";
import { prisma } from "../config/database";

export class NotificationService {
  private client?: twilio.Twilio;

  constructor() {
    if (env.TWILIO_ACCOUNT_SID && env.TWILIO_AUTH_TOKEN) {
      this.client = twilio(env.TWILIO_ACCOUNT_SID, env.TWILIO_AUTH_TOKEN);
    }
  }

  async sendSMS(to: string, message: string) {
    if (!this.client || !env.TWILIO_PHONE_NUMBER) {
      console.log("SMS not configured, skipping...");
      return null;
    }

    try {
      const result = await this.client.messages.create({
        body: message,
        from: env.TWILIO_PHONE_NUMBER,
        to,
      });

      await prisma.notification.create({
        data: {
          userId: to,
          type: "sms",
          status: "sent",
          content: message,
          metadata: { sid: result.sid },
          sentAt: new Date(),
        },
      });

      return result;
    } catch (error) {
      console.error("SMS error:", error);
      await prisma.notification.create({
        data: {
          userId: to,
          type: "sms",
          status: "failed",
          content: message,
          metadata: { error: String(error) },
        },
      });
      throw error;
    }
  }

  async sendWhatsApp(to: string, message: string) {
    if (!this.client || !env.TWILIO_WHATSAPP_NUMBER) {
      console.log("WhatsApp not configured, skipping...");
      return null;
    }

    try {
      const result = await this.client.messages.create({
        body: message,
        from: `whatsapp:${env.TWILIO_WHATSAPP_NUMBER}`,
        to: `whatsapp:${to}`,
      });

      await prisma.notification.create({
        data: {
          userId: to,
          type: "whatsapp",
          status: "sent",
          content: message,
          metadata: { sid: result.sid },
          sentAt: new Date(),
        },
      });

      return result;
    } catch (error) {
      console.error("WhatsApp error:", error);
      throw error;
    }
  }
}
