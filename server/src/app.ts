import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { env } from "./config/env";
import { errorHandler } from "./middleware/error.middleware";
import { apiLimiter } from "./middleware/rate-limit.middleware";

// Import routes
import authRoutes from "./routes/auth.routes";
import consultationRoutes from "./routes/consultation.routes";
import messageRoutes from "./routes/message.routes";
import photoRoutes from "./routes/photo.routes";
import userRoutes from "./routes/user.routes";

const app = express();

// Security middleware
app.use(helmet());
app.use(
  cors({
    origin: env.FRONTEND_URL,
    credentials: true,
  }),
);

// Body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging
if (env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Rate limiting
app.use("/api", apiLimiter);

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/consultations", consultationRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/photos", photoRoutes);
app.use("/api/users", userRoutes);

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// Error handler (must be last)
app.use(errorHandler);

export default app;
