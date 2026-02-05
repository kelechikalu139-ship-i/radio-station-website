// import { scheduleData } from "../../data/scheduleData";
// import { motion } from "framer-motion";

// const days = Object.keys(scheduleData);

// export default function ProgramSchedule() {
//   return (
//     <section className="container mx-auto px-6 py-14">
//       <h2 className="text-3xl font-extrabold text-white mb-10">
//         Program Schedule
//       </h2>

//       {/* ===== MOBILE VIEW ===== */}
//       <div className="md:hidden space-y-8">
//         {days.map((day) => (
//           <div key={day}>
//             <h3 className="text-lg font-bold text-purple-700 mb-3">
//               {day}
//             </h3>

//             <div className="space-y-4">
//               {scheduleData[day].map((show, i) => (
//                 <motion.div
//                   key={i}
//                   whileHover={{ scale: 1.02 }}
//                   className="bg-white rounded-xl p-5 shadow"
//                 >
//                   <div className="flex justify-between items-start">
//                     <div>
//                       <h4 className="font-bold text-purple-800">
//                         {show.title}
//                       </h4>
//                       <p className="text-sm text-gray-600">
//                         Host: {show.host}
//                       </p>
//                     </div>

//                     {show.live && (
//                       <span className="bg-red-600 text-white text-xs px-3 py-1 rounded-full animate-pulse">
//                         LIVE
//                       </span>
//                     )}
//                   </div>

//                   <p className="mt-2 text-sm text-gray-700">
//                     {show.desc}
//                   </p>

//                   <div className="mt-3 text-xs text-gray-500 font-mono">
//                     {show.time}
//                   </div>
//                 </motion.div>
//               ))}
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* ===== DESKTOP VIEW ===== */}
//       <div className="hidden md:grid grid-cols-7 gap-4">
//         {days.map((day) => (
//           <div key={day} className="bg-gray-50 rounded-xl p-4">
//             <h3 className="font-bold text-purple-800 mb-4 text-center">
//               {day}
//             </h3>

//             <div className="space-y-4">
//               {scheduleData[day].map((show, i) => (
//                 <motion.div
//                   key={i}
//                   whileHover={{ y: -4 }}
//                   className="bg-white rounded-lg p-4 shadow-sm border-l-4 border-purple-600"
//                 >
//                   <div className="flex justify-between items-start">
//                     <div>
//                       <h4 className="font-semibold text-purple-800 text-sm">
//                         {show.title}
//                       </h4>
//                       <p className="text-xs text-gray-600">
//                         {show.host}
//                       </p>
//                     </div>

//                     {show.live && (
//                       <span className="text-[10px] bg-red-500 text-white px-2 py-0.5 rounded-full animate-pulse">
//                         LIVE
//                       </span>
//                     )}
//                   </div>

//                   <p className="mt-2 text-xs text-gray-600 line-clamp-3">
//                     {show.desc}
//                   </p>

//                   <div className="mt-2 text-[11px] text-gray-500 font-mono">
//                     {show.time}
//                   </div>
//                 </motion.div>
//               ))}
//             </div>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }


import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import api from "../../api/api";

export default function ProgramSchedule() {
  const [schedule, setSchedule] = useState({});
  const [loading, setLoading] = useState(true);

  const daysOrder = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  useEffect(() => {
    api.get("/api/schedule/weekly")
      .then(res => setSchedule(res.data.schedule || {}))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-white">Loading schedule...</p>;

  return (
    <section className="container mx-auto px-6 py-14">
      <h2 className="text-3xl font-extrabold text-white mb-10">
        Program Schedule
      </h2>

      {/* Mobile view */}
      <div className="md:hidden space-y-8">
        {daysOrder.map(day => schedule[day] && (
          <div key={day}>
            <h3 className="text-lg font-bold text-purple-700 mb-3">{day}</h3>
            <div className="space-y-4">
              {schedule[day].map((show, i) => (
                <motion.div key={i} whileHover={{ scale: 1.02 }} className="bg-white rounded-xl p-5 shadow">
                  <h4 className="font-bold text-purple-800">{show.title}</h4>
                  <p className="text-sm text-gray-600">Host: {show.host}</p>
                  <p className="mt-2 text-sm text-gray-700">{show.desc}</p>
                  <div className="mt-3 text-xs text-gray-500 font-mono">
                    {show.start_time} – {show.end_time}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Desktop grid view */}
      <div className="hidden md:grid grid-cols-7 gap-4">
        {daysOrder.map(day => (
          <div key={day} className="bg-gray-50 rounded-xl p-4">
            <h3 className="font-bold text-purple-800 mb-4 text-center">{day}</h3>
            <div className="space-y-4 min-h-[300px]">
              {schedule[day]?.map((show, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -4 }}
                  className="bg-white rounded-lg p-4 shadow-sm border-l-4 border-purple-600"
                >
                  <h4 className="font-semibold text-purple-800 text-sm">{show.title}</h4>
                  <p className="text-xs text-gray-600">{show.host}</p>
                  <p className="mt-2 text-xs text-gray-600 line-clamp-3">{show.desc}</p>
                  <div className="mt-2 text-[11px] text-gray-500 font-mono">
                    {show.start_time} – {show.end_time}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}