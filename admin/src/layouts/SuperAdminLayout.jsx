import React from "react";
import { Outlet } from "react-router-dom";
import AdminFooter from "../components/admin/AdminFooter";
import SideBar from "../components/superAdmin/SideBar";
import SuperAdminHeader from "../components/superAdmin/SuperAdminHeader";

export default function SuperAdminLayout(){
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <SuperAdminHeader/>
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
// import SuperAdminSidebar from "../components/superAdmin/SuperAdminSidebar";
// import SuperAdminHeader from "../components/superAdmin/SuperAdminHeader";

// export default function SuperAdminLayout({children}){
//     return(
//         <div className="layout">
//             <SuperAdminHeader/>
//             <div className="main">
//                 <SuperAdminSidebar/>
//                 <div className="content">{children}</div>
//             </div>
//         </div>
//     )
// }       

