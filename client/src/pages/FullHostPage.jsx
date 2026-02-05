// src/pages/FullHostPage.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Instagram, Facebook, Twitter } from "lucide-react";
import api from "../api/api"; 

export default function FullHostPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [oap, setOap] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHost = async () => {
      try {
        const res = await api.get(`/api/oap/oaps/${id}`);
        setOap(res.data.oap || res.data);
      } catch (err) {
        console.error("Fetch Full Host error:", err);
        setTimeout(() => navigate("/oaps"), 1200);
      } finally {
        setLoading(false);
      }
    };

    fetchHost();
  }, [id, navigate]);

  /* ─────────────── SKELETON LOADER ─────────────── */
  if (loading) {
    return (
      <div className="max-w-5xl mx-auto p-6 mt-6 bg-white rounded-2xl shadow animate-pulse">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/3">
            <div className="w-full h-64 bg-gray-200 rounded-lg"></div>
            <div className="flex gap-3 mt-4">
              <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
              <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
              <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
            </div>
          </div>

          <div className="md:w-2/3 space-y-4">
            <div className="h-8 bg-gray-200 rounded w-2/3"></div>
            <div className="h-4 bg-gray-200 rounded w-1/3"></div>

            <div className="space-y-2 mt-6">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ─────────────── NOT FOUND ─────────────── */
  if (!oap) {
    return (
      <div className="max-w-3xl mx-auto p-8 text-center">
        <p className="text-gray-600 mb-4">Host not found.</p>
        <button
          onClick={() => navigate("/oaps")}
          className="px-4 py-2 rounded-md border"
        >
          Back to hosts
        </button>
      </div>
    );
  }

  /* ─────────────── UI ─────────────── */
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="max-w-5xl mx-auto p-6 mt-6 bg-white rounded-2xl shadow"
    >
      <div className="flex flex-col md:flex-row items-start gap-6">
        {/* IMAGE */}
        <div className="md:w-1/3">
          <img
            src={oap.photo || oap.image_url || "/placeholder.jpg"}
            alt={oap.name}
            className="w-full h-auto rounded-lg object-cover shadow"
          />

          <div className="flex gap-3 mt-4">
            {oap.instagram && (
              <a href={oap.instagram} target="_blank" rel="noreferrer">
                <Instagram size={20} className="text-gray-600 hover:text-pink-500" />
              </a>
            )}

            {oap.facebook && (
              <a href={oap.facebook} target="_blank" rel="noreferrer">
                <Facebook size={20} className="text-gray-600 hover:text-blue-600" />
              </a>
            )}

            {oap.twitter && (
              <a href={oap.twitter} target="_blank" rel="noreferrer">
                <Twitter size={20} className="text-gray-600 hover:text-blue-400" />
              </a>
            )}
          </div>
        </div>

        {/* CONTENT */}
        <div className="md:w-2/3">
          <h1 className="text-3xl font-bold text-purple-800">
            {oap.name}
          </h1>

          {oap.show && (
            <p className="text-sm text-gray-600">
              Host: {oap.show}
            </p>
          )}

          <div className="mt-6 text-gray-700 leading-relaxed">
            <h3 className="font-semibold text-gray-800">
              Biography
            </h3>

            <p className="mt-2">
              {oap.bio || "No biography available."}
            </p>

            {/* HIGHLIGHTS */}
            <div className="mt-6">
              <h4 className="font-medium text-gray-800">
                Recent Shows & Highlights
              </h4>

              {Array.isArray(oap.highlights) &&
              oap.highlights.length > 0 ? (
                <ul className="list-disc pl-5 mt-2 text-gray-600">
                  {oap.highlights.map((h, i) => (
                    <li key={i}>{h}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 mt-2">
                  No highlights listed yet.
                </p>
              )}
            </div>

            {/* BUTTONS */}
            <div className="mt-6 flex gap-2">
              <button
                onClick={() => navigate(-1)}
                className="px-4 py-2 rounded-md border hover:bg-gray-100"
              >
                Back
              </button>

              {oap.instagram && (
                <a
                  href={oap.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-md bg-purple-700 text-white hover:bg-purple-800"
                >
                  Message / Book
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
