

// // server/index.js
// import dotenv from "dotenv";
// dotenv.config(); // 🔥 MUST BE FIRST — before any other imports

// console.log("Cloudinary API KEY:", process.env.CLOUDINARY_API_KEY);


// import express from "express";
// import cors from "cors";

// /**
//  * ROUTES
//  * (all routes import AFTER dotenv so env vars are available everywhere,
//  * especially cloudinary config)
//  */
// import adminRoutes from "./routes/admin.js";
// import oapRoutes from "./routes/oapRoutes.js";
// import programRoutes from "./routes/programRoutes.js";
// import scheduleRoutes from "./routes/scheduleRoutes.js";
// import episodeRoutes from "./routes/episodeRoutes.js";
// import sponsorRoutes from "./routes/sponsorsRoutes.js";
// import settingRoutes from "./routes/settingsRoutes.js";
// import activityRoutes from "./routes/activityRoutes.js";


// const app = express();

// /* ─────────────── MIDDLEWARE ─────────────── */
// // app.use(cors());

// app.use(
//   cors({
//     origin: "http://localhost:5174",
//     credentials: true,
//   })
// );
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// /* ─────────────── API ROUTES ─────────────── */
// app.use("/api/admin", adminRoutes);
// app.use("/api/oap", oapRoutes);
// app.use("/api/program", programRoutes);
// app.use("/api/schedule", scheduleRoutes);
// app.use("/api/episode", episodeRoutes);
// app.use("/api/sponsor", sponsorRoutes);
// app.use("/api/setting", settingRoutes);
// app.use("/api/activity", activityRoutes);


// /* ─────────────── HEALTH CHECKS ─────────────── */
// app.get("/api/admin/ping", (req, res) => {
//   res.json({ ok: true, route: "/api/admin/ping" });
// });

// app.get("/api/health", (req, res) => {
//   res.json({ ok: true, time: Date.now() });
// });

// /* ─────────────── SERVER ─────────────── */
// const PORT = Number(process.env.PORT) || 4000;

// app.listen(PORT, () => {
//   console.log(`✅ Server running on http://localhost:${PORT}`);
// });





import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

import adminRoutes from "./routes/admin.js";
import oapRoutes from "./routes/oapRoutes.js";
import programRoutes from "./routes/programRoutes.js";
import scheduleRoutes from "./routes/scheduleRoutes.js";
import episodeRoutes from "./routes/episodeRoutes.js";
import sponsorRoutes from "./routes/sponsorsRoutes.js";
import settingRoutes from "./routes/settingsRoutes.js";
import activityRoutes from "./routes/activityRoutes.js";


// Public routes 
import publicScheduleRoutes from "./routes/publicSchedule.js"

const app = express();

/* ───────── CORS ───────── */
const allowedOrigins = [
  "http://localhost:5174", // public site
  "http://localhost:5173", // my admin ui 
  "http://localhost:3000", // my admin api 
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (Postman, mobile apps)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ───────── ROUTES ───────── */
app.use("/api/admin", adminRoutes);
app.use("/api/oap", oapRoutes);
app.use("/api/program", programRoutes);
app.use("/api/schedule", scheduleRoutes);
app.use("/api/episode", episodeRoutes);
app.use("/api/sponsor", sponsorRoutes);
app.use("/api/setting", settingRoutes);
app.use("/api/activity", activityRoutes);

// Public routes 
app.use("/api/schedule", publicScheduleRoutes);
app.use("/api/schedule", scheduleRoutes);


/* ───────── HEALTH ───────── */
app.get("/api/health", (req, res) => {
  res.json({ ok: true, time: Date.now() });
});

/* ───────── SERVER ───────── */
const PORT = Number(process.env.PORT) || 4000;

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
