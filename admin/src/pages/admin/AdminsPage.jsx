// src/pages/admin/AdminsPage.jsx
import React, { useEffect, useState } from "react";
// import api from "../../api/axios";

export default function AdminsPage() {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(false);

  // create form
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [role, setRole] = useState("admin");
  const [submitting, setSubmitting] = useState(false);

  const fetchAdmins = async () => {
    setLoading(true);
    try {
      const res = await api.get("/admin"); // GET /api/admin
      setAdmins(res.data.admins || []);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch admins");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  const create = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await api.post("/admin/create", { email, password: pw, name, role });
      if (res.data?.ok) {
        setName(""); setEmail(""); setPw(""); setRole("admin");
        fetchAdmins();
      } else {
        alert(res.data?.error || "Failed");
      }
    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.error || "Create failed");
    } finally { setSubmitting(false); }
  };

  const remove = async (id) => {
    if (!confirm("Delete admin?")) return;
    try {
      await api.delete(`/admin/${id}`);
      fetchAdmins();
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  const changeRole = async (id, newRole) => {
    try {
      // simple endpoint: reuse createAdmin? you may need a dedicated update route on backend
      await api.post("/admin/create", { id, role: newRole }); // if backend supports update, else create endpoint must be different
      // If no update endpoint available, you'd implement e.g. PATCH /api/admin/:id on backend
      fetchAdmins();
    } catch (err) {
      console.error(err);
      alert("Role update failed");
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-purple-900 mb-4">Admins</h1>
      <div className="grid md:grid-cols-2 gap-6">
        <form onSubmit={create} className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold mb-2">Create Admin</h3>
          <input value={name} onChange={(e)=>setName(e.target.value)} placeholder="Full name" className="w-full mb-2 p-2 border rounded" />
          <input value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Email" type="email" required className="w-full mb-2 p-2 border rounded" />
          <input value={pw} onChange={(e)=>setPw(e.target.value)} placeholder="Password (min 8)" type="password" required className="w-full mb-2 p-2 border rounded" />
          <select value={role} onChange={(e)=>setRole(e.target.value)} className="w-full mb-3 p-2 border rounded">
            <option value="admin">Admin</option>
            <option value="editor">Editor</option>
            <option value="superadmin">Superadmin</option>
          </select>
          <button disabled={submitting} className="bg-purple-900 text-white py-2 px-4 rounded">{submitting ? "Creating..." : "Create"}</button>
        </form>

        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold mb-2">Existing Admins</h3>
          {loading ? <div>Loading...</div> : (
            <ul className="space-y-2">
              {admins.map(a => (
                <li key={a.id} className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold">{a.name ?? a.email}</div>
                    <div className="text-xs text-gray-500">{a.email} • {a.role}</div>
                  </div>

                  <div className="flex items-center gap-2">
                    <select value={a.role} onChange={(e)=>changeRole(a.id, e.target.value)} className="p-1 border rounded text-sm">
                      <option value="editor">Editor</option>
                      <option value="admin">Admin</option>
                      <option value="superadmin">Superadmin</option>
                    </select>
                    <button onClick={()=>remove(a.id)} className="text-red-600 text-sm">Delete</button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
