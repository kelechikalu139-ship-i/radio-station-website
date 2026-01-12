// src/components/aboutSection/OurStory.jsx
import React from "react";
import { motion } from "framer-motion";
import { Calendar } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

export default function OurStory() {
  const timeline = [
    {
      year: "2012",
      title: "Founded",
      text:
        "Nexter FM launched as a community station with a small studio and a big mission — to amplify local voices and discover new music.",
    },
    {
      year: "2015",
      title: "Expanded Coverage",
      text:
        "We upgraded equipment, expanded our broadcast range, and introduced live events featuring local artists.",
    },
    {
      year: "2019",
      title: "Digital Launch",
      text:
        "Streamed online 24/7 for the first time and launched podcasts and archived interviews.",
    },
    {
      year: "2023",
      title: "Community Programs",
      text:
        "Introduced youth training workshops, charity drives and a 'New Voices' talent segment.",
    },
  ];

  return (
    <div className="container mx-auto bg-white mt-6 rounded-lg p-6 shadow-sm">
      <motion.div initial="hidden" whileInView="show" viewport={{ once: true }}>
        <motion.h3 variants={fadeUp} className="text-2xl font-bold text-purple-800 mb-6">
          Our Story
        </motion.h3>

        <div className="grid md:grid-cols-3 gap-6 items-start">
          <div className="md:col-span-1 flex flex-col items-center md:items-start">
            <div className="w-14 h-14 rounded-full bg-purple-700 text-white flex items-center justify-center">
              <Calendar size={20} />
            </div>
            <p className="text-sm text-gray-600 mt-3">
              From community roots to a digital-first station — here are the milestones that shaped us.
            </p>
          </div>

          <div className="md:col-span-2">
            <div className="space-y-6">
              {timeline.map((t) => (
                <motion.div
                  key={t.year}
                  variants={fadeUp}
                  className="flex gap-4 items-start bg-gray-50 rounded-lg p-4"
                >
                  <div className="w-14 shrink-0 flex flex-col items-center">
                    <div className="text-sm font-bold text-yellow-400">{t.year}</div>
                    <div className="h-full w-px bg-gray-200 mt-2" />
                  </div>

                  <div>
                    <div className="font-semibold text-purple-800">{t.title}</div>
                    <p className="text-gray-600 mt-1">{t.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-6 text-sm text-gray-600">
              <p>
                We combine music curation, community journalism, and live events to keep our
                listeners engaged and connected. Want to be part of our next chapter? See our team
                below or reach out via the contact page.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
