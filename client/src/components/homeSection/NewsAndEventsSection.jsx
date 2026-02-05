import React from "react";
import { Calendar, ArrowRight, Radio } from "lucide-react";
import { motion } from "framer-motion";

const featured = {
  title: "Nexter FM Launches Community Outreach Program",
  date: "Oct 12, 2025",
  category: "News",
  image: "/images/events/event1.jpeg",
  excerpt:
    "Nexter FM Minna kicks off a new community outreach initiative aimed at empowering youths through media, music, and mentorship."
};

const updates = [
  {
    id: 1,
    title: "Live Broadcast from Minna City Square",
    date: "Oct 18, 2025",
    type: "Event"
  },
  {
    id: 2,
    title: "DJ Kalu Wins Best Radio Host Award",
    date: "Oct 10, 2025",
    type: "News"
  },
  {
    id: 3,
    title: "Weekend Groove Show Returns Bigger",
    date: "Oct 07, 2025",
    type: "News"
  }
];

export default function NewsAndEventsSection() {
  return (
    <section className="container mx-auto px-5 py-16">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-10">
        <h2 className="text-2xl md:text-3xl font-extrabold text-white">
          News & Events
        </h2>
        <a
          href="/newsevent"
          className="text-sm font-semibold text-black-400 bg-white p-1 rounded-b-md hover:underline"
        >
          View all →
        </a>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* FEATURED */}
        <motion.article
          whileHover={{ y: -4 }}
          className="lg:col-span-7 rounded-3xl overflow-hidden shadow-lg bg-white"
        >
          <div className="relative h-64 sm:h-72">
            <img
              src={featured.image}
              alt={featured.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent" />
            
            <span className="absolute top-4 left-4 bg-yellow-400 text-purple-900 text-xs font-bold px-3 py-1 rounded-full">
              FEATURED
            </span>
          </div>

          <div className="p-6">
            <div className="flex items-center gap-3 text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <Calendar size={14} />
                {featured.date}
              </span>
              <span className="text-purple-700 font-semibold">
                {featured.category}
              </span>
            </div>

            <h3 className="mt-3 text-2xl font-bold text-gray-900">
              {featured.title}
            </h3>

            <p className="mt-3 text-gray-600 leading-relaxed">
              {featured.excerpt}
            </p>

            <a
              href="/news/featured"
              className="inline-flex items-center gap-2 mt-5 font-semibold text-purple-700"
            >
              Read more
              <ArrowRight size={16} />
            </a>
          </div>
        </motion.article>

        {/* LATEST UPDATES */}
        <div className="lg:col-span-5 space-y-5">

          <div className="bg-gray-50 rounded-2xl p-5">
            <h4 className="text-lg font-bold text-gray-800 mb-4">
              Latest Updates
            </h4>

            <div className="space-y-4">
              {updates.map(item => (
                <motion.a
                  key={item.id}
                  whileHover={{ x: 4 }}
                  href="/news"
                  className="block bg-white rounded-xl p-4 shadow-sm hover:shadow transition"
                >
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-bold px-2 py-1 rounded-full
                      ${item.type === "Event"
                        ? "bg-purple-100 text-purple-700"
                        : "bg-yellow-100 text-yellow-700"
                      }`}>
                      {item.type}
                    </span>

                    <span className="text-xs text-gray-500">
                      {item.date}
                    </span>
                  </div>

                  <div className="mt-2 font-semibold text-gray-800">
                    {item.title}
                  </div>
                </motion.a>
              ))}
            </div>
          </div>

          {/* Call to action */}
          <div className="bg-linear-to-br from-purple-800 to-purple-600 rounded-2xl p-6 text-white">
            <div className="flex items-center gap-2 text-yellow-300 text-sm font-bold">
              <Radio size={16} />
              Stay Connected
            </div>
            <p className="mt-2 text-white/90">
              Get the latest news, events, and exclusive updates from Nexter FM.
            </p>

            <a
              href="/contact"
              className="inline-block mt-4 bg-yellow-300 text-purple-900 font-bold px-5 py-3 rounded-full"
            >
              Contact the Station
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}
