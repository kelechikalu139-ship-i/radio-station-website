import React from "react";
import { Calendar, ArrowRight, Radio } from "lucide-react";
import { motion } from "framer-motion";
import HomeFeaturedNews from "./HomeFeaturedNews";
import LatestUpdates from "./LatestUpdates";

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

      <div  className="grid   gap-8">
      
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* FEATURED */}
        <motion.article
          whileHover={{ y: -4 }}
          className="lg:col-span-7 rounded-3xl overflow-hidden shadow-lg bg-white"
        >
          

            <HomeFeaturedNews/>
        </motion.article>
        

        {/* LATEST UPDATES */}
        <div className="lg:col-span-5 space-y-5">

          <LatestUpdates/>

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
