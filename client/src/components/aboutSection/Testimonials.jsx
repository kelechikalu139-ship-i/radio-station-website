// src/components/aboutSection/Testimonials.jsx
import React from "react";
import { motion } from "framer-motion";

const items = [
  { quote: "Nexter FM gave our band its first radio play — forever grateful!", author: "The Echoes" },
  { quote: "Great interviews and genuine presenters who care about the city.", author: "Amina O." },
  { quote: "Their training workshop helped me start a podcast — highly recommended!", author: "Tunde K." },
];

export default function Testimonials() {
  return (
    <motion.section initial={{opacity:0}} whileInView={{opacity:1}} viewport={{once:true}} className="container mx-auto mt-6">
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h4 className="text-lg font-semibold text-purple-800">What listeners say</h4>

        <div className="mt-4 grid sm:grid-cols-1 md:grid-cols-3 gap-4">
          {items.map((t, i) => (
            <motion.blockquote key={i} whileHover={{ y: -4 }} className="bg-gray-50 p-4 rounded">
              <p className="text-gray-700">“{t.quote}”</p>
              <cite className="text-sm text-gray-600 block mt-3">— {t.author}</cite>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
