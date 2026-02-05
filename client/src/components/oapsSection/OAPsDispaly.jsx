// src/pages/OAPs.jsx
// import { Link } from "react-router-dom";
// import { motion } from "framer-motion";
// import { Instagram, Facebook, Twitter } from "lucide-react";
// import oapsData from "../../../../shared/costants/oapData";

// export default function OAPsDisplay() {
//   return (
//     <section className="container mx-auto px-6 py-14">
//       <h2 className="text-3xl font-extrabold text-white mb-10">
//         Our On-Air Personalities
//       </h2>

//       <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
//         {oapsData.map((oap) => (
//           <motion.article
//             key={oap.id}
//             whileHover={{ y: -8 }}
//             className="bg-white rounded-2xl overflow-hidden shadow-lg"
//           >
//             {/* IMAGE */}
//             <div className="relative">
//               <img
//                 src={oap.photo}
//                 alt={oap.name}
//                 className="w-full h-64 object-cover"
//               />

//               {/* ON AIR BADGE */}
//               <span className="absolute top-4 left-4 bg-red-600 text-white text-xs px-3 py-1 rounded-full animate-pulse">
//                 ON AIR
//               </span>
//             </div>

//             {/* CONTENT */}
//             <div className="p-6">
//               <h3 className="text-xl font-bold text-purple-800">
//                 {oap.name}
//               </h3>

//               <p className="text-gray-600 mt-1">
//                 Host of <span className="font-semibold">{oap.show}</span>
//               </p>

//               {/* SOCIALS */}
//               <div className="flex gap-4 mt-4">
//                 <a href={oap.instagram} target="_blank" rel="noreferrer">
//                   <Instagram className="hover:text-pink-500" />
//                 </a>
//                 <a href={oap.facebook} target="_blank" rel="noreferrer">
//                   <Facebook className="hover:text-blue-600" />
//                 </a>
//                 <a href={oap.twitter} target="_blank" rel="noreferrer">
//                   <Twitter className="hover:text-blue-400" />
//                 </a>
//               </div>

//               {/* CTA */}
//               <Link
//                 to={`/oaps/${oap.id}`}
//                 className="inline-block mt-6 text-yellow-500 font-semibold"
//               >
//                 View Full Profile →
//               </Link>
//             </div>
//           </motion.article>
//         ))}
//       </div>
//     </section>
//   );
// }



import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Instagram, Facebook, Twitter } from "lucide-react";
import api from "../../api/api";

export default function OAPsDisplay() {
  const [oaps, setOaps] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOaps();
  }, []);

  async function loadOaps() {
    try {
      const res = await api.get("/api/oap/oaps");
      setOaps(res.data.oaps || []);
    } catch (err) {
      console.error("Failed to load OAPs", err);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <section className="container mx-auto px-6 py-14 text-white">
        Loading On-Air Personalities…
      </section>
    );
  }

  return (
    <section className="container mx-auto px-6 py-14">
      <h2 className="text-3xl font-extrabold text-white mb-10">
        Our On-Air Personalities
      </h2>

      {oaps.length === 0 ? (
        <p className="text-gray-300">No OAPs available.</p>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
          {oaps.map((oap) => (
            <motion.article
              key={oap.id}
              whileHover={{ y: -8 }}
              className="bg-white rounded-2xl overflow-hidden shadow-lg"
            >
              {/* IMAGE */}
              <div className="relative">
                <img
                  src={oap.image_url || "/placeholder.jpg"}
                  alt={oap.name}
                  className="w-full h-64 object-cover"
                />

                {oap.on_air && (
                  <span className="absolute top-4 left-4 bg-red-600 text-white text-xs px-3 py-1 rounded-full animate-pulse">
                    ON AIR
                  </span>
                )}
              </div>

              {/* CONTENT */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-purple-800">
                  {oap.name}
                </h3>

                <p className="text-gray-600 mt-1">
                  Host of{" "}
                  <span className="font-semibold">
                    {oap.show_name || "—"}
                  </span>
                </p>

                {/* SOCIALS */}
                <div className="flex gap-4 mt-4">
                  {oap.instagram && (
                    <a href={oap.instagram} target="_blank" rel="noreferrer">
                      <Instagram className="hover:text-pink-500" />
                    </a>
                  )}
                  {oap.facebook && (
                    <a href={oap.facebook} target="_blank" rel="noreferrer">
                      <Facebook className="hover:text-blue-600" />
                    </a>
                  )}
                  {oap.twitter && (
                    <a href={oap.twitter} target="_blank" rel="noreferrer">
                      <Twitter className="hover:text-blue-400" />
                    </a>
                  )}
                </div>

                {/* CTA */}
                <Link
                  to={`/oaps/${oap.id}`}
                  className="inline-block mt-6 text-yellow-500 font-semibold"
                >
                  View Full Profile →
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      )}
    </section>
  );
}



// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { motion } from "framer-motion";
// import { Instagram, Facebook, Twitter } from "lucide-react";
// import api from "../../api/api";

// export default function OAPsDisplay() {
//   const [oaps, setOaps] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     loadOaps();
//   }, []);

//   async function loadOaps() {
//     try {
//       const res = await api.get("/api/oap/oaps");
//       setOaps(res.data.oaps || []);
//     } catch (err) {
//       console.error("Failed to load OAPs", err);
//     } finally {
//       setLoading(false);
//     }
//   }

//   if (loading) {
//     return (
//       <section className="container mx-auto px-6 py-14 text-white">
//         Loading On-Air Personalities…
//       </section>
//     );
//   }

//   return (
//     <section className="container mx-auto px-6 py-14">
//       <h2 className="text-3xl font-extrabold text-white mb-10">
//         Our On-Air Personalities
//       </h2>

//       {oaps.length === 0 ? (
//         <p className="text-gray-300">No OAPs available.</p>
//       ) : (
//         <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
//           {oaps.map((oap) => (
//             <motion.article
//               key={oap.id}
//               whileHover={{ y: -8 }}
//               className="bg-white rounded-2xl overflow-hidden shadow-lg"
//             >
//               {/* IMAGE */}
//               <img
//                 src={oap.image_url || "/placeholder.jpg"}
//                 alt={oap.name}
//                 className="w-full h-64 object-cover"
//               />

//               {/* CONTENT */}
//               <div className="p-6">
//                 <h3 className="text-xl font-bold text-purple-800">
//                   {oap.name}
//                 </h3>

//                 <p className="text-gray-600 mt-1">
//                   {oap.programs.length === 0 ? (
//                     <span>No assigned program</span>
//                   ) : (
//                     <>
//                       Hosts{" "}
//                       <span className="font-semibold">
//                         {oap.programs.map(p => p.title).join(", ")}
//                       </span>
//                     </>
//                   )}
//                 </p>

//                 {oap.bio && (
//                   <p className="text-sm text-gray-500 mt-2 line-clamp-3">
//                     {oap.bio}
//                   </p>
//                 )}

//                 {/* SOCIALS (optional fields) */}
//                 <div className="flex gap-4 mt-4">
//                   {oap.instagram && (
//                     <a href={oap.instagram} target="_blank" rel="noreferrer">
//                       <Instagram />
//                     </a>
//                   )}
//                   {oap.facebook && (
//                     <a href={oap.facebook} target="_blank" rel="noreferrer">
//                       <Facebook />
//                     </a>
//                   )}
//                   {oap.twitter && (
//                     <a href={oap.twitter} target="_blank" rel="noreferrer">
//                       <Twitter />
//                     </a>
//                   )}
//                 </div>

//                 <Link
//                   to={`/oaps/${oap.id}`}
//                   className="inline-block mt-6 text-yellow-500 font-semibold"
//                 >
//                   View Full Profile →
//                 </Link>
//               </div>
//             </motion.article>
//           ))}
//         </div>
//       )}
//     </section>
//   );
// }
