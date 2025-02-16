import multer from "multer";
import path from "path";
import fs from "fs";

const TEMP_UPLOAD_DIR = path.resolve("temp");

if (!fs.existsSync(TEMP_UPLOAD_DIR)) {
  fs.mkdirSync(TEMP_UPLOAD_DIR, { recursive: true });
  
} 

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, TEMP_UPLOAD_DIR);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    const newFilename = `${uniqueSuffix}_${file.originalname}`;
    cb(null, newFilename);
  },
});

export const upload = multer({ storage });
export { TEMP_UPLOAD_DIR };
