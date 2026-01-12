// src/components/admin/AdminFooter.jsx
import React from "react";

export default function AdminFooter() {
  return (
    <footer className="bg-white dark:bg-gray-800 border-t mt-6">
      <div className="container mx-auto px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
        Admin panel — © {new Date().getFullYear()} Nexter FM
      </div>
    </footer>
  );
}
