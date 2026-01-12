// admin/src/pages/SponsorsPage.jsx
import React, { useEffect, useState } from "react";
import api from "../../api/api";

export default function SponsorsPage() {
  const [sponsors, setSponsors] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({ name: "", description: "", website: "", display_order: 0, active: true });
  const [logoFile, setLogoFile] = useState(null);
  const [previewLogo, setPreviewLogo] = useState(null);

  useEffect(()=>{ load(); }, []);

  async function load() {
    setLoading(true);
    try {
      const res = await api.get("/api/sponsor/sponsors");
      setSponsors(res.data.sponsors || []);
    } catch (err) {
      console.warn(err);
    } finally {
      setLoading(false);
    }
  }

  function openCreate() {
    setEditing(null);
    setForm({ name: "", description: "", website: "", display_order: 0, active: true });
    setLogoFile(null); setPreviewLogo(null);
    setShowModal(true);
  }

  function openEdit(s) {
    setEditing(s);
    setForm({ name: s.name, description: s.description||"", website: s.website||"", display_order: s.display_order||0, active: !!s.active });
    setPreviewLogo(s.logo_url || null);
    setLogoFile(null);
    setShowModal(true);
  }

  async function handleSave(e) {
    e.preventDefault();
    if (!form.name) return alert("Name required");
    setSaving(true);
    try {
      const fd = new FormData();
      fd.append("name", form.name);
      fd.append("description", form.description || "");
      fd.append("website", form.website || "");
      fd.append("display_order", form.display_order || 0);
      fd.append("active", form.active ? 1 : 0);
      if (logoFile) fd.append("logo", logoFile);

      if (editing) {
        const res = await api.put(`/api/sponsor/sponsors/${editing.id}`, fd);
        setSponsors(s => s.map(x => x.id === editing.id ? res.data.sponsor : x));
      } else {
        const res = await api.post("/api/sponsor/sponsors", fd);
        setSponsors(s => [res.data.sponsor, ...s]);
      }
      setShowModal(false);
    } catch (err) {
      console.warn(err);
      alert("Save failed");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id) {
    if (!confirm("Delete sponsor?")) return;
    try {
      await api.delete(`/api/sponsor/sponsors/${id}`);
      setSponsors(s => s.filter(x => x.id !== id));
    } catch (err) {
      console.warn(err);
      alert("Delete failed");
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-bold">Sponsors</h1><div className="text-sm text-gray-500">Manage sponsor logos and links</div></div>
        <div><button className="px-4 py-2 bg-purple-700 text-white rounded" onClick={openCreate}>Add Sponsor</button></div>
      </div>

      {loading ? <div>Loading...</div> : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {sponsors.map(s => (
            <div key={s.id} className="bg-white rounded shadow p-4 flex flex-col items-start gap-2">
              <div className="w-full flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-20 h-20 bg-gray-100 rounded overflow-hidden">
                    {s.logo_url ? <img src={s.logo_url} alt={s.name} className="w-full h-full object-cover" /> : <div className="text-xs text-gray-400 flex items-center justify-center h-full">No logo</div>}
                  </div>
                  <div>
                    <div className="font-semibold">{s.name}</div>
                    <div className="text-xs text-gray-500">{s.website}</div>
                  </div>
                </div>
                <div className="text-xs text-gray-400">{s.active ? "Active" : "Inactive"}</div>
              </div>
              <p className="text-sm text-gray-600">{s.description}</p>
              <div className="mt-2 flex gap-2">
                <button className="px-3 py-1 bg-yellow-100 rounded" onClick={()=>openEdit(s)}>Edit</button>
                <button className="px-3 py-1 bg-red-100 rounded" onClick={()=>handleDelete(s.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4">
          <form onSubmit={handleSave} className="bg-white w-full max-w-2xl p-6 rounded shadow-lg space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">{editing ? "Edit Sponsor" : "Create Sponsor"}</h3>
              <button type="button" className="text-sm text-gray-500" onClick={()=>setShowModal(false)}>Close</button>
            </div>

            <input value={form.name} onChange={(e)=>setForm({...form, name: e.target.value})} required placeholder="Sponsor name" className="w-full p-2 border rounded" />
            <input value={form.website} onChange={(e)=>setForm({...form, website: e.target.value})} placeholder="Website" className="w-full p-2 border rounded" />
            <textarea value={form.description} onChange={(e)=>setForm({...form, description: e.target.value})} placeholder="Description" className="w-full p-2 border rounded" rows={3} />
            <div className="flex gap-2 items-center">
              <input type="file" accept="image/*" onChange={(e)=>{ setLogoFile(e.target.files[0]||null); setPreviewLogo(e.target.files[0]? URL.createObjectURL(e.target.files[0]):null); }} />
              {previewLogo && <img src={previewLogo} alt="logo" className="w-16 h-16 object-cover rounded" />}
            </div>

            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2"><input type="checkbox" checked={!!form.active} onChange={(e)=>setForm({...form, active: e.target.checked})} /> Active</label>
              <label>Order <input type="number" value={form.display_order} onChange={(e)=>setForm({...form, display_order: Number(e.target.value)})} className="w-20 p-1 border rounded" /></label>
            </div>

            <div className="flex justify-end gap-2">
              <button type="button" className="px-4 py-2 border rounded" onClick={()=>setShowModal(false)}>Cancel</button>
              <button type="submit" disabled={saving} className="px-4 py-2 bg-purple-700 text-white rounded">{saving ? "Saving..." : (editing ? "Update" : "Save")}</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
