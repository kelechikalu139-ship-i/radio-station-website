
// src/context/AuthContext.jsx
// import { createContext, useContext, useState, useEffect } from "react";
// import api, { setAuthToken } from "../api/api";           

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
//       // ────────────────────────────────────────────────
//       // Main change: most common API prefix is /api/...
//       // Try these one by one until one stops giving 404
//       // ────────────────────────────────────────────────
//       const response = await api.post("/api/admin/login", { email, password });
//       // const response = await api.post("/api/auth/login", { email, password });
//       // const response = await api.post("/api/auth/admin/login", { email, password });
//       // const response = await api.post("/auth/login", { email, password });
//       // const response = await api.post("/login", { email, password });

//       const { token, admin: adminData } = response.data;

//       setAuthToken(token);
//       localStorage.setItem("admin_info", JSON.stringify(adminData));
//       setAdmin(adminData);

//       return { ok: true, admin: adminData };
//     } catch (err) {
//       console.error("Login error:", err);

//       // Better error message extraction
//       let message = "Login failed";
//       if (err.response) {
//         // Server responded with error (400, 401, 403, 500, etc.)
//         message =
//           err.response.data?.message ||
//           err.response.data?.error ||
//           `Server error (${err.response.status})`;
//       } else if (err.request) {
//         // No response received (network / CORS / timeout)
//         message = "No response from server – check if backend is running";
//       } else {
//         message = err.message;
//       }

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
import api, { setAuthToken } from "../api/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedAdmin = localStorage.getItem("admin_info");
    const storedToken = localStorage.getItem("admin_token");

    if (storedToken && storedAdmin) {
      try {
        setAdmin(JSON.parse(storedAdmin));
        setAuthToken(storedToken);
      } catch (err) {
        console.error("Invalid stored admin data", err);
        logout();
      }
    }
    setLoading(false);
  }, []);

  const login = async ({ email, password }) => {
    try {
      const response = await api.post("/api/admin/login", { email, password });

      const { token, admin: adminData } = response.data;

      setAuthToken(token);
      localStorage.setItem("admin_token", token);
      localStorage.setItem("admin_info", JSON.stringify(adminData));
      setAdmin(adminData);

      return { ok: true, admin: adminData };
    } catch (err) {
      console.error("Login error:", err);

      let message = "Login failed";
      if (err.response) {
        message =
          err.response.data?.message ||
          err.response.data?.error ||
          `Server error (${err.response.status})`;
      } else if (err.request) {
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
    // Navigation is handled by the component calling logout
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