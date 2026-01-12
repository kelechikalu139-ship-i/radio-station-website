// import React from 'react'
// import { NavLink } from 'react-router-dom'
// const SideBar = () => {
//   return (
//     <nav className='flex flex-col gap-2'>
// <NavLink to='/admin' end className={active}>Dashboard</NavLink>
// <NavLink to='/admin/users' className={active}>Users</NavLink>
// <NavLink to='/admin/shows' className={active}>Shows</NavLink>
// </nav>
//   )
// }

// export default SideBar


// import React from "react";
// import { NavLink } from "react-router-dom";
// import { useAuth } from "../../context/AuthContext";

// export default function SideBar() {
//   const { user } = useAuth();

//   return (
//     <nav className="flex flex-col gap-2">
//       {user?.role === "superadmin" && <NavLink to="/superadmin">Super Admin Panel</NavLink>}
//       <NavLink to="/admin">Admin Dashboard</NavLink>
//       <NavLink to="/admin/programs">Programs</NavLink>
//       <NavLink to="/admin/oaps">OAPs</NavLink>
//       {/* ... */}
//     </nav>
//   );
// }


// admin/src/components/admin/SideBar.jsx
import React from "react";
import { NavLink } from "react-router-dom";

const active = ({ isActive }) => isActive ? "block px-3 py-2 rounded bg-purple-100 text-purple-700" : "block px-3 py-2 rounded hover:bg-gray-50";

export default function SideBar() {
  return (
    <nav className="flex flex-col gap-2">
      <NavLink to="/admin" end className={active}>Dashboard</NavLink>
      <NavLink to="/admin/admins" className={active}>Admins</NavLink>
      <NavLink to="/admin/programs" className={active}>Programs</NavLink>
      <NavLink to="/admin/oaps" className={active}>OAPsddd</NavLink>
      <NavLink to="/admin/schedule" className={active}>Schedule</NavLink>
    </nav>
  );
}
