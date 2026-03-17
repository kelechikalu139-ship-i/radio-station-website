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
  
  // Log environment variables for debugging (remove in production)
  console.log("🔧 Proxy Debug - Environment:", {
    hasApiKey: !!process.env.VITE_AZURACAST_API_KEY,
    apiUrl: process.env.VITE_AZURACAST_API_URL,
    stationId: process.env.VITE_STATION_ID,
    nodeEnv: process.env.NODE_ENV
  });

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.set({
      'Access-Control-Allow-Origin': req.headers.origin || '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    });
    return res.status(200).end();
  }

  // STREAM ENDPOINT - forwards audio data
  if (type === "stream") {
    try {
      // Try multiple possible stream URLs (common AzuraCast configurations)
      const possibleUrls = [
        "https://radio.sternhost.com/radio.mp3",
        "https://radio.sternhost.com:8000/radio.mp3",
        "https://radio.sternhost.com/stream",
        "https://radio.sternhost.com:8000/stream",
        "https://radio.sternhost.com/listen/station_1149_1773756634/radio.mp3",
        "https://radio.sternhost.com:8000/station_1149_1773756634"
      ];
      
      let workingUrl = null;
      let lastError = null;
      
      // Try each URL to find a working one
      for (const url of possibleUrls) {
        try {
          console.log(`Trying stream URL: ${url}`);
          const testResponse = await fetch(url, { 
            method: 'HEAD',
            timeout: 3000 
          });
          
          if (testResponse.ok) {
            workingUrl = url;
            console.log(`✅ Found working stream: ${workingUrl}`);
            break;
          }
        } catch (e) {
          lastError = e.message;
          console.log(`❌ Failed: ${url} - ${e.message}`);
          continue;
        }
      }
      
      if (!workingUrl) {
        throw new Error(`No working stream URL found. Last error: ${lastError}`);
      }
      
      // Add timestamp to prevent caching
      const url = new URL(workingUrl);
      url.searchParams.append('_', Date.now());
      
      const response = await fetch(url.toString());
      
      if (!response.ok) {
        throw new Error(`Stream returned ${response.status}`);
      }
      
      // Set proper headers for audio streaming
      res.set({
        'Content-Type': 'audio/mpeg',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
        'Access-Control-Allow-Origin': req.headers.origin || '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Transfer-Encoding': 'chunked',
      });
      
      // Pipe the audio stream to the client
      response.body.pipe(res);
      
    } catch (error) {
      console.error('❌ Stream proxy error:', error.message);
      res.status(502).json({ 
        error: 'Stream unavailable',
        details: error.message,
        suggestion: "Please check if your Sternhost stream is active and the mount point is correct"
      });
    }
  } 
  
  // STATUS ENDPOINT - returns now-playing JSON data
  else if (type === "status") {
    try {
      const apiKey = process.env.VITE_AZURACAST_API_KEY;
      const apiUrl = process.env.VITE_AZURACAST_API_URL || "https://radio.sternhost.com";
      const stationId = process.env.VITE_STATION_ID || "1149";
      const fullStationId = `station_${stationId}_1773756634`; // Complete ID from your dashboard
      
      if (!apiKey) {
        console.error("❌ API key is missing from environment variables");
        // Don't throw, try fallbacks first
      }
      
      // Try multiple possible status endpoints based on your actual URLs
      const possibleStatusUrls = [
        // API endpoints (might work with full ID)
        `${apiUrl}/api/nowplaying/${fullStationId}`,
        `${apiUrl}/api/nowplaying/${stationId}`,
        
        // Public endpoints from your dashboard (these definitely exist!)
        `${apiUrl}/public/${fullStationId}/status`,     // Based on your public page pattern
        `${apiUrl}/public/${fullStationId}`,            // The main public page
        
        // Standard Icecast/AzuraCast status endpoints
        `${apiUrl}/status-json.xsl`,
        `${apiUrl}/status-json.xsl?mount=/radio.mp3`,
        
        // Try with different mount points
        `${apiUrl}/api/live/nowplaying/${fullStationId}`,
        `${apiUrl}/api/station/${fullStationId}/nowplaying`
      ];
      
      let statusData = null;
      let usedEndpoint = null;
      let errors = [];
      
      for (const endpoint of possibleStatusUrls) {
        try {
          console.log(`Trying status endpoint: ${endpoint}`);
          
          // Add API key only for endpoints that likely need it
          const headers = {};
          if (endpoint.includes('/api/') && apiKey) {
            headers['X-API-Key'] = apiKey;
          }
          
          const response = await fetch(endpoint, { 
            headers,
            timeout: 5000
          });
          
          if (response.ok) {
            const contentType = response.headers.get('content-type') || '';
            
            // If it's JSON, parse it
            if (contentType.includes('application/json')) {
              statusData = await response.json();
              usedEndpoint = endpoint;
              console.log(`✅ Got JSON from: ${usedEndpoint}`);
              break;
            } 
            // If it's HTML (like your public pages), parse the song info
            else if (contentType.includes('text/html')) {
              const html = await response.text();
              console.log(`Got HTML from: ${endpoint}, attempting to parse`);
              
              // Parse song information from the HTML
              const songInfo = parseAzuraCastHTML(html);
              
              if (songInfo) {
                statusData = {
                  now_playing: {
                    song: {
                      title: songInfo.title || "Live Broadcast",
                      artist: songInfo.artist || "Nexter FM"
                    }
                  },
                  listeners: { 
                    current: songInfo.listeners || 0 
                  },
                  station: { 
                    name: "Nexter FM" 
                  },
                  song_history: songInfo.history || []
                };
                usedEndpoint = endpoint;
                console.log("✅ Parsed HTML successfully");
                break;
              }
            }
          } else {
            errors.push(`${endpoint}: ${response.status}`);
          }
        } catch (e) {
          errors.push(`${endpoint}: ${e.message}`);
          console.log(`❌ Failed: ${endpoint} - ${e.message}`);
        }
      }
      
      // Helper function to parse AzuraCast public page HTML
      function parseAzuraCastHTML(html) {
        try {
          const result = {
            title: "Live Broadcast",
            artist: "Nexter FM",
            listeners: 0,
            history: []
          };
          
          // Try to find current song - common patterns in AzuraCast
          const patterns = [
            /currently playing:?\s*([^-<]+)-\s*([^<]+)/i,
            /now playing:?\s*<[^>]*>([^<]+)<\/[^>]*>/i,
            /<div[^>]*class="[^"]*song[^"]*"[^>]*>([^<]+)<\/div>/i,
            /<h[23][^>]*>([^<]+)<\/h[23]>/i,
            /<meta[^>]*property="og:title"[^>]*content="([^"]+)"[^>]*>/i,
            /<title>(.*?)<\/title>/i
          ];
          
          for (const pattern of patterns) {
            const match = html.match(pattern);
            if (match) {
              if (match[1] && match[2]) {
                // Format: "Artist - Title"
                result.artist = match[1].trim();
                result.title = match[2].trim();
              } else if (match[1]) {
                // Single field - try to split
                const parts = match[1].split('-');
                if (parts.length > 1) {
                  result.artist = parts[0].trim();
                  result.title = parts[1].trim();
                } else {
                  result.title = match[1].trim();
                }
              }
              break;
            }
          }
          
          // Try to find listener count
          const listenerMatch = html.match(/(\d+)\s*listener/i);
          if (listenerMatch) {
            result.listeners = parseInt(listenerMatch[1], 10);
          }
          
          // Try to find song history (simplified)
          const historyMatches = html.matchAll(/<li[^>]*>([^-<]+)-([^<]+)<\/li>/g);
          const history = [];
          for (const match of historyMatches) {
            if (history.length < 5) {
              history.push({
                song: {
                  title: match[2]?.trim() || "Unknown",
                  artist: match[1]?.trim() || "Unknown"
                }
              });
            }
          }
          result.history = history;
          
          return result;
        } catch (e) {
          console.log("HTML parsing error:", e.message);
          return null;
        }
      }
      
      // If we found data, return it
      if (statusData) {
        res.set({
          'Access-Control-Allow-Origin': req.headers.origin || '*',
          'Cache-Control': 's-maxage=5, stale-while-revalidate',
          'Content-Type': 'application/json',
        });
        
        return res.json(statusData);
      }
      
      // If all endpoints failed, return mock data with debug info
      console.error('❌ All status endpoints failed:', errors);
      
      res.status(502).json({ 
        error: 'Could not fetch now-playing data from any endpoint',
        details: errors.join('; '),
        debug: {
          apiKeyConfigured: !!apiKey,
          apiUrl,
          stationId,
          fullStationId,
          attemptedEndpoints: possibleStatusUrls.length
        },
        // Mock data so frontend still works
        now_playing: {
          song: {
            title: "Live Broadcast",
            artist: "Nexter FM"
          }
        },
        listeners: { current: 0 },
        station: { name: "Nexter FM" }
      });
      
    } catch (error) {
      console.error('❌ Status proxy fatal error:', error.message);
      res.status(500).json({ 
        error: 'Internal server error in status proxy',
        details: error.message
      });
    }
  } else {
    res.status(400).json({ 
      error: 'Invalid request type', 
      message: 'Use ?type=stream or ?type=status' 
    });
  }
});

// Handle OPTIONS requests for CORS preflight (explicit handler)
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