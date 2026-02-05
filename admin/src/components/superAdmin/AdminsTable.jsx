// src/components/superAdmin/AdminsTable.jsx
import { Play, Rewind, SkipForward } from "lucide-react";
import React, { useMemo, useState, useEffect } from "react";

// Improved Admins table (defensive version)
// Props:
// - admins: array of admin objects { id, name, email, role, avatarUrl?, createdAt? }
// - onEdit(admin)
// - onDelete(adminId)
// - canEdit (bool) - optional
// - canDelete (bool) - optional
// - loading (bool) - optional (shows placeholder row)

export default function AdminsTable({
  admins = [],
  onEdit = () => {},
  onDelete = () => {},
  canEdit = true,
  canDelete = true,
  loading = false,
}) {
  const [query, setQuery] = useState("");
  const [sortKey, setSortKey] = useState("name");
  const [sortDir, setSortDir] = useState("asc");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);

  // Modal state
  const [editingAdmin, setEditingAdmin] = useState(null);
  const [deletingAdmin, setDeletingAdmin] = useState(null);

  // Local editable form state for editing modal
  const [form, setForm] = useState({ name: "", email: "", role: "" });

  useEffect(() => {
    if (editingAdmin) {
      setForm({
        name: editingAdmin.name ?? "",
        email: editingAdmin.email ?? "",
        role: editingAdmin.role ?? "",
      });
    }
  }, [editingAdmin]);

  // Filter + sort
  const filtered = useMemo(() => {
    const q = String(query || "").trim().toLowerCase();
    let list = Array.isArray(admins) ? admins.slice() : [];
    if (q) {
      list = list.filter((a) =>
        (String(a?.name || "")).toLowerCase().includes(q) ||
        (String(a?.email || "")).toLowerCase().includes(q) ||
        (String(a?.role || "")).toLowerCase().includes(q)
      );
    }
    list.sort((a, b) => {
      const va = (String(a?.[sortKey] ?? "")).toLowerCase();
      const vb = (String(b?.[sortKey] ?? "")).toLowerCase();
      if (va === vb) return 0;
      const res = va > vb ? 1 : -1;
      return sortDir === "asc" ? res : -res;
    });
    return list;
  }, [admins, query, sortKey, sortDir]);

  // Pagination
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [totalPages]);
  const pageItems = filtered.slice((page - 1) * pageSize, page * pageSize);

  // Handlers
  const startEdit = (admin) => setEditingAdmin(admin);
  const confirmEdit = () => {
    if (!String(form.name || "").trim() || !String(form.email || "").trim())
      return alert("Name and email are required");
    const updated = { ...editingAdmin, ...form };
    onEdit(updated);
    setEditingAdmin(null);
  };

  const startDelete = (admin) => setDeletingAdmin(admin);
  const confirmDelete = () => {
    if (!deletingAdmin) return;
    onDelete(deletingAdmin.id);
    setDeletingAdmin(null);
  };

  const clearFilters = () => {
    setQuery("");
    setSortKey("name");
    setSortDir("asc");
  };

  // Small presentational helpers
  const initials = (name) => {
    // Defensive: handle null/undefined and extra whitespace
    const n = String(name ?? "").trim();
    if (!n) return "";
    return n
      .split(/\s+/)
      .map((s) => (s && s[0]) || "")
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  const roleBadge = (role = "") => {
    const map = {
      superadmin: "bg-purple-100 text-purple-800",
      admin: "bg-green-100 text-green-800",
      editor: "bg-yellow-100 text-yellow-800",
      viewer: "bg-gray-100 text-gray-700",
    };
    return map[String(role || "").toLowerCase()] || "bg-gray-100 text-gray-700";
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded p-4 shadow">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-3">
        <div>
          <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-100">Admins</h3>
          <p className="text-xs text-gray-500">Manage admin accounts — edit details or remove access.</p>
        </div>

        <div className="flex items-center gap-2">
          <a href="/admin/admins/create" className="inline-flex items-center gap-2 text-sm font-medium text-purple-700 hover:underline">Create admin →</a>

          <div className="flex items-center gap-2">
            <input
              placeholder="Search name, email or role"
              value={query}
              onChange={(e) => { setQuery(e.target.value); setPage(1); }}
              className="border rounded px-3 py-1 text-sm w-56 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-100"
              aria-label="Search admins"
            />

            <div className="flex items-center gap-1">
              <select value={sortKey} onChange={(e) => setSortKey(e.target.value)} className="text-sm rounded border px-2 py-1 bg-white dark:bg-gray-700">
                <option value="name">Sort: Name</option>
                <option value="email">Sort: Email</option>
                <option value="role">Sort: Role</option>
              </select>
              <button onClick={() => setSortDir(s => s === "asc" ? "desc" : "asc")} className="text-sm rounded border px-2 py-1">{sortDir === 'asc' ? '↑' : '↓'}</button>
            </div>

            <button onClick={clearFilters} className="text-sm px-2 py-1 rounded border">Reset</button>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead>
            <tr className="text-xs text-gray-500">
              <th className="py-2 px-2">User</th>
              <th className="py-2 px-2">Email</th>
              <th className="py-2 px-2">Role</th>
              <th className="py-2 px-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="4" className="py-6 px-2 text-center text-sm text-gray-500">Loading admins…</td>
              </tr>
            ) : pageItems.length === 0 ? (
              <tr>
                <td colSpan="4" className="py-6 px-2 text-center text-sm text-gray-500">No admins found</td>
              </tr>
            ) : (
              pageItems.map((a, idx) => (
                <tr key={a?.id ?? a?._id ?? idx} className="border-t hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="py-3 px-2 flex items-center gap-3">
                    <div className="flex items-center gap-3">
                      {a?.avatar_url ? (  
                        <img src={a.avatar_url} alt={a?.name ?? "avatar"} className="w-9 h-9 rounded-full object-cover" />
                      ) : (
                        <div className="w-9 h-9 rounded-full flex items-center justify-center bg-gray-100 text-gray-700">
                          {initials(a?.name)}
                        </div>
                      )}
                      <div>
                        <div className="font-medium text-gray-800 dark:text-gray-100">{a?.name ?? "—"}</div>
                        <div className="text-xs text-gray-500">ID: {String(a?.id ?? a?._id ?? "—")}</div>
                      </div>
                    </div>
                  </td>

                  <td className="py-3 px-2">
                    <div className="text-sm text-gray-700 dark:text-gray-200">{a?.email ?? "—"}</div>
                    <div className="text-xs text-gray-400">{a?.createdAt ? new Date(a.createdAt).toLocaleDateString() : ''}</div>
                  </td>

                  <td className="py-3 px-2">
                    <span className={`inline-block px-2 py-1 text-xs rounded-full ${roleBadge(a?.role)}`}>{a?.role ?? "—"}</span>
                  </td>

                  <td className="py-3 px-2">
                    <div className="flex items-center gap-2">
                      {canEdit ? (
                        <button onClick={() => startEdit(a)} className="text-sm px-3 py-1 rounded bg-yellow-50 border hover:bg-yellow-100">Edit</button>
                      ) : (
                        <span className="text-xs text-gray-400">—</span>
                      )}

                      {canDelete ? (
                        <button onClick={() => startDelete(a)} className="text-sm px-3 py-1 rounded bg-red-50 border hover:bg-red-100">Delete</button>
                      ) : (
                        <span className="text-xs text-gray-400">—</span>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination controls */}
      <div className="mt-4 flex items-center justify-between">
        <div className="text-sm text-gray-500">Showing <strong>{pageItems.length ? ((page - 1) * pageSize + 1) : 0}</strong> - <strong>{pageItems.length ? Math.min(page * pageSize, filtered.length) : 0}</strong> of <strong>{filtered.length}</strong></div>

        <div className="flex items-center gap-2">
          <select value={pageSize} onChange={(e) => { setPageSize(Number(e.target.value)); setPage(1); }} className="text-sm rounded border px-2 py-1 bg-white dark:bg-gray-700">
            <option value={6}>6 / page</option>
            <option value={10}>10 / page</option>
            <option value={20}>20 / page</option>
          </select>

          <div className="flex items-center gap-1">
            <button onClick={() => setPage(1)} disabled={page === 1} className="px-2 py-1 rounded border text-sm"><SkipForward/></button>
            <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="px-2 py-1 rounded border text-sm"><Play/></button>
            <div className="px-3 text-sm">{page} / {totalPages}</div>
            <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="px-2 py-1 rounded border text-sm">▶</button>
            <button onClick={() => setPage(totalPages)} disabled={page === totalPages} className="px-2 py-1 rounded border text-sm">⏭</button>
          </div>
        </div>
      </div>

      {/* Edit modal */}
      {editingAdmin && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40" onClick={() => setEditingAdmin(null)} />
          <div className="relative max-w-lg w-full bg-white dark:bg-gray-800 rounded p-4 shadow-lg">
            <h4 className="font-semibold mb-2 text-gray-800 dark:text-gray-100">Edit admin</h4>
            <div className="space-y-2">
              <label className="block text-xs text-gray-600">Name</label>
              <input value={form.name} onChange={(e) => setForm(f => ({ ...f, name: e.target.value }))} className="w-full border rounded px-3 py-2 text-sm bg-white dark:bg-gray-700" />

              <label className="block text-xs text-gray-600">Email</label>
              <input value={form.email} onChange={(e) => setForm(f => ({ ...f, email: e.target.value }))} className="w-full border rounded px-3 py-2 text-sm bg-white dark:bg-gray-700" />

              <label className="block text-xs text-gray-600">Role</label>
              <select value={form.role} onChange={(e) => setForm(f => ({ ...f, role: e.target.value }))} className="w-full border rounded px-3 py-2 text-sm bg-white dark:bg-gray-700">
                <option value="admin">admin</option>
                <option value="superadmin">superadmin</option>
                <option value="editor">editor</option>
                <option value="viewer">viewer</option>
              </select>
            </div>

            <div className="mt-4 flex justify-end gap-2">
              <button onClick={() => setEditingAdmin(null)} className="px-3 py-1 rounded border">Cancel</button>
              <button onClick={confirmEdit} className="px-3 py-1 rounded bg-purple-600 text-white">Save</button>
            </div>
          </div>
        </div>
      )}

      {/* Delete confirmation modal */}
      {deletingAdmin && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40" onClick={() => setDeletingAdmin(null)} />
          <div className="relative max-w-md w-full bg-white dark:bg-gray-800 rounded p-4 shadow-lg">
            <h4 className="font-semibold mb-2 text-gray-800 dark:text-gray-100">Confirm delete</h4>
            <p className="text-sm text-gray-600">Are you sure you want to permanently remove <strong>{deletingAdmin?.name ?? "this admin"}</strong>? This action cannot be undone.</p>

            <div className="mt-4 flex justify-end gap-2">
              <button onClick={() => setDeletingAdmin(null)} className="px-3 py-1 rounded border">Cancel</button>
              <button onClick={confirmDelete} className="px-3 py-1 rounded bg-red-600 text-white">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
