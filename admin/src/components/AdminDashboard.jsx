// // src/pages/admin/AdminDashboard.jsx
// import React, { useEffect, useState } from "react";
// import StatCard from "../../components/admin/StatCard";
// import QuickActions from "../../components/admin/QuickActions";
// import AdminsTable from "../../components/admin/AdminsTable";
// import NowPlayingCard from "../../components/NowPlayingCard";

// const SAMPLE_ADMINS = [
//   { id: 1, name: "Kelechi Kalu", email: "kelechi@example.com", role: "superadmin" },
//   { id: 2, name: "Aisha Bello", email: "aisha@example.com", role: "editor" },
// ];

// export default function AdminDashboard() {
//   const [admins, setAdmins] = useState([]);
//   const [stats, setStats] = useState({ admins: 0, programs: 0, streams: 0 });

//   useEffect(() => {
//     // TODO: replace with API calls
//     setAdmins(SAMPLE_ADMINS);
//     setStats({ admins: SAMPLE_ADMINS.length, programs: 12, streams: 1 });
//   }, []);

//   function handleEdit(admin) {
//     // open edit modal or navigate to edit page
//     console.log("edit", admin);
//   }

//   function handleDelete(id) {
//     if (!confirm("Delete this admin?")) return;
//     setAdmins((s) => s.filter((a) => a.id !== id));
//     // TODO: send delete to API
//   }

//   return (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="text-2xl font-bold text-purple-900">Admin Dashboard</h1>
//           <p className="text-sm text-gray-500">Overview and quick actions</p>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//         <StatCard label="Total Admins" value={stats.admins} />
//         <StatCard label="Total Programs" value={stats.programs} />
//         <StatCard label="Active Streams" value={stats.streams} />
//       </div>

//       <div className="grid md:grid-cols-3 gap-4">
//         <div className="md:col-span-2 space-y-4">
//           <AdminsTable admins={admins} onEdit={handleEdit} onDelete={handleDelete} />
//         </div>

//         <div className="space-y-4">
//           <QuickActions />
//           <div className="bg-white dark:bg-gray-800 rounded p-4 shadow">
//             <h3 className="font-semibold mb-3">Now Playing</h3>
//             <NowPlayingCard />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


// src/pages/admin/AdminDashboard.jsx
import React, { useEffect, useState, useMemo } from "react";
import StatCard from "../../components/admin/StatCard";
import QuickActions from "../../components/admin/QuickActions";
import AdminsTable from "../../components/admin/AdminsTable";
import StreamsPanel from "../../components/admin/StreamsPanel";
import CreateAdminModal from "../../components/admin/CreateAdminModal";
import NowPlayingCard from "../../components/NowPlayingCard";

const SAMPLE_ADMINS = [
  { id: 1, name: "Kelechi Kalu", email: "kelechi@example.com", role: "superadmin" },
  { id: 2, name: "Aisha Bello", email: "aisha@example.com", role: "editor" },
];

const SAMPLE_STREAMS = [
  { id: "stream-1", name: "Main Live Stream", status: "live", listeners: 240 },
  { id: "stream-2", name: "Backup Stream", status: "stopped", listeners: 0 },
];

const SAMPLE_PROGRAMS = [
  { id: 1, title: "Morning Ride", host: "S.D Bawa", time: "07:00 - 10:00" },
  { id: 2, title: "Afternoon Vibes", host: "Grace Daniels", time: "11:00 - 14:00" },
];

const SAMPLE_ACTIVITY = [
  { id: 1, text: "Admin Kelechi created program Morning Ride", time: "2h ago" },
  { id: 2, text: "Stream 'Main Live Stream' went live", time: "3h ago" },
];

export default function AdminDashboard() {
  const [admins, setAdmins] = useState([]);
  const [streams, setStreams] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [activity, setActivity] = useState([]);
  const [stats, setStats] = useState({ admins: 0, programs: 0, streams: 0 });

  // UI
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    // TODO: replace with API calls
    setAdmins(SAMPLE_ADMINS);
    setStreams(SAMPLE_STREAMS);
    setPrograms(SAMPLE_PROGRAMS);
    setActivity(SAMPLE_ACTIVITY);
    setStats({ admins: SAMPLE_ADMINS.length, programs: SAMPLE_PROGRAMS.length, streams: SAMPLE_STREAMS.filter(s => s.status === "live").length });
  }, []);

  // Admin CRUD (local optimistic)
  async function handleCreateAdmin(form) {
    setCreating(true);
    const temp = { id: Date.now(), ...form };
    setAdmins(s => [temp, ...s]);
    // TODO: send to API (POST /api/admins)
    setTimeout(() => {
      setCreating(false);
      setShowCreateModal(false);
      setActivity(a => [{ id: Date.now(), text: `Admin ${form.name} created`, time: "just now" }, ...a]);
      setStats(s => ({ ...s, admins: s.admins + 1 }));
    }, 700);
  }

  function handleDelete(id) {
    if (!confirm("Delete this admin?")) return;
    setAdmins(s => s.filter(a => a.id !== id));
    setActivity(a => [{ id: Date.now(), text: `Admin (id:${id}) deleted`, time: "just now" }, ...a]);
    setStats(s => ({ ...s, admins: Math.max(0, s.admins - 1) }));
    // TODO: delete from API
  }

  function handleEdit(admin) {
    // navigate to edit page or open edit modal (not implemented)
    alert("Edit admin: " + admin.name);
  }

  // Streams toggle (optimistic)
  async function toggleStream(id) {
    setStreams(s => s.map(st => st.id === id ? { ...st, status: st.status === "live" ? "stopping" : "starting" } : st));
    // simulate server action
    setTimeout(() => {
      setStreams(s => s.map(st => st.id === id ? { ...st, status: st.status === "live" ? "stopped" : "live" } : st));
      setActivity(a => [{ id: Date.now(), text: `Stream ${id} toggled`, time: "just now" }, ...a]);
      setStats(s => ({ ...s, streams: s.streams === 0 ? 1 : 0 }));
    }, 800);
  }

  const recentPrograms = useMemo(() => programs.slice(0, 5), [programs]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-purple-900">Admin Dashboard</h1>
          <p className="text-sm text-gray-500">Overview and quick actions</p>
        </div>

        <div className="flex items-center gap-3">
          <button onClick={() => setShowCreateModal(true)} className="px-3 py-2 rounded bg-purple-700 text-white inline-flex items-center gap-2">➕ New Admin</button>
          <a href="/" className="px-3 py-2 rounded border text-sm">View site</a>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard label="Total Admins" value={stats.admins} />
        <StatCard label="Total Programs" value={stats.programs} />
        <StatCard label="Active Streams" value={stats.streams} />
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <div className="md:col-span-2 space-y-4">
          <AdminsTable admins={admins} onEdit={handleEdit} onDelete={handleDelete} />
          <div className="bg-white dark:bg-gray-800 rounded p-4 shadow">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-100">Programs</h3>
              <a href="/admin/programs" className="text-sm text-purple-700">Manage programs →</a>
            </div>

            <div className="grid gap-2">
              {recentPrograms.map(p => (
                <div key={p.id} className="p-3 bg-gray-50 dark:bg-gray-900/40 rounded flex items-center justify-between">
                  <div>
                    <div className="font-medium">{p.title}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">{p.host} • {p.time}</div>
                  </div>
                  <a className="text-sm text-purple-700" href={`/admin/programs/${p.id}`}>Edit</a>
                </div>
              ))}
              {recentPrograms.length === 0 && <div className="text-sm text-muted">No programs found.</div>}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <StreamsPanel streams={streams} onToggle={toggleStream} />
          <QuickActions />
          <div className="bg-white dark:bg-gray-800 rounded p-4 shadow">
            <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-2">Recent Activity</h3>
            <ul className="space-y-2 text-sm">
              {activity.map(a => (
                <li key={a.id} className="text-gray-600 dark:text-gray-300 flex items-center justify-between">
                  <span>{a.text}</span>
                  <span className="text-xs text-gray-400">{a.time}</span>
                </li>
              ))}
              {activity.length === 0 && <li className="text-sm text-gray-500">No recent activity</li>}
            </ul>
          </div>
        </div>
      </div>

      <NowPlayingCard />

      {showCreateModal && (
        <CreateAdminModal onClose={() => setShowCreateModal(false)} onCreate={handleCreateAdmin} loading={creating} />
      )}
    </div>
  );
}
