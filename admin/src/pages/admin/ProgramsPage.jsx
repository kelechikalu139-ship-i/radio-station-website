// src/pages/admin/ProgramsPage.jsx
import React, { useEffect, useState } from "react";
// import api from "../../api/axios";

export default function ProgramsPage() {
  const [programs, setPrograms] = useState([]);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [duration, setDuration] = useState(60);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const res = await api.get("/admin/programs");
      setPrograms(res.data.programs || []);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch programs");
    } finally { setLoading(false); }
  };

  useEffect(()=>{ load(); }, []);

  const create = async (e) => {
    e.preventDefault();
    try {
      await api.post("/admin/programs", { title, description: desc, duration_minutes: duration });
      setTitle(""); setDesc(""); setDuration(60);
      load();
    } catch (err) {
      console.error(err);
      alert("Create failed");
    }
  };

  const remove = async (id) => {
    if (!confirm("Delete program?")) return;
    try {
      await api.delete(`/admin/programs/${id}`);
      load();
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-purple-900 mb-4">Programs</h1>
      <div className="grid md:grid-cols-2 gap-6">
        <form onSubmit={create} className="bg-white p-4 rounded shadow">
          <input value={title} onChange={(e)=>setTitle(e.target.value)} required placeholder="Program title" className="w-full mb-2 p-2 border rounded" />
          <textarea value={desc} onChange={(e)=>setDesc(e.target.value)} placeholder="Description" className="w-full mb-2 p-2 border rounded"></textarea>
          <input value={duration} onChange={(e)=>setDuration(Number(e.target.value))} type="number" className="w-full mb-2 p-2 border rounded" />
          <button className="bg-purple-900 text-white py-2 px-4 rounded">Create</button>
        </form>

        <div className="bg-white p-4 rounded shadow">
          <h3 className="mb-2 font-semibold">Existing</h3>
          {loading ? <div>Loading...</div> : (
            <ul className="space-y-2">
              {programs.map(p => (
                <li key={p.id} className="flex justify-between items-center">
                  <div>
                    <div className="font-semibold">{p.title}</div>
                    <div className="text-xs text-gray-500">{p.host_name ?? "—"} • {p.duration_minutes}m</div>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={()=>remove(p.id)} className="text-red-600 text-sm">Delete</button>
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
