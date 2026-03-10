// src/api/api.js
// import axios from "axios";

// export default axios.create({
//   baseURL: "http://localhost:4000",
//   withCredentials: true,
// });



// client/src/api/api.js
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL 
  ? import.meta.env.VITE_API_URL.replace(/\/$/, '')
  : "http://localhost:4000";

const api = axios.create({
  baseURL: API_BASE,
  headers: {
    "Content-Type": "application/json",
  },
  // withCredentials: true,   ← remove unless using cookies
});

export default api;