// src/pages/HostProfile.jsx
import React, { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Instagram, Facebook, Twitter } from 'lucide-react';
// import oapsData from '../data/oapsData';
import oapsData from '../../../shared/costants/oapData';

export default function HostProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const selected = oapsData.find((o) => String(o.id) === String(id));

  useEffect(() => {
    if (!selected) {
      const t = setTimeout(() => navigate('/oaps'), 1200);
      return () => clearTimeout(t);
    }
  }, [selected, navigate]);

  if (!selected) {
    return (
      <div className="p-8 text-center">
        <p className="text-gray-600">Host not found. Redirecting…</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.35 }}
      className="max-w-4xl mx-auto p-6 mt-6 bg-white rounded-2xl shadow"
    >
      <div className="flex items-start gap-6">
        <img src={selected.photo} alt={selected.name} className="w-48 h-48 rounded-lg object-cover shadow" />

        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-purple-800">{selected.name}</h1>
              <p className="text-sm text-gray-600">Host: {selected.show}</p>
            </div>

            <div className="flex gap-2">
              <a href={selected.instagram} target="_blank" rel="noreferrer">
                <Instagram size={20} className="text-gray-600 hover:text-pink-500" />
              </a>
              <a href={selected.facebook} target="_blank" rel="noreferrer">
                <Facebook size={20} className="text-gray-600 hover:text-blue-600" />
              </a>
              <a href={selected.twitter} target="_blank" rel="noreferrer">
                <Twitter size={20} className="text-gray-600 hover:text-blue-400" />
              </a>
            </div>
          </div>

          <div className="mt-4 text-sm text-gray-700">
            <h3 className="font-medium text-gray-800">About</h3>
            <p className="mt-2 leading-relaxed">{selected.bio}</p>

            <div className="mt-6">
              <h4 className="font-medium text-gray-800">Recent Shows / Highlights</h4>
              <ul className="list-disc pl-5 mt-2 text-gray-600">
                {Array.isArray(selected.highlights) && selected.highlights.length > 0 ? (
                  selected.highlights.map((h, i) => <li key={i}>{h}</li>)
                ) : (
                  <li className="text-gray-500">No highlights listed yet.</li>
                )}
              </ul>
            </div>

            <div className="mt-6 flex gap-2">
              <button onClick={() => navigate(-1)} className="px-4 py-2 rounded-md border">
                Back
              </button>

              <Link to={`/oaps/${selected.id}/full`} className="px-4 py-2 rounded-md bg-purple-700 text-white">
                Full Host Page
              </Link>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
