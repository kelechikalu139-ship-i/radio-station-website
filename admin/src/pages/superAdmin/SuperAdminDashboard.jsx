import React, { useEffect, useState, useMemo } from "react";
import api from "../../api/api";

import NowPlayingCard from "../../components/NowPlayingCard";
import CreateAdminModal from "../../components/admin/CreateAdminModal";
import AdminsTable from "../../components/superAdmin/AdminsTable";
import StatCard from "../../components/admin/StatCard";
import QuickActions from "../../components/admin/QuickActions";
import StreamsPanel from "../../components/admin/StreamsPanel";
import RecentActivity from "../../components/superAdmin/RecentActivity";

/* =======================
   TIME AGO HELPER
======================= */
function timeAgo(date) {
  const seconds = Math.floor((Date.now() - new Date(date)) / 1000);
  if (seconds < 60) return "just now";
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  return `${Math.floor(seconds / 86400)}d ago`;
}

const SuperAdminDashboard = () => {
  const [admins, setAdmins] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [streams, setStreams] = useState([]);
  const [activity, setActivity] = useState([]);
  const [oaps, setOaps] = useState([]);
  const [schedules, setSchedules] = useState([]);

  const [stats, setStats] = useState({
    admins: 0,
    programs: 0,
    streams: 0,
    oaps:0,
    schedules:0,
  });

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [creating, setCreating] = useState(false);
  const [loading, setLoading] = useState(true);

  /* =======================
     LOAD DASHBOARD DATA
  ======================= */
  useEffect(() => {
    const controller = new AbortController();

    async function loadDashboard() {
      try {
        const [
          adminCountRes,
          adminsRes,
          programCountRes,
          programsRes,
          activityRes,
          oapCountRes,
          // oapsRes,
          scheduleCountRes,
        ] = await Promise.all([
          api.get("/api/admin/admins/count", { signal: controller.signal }),
          api.get("/api/admin/admins", { signal: controller.signal }),
          api.get("/api/program/programs/count", { signal: controller.signal }),
          api.get("/api/program/programs?limit=5", { signal: controller.signal }),
          api.get("/api/activity?limit=10", { signal: controller.signal }),
          api.get("/api/oap/oaps/count", { signal: controller.signal }),
          api.get("/api/schedule/schedules/count", {signal: controller.signal}),
        ]);

        const adminsList = adminsRes.data.admins || [];
        const programsList = programsRes.data.programs || [];
        // const oapsList = oapsRes.data.oaps || [];

        setAdmins(adminsList);
        setPrograms(programsList);
        // setOaps(oapsList);
        setStreams([]); // Icecast / stream control later

        setStats({
          admins: Number(adminCountRes.data.count || adminsList.length),
          programs: Number(programCountRes.data.count || programsList.length),
          oaps: Number(oapCountRes.data.count),
          schedules: Number(scheduleCountRes.data.count),
          streams: 0,
        });

        setActivity(
          (activityRes.data.activity || []).map((a) => ({
            id: a.id,
            text: `${a.actor_name} ${a.action} ${a.target_name}`,
            time: timeAgo(a.created_at),
          }))
        );
      } catch (err) {
        console.error("Dashboard load failed:", err);
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
    return () => controller.abort();
  }, []);

  /* =======================
     CREATE ADMIN
  ======================= */
  async function handleCreateAdmin(form) {
    setCreating(true);
    try {
      const res = await api.post("/api/admin/admins", form);
      const created = res.data.admin || res.data;

      setAdmins((prev) => [created, ...prev]);
      setStats((s) => ({ ...s, admins: s.admins + 1 }));

      setActivity((a) => [
        {
          id: Date.now(),
          text: `Admin ${created.name} created`,
          time: "just now",
        },
        ...a,
      ]);
    } catch (err) {
      console.error("Create admin failed:", err);
    } finally {
      setCreating(false);
      setShowCreateModal(false);
    }
  }

  /* =======================
     DELETE ADMIN
  ======================= */
  async function handleDeleteAdmin(id) {
    if (!confirm("Delete this admin?")) return;

    try {
      await api.delete(`/api/admin/admins/${id}`);
      setAdmins((prev) => prev.filter((a) => a.id !== id));
      setStats((s) => ({ ...s, admins: Math.max(0, s.admins - 1) }));

      setActivity((a) => [
        { id: Date.now(), text: `Admin deleted`, time: "just now" },
        ...a,
      ]);
    } catch (err) {
      console.error("Delete admin failed:", err);
    }
  }

  /* =======================
     STREAM TOGGLE (UI ONLY)
  ======================= */
  function toggleStream(id) {
    setStreams((s) =>
      s.map((st) =>
        st.id === id
          ? { ...st, status: st.status === "live" ? "stopped" : "live" }
          : st
      )
    );
  }

  const recentPrograms = useMemo(() => programs.slice(0, 5), [programs]);

  if (loading) {
    return <div className="p-6 text-gray-500">Loading dashboard…</div>;
  }

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-purple-900">
            Super Admin Dashboard
          </h1>
          <p className="text-sm text-gray-500">
            System overview & management
          </p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="px-3 py-2 rounded bg-purple-700 text-white"
        >
          ➕ New Admin
        </button>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard label="Total Admins" value={stats.admins} />
        <StatCard label="Total Programs" value={stats.programs} />
        <StatCard label="Active Streams" value={stats.streams} />
        <StatCard label="OAPs" value={stats.oaps} />
        <StatCard label="Today's Schedules" value={stats.schedules}/>  
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {/* LEFT */}
        <div className="md:col-span-2 space-y-4">
          <AdminsTable
            admins={admins}
            onEdit={(a) => alert(`Edit ${a.name}`)}
            onDelete={handleDeleteAdmin}
          />

          {/* PROGRAMS */}
          <div className="bg-white dark:bg-gray-800 rounded p-4 shadow">
            <div className="flex justify-between mb-2">
              <h3 className="font-semibold text-lg">Programs</h3>
              <a
                href="/admin/programs"
                className="text-sm text-purple-700"
              >
                Manage →
              </a>
            </div>

            {recentPrograms.length === 0 ? (
              <p className="text-sm text-gray-500">No programs found.</p>
            ) : (
              <div className="space-y-2">
                {recentPrograms.map((p) => (
                  <div
                    key={p.id}
                    className="p-3 bg-gray-50 dark:bg-gray-900/40 rounded flex justify-between"
                  >
                    <div>
                      <div className="font-medium">{p.title}</div>
                      <div className="text-xs text-gray-500">
                        {new Date(p.created_at).toLocaleDateString()}
                      </div>
                    </div>
                    <a
                      href={`/admin/programs/${p.id}`}
                      className="text-sm text-purple-700"
                    >
                      Edit
                    </a>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* RIGHT */}
        <div className="space-y-4">
          <StreamsPanel streams={streams} onToggle={toggleStream} />
          <QuickActions />

          {/* RECENT ACTIVITY */}
          <div className="bg-white dark:bg-gray-800 rounded p-4 shadow">
            {/* <h3 className="font-semibold mb-2">Recent Activity</h3> */}
             <RecentActivity/>

            {/* {activity.length === 0 ? (
              <p className="text-sm text-gray-500">No recent activity</p>
            ) : (
              <ul className="space-y-2 text-sm">
                {activity.map((a) => (
                  <li
                    key={a.id}
                    className="flex justify-between text-gray-600 dark:text-gray-300"
                  >
                    <span className="truncate">{a.text}</span>
                    <span className="text-xs text-gray-400 ml-2">
                      {a.time}
                    </span>
                  </li>
                ))}
              </ul>
            )} */}
          </div>
        </div>
      </div>
      

      <NowPlayingCard />
     

      {showCreateModal && (
        <CreateAdminModal
          loading={creating}
          onClose={() => setShowCreateModal(false)}
          onCreate={handleCreateAdmin}
        />
      )}
    </div>
  );
};

export default SuperAdminDashboard;
