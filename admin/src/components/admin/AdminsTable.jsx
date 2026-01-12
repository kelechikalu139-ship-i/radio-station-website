// src/components/admin/AdminsTable.jsx
import React from "react";

export default function AdminsTable({ admins = [], onEdit = () => {}, onDelete = () => {} }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded p-4 shadow">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-100">Admins</h3>
        <div className="flex items-center gap-2">
          <a href="/admin/admins/create" className="text-sm text-purple-700">Create admin →</a>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead>
            <tr className="text-xs text-gray-500">
              <th className="py-2 px-2">Name</th>
              <th className="py-2 px-2">Email</th>
              <th className="py-2 px-2">Role</th>
              <th className="py-2 px-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {admins.length === 0 ? (
              <tr>
                <td colSpan="4" className="py-4 px-2 text-center text-sm text-gray-500">No admins yet</td>
              </tr>
            ) : (
              admins.map((a) => (
                <tr key={a.id} className="border-t">
                  <td className="py-2 px-2">{a.name}</td>
                  <td className="py-2 px-2">{a.email}</td>
                  <td className="py-2 px-2">{a.role}</td>
                  <td className="py-2 px-2">
                    <div className="flex items-center gap-2">
                      <button onClick={() => onEdit(a)} className="text-sm px-2 py-1 rounded bg-yellow-100">Edit</button>
                      <button onClick={() => onDelete(a.id)} className="text-sm px-2 py-1 rounded bg-red-100">Delete</button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}



// import { useAuth } from "../../context/AuthContext";

// function AdminsTable({ admins }) {
//   const { user } = useAuth();

//   return (
//     <table> 
//       {/* ... */}
//       {admins.map(a => (
//         <tr key={a.id}>
//           <td>{a.name}</td>
//           <td>{a.email}</td>
//           <td>
//             {user?.role === "superadmin" ? (
//               <button>Delete</button>
//             ) : (
//               <span className="text-xs text-gray-500">—</span>
//             )}
//           </td>
//         </tr>
//       ))}
//     </table>
//   );
// }
