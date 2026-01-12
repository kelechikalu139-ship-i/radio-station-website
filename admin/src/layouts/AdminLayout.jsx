// // src/App.jsx
// import React from "react";
// import { Routes, Route } from "react-router-dom";

// // FIRST PAGE
// import AdminRegister from "./pages/AdminRegister";

// // Admin layout pages
// import AdminLayout from "./layouts/AdminLayout";
// import AdminDashboard from "./pages/admin/AdminDashboard";
// import AdminsListPage from "./pages/admin/AdminsListPage";
// import CreateAdminPage from "./pages/admin/CreateAdminPage";

// const App = () => {
//   return (
//     <Routes>
//       {/* PUBLIC FIRST PAGE (NO HEADER / NO SIDEBAR) */}
//       <Route path="/" element={<AdminRegister />} />

//       {/* ADMIN AREA (WITH HEADER / SIDEBAR / FOOTER) */}
//       <Route path="/admin" element={<AdminLayout />}>
//         <Route index element={<AdminDashboard />} />
//         <Route path="admins" element={<AdminsListPage />} />
//         <Route path="admins/create" element={<CreateAdminPage />} />
//       </Route>


      
// {/* Admin routes */}
// <Route path='/admin/login' element={<AdminLogin/>} />
// <Route path='/admin/register' element={<AdminRegister/>}/>

//       {/* fallback */}
//       <Route path="*" element={<div className="p-6">404 — Not found</div>} />
//     </Routes>
//   );
// };

// export default App;


// src/layouts/AdminLayout.jsx
// import React from "react";
// import { Outlet } from "react-router-dom";
// import AdminHeader from "../components/admin/AdminHeader";
// import AdminFooter from "../components/admin/AdminFooter";
// import SideBar from "../components/admin/SideBar";

// export default function AdminLayout() {
//   return (
//     <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
//       <AdminHeader />

//       <div className="flex flex-1">
//         <aside className="w-64 p-4 border-r bg-white dark:bg-gray-800 hidden md:block">
//           <SideBar />
//         </aside>

//         <main className="flex-1 p-6">
//           <Outlet />
//         </main>
//       </div>

//       <AdminFooter />
//     </div>
//   );
// }



// admin/src/layouts/AdminLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import AdminHeader from "../components/admin/AdminHeader";
import AdminFooter from "../components/admin/AdminFooter";
import SideBar from "../components/admin/SideBar";

export default function AdminLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <AdminHeader />
      <div className="flex flex-1">
        <aside className="w-64 p-4 border-r hidden md:block bg-white">
          <SideBar />
        </aside>
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
      <AdminFooter />
    </div>
  );
}

// import React from "react";
// import AdminSidebar from "../components/AdminSidebar";
// import AdminHeader from "../components/admin/AdminHeader";

// export default function AdminLayout({children}){
//   return(
//     <div className="layout">
//       <AdminHeader/>
//       <div className="main">
//         <AdminSidebar/>
//         <div className="content">{children}</div>
//       </div>
//     </div>
//   )
// }