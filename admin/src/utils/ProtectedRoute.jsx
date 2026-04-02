// // src/utils/ProtectedRoute.jsx
// import React from "react";
// import { Navigate, Outlet } from "react-router-dom";

// /**
//  * role: optional string or array of allowed roles (e.g. "superadmin" or ["admin","superadmin"])
//  */
// export default function ProtectedRoute({ role }) {
//   let admin = null;
//   try {
//     admin = JSON.parse(localStorage.getItem("admin_info"));
//   } catch { /* ignore */ }

//   // not logged in
//   if (!admin) return <Navigate to="/admin/login" replace />;

//   // if role is provided and doesn't match, redirect to unauthorized or default page
//   if (role) {
//     const allowed = Array.isArray(role) ? role : [role];
//     if (!allowed.includes(admin.role)) {
//       // optional: navigate to a user-friendly unauthorized page
//       return <Navigate to="/admin/unauthorized" replace />;
//     }
//   }

//   // ok — render nested routes (layouts will render <Outlet/>)
//   return <Outlet />;
// }



// src/utils/ProtectedRoute.jsx
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute({ role }) {
  let admin = null;
  try {
    admin = JSON.parse(localStorage.getItem("admin_info"));
  } catch { /* ignore */ }

  // not logged in → send to correct login route
  if (!admin) return <Navigate to="/login" replace />;

  // role check
  if (role) {
    const allowed = Array.isArray(role) ? role : [role];
    if (!allowed.includes(admin.role)) {
      return <Navigate to="/unauthorized" replace />;
    }
  }

  return <Outlet />;
}