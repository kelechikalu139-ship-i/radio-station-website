// src/components/admin/SideBar.jsx
import React from "react";
import { NavLink } from "react-router-dom";

const active = ({ isActive }) =>
  `block px-3 py-2 rounded-md text-sm font-medium ${isActive ? "bg-purple-100 text-purple-700 dark:bg-gray-700 dark:text-white" : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"}`;

export default function SideBar() {
  return (
    <nav className="flex flex-col gap-2">
      <NavLink to="/superAdmin" end className={active}>Dashboard</NavLink>
      <NavLink to="/superAdmin/admins" className={active}>Admins</NavLink>
      <NavLink to="/superAdmin/oaps" className={active}>OAPs</NavLink>
      <NavLink to="/superAdmin/programs" className={active}>Programs</NavLink>
      <NavLink to="/superAdmin/schedules" className={active}>Schedule</NavLink>
      <NavLink to="/superAdmin/episodes" className={active}>Episodes</NavLink>
      <NavLink to="/superAdmin/sponsors" className={active}>Sponsors</NavLink>
      <NavLink to="/superAdmin/activitylog" className={active}>Activity Log</NavLink>
      <NavLink to="/superAdmin/settings" className={active}>Settings</NavLink>
    </nav>
  );
}
