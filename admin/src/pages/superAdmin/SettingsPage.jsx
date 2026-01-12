// admin/src/pages/SettingsPage.jsx
import React, { useEffect, useState } from "react";
import api from "../../api/api";

export default function SettingsPage() {
  const [settings, setSettings] = useState({});
  const [loading, setLoading] = useState(true);
  const [savingKey, setSavingKey] = useState(null);

  useEffect(()=>{ load(); }, []);

  async function load() {
    setLoading(true);
    try {
      const res = await api.get("/api/setting/settings");
      setSettings(res.data.settings || {});
    } catch (err) {
      console.warn(err);
    } finally {
      setLoading(false);
    }
  }

  function handleChange(key, value) {
    setSettings(s => ({ ...s, [key]: value }));
  }

  async function saveKey(key) {
    setSavingKey(key);
    try {
      await api.put(`/api/setting/settings/${encodeURIComponent(key)}`, { value: settings[key] || "" });
      alert("Saved");
    } catch (err) {
      console.warn(err);
      alert("Save failed");
    } finally {
      setSavingKey(null);
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div><h1 className="text-2xl font-bold">Settings</h1><p className="text-sm text-gray-500">Site-wide key/value settings</p></div>

      {loading ? <div>Loading...</div> : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Example keys: site_title, site_description, default_stream_url, contact_email */}
          {[
            { key: "site_title", label: "Site title" },
            { key: "site_description", label: "Site description" },
            { key: "default_stream_url", label: "Default stream URL" },
            { key: "contact_email", label: "Contact email" }
          ].map(k => (
            <div key={k.key} className="bg-white p-4 rounded shadow space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">{k.label}</div>
                  <div className="text-xs text-gray-400">Key: {k.key}</div>
                </div>
                <div>
                  <button onClick={()=>saveKey(k.key)} className="px-3 py-1 bg-purple-700 text-white rounded" disabled={savingKey===k.key}>{savingKey===k.key ? "Saving..." : "Save"}</button>
                </div>
              </div>
              <div>
                <input value={settings[k.key] || ""} onChange={(e)=>handleChange(k.key, e.target.value)} className="w-full p-2 border rounded" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
