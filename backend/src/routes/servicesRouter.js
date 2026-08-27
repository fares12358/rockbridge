// src/routes/servicesRouter.js
import express from "express";
import path from "path";
import { getServices, addService, deleteService } from "../controllers/serviceController.js";
import { requireAuth } from "../middleware/authMiddleware.js";
import { makeLocalUpload } from "../middleware/localUpload.js";

const router = express.Router();

const upload = makeLocalUpload({
  dir: ["uploads"],
  limitEnvVar: "FILE_SIZE_LIMIT",
  defaultLimit: 20 * 1024 * 1024,
  fileFilter: (req, file, cb) => {
    const allowed = /jpeg|jpg|png|gif/;
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowed.test(ext.replace(".", "")) || allowed.test(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed (jpeg, jpg, png, gif)"));
    }
  },
});

// routes
router.get("/", getServices);
router.use(requireAuth);
router.post("/", upload.single("image"), addService);
router.delete("/:id", deleteService);

export default router;
