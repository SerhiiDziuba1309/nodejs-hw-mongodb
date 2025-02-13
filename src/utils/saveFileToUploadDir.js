import fs from "fs/promises";
import path from "path";
import { TEMP_UPLOAD_DIR } from "../middlewares/multer.js";

export const saveFileToUploadDir = async (file) => {
  if (!file || !file.path) {
    throw new Error("error.message");
  }

  const targetPath = path.join(TEMP_UPLOAD_DIR, file.filename);
  await fs.rename(file.path, targetPath);



  return targetPath;
};
