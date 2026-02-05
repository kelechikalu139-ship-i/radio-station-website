import { useEffect, useState } from "react";
import api from "../../api/api";

function timeAgo(date) {
  const diff = Math.floor((Date.now() - new Date(date)) / 1000);
  if (diff < 60) return "just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

export default function ActivityLog() {
  const [activity, setActivity] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [type, setType] = useState("all");
  const [search, setSearch] = useState("");
  const [pagination, setPagination] = useState({
    page: 1,
    totalPages: 1,
  });
  const [loading, setLoading] = useState(true);

  const fetchActivity = async () => {
    setLoading(true);
    try {
      const res = await api.get("/api/activity", {
        params: { page, limit, type, search },
      });

      console.log("ACTIVITY RESPONSE:", res.data);

      // 🔥 SAFELY HANDLE BOTH RESPONSE TYPES
      if (Array.isArray(res.data)) {
        setActivity(res.data);
        setPagination({ page: 1, totalPages: 1 });
      } else {
        setActivity(res.data.data || []);
        setPagination(res.data.pagination || { page: 1, totalPages: 1 });
      }
    } catch (err) {
      console.error("Activity load failed", err);
      setActivity([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActivity();
  }, [page, type, search]);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-purple-900">
          Super Admin Activity Log
        </h1>
        <p className="text-sm text-gray-500">
          Track all admin, program, OAP & schedule activities
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <select
          value={type}
          onChange={(e) => {
            setPage(1);
            setType(e.target.value);
          }}
          className="border rounded px-3 py-2 text-sm"
        >
          <option value="all">All Activities</option>
          <option value="admin">Admins</option>
          <option value="program">Programs</option>
          <option value="oap">OAPs</option>
          <option value="schedule">Schedules</option>
        </select>

        <input
          type="text"
          placeholder="Search activity..."
          value={search}
          onChange={(e) => {
            setPage(1);
            setSearch(e.target.value);
          }}
          className="border rounded px-3 py-2 text-sm w-64"
        />
      </div>

      {/* Activity List */}
      {loading ? (
        <div className="bg-white rounded p-4 shadow">Loading activity...</div>
      ) : activity.length === 0 ? (
        <p className="text-sm text-gray-400">No activity found</p>
      ) : (
        <ul className="bg-white rounded shadow divide-y">
          {activity.map((a, i) => (
            <li
              key={i}
              className="flex justify-between px-4 py-3 text-sm hover:bg-gray-50"
            >
              <span className="text-gray-700">{a.text}</span>
              <span className="text-xs text-gray-500">
                {timeAgo(a.time)}
              </span>
            </li>
          ))}
        </ul>
      )}

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <div className="flex items-center justify-between pt-4">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            className="px-4 py-2 text-sm border rounded disabled:opacity-50"
          >
            Previous
          </button>

          <span className="text-sm text-gray-600">
            Page {pagination.page} of {pagination.totalPages}
          </span>

          <button
            disabled={page === pagination.totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="px-4 py-2 text-sm border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
