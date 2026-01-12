// src/pages/admin/SuperAdminLayout.jsx
import React from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { Home, Users, Calendar, Mic2, List } from "lucide-react";
// import { setAuthToken } from "../../api/axios";

export default function SuperAdminLayout() {
  const nav = useNavigate();
  const info = JSON.parse(localStorage.getItem("admin_info") || "{}");
  const role = info?.role;

  const logout = () => {
    setAuthToken(null);
    localStorage.removeItem("admin_info");
    nav("/admin/login");
  };

  const links = [
    { to: "/admin", label: "Overview", icon: <Home size={16} /> },
    { to: "/admin/admins", label: "Admins", icon: <Users size={16} />, superOnly: true },
    { to: "/admin/programs", label: "Programs", icon: <List size={16} /> },
    { to: "/admin/oaps", label: "OAPs", icon: <Mic2 size={16} /> },
    { to: "/admin/schedule", label: "Schedule", icon: <Calendar size={16} /> },
  ];

  return (
    <div className="min-h-screen flex bg-gray-50">
      <aside className="w-72 bg-white border-r p-4">
        <div className="font-bold text-xl mb-6 text-purple-900">Nexter FM — Superadmin</div>

        <nav className="space-y-2">
          {links.map((l) => {
            if (l.superOnly && role !== "superadmin") return null;
            return (
              <NavLink
                key={l.to}
                to={l.to}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded ${isActive ? "bg-purple-700 text-white" : "text-gray-700 hover:bg-gray-100"}`
                }
              >
                {l.icon}
                <span>{l.label}</span>
              </NavLink>
            );
          })}
        </nav>

        <div className="mt-6">
          <div className="text-xs text-gray-600 mb-2">Signed in as</div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-purple-900 font-bold">
              {info?.name?.slice(0, 2) ?? "SA"}
            </div>
            <div>
              <div className="font-semibold text-sm">{info?.name ?? info?.email}</div>
              <div className="text-xs text-gray-500">{info?.role}</div>
            </div>
          </div>

          <button onClick={logout} className="w-full mt-4 bg-purple-900 text-white py-2 rounded">
            Sign out
          </button>
        </div>
      </aside>

      <div className="flex-1">
        <header className="bg-white p-4 border-b flex items-center justify-between">
          <div className="text-sm text-gray-600">Superadmin Dashboard</div>
          <div className="text-sm text-gray-600">Nexter FM</div>
        </header>

        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
