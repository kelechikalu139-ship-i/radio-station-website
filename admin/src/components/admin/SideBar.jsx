// src/components/admin/SideBar.jsx
import React from "react";
import { NavLink } from "react-router-dom";

const active = ({ isActive }) =>
  `block px-3 py-2 rounded-md text-sm font-medium ${isActive ? "bg-purple-100 text-purple-700 dark:bg-gray-700 dark:text-white" : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"}`;

export default function SideBar() {
  return (
    <nav className="flex flex-col gap-2">
      <NavLink to="/admin" end className={active}>Dashboard</NavLink>
      <NavLink to="/admin/admins" className={active}>Admins</NavLink>
      <NavLink to="/admin/oaps" className={active}>OAPs</NavLink>
      <NavLink to="/admin/programs" className={active}>Programs</NavLink>
      <NavLink to="/admin/schedules" className={active}>Schedule</NavLink>
      <NavLink to="/admin/episodes" className={active}>Episodes</NavLink>
      <NavLink to="/admin/sponsors" className={active}>Sponsors</NavLink>
      <NavLink to="/admin/settings" className={active}>Settings</NavLink>
    </nav>
  );
}
