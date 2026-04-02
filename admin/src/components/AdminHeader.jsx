// import React from 'react'
// import { Link } from 'react-router-dom'
// const AdminHeader = () => {
//   return (
//     <header className='bg-gray-900 text-white'>
// <div className='container mx-auto px-4 py-3 flex items-center justify-between'>
// <div className='flex items-center gap-4'>
// <Link to='/admin' className='font-bold text-lg'>Admin — NexterFM</Link>
// </div>
// <div className='flex items-center gap-3'>
// <Link to='/http://localhost:5173/' className='text-sm hover:underline'>View site</Link>
// <button className='bg-red-600 px-3 py-1 rounded'>Logout</button>
// </div>
// </div>
// </header>
//   )
// }

// export default AdminHeader



// admin/src/components/admin/AdminHeader.jsx
// import React from "react";
// import { useAuth } from "../../context/AuthContext";

// export default function AdminHeader() {
//   const { admin, logout } = useAuth();
//   return (
//     <header className="bg-white shadow">
//       <div className="container mx-auto px-4 py-3 flex justify-between items-center">
//         <div className="font-bold text-lg text-purple-700">Nexter FM — Admin</div>
//         <div className="flex items-center gap-3">
//           <div className="text-sm text-gray-700">{admin?.name || admin?.email}</div>
//           <button onClick={logout} className="text-sm px-3 py-1 bg-red-600 text-white rounded">Logout</button>
//         </div>
//       </div>
//     </header>
//   );
// }



// src/components/admin/AdminHeader.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import ConfirmLogoutModal from "./ConfirmLogoutModal";

export default function AdminHeader() {
  const { admin, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  async function confirmLogout() {
    setLoading(true);
    try {
      logout();
      navigate("/login");   // ← matches your actual login route
    } catch (err) {
      console.error("Logout error:", err);
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