import { useEffect, useState } from "react";
import axios from "axios";

function timeAgo(date) {
  const diff = Math.floor((Date.now() - new Date(date)) / 1000);
  if (diff < 60) return "just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

export default function RecentActivity() {
  const [activity, setActivity] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/activity?limit=10")
      .then((res) => setActivity(res.data || []))
      .catch((err) => {
        console.error("Activity load failed", err);
        setActivity([]);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded p-4 shadow">
        Loading activity...
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded p-4 shadow">
      <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-3">
        Recent Activity
      </h3>

      {activity.length === 0 ? (
        <p className="text-sm text-gray-400">No recent activity</p>
      ) : (
        <ul className="space-y-2 text-sm">
          {activity.map((a, i) => (
            <li key={i} className="flex justify-between text-gray-600 dark:text-gray-300">
              <span>{a.text}</span>
              <span className="text-xs text-gray-400">
                {timeAgo(a.time)}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
