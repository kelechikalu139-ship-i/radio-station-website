// admin/src/components/admin/ConfirmLogoutModal.jsx
import React from "react";

export default function ConfirmLogoutModal({ open, onClose, onConfirm, loading }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="bg-white dark:bg-gray-900 rounded-lg w-full max-w-sm p-5 shadow-lg">
        <h3 className="text-lg font-semibold mb-2">Confirm Logout</h3>
        <p className="text-sm text-gray-600 mb-4">Are you sure you want to log out? You will be returned to the login screen.</p>

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-3 py-1 rounded border"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-3 py-1 rounded bg-red-600 text-white"
            disabled={loading}
          >
            {loading ? "Logging out..." : "Yes, Log out"}
          </button>
        </div>
      </div>
    </div>
  );
}
