const express = require("express");
const multer = require("multer");
const supabase = require("../config/supabaseConfig");
const router = express.Router();

// Use memory storage for handling files
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Allowed MIME types
const IMAGE_TYPES = ["image/png", "image/jpeg", "image/jpg", "image/webp"];
const VIDEO_TYPES = ["video/mp4", "video/webm", "video/avi", "video/mkv"];
const PDF_TYPES = ["application/pdf"];

// Upload Route
router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const { originalname, mimetype, buffer } = req.file;
    const timestamp = Date.now();
    const fileName = `${timestamp}-${originalname}`;

    // Determine storage path based on file type
    let folder = "";
    if (IMAGE_TYPES.includes(mimetype)) {
      folder = "images";
    } else if (VIDEO_TYPES.includes(mimetype)) {
      folder = "videos";
    } else if (PDF_TYPES.includes(mimetype)) {
      folder = "pdfs";
    } else {
      return res.status(400).json({ error: "Unsupported file type" });
    }

    // Upload file to Supabase Storage
    const { data, error } = await supabase.storage
      .from("uploads")
      .upload(`${folder}/${fileName}`, buffer, {
        contentType: mimetype,
        upsert: false, // Avoid overwriting existing files
      });

    if (error) throw error;

    // Generate public URL
    const publicUrl = `${process.env.SUPABASE_URL}/storage/v1/object/public/uploads/${folder}/${fileName}`;

    res.json({ success: true, url: publicUrl });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
