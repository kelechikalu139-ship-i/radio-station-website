// src/components/admin/AdminHeader.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function AdminHeader() {
  return (
    <header className="bg-white dark:bg-gray-800 border-b">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/admin" className="font-bold text-lg text-purple-700 dark:text-white">
            Admin — NexterFM
          </Link>
          <span className="text-sm text-gray-500 dark:text-gray-300">Admin panel</span>
        </div>

        <div className="flex items-center gap-3">
          <Link to="/" className="text-sm hover:underline text-gray-600 dark:text-gray-300">View site</Link>
          <button className="bg-red-600 text-white px-3 py-1 rounded text-sm">Logout</button>
        </div>
      </div>
    </header>

    //    <header className="bg-white shadow">
    //   <div className="container mx-auto px-4 py-3 flex justify-between items-center">
    //     <div className="font-bold text-lg text-purple-700">Nexter FM — Super Admin</div>
    //     <div className="flex items-center gap-3">
    //       <div className="text-sm text-gray-700">{admin?.name || admin?.email}</div>
    //       <button onClick={logout} className="text-sm px-3 py-1 bg-red-600 text-white rounded">Logout</button>
    //     </div>
    //   </div>
    // </header>
  );
}
