import { v2 as cloudinary } from "cloudinary";
import { env } from "../config/env";

export class StorageService {
  constructor() {
    if (env.CLOUDINARY_CLOUD_NAME) {
      cloudinary.config({
        cloud_name: env.CLOUDINARY_CLOUD_NAME,
        api_key: env.CLOUDINARY_API_KEY,
        api_secret: env.CLOUDINARY_API_SECRET,
      });
    }
  }

  async uploadPhoto(file: Express.Multer.File) {
    if (!env.CLOUDINARY_CLOUD_NAME) {
      throw new Error("Cloudinary not configured");
    }

    const result = await cloudinary.uploader.upload(file.path, {
      folder: "serenity/photos",
      resource_type: "image",
    });

    return {
      url: result.secure_url,
      thumbnailUrl: result.secure_url.replace(
        "/upload/",
        "/upload/w_300,h_300,c_fill/",
      ),
      metadata: {
        width: result.width,
        height: result.height,
        format: result.format,
      },
    };
  }
}
