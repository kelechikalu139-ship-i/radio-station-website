// import React from "react";
// import { Navigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// export default function ProtectedRoute({ children, allowedRoles = [] }) {
//   const { user } = useAuth();

//   if (!user) {
//     return <Navigate to="/login" replace />;
//   }
//   if (allowedRoles.length && !allowedRoles.includes(user.role)) {
//     // role not allowed
//     return <Navigate to="/unauthorized" replace />;
//   }
//   return children;
// }


// admin/src/utils/ProtectedRoute.jsx
// import React from "react";
// import { Navigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// export default function ProtectedRoute({ children }) {
//   const { admin } = useAuth();

//   if (!admin) {
//     // not logged in, redirect to root (register) or login
//     return <Navigate to="/" replace />;
//   }

//   const {superadmin} = useAuth();

//    if(!superadmin){
//     return <Navigate to="/" replace />
//   }
  
//   return children;

// }


// import { Navigate } from "react-router-dom";

// export default function ProtectedRoute({children}){
//   const user = JSON.parse(localStorage.getItem("user"));

//   if (!user) return <Navigate to="/login"/>;

//   if(role && user.role !== role)
//     return <Navigate to="/unauthorized"/>;

//   return children;
// }



// src/utils/ProtectedRoute.jsx
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

/**
 * role: optional string or array of allowed roles (e.g. "superadmin" or ["admin","superadmin"])
 */
export default function ProtectedRoute({ role }) {
  let admin = null;
  try {
    admin = JSON.parse(localStorage.getItem("admin_info"));
  } catch { /* ignore */ }

  // not logged in
  if (!admin) return <Navigate to="/admin/login" replace />;

  // if role is provided and doesn't match, redirect to unauthorized or default page
  if (role) {
    const allowed = Array.isArray(role) ? role : [role];
    if (!allowed.includes(admin.role)) {
      // optional: navigate to a user-friendly unauthorized page
      return <Navigate to="/admin/unauthorized" replace />;
    }
  }

  // ok — render nested routes (layouts will render <Outlet/>)
  return <Outlet />;
}
