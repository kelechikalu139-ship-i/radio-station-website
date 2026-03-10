import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import api from "../api/api";

export default function NewsDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await api.get(`/news/${id}`);
        setSelected(res.data);
      } catch (err) {
        console.error("Failed to fetch news:", err);
        setSelected(null);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [id]);

  useEffect(() => {
    if (!loading && !selected) {
      const t = setTimeout(() => navigate("/newsevent"), 1200);
      return () => clearTimeout(t);
    }
  }, [loading, selected, navigate]);

  if (loading) {
    return (
      <div className="container mx-auto px-6 py-20 text-center">
        <p className="text-gray-400">Loading news...</p>
      </div>
    );
  }

  if (!selected) {
    return (
      <div className="container mx-auto px-6 py-20 text-center">
        <p className="text-gray-500">News/Event not found. Redirecting...</p>
      </div>
    );
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-4xl mx-auto px-4 md:px-6 py-12"
    >
      <h1 className="text-2xl md:text-4xl font-extrabold text-white">
        {selected.title}
      </h1>

      <div className="flex gap-3 text-sm text-gray-400 mt-3">
        <span>🗓 {selected.date}</span>
        <span>•</span>
        <span>✍ {selected.author}</span>
      </div>

      <div className="mt-6">
        <img
          src={selected.photo}
          alt={selected.title}
          className="w-full max-h-105 object-cover rounded-2xl"
        />
      </div>

      <div className="mt-8 text-white">
        {selected.article?.split("\n").map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
    </motion.article>
  );
}