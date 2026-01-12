// src/pages/admin/AdminDashboard.jsx
import React, { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Plus, Trash2, Edit2, Check, X } from "lucide-react";
import NowPlayingCard from "../../components/NowPlayingCard";

/**
 * Super Admin Dashboard
 *
 * - Replace fetch URLs with your actual API endpoints
 * - This component is intentionally self-contained and works with sample data if APIs are not available
 *
 * Endpoints you might hook:
 *  GET /api/admins
 *  POST /api/admins
 *  PUT /api/admins/:id
 *  DELETE /api/admins/:id
 *  GET /api/stats
 *  GET /api/streams  (active stream list)
 *  POST /api/streams/:id/toggle  (start/stop)
 *  GET /api/programs
 */

const SAMPLE_ADMINS = [
  { id: 1, name: "Kelechi Kalu", email: "kelechi@example.com", role: "superadmin" },
  { id: 2, name: "Aisha Bello", email: "aisha@example.com", role: "editor" },
];

const SAMPLE_STATS = {
  admins: 2,
  activeStreams: 1,
  scheduledPrograms: 12,
};

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
  // DATA STATES
  const [admins, setAdmins] = useState([]);
  const [stats, setStats] = useState(null);
  const [streams, setStreams] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [activity, setActivity] = useState([]);
  const [loading, setLoading] = useState(true);

  // UI states
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [creating, setCreating] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editBuffer, setEditBuffer] = useState({});
  const [query, setQuery] = useState("");

  // Fetch dashboard data (try real endpoints, fall back to samples)
  useEffect(() => {
    let mounted = true;

    async function loadAll() {
      setLoading(true);
      // Attempt to load all endpoints in parallel
      const pStats = fetch("/api/stats").then((r) => (r.ok ? r.json() : Promise.reject())).catch(() => SAMPLE_STATS);
      const pAdmins = fetch("/api/admins").then((r) => (r.ok ? r.json() : Promise.reject())).catch(() => SAMPLE_ADMINS);
      const pStreams = fetch("/api/streams").then((r) => (r.ok ? r.json() : Promise.reject())).catch(() => SAMPLE_STREAMS);
      const pPrograms = fetch("/api/programs").then((r) => (r.ok ? r.json() : Promise.reject())).catch(() => SAMPLE_PROGRAMS);
      const pActivity = fetch("/api/activity").then((r) => (r.ok ? r.json() : Promise.reject())).catch(() => SAMPLE_ACTIVITY);

      try {
        const [s, a, st, pr, ac] = await Promise.all([pStats, pAdmins, pStreams, pPrograms, pActivity]);
        if (!mounted) return;
        setStats(s);
        setAdmins(a);
        setStreams(st);
        setPrograms(pr);
        setActivity(ac);
      } catch (err) {
        // Shouldn't reach here because of catch fallback above, but keep defensive
        console.warn("Dashboard: fetch issues, using fallbacks", err);
        setStats(SAMPLE_STATS);
        setAdmins(SAMPLE_ADMINS);
        setStreams(SAMPLE_STREAMS);
        setPrograms(SAMPLE_PROGRAMS);
        setActivity(SAMPLE_ACTIVITY);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    loadAll();
    return () => (mounted = false);
  }, []);

  // Derived values
  const filteredAdmins = useMemo(() => {
    if (!query) return admins;
    const q = query.toLowerCase();
    return admins.filter((a) => (a.name || "").toLowerCase().includes(q) || (a.email || "").toLowerCase().includes(q));
  }, [admins, query]);

  // ---------- Admin CRUD handlers (replace fetch URLs with your API) ----------
  async function handleCreateAdmin(form) {
    // form: { name, email, password, role }
    setCreating(true);
    try {
      // optimistic UI: add temp admin
      const temp = { id: Date.now(), ...form };
      setAdmins((s) => [temp, ...s]);

      // send to server (replace endpoint)
      const res = await fetch("/api/admins", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        // server rejected — rollback and show message
        setAdmins((s) => s.filter((x) => x.id !== temp.id));
        const text = await res.text().catch(() => "Create failed");
        alert("Create admin failed: " + text);
        return;
      }

      const created = await res.json();
      // replace temp with real created (server id)
      setAdmins((s) => [created, ...s.filter((x) => x.id !== temp.id)]);
      // log activity
      setActivity((a) => [{ id: Date.now(), text: `Admin ${created.name} created`, time: "just now" }, ...a]);
      setShowCreateModal(false);
    } catch (err) {
      console.error(err);
      alert("Failed to create admin (network). Check server.");
      setAdmins((s) => s.filter((x) => x.id !== temp.id));
    } finally {
      setCreating(false);
    }
  }

  async function handleDeleteAdmin(id) {
    if (!confirm("Delete this admin? This action is irreversible.")) return;

    // optimistic delete
    const prev = admins;
    setAdmins((s) => s.filter((a) => a.id !== id));

    try {
      const res = await fetch(`/api/admins/${id}`, { method: "DELETE" });
      if (!res.ok) {
        alert("Delete failed on server, restoring locally.");
        setAdmins(prev);
      } else {
        setActivity((a) => [{ id: Date.now(), text: `Admin removed (id:${id})`, time: "just now" }, ...a]);
      }
    } catch (err) {
      console.error(err);
      alert("Network error deleting admin; restoring locally.");
      setAdmins(prev);
    }
  }

  function startEdit(admin) {
    setEditingId(admin.id);
    setEditBuffer({ name: admin.name, email: admin.email, role: admin.role });
  }
  function cancelEdit() {
    setEditingId(null);
    setEditBuffer({});
  }

  async function saveEdit(id) {
    const payload = { ...editBuffer };
    // optimistic update
    const prev = admins;
    setAdmins((s) => s.map((a) => (a.id === id ? { ...a, ...payload } : a)));

    try {
      const res = await fetch(`/api/admins/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        alert("Save failed on server; restoring.");
        setAdmins(prev);
      } else {
        const updated = await res.json();
        setAdmins((s) => s.map((a) => (a.id === id ? updated : a)));
        setActivity((a) => [{ id: Date.now(), text: `Admin ${updated.name} updated`, time: "just now" }, ...a]);
        cancelEdit();
      }
    } catch (err) {
      console.error(err);
      alert("Network error while saving; restoring.");
      setAdmins(prev);
      cancelEdit();
    }
  }

  // ------- Streams control (start/stop) ------------
  async function toggleStream(streamId) {
    // optimistic toggle
    setStreams((s) => s.map((st) => (st.id === streamId ? { ...st, status: st.status === "live" ? "stopping" : "starting" } : st)));
    try {
      const res = await fetch(`/api/streams/${streamId}/toggle`, { method: "POST" });
      if (!res.ok) throw new Error("toggle failed");
      const updated = await res.json();
      setStreams((s) => s.map((st) => (st.id === streamId ? updated : st)));
      setActivity((a) => [{ id: Date.now(), text: `Stream ${streamId} toggled`, time: "just now" }, ...a]);
    } catch (err) {
      console.warn("Toggle stream failed; reverting", err);
      // revert: reload fallback or mark stopped
      setStreams((s) => s.map((st) => (st.id === streamId ? { ...st, status: st.status === "starting" ? "stopped" : "live" } : st)));
      alert("Failed to toggle stream — check server.");
    }
  }

  // ---------- UI subcomponents ----------
  function StatCard({ label, value, children }) {
    return (
      <div className="bg-white dark:bg-gray-800 p-4 rounded shadow flex items-center justify-between">
        <div>
          <div className="text-sm text-gray-500 dark:text-gray-300">{label}</div>
          <div className="text-2xl font-semibold text-purple-800 dark:text-white">{value}</div>
        </div>
        {children}
      </div>
    );
  }

  function AdminsTable() {
    return (
      <div className="bg-white dark:bg-gray-800 rounded p-4 shadow">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-100">Admins</h3>
          <div className="flex items-center gap-2">
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search admins..."
              className="px-3 py-1 rounded border text-sm"
            />
            <button
              onClick={() => setShowCreateModal(true)}
              className="inline-flex items-center gap-2 px-3 py-1 text-sm rounded bg-purple-700 text-white"
            >
              <Plus size={14} /> Create
            </button>
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
              {filteredAdmins.map((a) => (
                <tr key={a.id} className="border-t">
                  <td className="py-2 px-2">
                    {editingId === a.id ? (
                      <input
                        value={editBuffer.name}
                        onChange={(e) => setEditBuffer((s) => ({ ...s, name: e.target.value }))}
                        className="px-2 py-1 rounded border text-sm w-48"
                      />
                    ) : (
                      <div className="font-medium">{a.name}</div>
                    )}
                  </td>

                  <td className="py-2 px-2">
                    {editingId === a.id ? (
                      <input
                        value={editBuffer.email}
                        onChange={(e) => setEditBuffer((s) => ({ ...s, email: e.target.value }))}
                        className="px-2 py-1 rounded border text-sm w-56"
                      />
                    ) : (
                      <div className="text-sm text-muted">{a.email}</div>
                    )}
                  </td>

                  <td className="py-2 px-2">
                    {editingId === a.id ? (
                      <select
                        value={editBuffer.role}
                        onChange={(e) => setEditBuffer((s) => ({ ...s, role: e.target.value }))}
                        className="px-2 py-1 rounded border text-sm"
                      >
                        <option value="editor">Editor</option>
                        <option value="moderator">Moderator</option>
                        <option value="superadmin">Superadmin</option>
                      </select>
                    ) : (
                      <div className="text-sm">{a.role}</div>
                    )}
                  </td>

                  <td className="py-2 px-2">
                    {editingId === a.id ? (
                      <div className="flex items-center gap-2">
                        <button onClick={() => saveEdit(a.id)} className="p-1 rounded bg-green-600 text-white"><Check size={14} /></button>
                        <button onClick={cancelEdit} className="p-1 rounded bg-gray-200"><X size={14} /></button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <button onClick={() => startEdit(a)} className="p-1 rounded bg-yellow-100"><Edit2 size={14} /></button>
                        <button onClick={() => handleDeleteAdmin(a.id)} className="p-1 rounded bg-red-100"><Trash2 size={14} /></button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}

              {filteredAdmins.length === 0 && (
                <tr>
                  <td colSpan="4" className="py-4 px-2 text-center text-sm text-gray-500">No admins found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  function StreamsPanel() {
    return (
      <div className="bg-white dark:bg-gray-800 rounded p-4 shadow">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-100">Active Streams</h3>
          <span className="text-sm text-muted">{streams.length} streams</span>
        </div>

        <div className="space-y-3">
          {streams.map((st) => (
            <div key={st.id} className="flex items-center justify-between bg-gray-50 dark:bg-gray-900/40 rounded p-3">
              <div>
                <div className="font-medium">{st.name}</div>
                <div className="text-xs text-muted">{st.status} • {st.listeners ?? 0} listeners</div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleStream(st.id)}
                  className={`px-3 py-1 rounded text-sm ${st.status === "live" ? "bg-red-500 text-white" : "bg-green-600 text-white"}`}
                >
                  {st.status === "live" ? "Stop" : "Start"}
                </button>
                <Link to={`/admin/streams/${st.id}`} className="text-sm text-purple-700">Manage</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  function QuickActions() {
    return (
      <div className="bg-white dark:bg-gray-800 rounded p-4 shadow">
        <h3 className="font-semibold mb-2 text-gray-800 dark:text-gray-100">Quick Actions</h3>
        <ul className="space-y-2 text-sm">
          <li><Link to="/admin/admins" className="text-purple-700">Manage Admins</Link></li>
          <li><Link to="/admin/oaps" className="text-purple-700">Manage OAPs</Link></li>
          <li><Link to="/admin/programs" className="text-purple-700">Manage Programs</Link></li>
          <li><Link to="/admin/schedules" className="text-purple-700">Edit Schedule</Link></li>
          <li><Link to="/admin/notifications" className="text-purple-700">Notifications</Link></li>
        </ul>
      </div>
    );
  }

  function RecentActivity() {
    return (
      <div className="bg-white dark:bg-gray-800 rounded p-4 shadow">
        <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-2">Recent Activity</h3>
        <ul className="space-y-2 text-sm">
          {activity.map((a) => (
            <li key={a.id} className="text-muted flex items-center justify-between">
              <span>{a.text}</span>
              <span className="text-xs text-gray-400">{a.time}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  // ---------- Create Admin modal component ----------
  function CreateAdminModal({ onClose, onCreate, loading }) {
    const [form, setForm] = useState({ name: "", email: "", password: "", role: "editor" });
    const [errors, setErrors] = useState({});

    function validate() {
      const e = {};
      if (!form.name.trim()) e.name = "Name is required";
      if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = "Enter a valid email";
      if (!form.password || form.password.length < 6) e.password = "Password min 6 chars";
      setErrors(e);
      return Object.keys(e).length === 0;
    }

    async function submit(e) {
      e.preventDefault();
      if (!validate()) return;
      await onCreate({ name: form.name.trim(), email: form.email.trim(), password: form.password, role: form.role });
    }

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4">
        <div className="bg-white dark:bg-gray-900 rounded-lg w-full max-w-md p-5 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold text-lg">Create Admin</h4>
            <button onClick={onClose} className="text-sm text-gray-500">Close</button>
          </div>

          <form onSubmit={submit} className="space-y-3">
            <div>
              <label className="text-sm">Name</label>
              <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-3 py-2 rounded border" />
              {errors.name && <div className="text-xs text-red-500 mt-1">{errors.name}</div>}
            </div>

            <div>
              <label className="text-sm">Email</label>
              <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full px-3 py-2 rounded border" />
              {errors.email && <div className="text-xs text-red-500 mt-1">{errors.email}</div>}
            </div>

            <div>
              <label className="text-sm">Password</label>
              <input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className="w-full px-3 py-2 rounded border" />
              {errors.password && <div className="text-xs text-red-500 mt-1">{errors.password}</div>}
            </div>

            <div>
              <label className="text-sm">Role</label>
              <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} className="w-full px-3 py-2 rounded border">
                <option value="editor">Editor</option>
                <option value="moderator">Moderator</option>
                <option value="superadmin">Superadmin</option>
              </select>
            </div>

            <div className="flex items-center justify-end gap-2">
              <button type="button" onClick={onClose} className="px-3 py-1 rounded border">Cancel</button>
              <button type="submit" disabled={loading} className="px-4 py-2 rounded bg-purple-700 text-white">
                {loading ? "Creating..." : "Create Admin"}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // ---------- Render ----------
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-purple-900 mb-1">Superadmin Overview</h1>
          <div className="text-sm text-gray-500">Manage admins, streams, programs and quick site actions.</div>
        </div>

        <div className="flex items-center gap-3">
          <Link to="/admin/settings" className="px-3 py-2 rounded border text-sm">Settings</Link>
          <button onClick={() => setShowCreateModal(true)} className="px-3 py-2 rounded bg-purple-700 text-white inline-flex items-center gap-2">
            <Plus size={14} /> New Admin
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard label="Total Admins" value={stats ? stats.admins : admins.length}>
          <Link to="/admin/admins" className="text-sm text-purple-700">View</Link>
        </StatCard>

        <StatCard label="Active Streams" value={stats ? stats.activeStreams : streams.filter(s => s.status === "live").length}>
          <Link to="/admin/streams" className="text-sm text-purple-700">Manage</Link>
        </StatCard>

        <StatCard label="Scheduled Programs" value={stats ? stats.scheduledPrograms : programs.length}>
          <Link to="/admin/programs" className="text-sm text-purple-700">Manage</Link>
        </StatCard>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <div className="md:col-span-2 space-y-4">
          <AdminsTable />
          <div className="bg-white dark:bg-gray-800 rounded p-4 shadow">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-100">Programs</h3>
              <Link to="/admin/programs" className="text-sm text-purple-700">Manage programs →</Link>
            </div>

            <div className="grid gap-2">
              {programs.slice(0,5).map((p) => (
                <div key={p.id} className="p-3 bg-gray-50 dark:bg-gray-900/40 rounded flex items-center justify-between">
                  <div>
                    <div className="font-medium">{p.title}</div>
                    <div className="text-xs text-muted">{p.host} • {p.time}</div>
                  </div>
                  <Link to={`/admin/programs/${p.id}`} className="text-sm text-purple-700">Edit</Link>
                </div>
              ))}
              {programs.length === 0 && <div className="text-sm text-muted">No programs found.</div>}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <StreamsPanel />
          <QuickActions />
          <RecentActivity />
        </div>
      </div>

      {/* Mini player */}
      <NowPlayingCard />

      {/* create modal */}
      {showCreateModal && (
        <CreateAdminModal
          onClose={() => setShowCreateModal(false)}
          onCreate={handleCreateAdmin}
          loading={creating}
        />
      )}
    </div>
  );
}



// // admin/src/pages/admin/AdminDashboard.jsx
// import React from "react";
// import { useAuth } from "../../context/AuthContext";

// export default function AdminDashboard() {
//   const { admin } = useAuth();

//   return (
//     <div className="space-y-4">
//       <h1 className="text-2xl font-bold text-purple-900">Welcome, {admin?.name || admin?.email}</h1>
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//         <div className="bg-white p-4 rounded shadow">Total Admins — (demo)</div>
//         <div className="bg-white p-4 rounded shadow">Active Streams — (demo)</div>
//         <div className="bg-white p-4 rounded shadow">Manage Programs — (demo)</div>
//       </div>
//     </div>
//   );
// }

