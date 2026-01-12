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
import React from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';

const programs = [
  { id: 1, title: 'Morning Ride', host: 'S.D Bawa', time: '07:00 - 10:00', color: 'from-purple-600 to-purple-400' },
  { id: 2, title: 'Afternoon Vibes', host: 'Grace Daniels', time: '11:00 - 14:00', color: 'from-yellow-500 to-yellow-300' },
  { id: 3, title: 'Night Groove', host: 'John Matrix', time: '22:00 - 01:00', color: 'from-sky-600 to-sky-400' },
];

export default function LiveProgramsSection() {
  return (
    <section className="mt-10">
      <div className="flex items-center justify-between px-2 md:px-0">
        <h2 className="text-xl font-semibold text-gray-800">Live Programs</h2>
        <a href="/programs" className="text-sm text-purple-700">See all programs →</a>
      </div>

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
        {programs.map(p => (
          <motion.article key={p.id} whileHover={{ y: -6 }} className="rounded-lg overflow-hidden shadow">
            <div className={`p-4 bg-linear-to-r ${p.color} text-white`}>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm opacity-80">{p.time}</div>
                  <div className="font-semibold text-lg mt-1">{p.title}</div>
                  <div className="text-sm opacity-90 mt-1">Host: {p.host}</div>
                </div>

                <a href="/player" className="inline-flex items-center gap-2 bg-white/20 px-3 py-2 rounded-full">
                  <Play size={16} />
                  <span className="text-sm">Listen</span>
                </a>
              </div>
            </div>

            <div className="p-4 bg-white">
              <p className="text-sm text-gray-600">
                Quick description: a blend of music, chat, and local updates — perfect for commuting and catching up with the day.
              </p>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
