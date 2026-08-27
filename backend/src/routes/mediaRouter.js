// src/routes/mediaRouter.js
import express from "express";
import { getMedia, addMedia, deleteMedia } from "../controllers/mediaController.js";
import { requireAuth } from "../middleware/authMiddleware.js";
import { makeLocalUpload } from "../middleware/localUpload.js";

const router = express.Router();

const ALLOWED = [
  "image/jpeg", "image/jpg", "image/png", "image/gif", "image/webp",
  "video/mp4", "video/webm", "video/quicktime", "video/x-msvideo", "video/mpeg"
];

const upload = makeLocalUpload({
  dir: ["uploads", "media"],
  limitEnvVar: "MEDIA_FILE_SIZE_LIMIT",
  defaultLimit: 100 * 1024 * 1024,
  fileFilter: (req, file, cb) => {
    if (ALLOWED.includes(file.mimetype)) cb(null, true);
    else cb(new Error("Unsupported file type. Allowed: images and common video types"));
  },
});


router.get("/", getMedia);
router.use(requireAuth);
router.post("/", upload.single("file"), addMedia);
router.delete("/:id", deleteMedia);

export default router;
