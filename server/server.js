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
// import activityRoutes from "./routes/activityRoutes.js";
// import newsRoutes from "./routes/newsRoutes.js";


// // Public routes 
// import publicScheduleRoutes from "./routes/publicSchedule.js"

// const app = express();

// /* ───────── CORS ───────── */
// const allowedOrigins = [
//   "http://localhost:5174", // public site
//   "http://localhost:5173", // my admin ui 
//   "http://localhost:3000", // my admin api 
// ];

// app.use(
//   cors({
//     origin: function (origin, callback) {
//       // allow requests with no origin (Postman, mobile apps)
//       if (!origin) return callback(null, true);

//       if (allowedOrigins.includes(origin)) {
//         return callback(null, true);
//       }

//       return callback(new Error("Not allowed by CORS"));
//     },
//     credentials: true,
//   })
// );

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// /* ───────── ROUTES ───────── */
// app.use("/api/admin", adminRoutes);
// app.use("/api/oap", oapRoutes);
// app.use("/api/program", programRoutes);
// app.use("/api/schedule", scheduleRoutes);
// app.use("/api/episode", episodeRoutes);
// app.use("/api/sponsor", sponsorRoutes);
// app.use("/api/setting", settingRoutes);
// app.use("/api/activity", activityRoutes);
// app.use("/uploads", express.static("uploads"));
// app.use("/api/news", newsRoutes);

// // Public routes 
// app.use("/api/schedule", publicScheduleRoutes);
// app.use("/api/schedule", scheduleRoutes);


// /* ───────── HEALTH ───────── */
// app.get("/api/health", (req, res) => {
//   res.json({ ok: true, time: Date.now() });
// });

// /* ───────── SERVER ───────── */
// // const PORT = Number(process.env.PORT) || 4000;

// // app.listen(PORT, () => {
// //   console.log(`✅ Server running on http://localhost:${PORT}`);
// // });


// const PORT = Number(process.env.PORT) || 4000;
// const HOST = '0.0.0.0';  // ← required on Render / cloud platforms

// app.listen(PORT, HOST, () => {
//   console.log(`✅ Server running on http://${HOST}:${PORT}`);
// });
 

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
// import activityRoutes from "./routes/activityRoutes.js";
// import newsRoutes from "./routes/newsRoutes.js";

// // Public routes
// import publicScheduleRoutes from "./routes/publicSchedule.js";

// const app = express();

// // ───────── CORS Configuration ─────────
// const allowedOrigins = [
//   "http://localhost:5173",      // local client / public site
//   "http://localhost:5174",      // local admin
//   "http://localhost:3000",      // possible local alternative

//   // ── Add your ACTUAL deployed Render / production URLs here ──
//   // Replace these with your real frontend URLs
//   "https://radio-station-website-client.onrender.com",     // ← example – change to yours
//   "https://radio-station-website-admin1.onrender.com",      // ← example – change to yours
//   // "https://your-domain.com",               // if you have custom domain later
// ];

// // For development convenience you can temporarily allow all origins
// // (comment out or remove in production after testing)
// // app.use(cors({ origin: "*" }));

// app.use(
//   cors({
//     origin: (origin, callback) => {
//       // Allow requests with no origin (like mobile apps, Postman, curl)
//       if (!origin) return callback(null, true);

//       // Allow if origin is in the list or ends with .onrender.com (wildcard for Render previews)
//       if (
//         allowedOrigins.includes(origin) ||
//         origin.endsWith(".onrender.com")
//       ) {
//         return callback(null, true);
//       }

//       console.warn(`CORS blocked origin: ${origin}`);
//       return callback(new Error("Not allowed by CORS"));
//     },
//     credentials: true,              // only if you use cookies/sessions (JWT usually doesn't need this)
//     methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//   })
// );

// // ───────── Middleware ─────────
// app.use(express.json({ limit: "10mb" }));           // increase if you upload large JSON
// app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// // Serve uploaded files (images, audio, etc.)
// app.use("/uploads", express.static("uploads"));

// // ───────── Routes ─────────
// app.use("/api/admin", adminRoutes);
// app.use("/api/oap", oapRoutes);
// app.use("/api/program", programRoutes);
// app.use("/api/schedule", scheduleRoutes);
// app.use("/api/episode", episodeRoutes);
// app.use("/api/sponsor", sponsorRoutes);
// app.use("/api/setting", settingRoutes);
// app.use("/api/activity", activityRoutes);
// app.use("/api/news", newsRoutes);

// // Public routes (note: you're mounting /api/schedule twice – last one wins)
// app.use("/api/schedule", publicScheduleRoutes);   // public version first
// // app.use("/api/schedule", scheduleRoutes);      // ← commented: remove or keep depending on intention

// // Health check endpoint (useful for Render, load balancers, monitoring)
// app.get("/api/health", (req, res) => {
//   res.status(200).json({
//     status: "ok",
//     uptime: process.uptime(),
//     timestamp: new Date().toISOString(),
//     environment: process.env.NODE_ENV || "development",
//   });
// });

// // Optional: Catch-all route for debugging (remove in production if not needed)
// app.use((req, res) => {
//   res.status(404).json({
//     error: "Not Found",
//     path: req.originalUrl,
//     method: req.method,
//   });
// });

// // ───────── Start Server ─────────
// const PORT = Number(process.env.PORT) || 4000;
// const HOST = "0.0.0.0"; // Required on Render, Fly.io, etc.

// app.listen(PORT, HOST, () => {
//   console.log(`───────────────────────────────────────────────`);
//   console.log(`🚀 Server running`);
//   console.log(`   → http://${HOST}:${PORT}`);
//   console.log(`   → Environment: ${process.env.NODE_ENV || "development"}`);
//   console.log(`   → Time: ${new Date().toISOString()}`);
//   console.log(`───────────────────────────────────────────────`);
// });

// // Optional: Graceful shutdown (good practice)
// process.on("SIGTERM", () => {
//   console.log("SIGTERM received. Shutting down gracefully...");
//   process.exit(0);
// });

// process.on("uncaughtException", (err) => {
//   console.error("Uncaught Exception:", err);
//   process.exit(1);
// });

import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import fetch from "node-fetch"; // Make sure to install: npm install node-fetch

import adminRoutes from "./routes/admin.js";
import oapRoutes from "./routes/oapRoutes.js";
import programRoutes from "./routes/programRoutes.js";
import scheduleRoutes from "./routes/scheduleRoutes.js";
import episodeRoutes from "./routes/episodeRoutes.js";
import sponsorRoutes from "./routes/sponsorsRoutes.js";
import settingRoutes from "./routes/settingsRoutes.js";
import activityRoutes from "./routes/activityRoutes.js";
import newsRoutes from "./routes/newsRoutes.js";

// Public routes
import publicScheduleRoutes from "./routes/publicSchedule.js";

const app = express();

// ───────── CORS Configuration ─────────
const allowedOrigins = [
  "http://localhost:5173",      // local client / public site
  "http://localhost:5174",      // local admin
  "http://localhost:3000",      // possible local alternative
  "https://radio-station-website-client.onrender.com",     // Your frontend
  "https://radio-station-website-admin1.onrender.com",      // Your admin
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, Postman, curl)
      if (!origin) return callback(null, true);

      // Allow if origin is in the list or ends with .onrender.com
      if (
        allowedOrigins.includes(origin) ||
        (origin && origin.endsWith(".onrender.com"))
      ) {
        return callback(null, true);
      }

      console.warn(`CORS blocked origin: ${origin}`);
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ───────── Middleware ─────────
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Serve uploaded files
app.use("/uploads", express.static("uploads"));

// ───────── Radio Stream Proxy Endpoints ─────────
app.get("/api/radio-proxy", async (req, res) => {
  const { type } = req.query;

  // Stream endpoint - forwards audio data
  if (type === "stream") {
    try {
      const baseUrl = process.env.VITE_AZURACAST_API_URL || "https://radio.sternhost.com";
      const mount = process.env.VITE_STREAM_MOUNT || "/radio.mp3";
      const streamUrl = `${baseUrl}${mount}`;
      
      console.log(`🎵 Proxying stream from: ${streamUrl}`);
      
      // Add timestamp to avoid caching
      const url = new URL(streamUrl);
      url.searchParams.append('_', Date.now());
      
      const response = await fetch(url.toString());
      
      if (!response.ok) {
        throw new Error(`Sternhost returned ${response.status}`);
      }
      
      // Set appropriate headers for audio streaming
      res.set({
        'Content-Type': 'audio/mpeg',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
        'Access-Control-Allow-Origin': req.headers.origin || '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      });
      
      // Pipe the audio stream to the client
      response.body.pipe(res);
      
    } catch (error) {
      console.error('❌ Stream proxy error:', error.message);
      res.status(502).json({ 
        error: 'Stream unavailable',
        details: error.message 
      });
    }
  } 
  // Status endpoint - returns now-playing JSON data
  else if (type === "status") {
    try {
      const apiUrl = process.env.VITE_AZURACAST_API_URL || "https://radio.sternhost.com";
      const apiKey = process.env.VITE_AZURACAST_API_KEY;
      const stationId = process.env.VITE_STATION_ID || "1149";
      
      if (!apiKey) {
        throw new Error("API key not configured");
      }
      
      const npUrl = `${apiUrl}/api/nowplaying/${stationId}`;
      console.log(`📻 Fetching now-playing from: ${npUrl}`);
      
      const response = await fetch(npUrl, {
        headers: {
          'X-API-Key': apiKey,
          'Accept': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error(`AzuraCast API returned ${response.status}`);
      }
      
      const data = await response.json();
      
      // Cache for 5 seconds to reduce load
      res.set({
        'Cache-Control': 's-maxage=5, stale-while-revalidate',
        'Access-Control-Allow-Origin': req.headers.origin || '*',
      });
      
      res.json(data);
      
    } catch (error) {
      console.error('❌ Status proxy error:', error.message);
      
      // Try fallback to public status page if API fails
      try {
        const stationId = process.env.VITE_STATION_ID || "1149";
        const publicUrl = `https://radio.sternhost.com/public/station_${stationId}_1773756634/status`;
        
        const fallbackRes = await fetch(publicUrl);
        
        if (fallbackRes.ok) {
          const html = await fallbackRes.text();
          // You could parse basic info from HTML here if needed
          console.log("Using fallback status page");
        }
      } catch (fallbackError) {
        // Ignore fallback errors
      }
      
      res.status(502).json({ 
        error: 'Could not fetch now-playing data',
        details: error.message,
        station: "Nexter FM",
        now_playing: {
          song: {
            title: "Live Broadcast",
            artist: "On Air"
          }
        }
      });
    }
  } else {
    res.status(400).json({ error: 'Invalid request type. Use ?type=stream or ?type=status' });
  }
});

// Handle OPTIONS requests for CORS preflight
app.options("/api/radio-proxy", (req, res) => {
  res.set({
    'Access-Control-Allow-Origin': req.headers.origin || '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  });
  res.status(200).end();
});

// ───────── Your Existing Routes ─────────
app.use("/api/admin", adminRoutes);
app.use("/api/oap", oapRoutes);
app.use("/api/program", programRoutes);
app.use("/api/schedule", scheduleRoutes);
app.use("/api/episode", episodeRoutes);
app.use("/api/sponsor", sponsorRoutes);
app.use("/api/setting", settingRoutes);
app.use("/api/activity", activityRoutes);
app.use("/api/news", newsRoutes);

// Public routes
app.use("/api/schedule", publicScheduleRoutes);

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development",
    radioProxy: "configured",
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: "Not Found",
    path: req.originalUrl,
    method: req.method,
  });
});

// ───────── Start Server ─────────
const PORT = Number(process.env.PORT) || 4000;
const HOST = "0.0.0.0";

app.listen(PORT, HOST, () => {
  console.log(`───────────────────────────────────────────────`);
  console.log(`🚀 Server running`);
  console.log(`   → http://${HOST}:${PORT}`);
  console.log(`   → Environment: ${process.env.NODE_ENV || "development"}`);
  console.log(`   → Radio Proxy: /api/radio-proxy?type=stream|status`);
  console.log(`   → Time: ${new Date().toISOString()}`);
  console.log(`───────────────────────────────────────────────`);
});

// Graceful shutdown
process.on("SIGTERM", () => {
  console.log("SIGTERM received. Shutting down gracefully...");
  process.exit(0);
});

process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
  process.exit(1);
});