import multer from "multer";
import { PhotoController } from "../controllers/photo.controller";
import { Router } from "express";
import { authenticate } from "../middleware/auth.middleware";

const router = Router();
const photoController = new PhotoController();

const upload = multer({
  dest: "uploads/",
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "image/heic"];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type. Only JPEG, PNG, and HEIC are allowed."));
    }
  },
});

router.post("/", authenticate, upload.single("photo"), photoController.upload);

router.get("/consultation/:consultationId", authenticate, photoController.list);

export default router;
