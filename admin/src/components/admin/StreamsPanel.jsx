// src/components/admin/StreamsPanel.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function StreamsPanel({ streams = [], onToggle = () => {} }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded p-4 shadow">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-100">Active Streams</h3>
        <span className="text-sm text-gray-500">{streams.length} streams</span>
      </div>

      <div className="space-y-3">
        {streams.map((st) => (
          <div key={st.id} className="flex items-center justify-between bg-gray-50 dark:bg-gray-900/40 rounded p-3">
            <div>
              <div className="font-medium">{st.name}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">{st.status} • {st.listeners ?? 0} listeners</div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => onToggle(st.id)}
                className={`px-3 py-1 rounded text-sm ${st.status === "live" ? "bg-red-500 text-white" : "bg-green-600 text-white"}`}
              >
                {st.status === "live" ? "Stop" : "Start"}
              </button>
              <Link to={`/admin/streams/${st.id}`} className="text-sm text-purple-700">Manage</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
