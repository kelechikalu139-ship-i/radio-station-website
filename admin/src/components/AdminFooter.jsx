// import React from 'react'

// const AdminFooter = () => {
//   return (
//     <footer className='bg-gray-50 text-gray-500'>
// <div className='container mx-auto px-4 py-3 text-sm'>
// Admin panel — © {new Date().getFullYear()} Nexter FM
// </div>
// </footer>
//   )
// }

// export default AdminFooter


// admin/src/components/admin/AdminFooter.jsx
import React from "react";
export default function AdminFooter() {
  return (
    <footer className="bg-white border-t">
      <div className="container mx-auto px-4 py-3 text-sm text-gray-500">
        Admin panel — © {new Date().getFullYear()}
      </div>
    </footer>
  );
}
