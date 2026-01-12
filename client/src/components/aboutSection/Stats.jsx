// src/components/aboutSection/Stats.jsx
import React from "react";
import { motion } from "framer-motion";

const stats = [
  { label: "Years on Air", value: "13+" },
  { label: "Monthly Listeners", value: "120k+" },
  { label: "Live Events", value: "250+" },
];

export default function Stats() {
  return (
    <motion.div initial={{opacity:0}} whileInView={{opacity:1}} viewport={{once:true}} className="container mx-auto mt-6">
      <div className="bg-white rounded-lg shadow-sm p-6 grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
        {stats.map((s) => (
          <div key={s.label}>
            <div className="text-2xl font-bold text-purple-800">{s.value}</div>
            <div className="text-sm text-gray-600 mt-1">{s.label}</div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
