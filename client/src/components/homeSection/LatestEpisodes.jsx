// // import React from 'react'
// // import { Clock } from "lucide-react";

// // const eps = [
// //   { id:1, title:"Interview with Mayor", duration:"28:34", desc:"Highlights from community townhall."},
// //   { id:2, title:"Acoustic Session", duration:"12:07", desc:"Live acoustic set from Yemi."},
// //   { id:3, title:"Health Minute", duration:"05:20", desc:"Daily quick health tips."},
// // ];

// // const LatestEpisodes = () => {
// //   return (
// //    <section className="bg-white/4 rounded-2xl p-4 border border-white/8">
// //       <h4 className="text-lg font-semibold text-white mb-3">Latest Episodes</h4>
// //       <ul className="space-y-3">
// //         {eps.map(ep => (
// //           <li key={ep.id} className="flex items-center justify-between bg-white/6 rounded p-3">
// //             <div>
// //               <div className="font-semibold text-white">{ep.title}</div>
// //               <div className="text-xs text-white/70">{ep.desc}</div>
// //             </div>
// //             <div className="text-xs text-white/80 inline-flex items-center gap-2">
// //               <Clock size={14}/> {ep.duration}
// //             </div>
// //           </li>
// //         ))}
// //       </ul>
// //     </section>
// //   )
// // }

// // export default LatestEpisodes


// // LatestEpisodes.jsx
// import React from 'react';
// import { motion } from 'framer-motion';
// import { Clock } from 'lucide-react';

// const episodes = [
//   { id: 1, title: 'Interview: Rising Artist', length: '28:12', host: 'S.D Bawa' },
//   { id: 2, title: 'Culture Roundtable', length: '35:01', host: 'Grace Daniels' },
//   { id: 3, title: 'Late-night Mix', length: '46:20', host: 'John Matrix' },
// ];

// export default function LatestEpisodes() {
//   return (
//     <section className="mt-10 bg-white rounded-lg p-6 shadow-sm">
//       <div className="flex items-center justify-between">
//         <div>
//           <h3 className="text-lg font-semibold text-gray-800">Latest Episodes</h3>
//           <p className="text-sm text-gray-500">Catch up on recent interviews, mixes and shows.</p>
//         </div>

//         <a href="/player" className="text-sm text-purple-700">Open player</a>
//       </div>

//       <div className="mt-4 space-y-3">
//         {episodes.map(ep => (
//           <motion.div key={ep.id} whileHover={{ x: 6 }} className="flex items-center justify-between p-3 rounded-md hover:bg-gray-50">
//             <div className="flex items-center gap-3">
//               <div className="w-12 h-12 rounded-md bg-purple-100 flex items-center justify-center font-semibold text-purple-700">
//                 {ep.host.split(' ').map(n => n[0]).slice(0,2).join('')}
//               </div>
//               <div>
//                 <div className="font-medium">{ep.title}</div>
//                 <div className="text-xs text-gray-500">{ep.host}</div>
//               </div>
//             </div>

//             <div className="flex items-center gap-4">
//               <div className="text-xs text-gray-500 flex items-center gap-1"><Clock size={14}/> {ep.length}</div>
//               <a href="/player" className="px-3 py-1 rounded bg-purple-700 text-white text-sm">Play</a>
//             </div>
//           </motion.div>
//         ))}
//       </div>
//     </section>
//   );
// }



// NewsletterCTA.jsx
import React from 'react';
import { Mail } from 'lucide-react';

export default function NewsletterCTA() {
  return (
    <section className="mt-10 rounded-lg overflow-hidden">
      <div className="bg-linear-to-r from-purple-700 to-purple-600 text-white p-6 md:flex items-center justify-between">
        <div>
          <h4 className="text-xl font-semibold">Get weekly highlights</h4>
          <p className="text-sm opacity-90 mt-1">New episodes, local events and exclusive mixes — straight to your inbox.</p>
        </div>

        <form className="mt-4 md:mt-0 flex gap-2">
          <label htmlFor="email" className="sr-only">Email address</label>
          <input id="email" type="email" placeholder="you@domain.com" className="px-4 py-2 rounded-md text-purple-900" />
          <button type="submit" className="inline-flex items-center gap-2 bg-white text-purple-700 px-4 py-2 rounded-md">
            <Mail size={16} /> Subscribe
          </button>
        </form>
      </div>
    </section>
  );
}
