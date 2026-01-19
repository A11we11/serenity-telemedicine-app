import app from "./app";
import { env } from "./config/env";
import { prisma } from "./config/database";

const PORT = parseInt(env.PORT, 10);

const startServer = async () => {
  try {
    // Test database connection
    await prisma.$connect();
    console.log("✅ Database connected");

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`
🚀 Serenity Backend Server
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Environment: ${env.NODE_ENV}
Server:      http://localhost:${PORT}
Health:      http://localhost:${PORT}/health
API Docs:    http://localhost:${PORT}/api
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      `);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1);
  }
};

// Graceful shutdown
process.on("SIGTERM", async () => {
  console.log("SIGTERM received, shutting down gracefully...");
  await prisma.$disconnect();
  process.exit(0);
});

process.on("SIGINT", async () => {
  console.log("SIGINT received, shutting down gracefully...");
  await prisma.$disconnect();
  process.exit(0);
});

startServer();
