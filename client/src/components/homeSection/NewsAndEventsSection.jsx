// import React from "react";
// import { Calendar, ArrowRight, Radio } from "lucide-react";
// import { motion } from "framer-motion";
// import HomeFeaturedNews from "./HomeFeaturedNews";
// import LatestUpdates from "./LatestUpdates";

// const featured = {
//   title: "Nexter FM Launches Community Outreach Program",
//   date: "Oct 12, 2025",
//   category: "News",
//   image: "/images/events/event1.jpeg",
//   excerpt:
//     "Nexter FM Minna kicks off a new community outreach initiative aimed at empowering youths through media, music, and mentorship."
// };

// const updates = [
//   {
//     id: 1,
//     title: "Live Broadcast from Minna City Square",
//     date: "Oct 18, 2025",
//     type: "Event"
//   },
//   {
//     id: 2,
//     title: "DJ Kalu Wins Best Radio Host Award",
//     date: "Oct 10, 2025",
//     type: "News"
//   },
//   {
//     id: 3,
//     title: "Weekend Groove Show Returns Bigger",
//     date: "Oct 07, 2025",
//     type: "News"
//   }
// ];

// export default function NewsAndEventsSection() {
//   return (
//     <section className="container mx-auto px-5 py-16">
      
//       {/* Header */}
//       <div className="flex items-center justify-between mb-10">
//         <h2 className="text-2xl md:text-3xl font-extrabold text-white">
//           News & Events
//         </h2>
//         <a
//           href="/newsevent"
//           className="text-sm font-semibold text-black-400 bg-white p-1 rounded-b-md hover:underline"
//         >
//           View all →
//         </a>
//       </div>

//       <div  className="grid   gap-8">
      
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

//         {/* FEATURED */}
//         <motion.article
//           whileHover={{ y: -4 }}
//           className="lg:col-span-7 rounded-3xl overflow-hidden shadow-lg bg-white"
//         >
          

//             <HomeFeaturedNews/>
//         </motion.article>
        

//         {/* LATEST UPDATES */}
//         <div className="lg:col-span-5 space-y-5">

//           <LatestUpdates/>

//            {/* Call to action */}
//           <div className="bg-linear-to-br from-purple-800 to-purple-600 rounded-2xl p-6 text-white">
//             <div className="flex items-center gap-2 text-yellow-300 text-sm font-bold">
//               <Radio size={16} />
//               Stay Connected
//             </div>
//             <p className="mt-2 text-white/90">
//               Get the latest news, events, and exclusive updates from Nexter FM.
//             </p>

//             <a
//               href="/contact"
//               className="inline-block mt-4 bg-yellow-300 text-purple-900 font-bold px-5 py-3 rounded-full"
//             >
//               Contact the Station
//             </a>
//           </div>
//           </div>

         

//         </div>
//     </section>
//   );
// }


import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Radio } from "lucide-react";
import HomeFeaturedNews from "./HomeFeaturedNews";
import LatestUpdates from "./LatestUpdates";
import api from "../../api/api";
import { SkeletonLoader } from "../ui/SkeletonLoader";

export default function NewsAndEventsSection() {
  const [featuredNews, setFeaturedNews] = useState(null);
  const [latestUpdates, setLatestUpdates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadNews();
  }, []);

  async function loadNews() {
    try {
      setLoading(true);
      setError(null);

      // Fetch Featured News
      const featuredRes = await api.get("/api/news", {
        params: { featured: 1, limit: 1 },
      });

      // Fetch Latest Published News
      const updatesRes = await api.get("/api/news", {
        params: { status: "published", limit: 6 },
      });

      setFeaturedNews(featuredRes.data?.[0] || null);
      setLatestUpdates(updatesRes.data || []);

    } catch (err) {
      console.error("Failed to load news:", err);
      setError("Unable to load news at the moment.");
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <section className="container mx-auto px-5 py-16">
        <SkeletonLoader />
      </section>
    );
  }

  if (error && !featuredNews && latestUpdates.length === 0) {
    return (
      <section className="container mx-auto px-5 py-16 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">News & Events</h2>
        <p className="text-red-400 mb-6">{error}</p>
        <button
          onClick={loadNews}
          className="px-6 py-3 bg-white text-purple-900 rounded-full font-semibold hover:bg-yellow-300"
        >
          Try Again
        </button>
      </section>
    );
  }

  return (
    <section className="container mx-auto px-5 py-16">
      {/* Header */}
      <div className="flex items-center justify-between mb-10">
        <h2 className="text-2xl md:text-3xl font-extrabold text-white">
          News & Events
        </h2>
        <a
          href="/newsevent"
          className="text-sm font-semibold bg-white px-5 py-2 rounded-full hover:bg-yellow-300 hover:text-purple-900 transition"
        >
          View all →
        </a>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* FEATURED NEWS */}
        <div className="lg:col-span-7">
          <HomeFeaturedNews featuredNews={featuredNews} />
        </div>

        {/* LATEST UPDATES + CTA */}
        <div className="lg:col-span-5 space-y-6">
          <LatestUpdates updates={latestUpdates} />

          {/* Stay Connected CTA */}
          <div className="bg-linear-to-br from-purple-800 to-purple-600 rounded-2xl p-6 text-white">
            <div className="flex items-center gap-2 text-yellow-300 text-sm font-bold">
              <Radio size={16} />
              Stay Connected
            </div>
            <p className="mt-3 text-white/90">
              Get the latest news, events, and exclusive updates from Nexter FM.
            </p>
            <a
              href="/contact"
              className="inline-block mt-5 bg-yellow-300 text-purple-900 font-bold px-6 py-3 rounded-full hover:bg-yellow-400 transition"
            >
              Contact the Station
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}