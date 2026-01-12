// src/pages/admin/OAPsPage.jsx
import React, { useEffect, useState } from "react";
// import api from "../../api/axios";

export default function OAPsPage() {
  const [oaps, setOaps] = useState([]);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");

  const load = async () => {
    try {
      const res = await api.get("/admin/oaps");
      setOaps(res.data.oaps || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(()=>{ load(); }, []);

  const create = async (e) => {
    e.preventDefault();
    try {
      await api.post("/admin/oaps", { name, bio });
      setName(""); setBio("");
      load();
    } catch (err) {
      console.error(err);
      alert("Create failed");
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-purple-900 mb-4">OAPs</h1>
      <div className="grid md:grid-cols-2 gap-6">
        <form onSubmit={create} className="bg-white p-4 rounded shadow">
          <input value={name} onChange={(e)=>setName(e.target.value)} required placeholder="Name" className="w-full mb-2 p-2 border rounded" />
          <textarea value={bio} onChange={(e)=>setBio(e.target.value)} placeholder="Bio" className="w-full mb-2 p-2 border rounded"></textarea>
          <button className="bg-purple-900 text-white py-2 px-4 rounded">Create</button>
        </form>

        <div className="bg-white p-4 rounded shadow">
          <ul className="space-y-2">
            {oaps.map(o => (
              <li key={o.id} className="flex justify-between">
                <div>
                  <div className="font-semibold">{o.name}</div>
                  <div className="text-xs text-gray-500">{o.created_at}</div>
                </div>
                <div className="text-sm text-gray-500">{o.avatar_url ? "Has avatar" : "No avatar"}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
