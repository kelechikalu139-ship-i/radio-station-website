// import React from 'react'

// const LiveProgramsSection = ({ live = { title: "Morning Drive", host: "DJ Kalu", time: "06:00 - 10:00" }, next = { title: "Midday Mix", host: "Ada", time: "12:00 - 14:00" } }) => {
//   return (
//     <section className="container mx-auto px-6 py-10">
//       <div className="grid md:grid-cols-2 gap-12 items-center">
//         <div className="bg-purple-100 rounded-2xl p-6 shadow-lg border-t-4 border-yellow-400">
//           <div className="text-sm text-gray-500">On Air</div>
//           <h3 className="text-2xl font-bold text-purple-800 mt-1">{live.title}</h3>
//           <div className="text-sm text-gray-600 mt-1">Host: {live.host} • {live.time}</div>
//           <p className="mt-4 text-gray-700">Listen live now for an energetic selection of music, news, and conversations to start your day.</p>
//         </div>

//         <div className="bg-white rounded-2xl p-6 shadow-lg border-t-4 border-purple-700">
//           <div className="text-sm text-gray-500">Up Next</div>
//           <h3 className="text-2xl font-bold text-purple-800 mt-1">{next.title}</h3>
//           <div className="text-sm text-gray-600 mt-1">Host: {next.host} • {next.time}</div>
//           <p className="mt-4 text-gray-700">Set a reminder or check the full schedule to catch your favourite segments.</p>
//         </div>
//       </div>
//     </section>
//   )
// }

// export default LiveProgramsSection

// LiveProgramsSection.jsx
// import React from 'react';
// import { motion } from 'framer-motion';
// import { Play } from 'lucide-react';

// const programs = [
//   { id: 1, title: 'Morning Ride', host: 'S.D Bawa', time: '07:00 - 10:00', color: 'from-purple-600 to-purple-400' },
//   { id: 2, title: 'Afternoon Vibes', host: 'Grace Daniels', time: '11:00 - 14:00', color: 'from-yellow-500 to-yellow-300' },
//   { id: 3, title: 'Night Groove', host: 'John Matrix', time: '22:00 - 01:00', color: 'from-sky-600 to-sky-400' },
// ];

// export default function LiveProgramsSection() {
//   return (
//     <section className="mt-10">
//       <div className="flex items-center justify-between px-2 md:px-0">
//         <h2 className="text-xl font-semibold text-gray-800">Live Programs</h2>
//         <a href="/programs" className="text-sm text-purple-700">See all programs →</a>
//       </div>

//       <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
//         {programs.map(p => (
//           <motion.article key={p.id} whileHover={{ y: -6 }} className="rounded-lg overflow-hidden shadow">
//             <div className={`p-4 bg-linear-to-r ${p.color} text-white`}>
//               <div className="flex items-center justify-between">
//                 <div>
//                   <div className="text-sm opacity-80">{p.time}</div>
//                   <div className="font-semibold text-lg mt-1">{p.title}</div>
//                   <div className="text-sm opacity-90 mt-1">Host: {p.host}</div>
//                 </div>

//                 <a href="/player" className="inline-flex items-center gap-2 bg-white/20 px-3 py-2 rounded-full">
//                   <Play size={16} />
//                   <span className="text-sm">Listen</span>
//                 </a>
//               </div>
//             </div>

//             <div className="p-4 bg-white">
//               <p className="text-sm text-gray-600">
//                 Quick description: a blend of music, chat, and local updates — perfect for commuting and catching up with the day.
//               </p>
//             </div>
//           </motion.article>
//         ))}
//       </div>
//     </section>
//   );
// }



// import React from "react";
// import { motion } from "framer-motion";
// import { Play, Radio, Clock } from "lucide-react";

// const liveProgram = {
//   title: "Morning Ride",
//   host: "S.T.J",
//   time: "07:00 – 10:00",
//   description: "Music, traffic updates, trending stories and real conversations to start your day right."
// };

// const nextProgram = {
//   title: "Afternoon Vibes",
//   host: "Grace Daniels",
//   time: "11:00 – 14:00",
//   description: "Feel-good music, shout-outs, and lifestyle conversations."
// };

// const otherPrograms = [
//   { id: 1, title: "Evening Drive", time: "17:00 – 19:00" },
//   { id: 2, title: "Night Groove", time: "22:00 – 01:00" }
// ];

// export default function LiveProgramsSection() {
//   return (
//     <section className="container mx-auto px-5 py-14">
      
//       {/* Header */}
//       <div className="flex items-center justify-between mb-8">
//         <h2 className="text-2xl font-extrabold text-white">
//           Programs on Nexter FM
//         </h2>
//         <a
//           href="/programs"
//           className="text-sm font-semibold text-purple-700 hover:underline"
//         >
//           Full Schedule →
//         </a>
//       </div>

//       {/* Main grid */}
//       <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

//         {/* LIVE NOW */}
//         <motion.div
//           whileHover={{ y: -4 }}
//           className="lg:col-span-7 bg-linear-to-br from-purple-900 to-purple-700 text-white rounded-3xl p-6 relative overflow-hidden"
//         >
//           {/* Live badge */}
//           <div className="absolute top-5 right-5 flex items-center gap-2 text-xs font-bold text-red-400">
//             <span className="relative flex h-3 w-3">
//               <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
//               <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500" />
//             </span>
//             LIVE NOW
//           </div>

//           <div className="flex items-center gap-3 text-yellow-300 text-sm font-semibold">
//             <Radio size={16} />
//             On Air
//           </div>

//           <h3 className="mt-2 text-3xl font-extrabold">
//             {liveProgram.title}
//           </h3>

//           <p className="mt-1 text-yellow-200 font-semibold">
//             {liveProgram.host}
//           </p>

//           <div className="flex items-center gap-2 text-sm text-white/80 mt-1">
//             <Clock size={14} />
//             {liveProgram.time}
//           </div>

//           <p className="mt-4 max-w-xl text-white/85">
//             {liveProgram.description}
//           </p>

//           <button className="mt-6 inline-flex items-center gap-3 bg-yellow-300 text-purple-900 font-bold px-6 py-4 rounded-full shadow hover:scale-105 transition">
//             <Play size={18} />
//             Listen Live
//           </button>
//         </motion.div>

//         {/* RIGHT COLUMN */}
//         <div className="lg:col-span-5 flex flex-col gap-6">

//           {/* UP NEXT */}
//           <motion.div
//             whileHover={{ y: -3 }}
//             className="bg-white rounded-2xl p-5 shadow border-l-4 border-purple-700"
//           >
//             <div className="text-xs font-bold text-purple-700">
//               UP NEXT
//             </div>

//             <h4 className="mt-1 text-xl font-bold text-gray-900">
//               {nextProgram.title}
//             </h4>

//             <p className="text-sm text-gray-600 font-semibold">
//               {nextProgram.host}
//             </p>

//             <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
//               <Clock size={14} />
//               {nextProgram.time}
//             </div>

//             <p className="mt-3 text-sm text-gray-600">
//               {nextProgram.description}
//             </p>
//           </motion.div>

//           {/* OTHER PROGRAMS */}
//           <div className="bg-gray-50 rounded-2xl p-4">
//             <h5 className="text-sm font-bold text-gray-700 mb-3">
//               Later Today
//             </h5>

//             <div className="space-y-3">
//               {otherPrograms.map(p => (
//                 <div
//                   key={p.id}
//                   className="flex items-center justify-between bg-white rounded-xl p-3 shadow-sm"
//                 >
//                   <div>
//                     <div className="font-semibold text-gray-800">
//                       {p.title}
//                     </div>
//                     <div className="text-xs text-gray-500">
//                       {p.time}
//                     </div>
//                   </div>

//                   <span className="text-xs text-gray-400">
//                     Scheduled
//                   </span>
//                 </div>
//               ))}
//             </div>
//           </div>

//         </div>
//       </div>
//     </section>
//   );
// }


import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Play, Radio, Clock } from "lucide-react";
import api from "../../api/api";

export default function LiveProgramsSection() {
  const [live, setLive] = useState(null);
  const [next, setNext] = useState(null);
  const [later, setLater] = useState([]);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const [liveRes, nextRes] = await Promise.all([
  //         api.get("/api/schedule/live-program"),
  //         api.get("/api/schedule/next-program"),
  //       ]);

  //       setLive(liveRes.data.live);
  //       setNext(nextRes.data.next);

  //       // Optional: fetch more for "later today"
  //       const todayRes = await api.get("/schedule/today");
  //       setLater(todayRes.data.today.slice(1)); // skip live if present
  //     } catch (err) {
  //       console.error("Failed to load programs", err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchData();

  //   // Optional: refresh every 5–10 minutes
  //   const interval = setInterval(fetchData, 300000);
  //   return () => clearInterval(interval);
  // }, []);


  useEffect(() => {
  const fetchData = async () => {
    try {
      const [liveRes, nextRes] = await Promise.all([
        api.get("/api/schedule/live-program"),
        api.get("/api/schedule/next-program"),
      ]);

      setLive(liveRes.data.live);
      setNext(nextRes.data.next);
      setLater(nextRes.data.later || []);
    } catch (err) {
      console.error("Failed to load programs", err);
    } finally {
      setLoading(false);
    }
  };

  fetchData();
  const interval = setInterval(fetchData, 300000);
  return () => clearInterval(interval);
}, []);


  if (loading) {
    return <div className="text-white text-center py-10">Loading schedule...</div>;
  }

  return (
    <section className="container mx-auto px-5 py-14">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-extrabold text-white">
          Programs on Nexter FM
        </h2>
        <a href="/programs" className="text-sm font-semibold text-purple-700 hover:underline">
          Full Schedule →
        </a>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LIVE NOW */}
        <motion.div
          whileHover={{ y: -4 }}
          className="lg:col-span-7 bg-linear-to-br from-purple-900 to-purple-700 text-white rounded-3xl p-6 relative overflow-hidden"
        >
          {live ? (
            <>
              <div className="absolute top-5 right-5 flex items-center gap-2 text-xs font-bold text-red-400">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500" />
                </span>
                LIVE NOW
              </div>

              <div className="flex items-center gap-3 text-yellow-300 text-sm font-semibold">
                <Radio size={16} />
                On Air
              </div>

              <h3 className="mt-2 text-3xl font-extrabold">{live.title}</h3>
              <p className="mt-1 text-yellow-200 font-semibold">{live.host_name}</p>
              <div className="relative">
                <img
                  src={live.image_url || "/placeholder.jpg"}
                  alt={live.name}
                  className="w-full h-64 object-cover"
                />
                </div>
              <div className="flex items-center gap-2 text-sm text-white/80 mt-1">
                <Clock size={14} />
                {new Date(live.start_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} –{" "}
                {new Date(live.end_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </div>
              <p className="mt-4 max-w-xl text-white/85">{live.description}</p>

              <button className="mt-6 inline-flex items-center gap-3 bg-yellow-300 text-purple-900 font-bold px-6 py-4 rounded-full shadow hover:scale-105 transition">
                <Play size={18} />
                Listen Live
              </button>
            </>
          ) : (
            <div className="text-center py-10">
              <p className="text-xl">No live program right now</p>
              <p className="text-white/70 mt-2">Check back soon!</p>
            </div>
          )}
        </motion.div>

        {/* RIGHT COLUMN */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          {/* UP NEXT */}
          {next && (
            <motion.div
              whileHover={{ y: -3 }}
              className="bg-white rounded-2xl p-5 shadow border-l-4 border-purple-700"
            >
              <div className="text-xs font-bold text-purple-700">UP NEXT</div>
              <h4 className="mt-1 text-xl font-bold text-gray-900">{next.title}</h4>
              <p className="text-sm text-gray-600 font-semibold">{next.host_name}</p>
              <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                <Clock size={14} />
                {new Date(next.start_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} –{" "}
                {new Date(next.end_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </div>
              <p className="mt-3 text-sm text-gray-600">{next.description}</p>
            </motion.div>
          )}

          {/* OTHER PROGRAMS (Later Today) - add when you implement /schedule/today */}
          {later.length > 0 && (
  <div className="bg-white rounded-2xl p-5 shadow">
    <h5 className="text-sm font-bold text-gray-500 mb-3">LATER TODAY</h5>

    <div className="space-y-4">
      {later.map((prog) => (
        <div key={prog.id} className="border-b pb-3 last:border-b-0">
          <h6 className="font-bold text-gray-900">{prog.title}</h6>
          <p className="text-sm text-gray-600">{prog.host_name}</p>
          <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
            <Clock size={12} />
            {new Date(prog.start_at).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
            {" – "}
            {new Date(prog.end_at).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </div>
        </div>
      ))}
    </div>
  </div>
)}

        </div>
      </div>
    </section>
  );
}