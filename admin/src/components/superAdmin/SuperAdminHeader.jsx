// admin/src/components/admin/AdminHeader.jsx
import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";

import ConfirmLogoutModal from "./ConfirmLogoutModal"; // adjust path if necessary

export default function AdminHeader() {
  const { admin, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  async function confirmLogout() {
    setLoading(true);
    try {
      // logout in context will call the API and redirect
      await logout();
    } catch (err) {
      console.error("logout error", err);
    } finally {
      setLoading(false);
      setOpen(false);
    }
  }

  return (
    <>
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="font-bold text-lg text-purple-700">Nexter FM — Admin</div>
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
