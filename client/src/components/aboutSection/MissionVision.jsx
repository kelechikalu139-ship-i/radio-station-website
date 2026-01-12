// src/components/aboutSection/MissionVision.jsx
import React from "react";
import { motion } from "framer-motion";
import { Target, Users } from "lucide-react";

const cardAnim = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function MissionVision() {
  return (
    <motion.section initial="hidden" whileInView="show" viewport={{ once: true }} className="container mx-auto mt-6 p-6">
      <div className="grid md:grid-cols-2 gap-6 items-stretch">
        <motion.div variants={cardAnim} className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-md bg-purple-700 text-white flex items-center justify-center">
              <Target size={20} />
            </div>
            <div>
              <h4 className="font-semibold text-purple-800">Our Mission</h4>
              <p className="text-gray-600 mt-1">
                To amplify local talent and stories, deliver great music and thoughtful conversation,
                and build a radio community that listens, learns and lifts each other.
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div variants={cardAnim} className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-md bg-yellow-400 text-white flex items-center justify-center">
              <Users size={20} />
            </div>
            <div>
              <h4 className="font-semibold text-purple-800">Our Vision</h4>
              <p className="text-gray-600 mt-1">
                To be the leading community-first station bridging music, culture and action — on-air
                and online — for listeners across the region.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
