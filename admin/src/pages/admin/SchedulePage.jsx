// src/pages/admin/SchedulePage.jsx
import React, { useEffect, useState } from "react";
// import api from "../../api/axios";

export default function SchedulePage() {
  const [programs, setPrograms] = useState([]);
  const [schedule, setSchedule] = useState([]);
  const [programId, setProgramId] = useState("");
  const [weekday, setWeekday] = useState(1);
  const [start, setStart] = useState("18:00");
  const [end, setEnd] = useState("19:00");

  const load = async () => {
    try {
      const [p, s] = await Promise.all([api.get("/admin/programs"), api.get("/admin/schedule")]);
      setPrograms(p.data.programs || []);
      setSchedule(s.data.schedule || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(()=>{ load(); }, []);

  const add = async (e) => {
    e.preventDefault();
    try {
      await api.post("/admin/schedule", { program_id: programId, weekday, start_time: start, end_time: end });
      load();
    } catch (err) {
      console.error(err);
      alert("Add failed");
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-purple-900 mb-4">Program Schedule</h1>
      <div className="grid md:grid-cols-2 gap-6">
        <form onSubmit={add} className="bg-white p-4 rounded shadow">
          <select value={programId} onChange={(e)=>setProgramId(e.target.value)} required className="w-full mb-2 p-2 border rounded">
            <option value="">Select program</option>
            {programs.map(p => <option key={p.id} value={p.id}>{p.title}</option>)}
          </select>

          <div className="flex gap-2 mb-2">
            <select value={weekday} onChange={(e)=>setWeekday(Number(e.target.value))} className="p-2 border rounded">
              <option value={0}>Sun</option><option value={1}>Mon</option><option value={2}>Tue</option><option value={3}>Wed</option><option value={4}>Thu</option><option value={5}>Fri</option><option value={6}>Sat</option>
            </select>
            <input type="time" value={start} onChange={(e)=>setStart(e.target.value)} className="p-2 border rounded" />
            <input type="time" value={end} onChange={(e)=>setEnd(e.target.value)} className="p-2 border rounded" />
          </div>

          <button className="bg-purple-900 text-white py-2 px-4 rounded">Add to Schedule</button>
        </form>

        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold mb-2">Scheduled</h3>
          <ul className="space-y-2 text-sm">
            {schedule.map(s => (
              <li key={s.id} className="flex justify-between">
                <div>{["Sun","Mon","Tue","Wed","Thu","Fri","Sat"][s.weekday]} — {s.title} ({s.start_time} - {s.end_time})</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
