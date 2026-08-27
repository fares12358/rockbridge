// src/middleware/localUpload.js
import multer from "multer";
import path from "path";
import fs from "fs";

// Shared local-disk multer factory. Handles the upload directory (created
// idempotently), unique filename generation, and the size limit; callers
// supply their own fileFilter since allowed types differ per route.
export function makeLocalUpload({ dir, limitEnvVar, defaultLimit, fileFilter }) {
  const uploadDir = path.join(process.cwd(), ...dir);
  if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

  const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadDir),
    filename: (req, file, cb) => {
      // Multer/busboy decode multipart filenames as latin1 by default, so
      // non-Latin (e.g. Arabic) original names must be re-decoded as utf8.
      const originalname = Buffer.from(file.originalname, "latin1").toString("utf8");
      const ext = path.extname(originalname) || "";
      const base = path.basename(originalname, ext).replace(/\s+/g, "-").toLowerCase();
      const unique = `${base}-${Date.now()}${Math.round(Math.random() * 1e6)}${ext}`;
      cb(null, unique);
    },
  });

  return multer({
    storage,
    limits: { fileSize: parseInt(process.env[limitEnvVar] || `${defaultLimit}`, 10) },
    fileFilter,
  });
}
