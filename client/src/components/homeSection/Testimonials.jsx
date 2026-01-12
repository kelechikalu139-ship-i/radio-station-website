// import React from 'react'
// import { Star } from "lucide-react";

// const items = [
//   { id:1, name:"Aisha", quote:"Nexter FM keeps me informed during my commute!" },
//   { id:2, name:"Tunde", quote:"Great interviews and music curation." },
//   { id:3, name:"Tanko S.D", quote:"My number 1 go-to for breaking news." },
//   { id:4, name:"Peter Bulus", quote:"Family oriented programs." },
// ];

// const Testimonials = () => {
//   return (
//         <section className="rounded-2xl p-6 bg-white/4 border border-white/8">
//         {/* <section className="rounded-2xl p-6 bg-linear-to-r from-purple-800 to-purple-700 text-white"> */}
//       <h4 className="text-lg font-semibold text-white mb-4">What listeners say</h4>
//       <div className="grid md:grid-cols-2 gap-4">
//         {items.map(t => (
//           <blockquote key={t.id} className="bg-white/6 p-4 rounded-lg">
//             <div className="flex items-center gap-2 mb-2">
//               <Star className="text-yellow-300"/><div className="font-semibold text-white">{t.name}</div>
//             </div>
//             <p className="text-sm text-white/70">“{t.quote}”</p>
//           </blockquote>
//         ))}
//       </div>
//     </section>
//   )
// }

// export default Testimonials


// Testimonials.jsx
import React from 'react';
import { motion } from 'framer-motion';

const items = [
  { quote: 'Nexter FM gave our band its first radio play — forever grateful!', author: 'The Echoes' },
  { quote: 'Great interviews and presenters who really care about the city.', author: 'Amina O.' },
  { quote: 'Their workshops got me started with podcasting — thank you!', author: 'Tunde K.' },
];

export default function Testimonials() {
  return (
    <section className="mt-10">
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h4 className="text-lg font-semibold text-gray-800">What listeners say</h4>

        <div className="mt-4 grid sm:grid-cols-1 md:grid-cols-3 gap-4">
          {items.map((t, i) => (
            <motion.blockquote key={i} whileHover={{ y: -4 }} className="bg-gray-50 p-4 rounded">
              <p className="text-gray-700">“{t.quote}”</p>
              <cite className="text-sm text-gray-600 block mt-3">— {t.author}</cite>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
