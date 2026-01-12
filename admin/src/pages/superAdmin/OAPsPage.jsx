import React, { useEffect, useState, useRef } from "react";
// import OAPsAp, { OapApi } from "../../api/api"; 
import api from "../../api/api";


// Required: Tailwind CSS in your project.
// Usage: Place this component under admin/src/pages/OAPsPage.jsx and import into your admin routes.

export default function OAPsPage() {
  const [oaps, setOaps] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");

  // modal state
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);

  // form
  const [form, setForm] = useState({ name: "", bio: "", twitter: "", instagram: "", facebook: "", imageFile: null });
  const [preview, setPreview] = useState(null);
  const fileRef = useRef(null);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(false);

  useEffect(() => {
    loadOAPs();
  }, []);

  async function loadOAPs() {
    setLoading(true);
    try {
      const res = await api.get("/api/oap/oaps"); 
      // accept either { oaps: [...] } or array directly
      const list = Array.isArray(res.data?.oaps) ? res.data.oaps : res.data;
      setOaps(list || []);
    } catch (err) {
      console.warn("Failed to fetch OAPs:", err?.message || err);
      setOaps([]);
    } finally {
      setLoading(false);
    }
  }

  function openCreate() {
    setEditing(null);
    setForm({ name: "", bio: "", twitter: "", instagram: "", facebook: "", imageFile: null });
    setPreview(null);
    setShowModal(true);
  }

  function openEdit(oap) {
    setEditing(oap);
    setForm({
      name: oap.name || "",
      bio: oap.bio || "",
      twitter: oap.twitter || "",
      instagram: oap.instagram || "",
      facebook: oap.facebook || "",
      imageFile: null,
    });
    setPreview(oap.image_url || null);
    setShowModal(true);
  }

  function handleFile(e) {
    const file = e.target.files?.[0] || null;
    setForm((s) => ({ ...s, imageFile: file }));
    if (file) setPreview(URL.createObjectURL(file));
    else setPreview(null);
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  }

  async function handleSave(e) {
    e.preventDefault();
    if (!form.name.trim()) return alert("Name is required");
    setSaving(true);
    try {
      const fd = new FormData();
      fd.append("name", form.name.trim());
      fd.append("bio", form.bio || "");
      fd.append("twitter", form.twitter || "");
      fd.append("instagram", form.instagram || "");
      fd.append("facebook", form.facebook || "");
      if (form.imageFile) fd.append("avatar", form.imageFile);

      if (editing) {
        // update
        const res = await api.put(`/api/oap/oaps/${editing.id}`, fd, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        const updated = res.data?.oap ?? res.data;
        setOaps((s) => s.map((o) => (o.id === updated.id ? updated : o)));
      } else {
        const res = await api.post(`/api/oap/oaps`, fd, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        const created = res.data?.oap ?? res.data;
        // prepend
        setOaps((s) => [created, ...s]);
      }

      setShowModal(false);
    } catch (err) {
      console.error("save oap err", err);
      alert("Failed to save. Check console.");
    } finally {
      setSaving(false);
    }
  }

  function filtered() {
    if (!query.trim()) return oaps;
    const q = query.toLowerCase();
    return oaps.filter((o) => (o.name || "").toLowerCase().includes(q) || (o.bio || "").toLowerCase().includes(q));
  }

  async function confirmDeleteOAP(id) {
    setDeletingId(id);
    setConfirmDelete(true);
  }

  async function doDelete() {
    const id = deletingId;
    setConfirmDelete(false);
    setDeletingId(null);
    try {
      await OapApi.delete(`/api/admin/oaps/${id}`);
      setOaps((s) => s.filter((x) => x.id !== id));
    } catch (err) {
      console.warn("delete failed", err?.message || err);
      alert("Delete failed");
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-purple-900">OAPs</h1>
          <p className="text-sm text-gray-500">Manage on-air personalities — upload photos, bios & links.</p>
        </div>

        <div className="flex items-center gap-3">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search OAPs by name or bio..."
            className="px-3 py-2 border rounded w-64"
          />
          <button onClick={openCreate} className="px-4 py-2 bg-purple-700 text-white rounded">Add OAP</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {loading && <div className="col-span-full p-6 text-center">Loading...</div>}

        {!loading && filtered().length === 0 && (
          <div className="col-span-full p-6 text-center text-gray-500">No OAPs found.</div>
        )}

        {!loading && filtered().map((o) => (
          <div key={o.id} className="bg-white rounded shadow p-4 flex flex-col">
            <div className="w-full h-40 bg-gray-100 rounded overflow-hidden flex items-center justify-center">
              {o.image_url ? (
                <img src={o.image_url} alt={o.name} className="object-cover w-full h-full" />
              ) : (
                <div className="text-gray-400">No image</div>
              )}
            </div>

            <div className="mt-3 flex-1">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="font-semibold">{o.name}</div>
                  <div className="text-xs text-gray-500">{o.role || "OAP"}</div>
                </div>
                <div className="text-sm text-gray-400">{new Date(o.created_at || Date.now()).toLocaleDateString()}</div>
              </div>

              <p className="mt-2 text-sm text-gray-600 line-clamp-3">{o.bio}</p>

              <div className="mt-3 flex items-center gap-2">
                {o.twitter && (
                  <a href={o.twitter} target="_blank" rel="noreferrer" className="text-xs underline">Twitter</a>
                )}
                {o.instagram && (
                  <a href={o.instagram} target="_blank" rel="noreferrer" className="text-xs underline">Instagram</a>
                )}
                {o.facebook && (
                  <a href={o.facebook} target="_blank" rel="noreferrer" className="text-xs underline">Facebook</a>
                )}
              </div>
            </div>

            <div className="mt-4 flex items-center gap-2">
              <button onClick={() => openEdit(o)} className="flex-1 px-3 py-2 bg-yellow-100 rounded">Edit</button>
              <button onClick={() => confirmDeleteOAP(o.id)} className="flex-1 px-3 py-2 bg-red-100 rounded">Delete</button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <form onSubmit={handleSave} className="bg-white rounded w-full max-w-2xl p-6"> 
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">{editing ? "Edit OAP" : "Create OAP"}</h3>
              <button type="button" onClick={() => setShowModal(false)} className="text-sm text-gray-500">Close</button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-1">
                <div className="w-full h-40 bg-gray-50 rounded flex items-center justify-center overflow-hidden">
                  {preview ? (
                    <img src={preview} alt="preview" className="object-cover w-full h-full" />
                  ) : (
                    <div className="text-gray-400 text-sm">No preview</div>
                  )}
                </div>

                <div className="mt-3">
                  <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} />
                  <div className="text-xs text-gray-500 mt-1">Recommended: 800x800px, JPG/PNG</div>
                </div>
              </div>

              <div className="md:col-span-2 space-y-3">
                <div>
                  <label className="block text-sm text-gray-600">Name</label>
                  <input name="name" value={form.name} onChange={handleChange} className="w-full px-3 py-2 border rounded" required />
                </div>

                <div>
                  <label className="block text-sm text-gray-600">Short Bio</label>
                  <textarea name="bio" value={form.bio} onChange={handleChange} className="w-full px-3 py-2 border rounded h-24" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                  <input name="twitter" value={form.twitter} onChange={handleChange} placeholder="https://twitter.com/..." className="px-3 py-2 border rounded" />
                  <input name="instagram" value={form.instagram} onChange={handleChange} placeholder="https://instagram.com/..." className="px-3 py-2 border rounded" />
                  <input name="facebook" value={form.facebook} onChange={handleChange} placeholder="https://facebook.com/..." className="px-3 py-2 border rounded" />
                </div>

                <div className="flex items-center gap-2 justify-end">
                  <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 border rounded">Cancel</button>
                  <button type="submit" disabled={saving} className="px-4 py-2 bg-purple-700 text-white rounded">{saving ? "Saving..." : "Save OAP"}</button>
                </div>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* delete confirm */}
      {confirmDelete && (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/30 p-4">
          <div className="bg-white p-6 rounded shadow w-full max-w-md">
            <h4 className="font-semibold">Are you sure?</h4>
            <p className="text-sm text-gray-600 mt-2">This will permanently delete the OAP. This action cannot be undone.</p>
            <div className="mt-4 flex items-center gap-2 justify-end">
              <button onClick={() => setConfirmDelete(false)} className="px-3 py-2 border rounded">Cancel</button>
              <button onClick={doDelete} className="px-3 py-2 bg-red-600 text-white rounded">Yes, delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
