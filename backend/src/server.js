// src/server.js
import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cors from "cors";
import multer from "multer";
import AuthRoutes from "./routes/AuthRoutes.js";
import servicesRouter from "./routes/servicesRouter.js";
import mediaRouter from "./routes/mediaRouter.js";
import quoteRouter from "./routes/quoteRouter.js";
import path from "path";

dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

// increase body size limit (adjust as needed)
const BODY_LIMIT = process.env.BODY_LIMIT || "10mb";

app.use(express.json({ limit: BODY_LIMIT }));
app.use(express.urlencoded({ limit: BODY_LIMIT, extended: true }));

// Allow only the configured frontend origin(s). FRONTEND_URL/FRONT_BASE_URL
// may each be a single origin or a comma-separated list (e.g. local + prod).
const allowedOrigins = [process.env.FRONTEND_URL, process.env.FRONT_BASE_URL]
  .filter(Boolean)
  .flatMap((v) => v.split(","))
  .map((v) => v.trim())
  .filter(Boolean);

if (allowedOrigins.length === 0) {
  console.warn("⚠️  No FRONTEND_URL/FRONT_BASE_URL set — CORS is allowing all origins.");
}

app.use(cors({ origin: allowedOrigins.length > 0 ? allowedOrigins : true }));

connectDB();

// All routes are defined once on this router, then mounted at both "/" and
// "/api". Controllers hardcode public URLs under "/api/uploads/..." to match
// the production reverse proxy; mounting at "/" too means the same server
// works when hit directly (e.g. NEXT_PUBLIC_API_BASE=http://localhost:5000/api
// in local dev) regardless of whether a proxy strips the "/api" prefix.
const apiRouter = express.Router();

// Serve uploaded files from the project-level "uploads" folder
// (ensure this matches the UPLOAD_DIR used by multer)
apiRouter.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

apiRouter.use("/auth", AuthRoutes);
apiRouter.use("/services", servicesRouter);
apiRouter.use("/media", mediaRouter);
apiRouter.use("/quotes", quoteRouter);

app.use(apiRouter);
app.use("/api", apiRouter);

app.get("/", (req, res) => res.send("Hello, Modular Backend!"));

// Catches Multer upload errors (bad file type from fileFilter, oversized
// file) so they return the same JSON shape as the rest of the API instead
// of Express's default HTML error page.
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ message: err.message });
  }
  if (err) {
    console.error("Unhandled error:", err);
    return res.status(400).json({ message: err.message || "Request failed" });
  }
  next();
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
  console.log(`Body parser limit: ${BODY_LIMIT}`);
});
