// // admin/src/api.js
// import axios from "axios";

// const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:4000";

// const api = axios.create({
//   baseURL: API_BASE,
//   headers: { "Content-Type": "application/json" },
// });

// export function setAuthToken(token) {
//   if (token) {
//     localStorage.setItem("admin_token", token);
//     api.defaults.headers.common.Authorization = `Bearer ${token}`;
//   } else {
//     localStorage.removeItem("admin_token");
//     delete api.defaults.headers.common.Authorization;
//   }
// }


// export const OapApi = axios.create({
//   baseURL: API_BASE,
//   headers: { "Content-Type": "application/json" },
// });



// export default api;




// admin/src/api.js
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:4000";

const api = axios.create({
  baseURL: API_BASE,
  headers: { "Content-Type": "application/json" },
});

// auto-restore token on load
const stored = localStorage.getItem("admin_token");
if (stored) {
  api.defaults.headers.common.Authorization = `Bearer ${stored}`;
}

export function setAuthToken(token) {
  if (token) {
    localStorage.setItem("admin_token", token);
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    localStorage.removeItem("admin_token");
    delete api.defaults.headers.common.Authorization;
  }
}

// Optional: create a second axios instance for other APIs
export const OapApi = axios.create({
  baseURL: API_BASE,
  headers: { "Content-Type": "application/json" },
});

// Response interceptor: handle 401 centrally
api.interceptors.response.use(
  (res) => res,
  (err) => {
    const status = err?.response?.status;
    if (status === 401) {
      // cleanup token & inform user
      delete api.defaults.headers.common.Authorization;
      localStorage.removeItem("admin_token");
      // optional: redirect to admin login (adjust path)
      // window.location.href = "/admin/login";
      alert("Session expired or unauthorized. Please login again.");
    }
    return Promise.reject(err);
  }
);

export default api;
