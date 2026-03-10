import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import api from "../../api/api";

export default function LatestUpdates() {
  const [updates, setUpdates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function fetchUpdates() {
      try {
        setLoading(true);

        const res = await api.get("/api/news", {
          params: {
            status: "published",
          },
        });

        if (mounted) {
          const sorted = [...(res.data || [])]
            .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
            .slice(0, 5); // LIMIT FOR HOMEPAGE

          setUpdates(sorted);
        }
      } catch (err) {
        console.error("Failed to load updates", err);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    fetchUpdates();

    return () => {
      mounted = false;
    };
  }, []);

  if (loading) {
    return (
      <div className="bg-gray-50 rounded-2xl p-5">
        <h4 className="text-lg font-bold text-gray-800 mb-4">
          Latest Updates
        </h4>
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="bg-white p-4 rounded-xl animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-20 mb-2"></div>
              <div className="h-4 bg-gray-300 rounded w-full"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 rounded-2xl p-5">
      <h4 className="text-lg font-bold text-gray-800 mb-4">
        Latest Updates
      </h4>

      <div className="space-y-4">
        {updates.map((item) => {
          const isEvent = item.type === "event";

          return (
            <motion.div
              key={item.id}
              whileHover={{ x: 4 }}
              className="block bg-white rounded-xl p-4 shadow-sm hover:shadow transition"
            >
              <Link to={`/newsevent/${item.id}`}>
                <div className="flex items-center justify-between">
                  <span
                    className={`text-xs font-bold px-2 py-1 rounded-full
                    ${
                      isEvent
                        ? "bg-purple-100 text-purple-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {isEvent ? "Event" : "News"}
                  </span>

                  <span className="text-xs text-gray-500">
                    {item.created_at
                      ? new Date(item.created_at).toLocaleDateString()
                      : ""}
                  </span>
                </div>

                <div className="mt-2 font-semibold text-gray-800 line-clamp-2">
                  {item.title}
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}