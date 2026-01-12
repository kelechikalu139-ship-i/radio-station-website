// admin/src/pages/EpisodesPage.jsx
import React, { useEffect, useState } from "react";
import api from "../../api/api";

export default function EpisodesPage() {
  const [episodes, setEpisodes] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({ program_id: "", title: "", description: "" });
  const [audioFile, setAudioFile] = useState(null);
  const [coverFile, setCoverFile] = useState(null);
  const [previewCover, setPreviewCover] = useState(null);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    setLoading(true);
    try {
      const [epsRes, progRes] = await Promise.all([api.get("/api/episode/episodes"), api.get("/api/program/programs")]);
      setEpisodes(epsRes.data.episodes || []);
      setPrograms(progRes.data.programs || []);
    } catch (err) {
      console.warn(err);
    } finally {
      setLoading(false);
    }
  }

  function openCreate() {
    setEditing(null);
    setForm({ program_id: "", title: "", description: "" });
    setAudioFile(null);
    setCoverFile(null);
    setPreviewCover(null);
    setShowModal(true);
  }

  function openEdit(e) {
    setEditing(e);
    setForm({ program_id: e.program_id||"", title: e.title||"", description: e.description||"" });
    setPreviewCover(e.cover_url || null);
    setAudioFile(null);
    setCoverFile(null);
    setShowModal(true);
  }

  async function handleSave(e) {
    e.preventDefault();
    if (!form.title) return alert("Title required");
    setSaving(true);
    try {
      const fd = new FormData();
      fd.append("title", form.title);
      fd.append("description", form.description || "");
      fd.append("program_id", form.program_id || "");

      if (audioFile) fd.append("audio", audioFile);
      if (coverFile) fd.append("cover", coverFile);

      if (editing) {
        const res = await api.put(`/api/episode/episodes/${editing.id}`, fd);
        setEpisodes((s) => s.map(x => x.id === editing.id ? res.data.episode : x));
      } else {
        const res = await api.post("/api/episode/episodes", fd);
        setEpisodes((s) => [res.data.episode, ...s]);
      }
      setShowModal(false);
    } catch (err) {
      console.error(err);
      alert("Save failed");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id) {
    if (!confirm("Delete episode?")) return;
    try {
      await api.delete(`/api/episode/episodes/${id}`);
      setEpisodes((s) => s.filter(x => x.id !== id));
    } catch (err) {
      console.warn(err);
      alert("Delete failed");
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-bold">Episodes</h1><p className="text-sm text-gray-500">Upload audio episodes and cover art</p></div>
        <div><button className="px-4 py-2 bg-purple-700 text-white rounded" onClick={openCreate}>New Episode</button></div>
      </div>

      {loading ? <div>Loading...</div> : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {episodes.map(ep => (
            <div key={ep.id} className="bg-white rounded shadow p-4 flex gap-4">
              <div className="w-28 h-28 bg-gray-100 rounded overflow-hidden">
                {ep.cover_url ? <img src={ep.cover_url} className="w-full h-full object-cover" alt={ep.title} /> : <div className="flex items-center justify-center text-sm text-gray-400 h-full">No cover</div>}
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="font-semibold">{ep.title}</div>
                    <div className="text-xs text-gray-500">{ep.program_title || "Program — N/A"}</div>
                  </div>
                  <div className="text-xs text-gray-400">{new Date(ep.created_at).toLocaleDateString()}</div>
                </div>
                <p className="text-sm text-gray-600 mt-2 line-clamp-3">{ep.description}</p>
                <div className="mt-3 flex gap-2">
                  {ep.audio_url && <audio controls src={ep.audio_url} className="w-44" />}
                </div>
                <div className="mt-3 flex gap-2">
                  <button className="px-3 py-1 bg-yellow-100 rounded" onClick={()=>openEdit(ep)}>Edit</button>
                  <button className="px-3 py-1 bg-red-100 rounded" onClick={()=>handleDelete(ep.id)}>Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4">
          <form onSubmit={handleSave} className="bg-white w-full max-w-2xl p-6 rounded shadow-lg space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">{editing ? "Edit Episode" : "Create Episode"}</h3>
              <button type="button" className="text-sm text-gray-500" onClick={()=>setShowModal(false)}>Close</button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <select name="program_id" value={form.program_id} onChange={(e)=>setForm({...form, program_id: e.target.value})} className="border p-2 rounded">
                <option value="">Assign Program (optional)</option>
                {programs.map(p => <option key={p.id} value={p.id}>{p.title}</option>)}
              </select>
              <input required placeholder="Title" value={form.title} onChange={(e)=>setForm({...form, title: e.target.value})} className="border p-2 rounded" />
              <textarea placeholder="Description" value={form.description} onChange={(e)=>setForm({...form, description: e.target.value})} className="border p-2 rounded md:col-span-2" rows={4} />
              <div>
                <label className="block text-sm">Audio file (mp3)</label>
                <input type="file" accept="audio/*" onChange={(e)=>setAudioFile(e.target.files[0]||null)} />
              </div>
              <div>
                <label className="block text-sm">Cover image</label>
                <input type="file" accept="image/*" onChange={(e)=>{ setCoverFile(e.target.files[0]||null); setPreviewCover(e.target.files[0]? URL.createObjectURL(e.target.files[0]):null); }} />
                {previewCover && <img src={previewCover} alt="preview" className="w-28 h-28 object-cover mt-2 rounded" />}
              </div>
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
