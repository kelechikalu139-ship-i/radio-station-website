// // import React from 'react'
// // import { Routes, Route } from "react-router-dom";
// // import SuperAdminLayout from "./pages/admin/SuperAdminLayout";
// // import ProtectedAdminRoute from "./pages/admin/ProtectedAdminRoute";
// // import AdminsPage from "./pages/admin/AdminsPage";
// // import ProgramsPage from "./pages/admin/ProgramsPage";
// // import OAPsPage from "./pages/admin/OAPsPage";
// // import SchedulePage from "./pages/admin/SchedulePage";
// // import AdminDashboard from "./pages/admin/AdminDashboard"; // simple overview
// // import AdminLogin from "./pages/AdminLogin";

// // const App = () => {
// //   return (
// //      <Routes>
// //        {/* <Route path="/admin/login" element={<AdminLogin />} /> */}
// //               {/* <Route path="/" element={<AdminLogin />} /> */}
// //               <Route path="/" element={<AdminDashboard />} />

// //       <Route
// //         path="/dashboard/*"
// //         element={
// //           <ProtectedAdminRoute>
// //             <SuperAdminLayout />
// //           </ProtectedAdminRoute>
// //         }
// //       >
// //         <Route index element={<AdminDashboard />} />
// //         <Route path="admins" element={<AdminsPage />} />
// //         <Route path="programs" element={<ProgramsPage />} />
// //         <Route path="oaps" element={<OAPsPage />} />
// //         <Route path="schedule" element={<SchedulePage />} />
// //       </Route>

// //       {/* other routes... */}
// //     </Routes>
// //   )
// // }

// // export default App

// // App.jsx (snippet)

// // src/App.jsx
// import React from "react";
// import { Routes, Route } from "react-router-dom";

// // public/main layout (your site)
// import MainLayout from "./layouts/AdminLayout";            // <-- make sure this file exists
// // import Home from "./pages/Home";                         // optional: example public route
// // admin layout + pages
// import AdminLayout from "./layouts/AdminLayout";
// import AdminDashboard from "./pages/admin/AdminDashboard";
// import AdminsListPage from "./pages/admin/AdminsListPage";       // placeholder below
// import CreateAdminPage from "./pages/admin/CreateAdminPage";     // placeholder below

// const App = () => {
//   return (
//     <Routes>
//       <Route path="/" element={<MainLayout />}>
//         {/* public routes (example) */}
//         {/* <Route index element={<Home />} /> */}
//         {/* add other public routes here */}
//       </Route>

//       <Route path="/admin" element={<AdminLayout />}>
//         <Route index element={<AdminDashboard />} />
//         <Route path="admins" element={<AdminsListPage />} />
//         <Route path="admins/create" element={<CreateAdminPage />} />
//         {/* other admin routes */}
//       </Route>

//       {/* fallback - optional */}
//       <Route path="*" element={<div className="p-6">404 — Not found</div>} />
//     </Routes>
//   );
// };

// export default App;

// import React from "react";
// import { Routes, Route } from "react-router-dom";

// import AdminRegister from "./pages/AdminRegister";

// // Admin layout + pages
// import AdminLayout from "./layouts/AdminLayout";
// import AdminDashboard from "./pages/admin/AdminDashboard";
// import AdminsListPage from "./pages/admin/AdminsListPage";
// import CreateAdminPage from "./pages/admin/CreateAdminPage";

// const App = () => {
//   return (
//     <Routes>
//       {/* FIRST PAGE IS ADMIN REGISTER */}
//       <Route path="/" element={<AdminRegister />} />

//       {/* ADMIN PAGES */}
//       <Route path="/admin" element={<AdminLayout />}>
//         <Route index element={<AdminRegister />} />
//         <Route index element={<AdminDashboard />} />
//         <Route path="admins" element={<AdminsListPage />} />
//         <Route path="admins/create" element={<CreateAdminPage />} />
//       </Route>

//       {/* fallback */}
//       <Route path="*" element={<div className="p-6">404 — Not found</div>} />
//     </Routes>
//   );
// };

// export default App;

// admin/src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";

import AdminRegister from "./pages/AdminRegister";
import AdminLogin from "./pages/AdminLogin";
import Unauthorized from "./pages/Unauthorized"

import AdminLayout from "./layouts/AdminLayout";
import SuperAdminLayout from "./layouts/SuperAdminLayout";

import AdminDashboard from "./pages/admin/AdminDashboard";
import SuperAdminDashboard from "./pages/superAdmin/SuperAdminDashboard";

import AdminsListPage from "./pages/admin/AdminsListPage"; // optional placeholders
import CreateAdminPage from "./pages/admin/CreateAdminPage"; // optional placeholders
import AdminPage from "./pages/superAdmin/AdminPage";
import OAPsPage from "./pages/admin/OAPsPage";
import SchedulePage from "./pages/admin/SchedulePage";
import ProgramsPage from "./pages/admin/ProgramsPage";
import SuperAdminOAPsPage from "./pages/superAdmin/OAPsPage";
import SuperProgramsPage from "./pages/superAdmin/ProgramsPage";
import SuperAdminSchedule from "./pages/superAdmin/SchedulePage";
import SuperAdminEpisode from "./pages/superAdmin/EpisodesPage";
import SuperAdminSponsors from "./pages/superAdmin/SponsorsPage";
import ActivityLog from "./pages/superAdmin/ActivityLog";
import SuperAdminSettings from "./pages/superAdmin/SettingsPage";

import ProtectedRoute from "./utils/ProtectedRoute";


export default function App() {
  return (
    <Routes>
      {/* first page: registration (no layout) */}
      <Route path="/" element={<AdminRegister />} />
      {/* <Route path="/" element={<AdminLogin />} /> */}
      <Route path="/login" element={<AdminLogin />} />
   

      {/* SUPER ADMIN AREA  */}
      <Route element={<ProtectedRoute role="superadmin" />}>
  <Route path="/superadmin" element={<SuperAdminLayout />}>
    <Route index element={<SuperAdminDashboard />} />
    {/* <Route path="admins" element={<AdminsListPage />} /> */}
    <Route path="admins" element={<AdminPage />} />
    <Route path="oaps" element={<SuperAdminOAPsPage/>} />
    <Route path="programs" element={<SuperProgramsPage/>} />
    <Route path="programs" element={<SuperProgramsPage/>} />
    <Route path="schedules" element={<SuperAdminSchedule/>} />
    <Route path="sponsors" element={<SuperAdminSponsors/>} />
    <Route path="episodes" element={<SuperAdminEpisode/>} />
    <Route path="activitylog" element={<ActivityLog/>}/>
    <Route path="settings" element={<SuperAdminSettings/>} />
  </Route>
</Route>

      {/* ADMIN AREA  */}

      <Route element={<ProtectedRoute role="admin" />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="admins" element={<AdminsListPage />} />
          <Route path="admins/create" element={<CreateAdminPage />} />
          <Route path="oaps" element={<OAPsPage />} />
          <Route path="programs" element={<ProgramsPage />} />
          <Route path="schedules" element={<SchedulePage />} />
        </Route>
      </Route>

      {/* <Route path="*" element={<div className="p-6">404 — Not found</div>} /> */}
      <Route path="*" element={<div className="p-6"><Unauthorized/></div>} />
    </Routes>
  );
}
