// import React, { createContext, useContext, useState, useEffect } from "react";

// const AuthContext = createContext();

// export function AuthProvider({ children }) {
//   const [user, setUser] = useState(() => {
//     try {
//       return JSON.parse(localStorage.getItem("user")) || null;
//     } catch {
//       return null;
//     }
//   });

//   useEffect(() => {
//     try {
//       if (user) localStorage.setItem("user", JSON.stringify(user));
//       else localStorage.removeItem("user");
//     } catch {}
//   }, [user]);

//   // Mock login (replace with real API call)
//   async function login({ email, password }) {
//     // Replace with real server call; here is a simple mock:
//     if (email === "super@local" && password === "password") {
//       const u = { id: 1, name: "Super Admin", role: "superadmin", email };
//       setUser(u);
//       return u;
//     }
//     if (email === "admin@local" && password === "password") {
//       const u = { id: 2, name: "Admin User", role: "admin", email };
//       setUser(u);
//       return u;
//     }
//     throw new Error("Invalid credentials (mock)");
//   }

//   function logout() {
//     setUser(null);
//   }

//   return (
//     <AuthContext.Provider value={{ user, setUser, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export const useAuth = () => useContext(AuthContext);





// admin/src/context/AuthContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import api, { setAuthToken } from "../api/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [admin, setAdmin] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("admin_info")) || null;
    } catch {
      return null;
    }
  });

  const [token, setToken] = useState(() => localStorage.getItem("admin_token") || null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (token) {
      setAuthToken(token);
    } else {
      setAuthToken(null);
    }
  }, [token]);

  // Derived flag: is this admin a superadmin?
  const isSuper = !!(admin && admin.role === "superadmin");

  async function login({ email, password }) {
    setLoading(true);
    try {
      const res = await api.post("/api/admin/login", { email, password });
      const t = res.data?.token;
      const a = res.data?.admin;
      if (t) {
        setToken(t);
        setAdmin(a);
        localStorage.setItem("admin_token", t);
        localStorage.setItem("admin_info", JSON.stringify(a));
        setAuthToken(t);
      }
      return { ok: true, admin: a };
    } catch (err) {
      return { ok: false, error: err?.response?.data?.error || err.message };
    } finally {
      setLoading(false);
    }
  }

  async function register(form) {
    // form can be FormData or JSON depending on your server; we'll support JSON here
    setLoading(true);
    try {
      const res = await api.post("/api/admin/register", form); // server accepts JSON or form-data
      const t = res.data?.token;
      const a = res.data?.admin;
      if (t) {
        setToken(t);
        setAdmin(a);
        localStorage.setItem("admin_token", t);
        localStorage.setItem("admin_info", JSON.stringify(a));
        setAuthToken(t);
      }
      return { ok: true, admin: a };
    } catch (err) {
      return { ok: false, error: err?.response?.data?.error || err?.response?.data || err.message };
    } finally {
      setLoading(false);
    }
  }

  // function logout() {
  //   setToken(null);
  //   setAdmin(null);
  //   setAuthToken(null);
  //   localStorage.removeItem("admin_info");
  //   localStorage.removeItem("admin_token");
  //   // optionally: api.defaults.headers.common.Authorization = undefined;
  // }





async function logout() {
  try {
    // call backend to blacklist current token (api has request interceptor attaching token)
    await api.post("/api/admin/logout");
  } catch (err) {
    console.warn("logout API failed", err?.response?.data || err?.message);
    // continue to clear client state anyway
  } finally {
    setToken(null);
    setAdmin(null);
    setAuthToken(null);
    localStorage.removeItem("admin_info");
    localStorage.removeItem("admin_token");
    // redirect to login
    window.location.href = "/pages/adminlogin";
  }
}


  return (
    <AuthContext.Provider value={{ admin, token, loading, login, register, logout, isSuper }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
