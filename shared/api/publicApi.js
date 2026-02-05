import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:4000";

const publicApi = axios.create({
  baseURL: API_BASE,
  headers: {
    "Content-Type": "application/json",
  },
});

export default publicApi;
