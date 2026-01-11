import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// ================= CLOUDINARY CONFIG =================
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ================= UPLOAD FUNCTION =================
const uploadOnCloudinary = async (filePath) => {
  try {
    if (!filePath) return null;

    const uploadResult = await cloudinary.uploader.upload(filePath, {
      resource_type: "auto",
    });

    // remove file from local uploads folder
    fs.unlinkSync(filePath);

    return uploadResult.secure_url;

  } catch (error) {
    // remove file even if upload fails
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    console.error("CLOUDINARY UPLOAD ERROR:", error);
    return null;
  }
};

export default uploadOnCloudinary;
