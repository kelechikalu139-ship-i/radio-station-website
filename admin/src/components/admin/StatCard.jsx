// src/components/admin/StatCard.jsx
import React from "react";

export default function StatCard({ label, value, children }) {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow flex items-center justify-between">
      <div>
        <div className="text-sm text-gray-500 dark:text-gray-300">{label}</div>
        <div className="text-2xl font-semibold text-purple-800 dark:text-white">{value}</div>
      </div>
      {children && <div>{children}</div>}
    </div>
  );
}
