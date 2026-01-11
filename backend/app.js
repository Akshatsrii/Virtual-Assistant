import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import connectDb from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

// ================= MIDDLEWARE =================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// ================= SECURITY / DEV FIX =================
app.use((req, res, next) => {
  if (req.url.includes("com.chrome.devtools.json")) {
    return res.status(204).end();
  }

  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; connect-src 'self' http://localhost:8000 https://generativelanguage.googleapis.com;"
  );

  next();
});

// ================= STATIC =================
app.use("/public", express.static("public"));

// ================= ROUTES =================
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

// ================= HEALTH CHECK =================
app.get("/", (req, res) => {
  res.send("🚀 Virtual Assistant Backend Running");
});

// ================= START SERVER =================
connectDb()
  .then(() => {
    app.listen(port, () => {
      console.log(`🚀 Server started on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error("❌ Database connection failed:", err);
  });
