// admin/src/pages/SchedulePage.jsx
import React, { useEffect, useState } from "react";
import api from "../../api/api";
import { format } from "date-fns";

export default function SchedulePage() {
  const [schedules, setSchedules] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [oaps, setOaps] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState(null);

  const [form, setForm] = useState({
    program_id: "",
    oap_id: "",
    start_at: "",
    end_at: "",
    notes: "",
  });

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    setLoading(true);
    try {
      const [schedRes, progRes, oapRes] = await Promise.allSettled([
        api.get("/api/schedule/schedules"),
        api.get("/api/program/programs"),
        api.get("/api/oap/oaps"),
      ]);

      if (schedRes.status === "fulfilled") setSchedules(schedRes.value.data.schedules || []);

      if (progRes.status === "fulfilled") {
        const plist = progRes.value.data.programs || progRes.value.data || [];
        setPrograms(Array.isArray(plist) ? plist : []);
      }

      if (oapRes.status === "fulfilled") {
        const olist = oapRes.value.data.oaps || progRes.value.data || [];
        setOaps(Array.isArray(olist) ? olist : []);
      }
    } catch (err) {
      console.error("loadData error", err);
    } finally {
      setLoading(false);
    }
  }

  function openCreate() {
    setEditing(null);
    setForm({ program_id: "", oap_id: "", start_at: "", end_at: "", notes: "" });
    setShowModal(true);
  }

  function openEdit(s) {
    // Convert DB datetime to local datetime-local format
    const startISO = s.start_at ? new Date(s.start_at).toISOString().slice(0, 16) : "";
    const endISO = s.end_at ? new Date(s.end_at).toISOString().slice(0, 16) : "";

    setEditing(s);
    setForm({
      program_id: s.program_id,
      oap_id: s.oap_id,
      start_at: startISO,
      end_at: endISO,
      notes: s.notes || "",
    });
    setShowModal(true);
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  async function handleSave(e) {
    e.preventDefault();

    if (!form.program_id || !form.oap_id || !form.start_at || !form.end_at) {
      return alert("Please fill program, OAP, start and end time.");
    }
    if (new Date(form.start_at) >= new Date(form.end_at)) {
      return alert("End must be after start.");
    }

    setSaving(true);
    try {
      if (editing) {
        const res = await api.put(`/api/schedule/schedules/${editing.id}`, form);
        setSchedules((s) => s.map((x) => (x.id === editing.id ? res.data.schedule : x)));
      } else {
        const res = await api.post("/api/schedule/schedules", form);
        setSchedules((s) => [res.data.schedule, ...s]);
      }
      setShowModal(false);
    } catch (err) {
      console.error("Save error", err);
      alert(err?.response?.data?.error || "Save failed");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm("Delete this schedule?")) return;
    try {
      await api.delete(`/api/schedule/schedules/${id}`);
      setSchedules((s) => s.filter((x) => x.id !== id));
    } catch (err) {
      console.error("Delete error", err);
      alert("Delete failed");
    }
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-purple-900">Program Schedule</h1>
          <div className="text-sm text-gray-500">Assign OAPs to programs and set start/end times.</div>
        </div>

        <button onClick={openCreate} className="px-4 py-2 bg-purple-700 text-white rounded">
          New Schedule
        </button>
      </div>

      {loading ? (
        <div className="text-gray-500">Loading...</div>
      ) : schedules.length === 0 ? (
        <div className="text-gray-500">No schedules found.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {schedules.map((s) => (
            <div key={s.id} className="bg-white rounded shadow p-4 flex gap-4">
              <div className="w-20 h-20 bg-gray-100 rounded overflow-hidden">
                {s.program_image ? (
                  <img src={s.program_image} alt={s.program_title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">No image</div>
                )}
              </div>

              <div className="flex-1">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="font-semibold">{s.program_title || "Program"}</div>
                    <div className="text-sm text-gray-500">OAP: {s.oap_name || "—"}</div>
                  </div>
                  <div className="text-xs text-gray-400">
                    {s.created_at && new Date(s.created_at).toLocaleDateString()}
                  </div>
                </div>

                <div className="mt-2 text-sm text-gray-600">
                  <div>
                    <strong>When:</strong>{" "}
                    {s.start_at && format(new Date(s.start_at), "PP p")} —{" "}
                    {s.end_at && format(new Date(s.end_at), "PP p")}
                  </div>
                  {s.notes && <div className="mt-1">{s.notes}</div>}
                </div>

                <div className="mt-3 flex gap-2">
                  <button onClick={() => openEdit(s)} className="px-3 py-1 bg-yellow-100 rounded text-sm">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(s.id)} className="px-3 py-1 bg-red-100 rounded text-sm">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4">
          <form onSubmit={handleSave} className="bg-white w-full max-w-2xl rounded p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">{editing ? "Edit Schedule" : "Create Schedule"}</h3>
              <button type="button" onClick={() => setShowModal(false)} className="text-sm text-gray-500">
                Close
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm block mb-1">Program</label>
                <select name="program_id" value={form.program_id} onChange={handleChange} className="w-full border rounded p-2">
                  <option value="">Select program</option>
                  {programs.map((p) => (
                    <option key={p.id} value={p.id}>{p.title}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-sm block mb-1">OAP</label>
                <select name="oap_id" value={form.oap_id} onChange={handleChange} className="w-full border rounded p-2">
                  <option value="">Select OAP</option>
                  {oaps.map((o) => (
                    <option key={o.id} value={o.id}>{o.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-sm block mb-1">Start</label>
                <input type="datetime-local" name="start_at" value={form.start_at} onChange={handleChange} className="w-full border rounded p-2" />
              </div>

              <div>
                <label className="text-sm block mb-1">End</label>
                <input type="datetime-local" name="end_at" value={form.end_at} onChange={handleChange} className="w-full border rounded p-2" />
              </div>

              <div className="md:col-span-2">
                <label className="text-sm block mb-1">Notes</label>
                <textarea name="notes" value={form.notes} onChange={handleChange} className="w-full border rounded p-2" rows={3} />
              </div>
            </div>

            <div className="mt-4 flex justify-end gap-3">
              <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 border rounded">
                Cancel
              </button>
              <button type="submit" disabled={saving} className="px-4 py-2 bg-purple-700 text-white rounded">
                {saving ? "Saving..." : editing ? "Update Schedule" : "Create Schedule"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
