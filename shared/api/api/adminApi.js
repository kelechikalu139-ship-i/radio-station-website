import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:4000";

const adminApi = axios.create({
  baseURL: API_BASE,
  headers: {
    "Content-Type": "application/json",
  },
});

// restore token
const stored = localStorage.getItem("admin_token");
if (stored) {
  adminApi.defaults.headers.common.Authorization = `Bearer ${stored}`;
}

export function setAuthToken(token) {
  if (token) {
    localStorage.setItem("admin_token", token);
    adminApi.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    localStorage.removeItem("admin_token");
    delete adminApi.defaults.headers.common.Authorization;
  }
}

adminApi.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err?.response?.status === 401) {
      localStorage.removeItem("admin_token");
      delete adminApi.defaults.headers.common.Authorization;
      alert("Session expired. Please login again.");
    }
    return Promise.reject(err);
  }
);

export default adminApi;
