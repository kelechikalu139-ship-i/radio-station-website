// src/pages/admin/ProtectedAdminRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedAdminRoute({ children, requireSuper = false }) {
  const token = localStorage.getItem("admin_token");
  const info = JSON.parse(localStorage.getItem("admin_info") || "{}");
  if (!token) return <Navigate to="/admin/login" replace />;
  if (requireSuper && info?.role !== "superadmin") return <Navigate to="/admin" replace />;
  return children;
}
