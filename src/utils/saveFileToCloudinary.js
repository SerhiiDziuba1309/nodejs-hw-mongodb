import cloudinary from "cloudinary";
import fs from "fs/promises";
import { getEnvVar } from "./getEnvVar.js";


cloudinary.v2.config({
  cloud_name: getEnvVar("CLOUDINARY_CLOUD_NAME"),
  api_key: getEnvVar("CLOUDINARY_API_KEY"),
  api_secret: getEnvVar("CLOUDINARY_API_SECRET"),
  secure: true,
});


export const saveFileToCloudinary = async (filePath) => {
  if (!filePath) {
    throw new Error("Файл отсутствует или неверный путь");
  }

  try {
    const response = await cloudinary.v2.uploader.upload(filePath, {
      folder: "contacts",
    });

    await fs.unlink(filePath); 
    return response.secure_url;
  } catch (error) {
    throw error;
  }
};
