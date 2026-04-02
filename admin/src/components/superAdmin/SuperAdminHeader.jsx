// // // admin/src/components/admin/AdminHeader.jsx
// // import React, { useState } from "react";
// // import { useAuth } from "../../context/AuthContext";

// // import ConfirmLogoutModal from "./ConfirmLogoutModal"; 
// // export default function AdminHeader() {
// //   const { admin, logout } = useAuth();
// //   const [open, setOpen] = useState(false);
// //   const [loading, setLoading] = useState(false);

// //   async function confirmLogout() {
// //     setLoading(true);
// //     try {
// //       // logout in context will call the API and redirect
// //       await logout();
// //     } catch (err) {
// //       console.error("logout error", err);
// //     } finally {
// //       setLoading(false);
// //       setOpen(false);
// //     }
// //   }

// //   return (
// //     <>
// //       <header className="bg-white shadow">
// //         <div className="container mx-auto px-4 py-3 flex justify-between items-center">
// //           <div className="font-bold text-lg text-purple-700">Nexter FM — Admin</div>
// //           <div className="flex items-center gap-3">
// //             <div className="text-sm text-gray-700">{admin?.name || admin?.email}</div>
// //             <button
// //               onClick={() => setOpen(true)}
// //               className="text-sm px-3 py-1 bg-red-600 text-white rounded"
// //             >
// //               Logout
// //             </button>
// //           </div>
// //         </div>
// //       </header>

// //       <ConfirmLogoutModal
// //         open={open}
// //         onClose={() => setOpen(false)}
// //         onConfirm={confirmLogout}
// //         loading={loading}
// //       />
      
// //     </>
// //   );
// // }



// // // src/context/AuthContext.jsx
// // import { createContext, useContext, useState, useEffect } from "react";
// // // import api, { setAuthToken } from "../api/api";
// // import api, {setAuthToken} from "../../api/api"

// // const AuthContext = createContext();

// // export function AuthProvider({ children }) {
// //   const [admin, setAdmin] = useState(null);
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     const storedAdmin = localStorage.getItem("admin_info");
// //     const storedToken = localStorage.getItem("admin_token");

// //     if (storedToken && storedAdmin) {
// //       try {
// //         setAdmin(JSON.parse(storedAdmin));
// //         setAuthToken(storedToken);
// //       } catch (err) {
// //         console.error("Invalid stored admin data", err);
// //         logout();
// //       }
// //     }
// //     setLoading(false);
// //   }, []);

// //   const login = async ({ email, password }) => {
// //     try {
// //       const response = await api.post("/api/admin/login", { email, password });

// //       const { token, admin: adminData } = response.data;

// //       setAuthToken(token);
// //       localStorage.setItem("admin_token", token);
// //       localStorage.setItem("admin_info", JSON.stringify(adminData));
// //       setAdmin(adminData);

// //       return { ok: true, admin: adminData };
// //     } catch (err) {
// //       console.error("Login error:", err);

// //       let message = "Login failed";
// //       if (err.response) {
// //         message =
// //           err.response.data?.message ||
// //           err.response.data?.error ||
// //           `Server error (${err.response.status})`;
// //       } else if (err.request) {
// //         message = "No response from server – check if backend is running";
// //       } else {
// //         message = err.message;
// //       }

// //       return { ok: false, error: message };
// //     }
// //   };

// //   const logout = () => {
// //     setAuthToken(null);
// //     localStorage.removeItem("admin_token");
// //     localStorage.removeItem("admin_info");
// //     setAdmin(null);
// //     // Navigation is handled by the component calling logout
// //   };

// //   const value = {
// //     admin,
// //     loading,
// //     login,
// //     logout,
// //     isAuthenticated: !!admin,
// //   };

// //   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// // }

// // export function useAuth() {
// //   const context = useContext(AuthContext);
// //   if (!context) {
// //     throw new Error("useAuth must be used within AuthProvider");
// //   }
// //   return context;
// // }


// // src/components/superAdmin/SuperAdminHeader.jsx
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../../context/AuthContext";
// // import ConfirmLogoutModal from "../admin/ConfirmLogoutModal";
// import ConfirmLogoutModal from "./ConfirmLogoutModal"

// export default function SuperAdminHeader() {
//   const { admin, logout } = useAuth();
//   const navigate = useNavigate();
//   const [open, setOpen] = useState(false);
//   const [loading, setLoading] = useState(false);

//   async function confirmLogout() {
//     setLoading(true);
//     try {
//       logout();                          // clears token, state & localStorage
//       navigate("/admin/login");          // ← change to your actual login route
//     } catch (err) {
//       console.error("Logout error:", err);
//     } finally {
//       setLoading(false);
//       setOpen(false);
//     }
//   }

//   return (
//     <>
//       <header className="bg-white shadow">
//         <div className="container mx-auto px-4 py-3 flex justify-between items-center">
//           <div className="font-bold text-lg text-purple-700">Nexter FM — Super Admin</div>
//           <div className="flex items-center gap-3">
//             <div className="text-sm text-gray-700">{admin?.name || admin?.email}</div>
//             <button
//               onClick={() => setOpen(true)}
//               className="text-sm px-3 py-1 bg-red-600 text-white rounded"
//             >
//               Logout
//             </button>
//           </div>
//         </div>
//       </header>

//       <ConfirmLogoutModal
//         open={open}
//         onClose={() => setOpen(false)}
//         onConfirm={confirmLogout}
//         loading={loading}
//       />
//     </>
//   );
// }


// src/components/superAdmin/SuperAdminHeader.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import ConfirmLogoutModal from "./ConfirmLogoutModal";

export default function SuperAdminHeader() {
  const { admin, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  async function confirmLogout() {
    setLoading(true);
    try {
      logout();
      navigate("/login");   // ← matches your actual login route
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      setLoading(false);
      setOpen(false);
    }
  }

  return (
    <>
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="font-bold text-lg text-purple-700">Nexter FM — Super Admin</div>
          <div className="flex items-center gap-3">
            <div className="text-sm text-gray-700">{admin?.name || admin?.email}</div>
            <button
              onClick={() => setOpen(true)}
              className="text-sm px-3 py-1 bg-red-600 text-white rounded"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <ConfirmLogoutModal
        open={open}
        onClose={() => setOpen(false)}
        onConfirm={confirmLogout}
        loading={loading}
      />
    </>
  );
}