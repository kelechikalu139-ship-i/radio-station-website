// src/components/admin/QuickActions.jsx
import React from "react";
import { Link } from "react-router-dom";

const actions = [
  { to: "/admin/admins/create", label: "Create Admin", emoji: "➕", bg: "bg-purple-50", color: "text-purple-700" },
  { to: "/superadmin/admins", label: "Manage Admins", emoji: "🛠️", bg: "bg-blue-50", color: "text-blue-700" },
  { to: "/superadmin/oaps", label: "Manage OAPs", emoji: "🎙️", bg: "bg-pink-50", color: "text-pink-700" },
  { to: "/superadmin/programs", label: "Manage Programs", emoji: "📻", bg: "bg-green-50", color: "text-green-700" },
  { to: "/superadmin/schedules", label: "Schedule", emoji: "🗓️", bg: "bg-yellow-50", color: "text-yellow-700" },
  { to: "/superadmin/episodes", label: "Upload Episodes", emoji: "🎧", bg: "bg-indigo-50", color: "text-indigo-700" },
  { to: "/superadmin/sponsors", label: "Sponsors", emoji: "🏢", bg: "bg-orange-50", color: "text-orange-700" },
  { to: "/superadmin/settings", label: "Settings", emoji: "⚙️", bg: "bg-gray-50", color: "text-gray-700" },
];

export default function QuickActions() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-5">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">Quick Actions</h3>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {actions.map((a) => (
          <Link
            key={a.to}
            to={a.to}
            className={`flex flex-col items-center justify-center p-4 ${a.bg} hover:opacity-95 border ${a.bg === "bg-gray-50" ? "border-gray-200" : "border-transparent"} rounded-xl transition`}
          >
            <span className={`text-3xl ${a.color}`}>{a.emoji}</span>
            <p className={`text-sm font-medium mt-2 ${a.color}`}>{a.label}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
