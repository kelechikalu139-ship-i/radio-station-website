// src/pages/FullHostPage.jsx
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Instagram, Facebook, Twitter } from 'lucide-react';
import oapsData from '../../../shared/costants/oapData';

export default function FullHostPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const selected = oapsData.find((o) => String(o.id) === String(id));

  if (!selected) {
    return (
      <div className="max-w-3xl mx-auto p-8 text-center">
        <p className="text-gray-600 mb-4">Host not found.</p>
        <button onClick={() => navigate('/oaps')} className="px-4 py-2 rounded-md border">
          Back to hosts
        </button>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.35 }}
      className="max-w-5xl mx-auto p-6 mt-6 bg-white rounded-2xl shadow"
    >
      <div className="flex flex-col md:flex-row items-start gap-6">
        <div className="md:w-1/3">
          <img src={selected.photo} alt={selected.name} className="w-full h-auto rounded-lg object-cover shadow" />

          <div className="flex gap-3 mt-4">
            <a href={selected.instagram} target="_blank" rel="noreferrer"><Instagram size={20} className="text-gray-600 hover:text-pink-500" /></a>
            <a href={selected.facebook} target="_blank" rel="noreferrer"><Facebook size={20} className="text-gray-600 hover:text-blue-600" /></a>
            <a href={selected.twitter} target="_blank" rel="noreferrer"><Twitter size={20} className="text-gray-600 hover:text-blue-400" /></a>
          </div>
        </div>

        <div className="md:w-2/3">
          <h1 className="text-3xl font-bold text-purple-800">{selected.name}</h1>
          <p className="text-sm text-gray-600">Host: {selected.show}</p>

          <div className="mt-6 text-gray-700 leading-relaxed">
            <h3 className="font-semibold text-gray-800">Biography</h3>
            <p className="mt-2">{selected.bio}</p>

            <div className="mt-6">
              <h4 className="font-medium text-gray-800">Recent Shows & Highlights</h4>
              {Array.isArray(selected.highlights) && selected.highlights.length > 0 ? (
                <ul className="list-disc pl-5 mt-2 text-gray-600">
                  {selected.highlights.map((h, i) => <li key={i}>{h}</li>)}
                </ul>
              ) : (
                <p className="text-gray-500 mt-2">No highlights listed yet.</p>
              )}
            </div>

            <div className="mt-6 flex gap-2">
              <button onClick={() => navigate(-1)} className="px-4 py-2 rounded-md border">Back</button>
              <a href={selected.instagram} target="_blank" rel="noreferrer" className="px-4 py-2 rounded-md bg-purple-700 text-white">Message / Book</a>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
