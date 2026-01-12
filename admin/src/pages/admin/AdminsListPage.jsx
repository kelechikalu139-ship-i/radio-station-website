// src/pages/admin/AdminsListPage.jsx
import React from "react";
import AdminsTable from "../../components/admin/AdminsTable";

export default function AdminsListPage() {
  // you can fetch real admin data here; this is a placeholder
  const sample = [
    { id: 1, name: "Kelechi Kalu", email: "kelechi@example.com", role: "superadmin" },
    { id: 2, name: "Aisha Bello", email: "aisha@example.com", role: "editor" },
  ];

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Admins</h1>
      <AdminsTable admins={sample} />
    </div>
  );
}
