// // client/src/api/axios.js
// import axios from "axios";
// const api = axios.create({ baseURL: process.env.REACT_APP_API_URL || "http://localhost:4000" });

// export function setAuthToken(token) {
//   if (token) {
//     localStorage.setItem("admin_token", token);
//     api.defaults.headers.common.Authorization = `Bearer ${token}`;
//   } else {
//     localStorage.removeItem("admin_token");
//     delete api.defaults.headers.common.Authorization;
//   }
// }

// export default api;


/ src/api/axios.js
// import axios from "axios";

// const BASE = import.meta.env.VITE_BASE_URL || ""; // e.g. "http://localhost:4000"

// const api = axios.create({
//   baseURL: BASE,
//   withCredentials: false,
//   // do NOT force Content-Type here — let individual requests set headers (FormData needs multipart)
// });

// // request interceptor to attach token
// api.interceptors.request.use((cfg) => {
//   const token = localStorage.getItem("admin_token");
//   if (token) cfg.headers.Authorization = `Bearer ${token}`;
//   return cfg;
// });

// // optional: response interceptor to handle 401 centrally
// api.interceptors.response.use(
//   (res) => res,
//   (err) => {
//     // example: auto-logout on 401 (optional)
//     if (err?.response?.status === 401) {
//       // localStorage.removeItem("admin_token");
//       // window.location.href = "/admin/login";
//     }
//     return Promise.reject(err);
//   }
// );

// /**
//  * Helper to manually set/clear Authorization token (useful after login/logout)
//  * e.g. setAuthToken(token) or setAuthToken(null)
//  */
// export function setAuthToken(token) {
//   if (token) {
//     localStorage.setItem("admin_token", token);
//     api.defaults.headers.common.Authorization = `Bearer ${token}`;
//   } else {
//     localStorage.removeItem("admin_token");
//     delete api.defaults.headers.common.Authorization;
//   }
// }

// export default api;

import axios from "axios";

let accessToken = localStorage.getItem("accessToken");
let refreshToken = localStorage.getItem("refreshToken");

export const setTokens = (access, refresh) => {
  accessToken = access;
  refreshToken = refresh;
  localStorage.setItem("accessToken", access);
  localStorage.setItem("refreshToken", refresh);
};

export const clearTokens = () => {
  accessToken = null;
  refreshToken = null;
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
};

const api = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
});

// ========= REQUEST INTERCEPTOR =========
api.interceptors.request.use((config) => {
  if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
  return config;
});

// ========= RESPONSE / AUTO REFRESH =========
let isRefreshing = false;
let queue = [];

api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const original = err.config;

    // Token expired
    if (err.response?.status === 401 && refreshToken) {
      if (!isRefreshing) {
        isRefreshing = true;

        try {
          const res = await axios.post("http://localhost:5000/auth/refresh", {
            refresh_token: refreshToken
          });

          const newAccess = res.data.access_token;
          const newRefresh = res.data.refresh_token;
          setTokens(newAccess, newRefresh);

          queue.forEach(cb => cb(newAccess));
          queue = [];
          isRefreshing = false;

          original.headers.Authorization = `Bearer ${newAccess}`;
          return api(original);
        } catch (e) {
          clearTokens();
          window.location.href = "/login";
          return Promise.reject(e);
        }
      }

      return new Promise(resolve => {
        queue.push(token => {
          original.headers.Authorization = `Bearer ${token}`;
          resolve(api(original));
        });
      });
    }

    return Promise.reject(err);
  }
);

export default api;

