// src/components/aboutSection/TeamGrid.jsx
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Instagram } from "lucide-react";
import oapsData from "../../../../shared/costants/oapData";

export default function TeamGrid() {
  return (
    <div className="container mx-auto mt-6 p-6 bg-white rounded-lg shadow-sm">
      <motion.h3 initial={{opacity:0}} whileInView={{opacity:1}} className="text-xl font-bold text-purple-800 mb-4">
        Meet the Team
      </motion.h3>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        {oapsData.map((o) => (
          <motion.article key={o.id} whileHover={{ scale: 1.02 }} className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center gap-4">
              <img src={o.photo} alt={o.name} className="w-16 h-16 rounded-md object-cover" />
              <div className="flex-1">
                <div className="font-semibold text-purple-800">{o.name}</div>
                <div className="text-sm text-gray-600">Host: {o.show}</div>
                <div className="mt-2 flex items-center gap-2">
                  <a href={o.instagram} target="_blank" rel="noreferrer">
                    <Instagram size={16} className="text-gray-600" />
                  </a>
                  <Link to={`/oaps/${o.id}`} className="text-sm text-yellow-500 ml-2">
                    View profile →
                  </Link>
                </div>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  );
}
