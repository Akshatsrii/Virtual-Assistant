import multer from "multer";
import path from "path";
import fs from "fs";

// ================= ENSURE UPLOAD DIRECTORY EXISTS =================
const uploadDir = "./public";

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// ================= STORAGE CONFIG =================
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },

  filename: (req, file, cb) => {
    const uniqueName =
      Date.now() +
      "-" +
      Math.round(Math.random() * 1e9) +
      path.extname(file.originalname);

    cb(null, uniqueName);
  },
});

// ================= FILE FILTER (OPTIONAL BUT RECOMMENDED) =================
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype.startsWith("image/") ||
    file.mimetype.startsWith("video/")
  ) {
    cb(null, true);
  } else {
    cb(new Error("Only image/video files are allowed"), false);
  }
};

// ================= MULTER INSTANCE =================
const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
});

export default upload;
