// // admin/src/context/AuthContext.jsx
// import React, { createContext, useContext, useEffect, useState } from "react";
// import api, { setAuthToken } from "../api/api";

// const AuthContext = createContext();

// export function AuthProvider({ children }) {
//   const [admin, setAdmin] = useState(() => {
//     try {
//       return JSON.parse(localStorage.getItem("admin_info")) || null;
//     } catch {
//       return null;
//     }
//   });

//   const [token, setToken] = useState(() => localStorage.getItem("admin_token") || null);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     if (token) {
//       setAuthToken(token);
//     } else {
//       setAuthToken(null);
//     }
//   }, [token]);

//   // Derived flag: is this admin a superadmin?
//   const isSuper = !!(admin && admin.role === "superadmin");

//   async function login({ email, password }) {
//     setLoading(true);
//     try {
//       const res = await api.post("/api/admin/login", { email, password });
//       const t = res.data?.token;
//       const a = res.data?.admin;
//       if (t) {
//         setToken(t);
//         setAdmin(a);
//         localStorage.setItem("admin_token", t);
//         localStorage.setItem("admin_info", JSON.stringify(a));
//         setAuthToken(t);
//       }
//       return { ok: true, admin: a };
//     } catch (err) {
//       return { ok: false, error: err?.response?.data?.error || err.message };
//     } finally {
//       setLoading(false);
//     }
//   }

//   async function register(form) {
//     // form can be FormData or JSON depending on your server; we'll support JSON here
//     setLoading(true);
//     try {
//       const res = await api.post("/api/admin/register", form); // server accepts JSON or form-data
//       const t = res.data?.token;
//       const a = res.data?.admin;
//       if (t) {
//         setToken(t);
//         setAdmin(a);
//         localStorage.setItem("admin_token", t);
//         localStorage.setItem("admin_info", JSON.stringify(a));
//         setAuthToken(t);
//       }
//       return { ok: true, admin: a };
//     } catch (err) {
//       return { ok: false, error: err?.response?.data?.error || err?.response?.data || err.message };
//     } finally {
//       setLoading(false);
//     }
//   }

//   // function logout() {
//   //   setToken(null);
//   //   setAdmin(null);
//   //   setAuthToken(null);
//   //   localStorage.removeItem("admin_info");
//   //   localStorage.removeItem("admin_token");
//   //   // optionally: api.defaults.headers.common.Authorization = undefined;
//   // }





// async function logout() {
//   try {
//     // call backend to blacklist current token (api has request interceptor attaching token)
//     await api.post("/api/admin/logout");
//   } catch (err) {
//     console.warn("logout API failed", err?.response?.data || err?.message);
//     // continue to clear client state anyway
//   } finally {
//     setToken(null);
//     setAdmin(null);
//     setAuthToken(null);
//     localStorage.removeItem("admin_info");
//     localStorage.removeItem("admin_token");
//     // redirect to login
//     window.location.href = "/pages/adminlogin";
//   }
// }

// // async function logout(navigate){
// //   try {
// //     await api.post("/api/admin/logout");
// //   } catch (err) {
// //     console.warn("logout API failed", err?.response?.data || err?.message);
// //   }finally{
// //     setToken(null);
// //     setAdmin(null);

// //     localStorage.removeItem("admin_info");
// //     localStorage.removeItem("admin_token");

// //     navigate("admin/login")
// //   }
// // }


//   return (
//     <AuthContext.Provider value={{ admin, token, loading, login, register, logout, isSuper }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export const useAuth = () => useContext(AuthContext);


// src/context/AuthContext.jsx
// import { createContext, useContext, useState, useEffect } from "react";
// import api, { setAuthToken } from "../api/api";           // ← import from api.js

// const AuthContext = createContext();

// export function AuthProvider({ children }) {
//   const [admin, setAdmin] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // Try to restore session on mount
//   useEffect(() => {
//     const storedAdmin = localStorage.getItem("admin_info");
//     const storedToken = localStorage.getItem("admin_token");

//     if (storedToken && storedAdmin) {
//       try {
//         setAdmin(JSON.parse(storedAdmin));
//         setAuthToken(storedToken); // also sets header
//       } catch (err) {
//         console.error("Invalid stored admin data", err);
//         logout();
//       }
//     }
//     setLoading(false);
//   }, []);

//   const login = async ({ email, password }) => {
//     try {
//       const response = await api.post("/admin/login", { email, password });
//       const { token, admin: adminData } = response.data;

//       setAuthToken(token);
//       localStorage.setItem("admin_info", JSON.stringify(adminData));
//       setAdmin(adminData);

//       return { ok: true, admin: adminData };
//     } catch (err) {
//       console.error("Login error:", err);
//       const message = err.response?.data?.message || "Login failed";
//       return { ok: false, error: message };
//     }
//   };

//   const logout = () => {
//     setAuthToken(null);
//     localStorage.removeItem("admin_token");
//     localStorage.removeItem("admin_info");
//     setAdmin(null);
//   };

//   const value = {
//     admin,
//     loading,
//     login,
//     logout,
//     isAuthenticated: !!admin,
//   };

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// }

// export function useAuth() {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error("useAuth must be used within AuthProvider");
//   }
//   return context;
// }


// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import api, { setAuthToken } from "../api/api";           // adjust path if needed

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  // Try to restore session on mount
  useEffect(() => {
    const storedAdmin = localStorage.getItem("admin_info");
    const storedToken = localStorage.getItem("admin_token");

    if (storedToken && storedAdmin) {
      try {
        setAdmin(JSON.parse(storedAdmin));
        setAuthToken(storedToken); // also sets header
      } catch (err) {
        console.error("Invalid stored admin data", err);
        logout();
      }
    }
    setLoading(false);
  }, []);

  const login = async ({ email, password }) => {
    try {
      // ────────────────────────────────────────────────
      // Main change: most common API prefix is /api/...
      // Try these one by one until one stops giving 404
      // ────────────────────────────────────────────────
      const response = await api.post("/api/admin/login", { email, password });
      // const response = await api.post("/api/auth/login", { email, password });
      // const response = await api.post("/api/auth/admin/login", { email, password });
      // const response = await api.post("/auth/login", { email, password });
      // const response = await api.post("/login", { email, password });

      const { token, admin: adminData } = response.data;

      setAuthToken(token);
      localStorage.setItem("admin_info", JSON.stringify(adminData));
      setAdmin(adminData);

      return { ok: true, admin: adminData };
    } catch (err) {
      console.error("Login error:", err);

      // Better error message extraction
      let message = "Login failed";
      if (err.response) {
        // Server responded with error (400, 401, 403, 500, etc.)
        message =
          err.response.data?.message ||
          err.response.data?.error ||
          `Server error (${err.response.status})`;
      } else if (err.request) {
        // No response received (network / CORS / timeout)
        message = "No response from server – check if backend is running";
      } else {
        message = err.message;
      }

      return { ok: false, error: message };
    }
  };

  const logout = () => {
    setAuthToken(null);
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_info");
    setAdmin(null);
  };

  const value = {
    admin,
    loading,
    login,
    logout,
    isAuthenticated: !!admin,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}