// client/src/api/axios.js
import axios from "axios";
const api = axios.create({ baseURL: process.env.REACT_APP_API_URL || "http://localhost:4000" });

export function setAuthToken(token) {
  if (token) {
    localStorage.setItem("admin_token", token);
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    localStorage.removeItem("admin_token");
    delete api.defaults.headers.common.Authorization;
  }
}

export const OapApi = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:4000"
})

export default api;

// const OapApi = axios.create({baseURL:process.env.REACT_APP_API_URL || "http://localhost:4000"});

// export function
