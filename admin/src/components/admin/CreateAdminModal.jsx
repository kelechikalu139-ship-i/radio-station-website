// src/components/admin/CreateAdminModal.jsx
import React, { useState } from "react";

export default function CreateAdminModal({ onClose, onCreate, loading = false }) {
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "editor" });
  const [errors, setErrors] = useState({});

  function validate() {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Valid email required";
    if (!form.password || form.password.length < 6) e.password = "Password min 6 chars";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function submit(e) {
    e.preventDefault();
    if (!validate()) return;
    await onCreate({ ...form });
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
