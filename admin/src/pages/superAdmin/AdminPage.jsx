// admin/src/pages/AdminPage.jsx
import React, { useEffect, useState } from "react";
import api from "../../api/api";
import { Trash2, Edit2, Plus } from "lucide-react";

export default function AdminPage() {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);

  // modal/form state
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null); // null = create
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "admin",
    avatar_url: "", // cloudinary/url string
  });
  const [avatarFile, setAvatarFile] = useState(null);
  const [preview, setPreview] = useState(null);

  // fetch admins
  useEffect(() => {
    loadAdmins();
  }, []);

  async function loadAdmins() {
    setLoading(true);
    try {
      const res = await api.get("/api/admin/admins");
      // server returns { admins: [...] }
      const list = Array.isArray(res.data?.admins) ? res.data.admins : res.data;
      setAdmins(list || []);
    } catch (err) {
      console.error("Failed to load admins:", err?.response?.data || err.message || err);
      alert("Failed to load admins. Check console.");
    } finally {
      setLoading(false);
    }
  }

  function openCreate() {
    setEditing(null);
    setForm({ name: "", email: "", password: "", role: "admin", avatar_url: "" });
    setAvatarFile(null);
    setPreview(null);
    setShowModal(true);
  }

  function openEdit(admin) {
    setEditing(admin);
    setForm({
      name: admin.name || "",
      email: admin.email || "",
      password: "", // leave blank — only send if user types a new password
      role: admin.role || "admin",
      avatar_url: admin.avatar_url || "",
    });
    setPreview(admin.avatar_url || null);
    setAvatarFile(null);
    setShowModal(true);
  }

  function handleField(e) {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  }

  function handleAvatarChange(e) {
    const f = e.target.files?.[0] ?? null;
    setAvatarFile(f);
    setPreview(f ? URL.createObjectURL(f) : null);
  }

  // helper: upload image file to upload endpoint and return url
  // async function uploadFile(file) {
  //   if (!file) return null;
  //   try {
  //     const fd = new FormData();
  //     fd.append("file", file);
  //     // try potential endpoints — update if your upload route differs
  //     // preferred: /api/upload
  //     const res = await api.post("/upload", fd, {
  //       headers: { "Content-Type": "multipart/form-data" },
  //     });
  //     // expected { url } or { url: '...' } or { secure_url } - adapt
  //     if (res.data?.url) return res.data.url;
  //     if (res.data?.secure_url) return res.data.secure_url;
  //     if (res.data?.data?.url) return res.data.data.url;
  //     // fallback: maybe returns { ok: true, url }
  //     return res.data?.url || null;
  //   } catch (err) {
  //     console.warn("uploadFile error, try alternate URL", err?.response?.data || err.message || err);
  //     // try alternate common endpoint (some projects expose admin upload path)
  //     try {
  //       const fd2 = new FormData();
  //       fd2.append("file", file);
  //       const alt = await api.post(
  //   "/api/admin/admins/upload-avatar",
  //   fd,
  //   { headers: { "Content-Type": "multipart/form-data" } }
  // );
  //       if (alt.data?.url) return alt.data.url;
  //       if (alt.data?.secure_url) return alt.data.secure_url;
  //       return alt.data?.url || null;
  //     } catch (err2) {
  //       console.error("Alternate upload failed", err2?.response?.data || err2.message || err2);
  //       throw new Error("Upload failed");
  //     }
  //   }
  // }

  // helper: upload image file to upload endpoint and return url
// async function uploadFile(file) {
//   if (!file) return null;

//   const fd = new FormData();
//   fd.append("file", file);

//   const res = await api.post(
//     "/api/admin/admins/upload-avatar",
//     fd,
//     { headers: { "Content-Type": "multipart/form-data" } }
//   );

//   // your upload controller returns:
//   // { ok: true, avatarUrl, publicId }
//   return res.data?.avatarUrl || null;
// }


async function uploadFile(file) {
  if (!file) return null;

  const fd = new FormData();
  fd.append("file", file);

  const res = await api.post(
    "/api/admin/admins/upload-avatar",
    fd,
    { headers: { "Content-Type": "multipart/form-data" } }
  );

  return res.data.avatarUrl;
}



  async function handleSave(e) {
    e && e.preventDefault();
    setBusy(true);

    try {
      // basic validation
      if (!form.name.trim() || !form.email.trim()) {
        alert("Name and email are required");
        setBusy(false);
        return;
      }
      // upload avatar if user selected a new file
      let avatar_url = form.avatar_url || "";
      if (avatarFile) {
        try {
          avatar_url = await uploadFile(avatarFile);
        } catch (err) {
          alert("Avatar upload failed. See console.");
          setBusy(false);
          return;
        }
      }

      if (editing) {
        // update admin
        const payload = {
          name: form.name.trim(),
          email: form.email.trim(),
          role: form.role,
        };
        // only send password if provided
        if (form.password && form.password.length >= 6) payload.password = form.password;
        // send avatar_url (server should update)
        if (avatar_url) payload.avatar_url = avatar_url;

        const res = await api.put(`/api/admin/admins/${editing.id}`, payload);
        

        // server may return updated admin or ok
        const updated = res.data?.admin ?? res.data;
        // optimistically update local list
        setAdmins((list) => list.map((a) => (a.id === editing.id ? { ...a, ...(updated || payload) } : a)));
        setShowModal(false);
      } else {
        // create admin
        // require password on create
        if (!form.password || form.password.length < 6) {
          alert("Password required (min 6 chars) for new admin");
          setBusy(false);
          return;
        }

        const payload = {
          name: form.name.trim(),
          email: form.email.trim(),
          password: form.password,
          role: form.role,
        };
        if (avatar_url) payload.avatar_url = avatar_url;

        // const res = await api.post("/api/admin/admins:id", payload);
        const res = await api.post("/api/admin/admins", payload);
        // server returns created admin
        const created = res.data?.admin ?? res.data;
        // append
        if (created && created.id) {
          setAdmins((list) => [created, ...list]);
        } else {
          // fallback: reload list
          await loadAdmins();
        }
        setShowModal(false);
      }
    } catch (err) {
      console.error("save admin err", err?.response?.data || err.message || err);
      const msg = err?.response?.data?.error || err?.response?.data?.message || err.message || "Save failed";
      alert(msg);
    } finally {
      setBusy(false);
    }
  }

  async function handleDelete(id) {
    if (!confirm("Delete this admin? This action is irreversible.")) return;
    try {
      // optimistically remove
      const prev = admins;
      setAdmins((s) => s.filter((a) => a.id !== id));
      await api.delete(`/api/admin/admins/${id}`);
      // optionally reload to ensure consistency
      // await loadAdmins();
    } catch (err) {
      console.error("delete admin err", err?.response?.data || err.message || err);
      alert("Delete failed");
      // rollback
      await loadAdmins();
    }
  }

  // small helper UI components
  function Row({ a }) {
    return (
      <div className="bg-white p-3 rounded shadow flex items-center gap-3">
        <div className="w-14 h-14 rounded overflow-hidden bg-gray-100 flex items-center justify-center">
          {a.avatar_url ? (
            <img src={a.avatar_url} alt={a.name} className="w-full h-full object-cover" />
          ) : (
            <div className="text-xs text-gray-400">{(a.name || a.email || "—").slice(0,2).toUpperCase()}</div>
          )}
        </div>

        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">{a.name || "—"}</div>
              <div className="text-xs text-gray-500">{a.email}</div>
            </div>
            <div className="text-xs text-gray-400">{a.role}</div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button title="Edit" onClick={() => openEdit(a)} className="p-2 rounded hover:bg-gray-100">
            <Edit2 size={16} />
          </button>
          <button title="Delete" onClick={() => handleDelete(a.id)} className="p-2 rounded hover:bg-gray-100 text-red-600">
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-purple-900">Admins</h1>
          <div className="text-sm text-gray-500">Create, edit and remove admin users</div>
        </div>

        <div>
          <button onClick={openCreate} className="inline-flex items-center gap-2 px-4 py-2 bg-purple-700 text-white rounded">
            <Plus size={16} /> New Admin
          </button>
        </div>
      </div>

      <div>
        {loading ? (
          <div className="text-gray-500">Loading admins...</div>
        ) : admins.length === 0 ? (
          <div className="text-gray-500">No admins found.</div>
        ) : (
          <div className="grid gap-3">
            {admins.map((a) => (
              <Row key={a.id} a={a} />
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4">
          <form onSubmit={handleSave} className="bg-white w-full max-w-xl p-6 rounded shadow-lg space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">{editing ? "Edit Admin" : "Create Admin"}</h3>
              <button type="button" onClick={() => setShowModal(false)} className="text-sm text-gray-500">Close</button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="text-sm block mb-1">Name</label>
                <input name="name" value={form.name} onChange={handleField} className="w-full border p-2 rounded" placeholder="Full name" required />
              </div>

              <div>
                <label className="text-sm block mb-1">Email</label>
                <input name="email" value={form.email} onChange={handleField} type="email" className="w-full border p-2 rounded" placeholder="you@domain.com" required />
              </div>

              <div>
                <label className="text-sm block mb-1">{editing ? "New password (optional)" : "Password"}</label>
                <input name="password" value={form.password} onChange={handleField} type="password" className="w-full border p-2 rounded" placeholder={editing ? "Leave blank to keep current" : "Min 6 characters"} minLength={editing ? 0 : 6} />
              </div>

              <div>
                <label className="text-sm block mb-1">Role</label>
                <select name="role" value={form.role} onChange={handleField} className="w-full border p-2 rounded">
                  <option value="superadmin">superadmin</option>
                  <option value="admin">admin</option>
                  <option value="editor">editor</option>
                  <option value="moderator">moderator</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="text-sm block mb-1">Avatar</label>
                <div className="flex items-center gap-3">
                  <input type="file" accept="image/*" onChange={handleAvatarChange} />
                  {preview && <img src={preview} alt="preview" className="w-16 h-16 object-cover rounded" />}
                  {!preview && form.avatar_url && <img src={form.avatar_url} alt="avatar" className="w-16 h-16 object-cover rounded" />}
                </div>
                <div className="text-xs text-gray-400 mt-1">Tip: choose an image to upload. It will be uploaded first, then the returned URL is sent to the server.</div>
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 border rounded">Cancel</button>
              <button type="submit" disabled={busy} className="px-4 py-2 bg-purple-700 text-white rounded">
                {busy ? (editing ? "Updating..." : "Creating...") : (editing ? "Update Admin" : "Create Admin")}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
