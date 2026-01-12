// require("dotenv").config();
// const express = require("express");
// const cors = require("cors");

// // ROUTES
// const adminRoutes = require("./routes/adminRoutes");
// // const superAdminRoutes = require("./routes/superAdminRoutes");
// // const authRoutes = require("./routes/authRoutes");
// const uploadRoutes = require("./routes/uploadRoutes")

// const app = express();

// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Mount APIs
// // app.use("/api/auth", authRoutes);
// app.use("/api/admin", adminRoutes);
// // app.use("/api/superadmin", superAdminRoutes);
 
// app.use('/api', uploadRoutes); // POST /api/admin/upload-avatar

// // Health check
// app.get("/health", (req, res) => {
//   res.json({ ok: true, time: Date.now() });
// });

// const PORT = process.env.PORT || 4000;
// app.listen(PORT, () => {
//   console.log(`Server listening on port ${PORT}`);
// });


// require('dotenv').config();
// const express = require('express');
// const cors = require('cors');
// const adminRoutes = require('./routes/adminRoutes');
// const uploadRoutes = require('./routes/uploadRoutes');

// const app = express();
// app.use(cors());
// app.use(express.json());

// // mount my routes 
// app.use('/api/admin', adminRoutes);


// app.use('/api', uploadRoutes); // POST /api/admin/upload-avatar


// // health 
// app.get('/api/health', (req, res) => res.json({ok: true}));



// const PORT = process.env.PORT || 400;
// app.listen(PORT, () => console.log(`Server listening on ${PORT}`));



// server/index.js (CommonJS)
// require("dotenv").config();
// const express = require("express");
// const cors = require("cors");

// // adjust path to where your router file lives
// // if your router file is server/routes/admin.js use './routes/admin'
// const adminRoutes = require("./routes/admin"); // <-- note singular 'admin'
// const uploadRoutes = require("./routes/uploadRoutes"); // optional

// const app = express();
// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // mount admin router at /api/admin
// app.use("/api/admin", adminRoutes);

// // optional upload routes
// if (uploadRoutes) app.use("/api", uploadRoutes);

// // add a tiny ping to test mount
// app.get("/api/admin/ping", (req, res) => res.json({ ok: true, route: "/api/admin/ping" }));

// // health
// app.get("/api/health", (req, res) => res.json({ ok: true, time: Date.now() }));

// const PORT = Number(process.env.PORT || 4000); // fixed to 4000 default
// app.listen(PORT, () => console.log(`Server listening on ${PORT}`));



// server/index.js (ESM)
// import dotenv from "dotenv";
// dotenv.config();

// import express from "express";
// import cors from "cors";
// import adminRoutes from "./routes/admin.js"; // note .js and exact filename
// import uploadRoutes from "./routes/uploadRoutes.js";

// import oapRoutes from "./routes/oapRoutes.js";
// import programRoutes from "./routes/programRoutes.js";
// import scheduleRoutes from "./routes/scheduleRoutes.js";
// import episodeRoutes from "./routes/episodeRoutes.js";
// import sponsorRoutes from "./routes/sponsorsRoutes.js";
// import settingRoutes from "./routes/settingsRoutes.js";

// const app = express();
// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// app.use("/api/admin", adminRoutes);
// // app.use("/api/admin", adminRoutes);
// app.use("/api/oap", oapRoutes);
// app.use("/api/program", programRoutes);
// app.use("/api/schedule", scheduleRoutes);
// app.use("/api/episode", episodeRoutes);
// app.use("/api/sponsor", sponsorRoutes);
// app.use("/api/setting", settingRoutes);

// if (uploadRoutes) app.use("/api", uploadRoutes);

// app.get("/api/admin/ping", (req, res) => res.json({ ok: true, route: "/api/admin/ping" }));
// app.get("/api/health", (req, res) => res.json({ ok: true, time: Date.now() }));



// const PORT = Number(process.env.PORT || 4000);
// app.listen(PORT, () => console.log(`Server listening on ${PORT}`));



// server/index.js (ESM)
// import dotenv from "dotenv";
// dotenv.config();

// import express from "express";
// import cors from "cors";

// import adminRoutes from "./routes/admin.js";
// import oapRoutes from "./routes/oapRoutes.js";
// import programRoutes from "./routes/programRoutes.js";
// import scheduleRoutes from "./routes/scheduleRoutes.js";
// import episodeRoutes from "./routes/episodeRoutes.js";
// import sponsorRoutes from "./routes/sponsorsRoutes.js";
// import settingRoutes from "./routes/settingsRoutes.js";

// const app = express();

// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // ROUTES
// app.use("/api/admin", adminRoutes);
// app.use("/api/oap", oapRoutes);
// app.use("/api/program", programRoutes);
// app.use("/api/schedule", scheduleRoutes);
// app.use("/api/episode", episodeRoutes);
// app.use("/api/sponsor", sponsorRoutes);
// app.use("/api/setting", settingRoutes);

// // health checks
// app.get("/api/admin/ping", (req, res) =>
//   res.json({ ok: true, route: "/api/admin/ping" })
// );
// app.get("/api/health", (req, res) =>
//   res.json({ ok: true, time: Date.now() })
// );

// const PORT = Number(process.env.PORT || 4000);
// app.listen(PORT, () => console.log(`✅ Server running on ${PORT}`));


// server/index.js
import dotenv from "dotenv";
dotenv.config(); // 🔥 MUST BE FIRST — before any other imports

console.log("Cloudinary API KEY:", process.env.CLOUDINARY_API_KEY);


import express from "express";
import cors from "cors";

/**
 * ROUTES
 * (all routes import AFTER dotenv so env vars are available everywhere,
 * especially cloudinary config)
 */
import adminRoutes from "./routes/admin.js";
import oapRoutes from "./routes/oapRoutes.js";
import programRoutes from "./routes/programRoutes.js";
import scheduleRoutes from "./routes/scheduleRoutes.js";
import episodeRoutes from "./routes/episodeRoutes.js";
import sponsorRoutes from "./routes/sponsorsRoutes.js";
import settingRoutes from "./routes/settingsRoutes.js";
import activityRoutes from "./routes/activityRoutes.js";


const app = express();

/* ─────────────── MIDDLEWARE ─────────────── */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ─────────────── API ROUTES ─────────────── */
app.use("/api/admin", adminRoutes);
app.use("/api/oap", oapRoutes);
app.use("/api/program", programRoutes);
app.use("/api/schedule", scheduleRoutes);
app.use("/api/episode", episodeRoutes);
app.use("/api/sponsor", sponsorRoutes);
app.use("/api/setting", settingRoutes);
app.use("/api/activity", activityRoutes);


/* ─────────────── HEALTH CHECKS ─────────────── */
app.get("/api/admin/ping", (req, res) => {
  res.json({ ok: true, route: "/api/admin/ping" });
});

app.get("/api/health", (req, res) => {
  res.json({ ok: true, time: Date.now() });
});

/* ─────────────── SERVER ─────────────── */
const PORT = Number(process.env.PORT) || 4000;

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
