import React from 'react'
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Instagram, Facebook, Twitter } from 'lucide-react';
import OAPsHero from '../components/oapsSection/OAPsHero'
import OAPsDisplay from '../components/oapsSection/OAPsDispaly';


// import OAPSProfile from '../components/oapsSection/OAPSProfile'
  // import oapsData from '../../../shared/costants/oapData'

const OAPs = () => {
  return (
     <>
    <OAPsHero/>
    <OAPsDisplay/>    
    </>
  )
}

export default OAPs


// // src/pages/OAPs.jsx
// // import React from 'react';
// // import { Link } from 'react-router-dom';
// // import { motion } from 'framer-motion';
// // import { Instagram, Facebook, Twitter } from 'lucide-react';
// // import oapsData from '../data/oapsData';

// // export default function OAPs() {
// //   return (
    
// //   );
// // }


// import { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import { Instagram, Facebook, Twitter } from "lucide-react";
// import publicApi from "../../../shared/api/publicApi";
// import OAPsHero from "../components/oapsSection/OAPsHero";

// export default function OAPs() {
//   const [oaps, setOaps] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchOaps = async () => {
//       try {
//         const res = await publicApi.get("/api/admin/oaps");
//         console.log("PUBLIC OAPS:", res.data);
//         setOaps(res.data.oaps || []);
//       } catch (err) {
//         console.error("Failed to load OAPs", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchOaps();
//   }, []);

//   return (
//     <div>
//       <OAPsHero />

//       <section className="mx-auto px-6 py-10 bg-white">
//         <h3 className="text-xl font-bold text-purple-800 mb-4">
//           On-Air Personalities
//         </h3>

//         {loading && <p>Loading...</p>}

//         {!loading && !oaps.length && (
//           <p className="text-gray-500">No OAPs found</p>
//         )}

//         <div className="grid md:grid-cols-3 gap-6">
//           {oaps.map((oap) => (
//             <motion.article
//               key={oap.id}
//               whileHover={{ scale: 1.02 }}
//               className="bg-white rounded-xl p-4 shadow border-t-4 border-purple-300"
//             >
//               <img
//                 src={oap.image_url}
//                 alt={oap.name}
//                 className="w-20 h-20 rounded-lg object-cover"
//               />

//               <div className="font-semibold text-purple-800 mt-2">
//                 {oap.name}
//               </div>

//               <div className="flex gap-2 mt-2">
//                 {oap.instagram && (
//                   <a href={oap.instagram} target="_blank">
//                     <Instagram size={18} />
//                   </a>
//                 )}
//                 {oap.facebook && (
//                   <a href={oap.facebook} target="_blank">
//                     <Facebook size={18} />
//                   </a>
//                 )}
//                 {oap.twitter && (
//                   <a href={oap.twitter} target="_blank">
//                     <Twitter size={18} />
//                   </a>
//                 )}
//               </div>
//             </motion.article>
//           ))}
//         </div>
//       </section>
//     </div>
//   );
// }





    // <div>
    //     <OAPsHero/>
    //     {/* <OAPSProfile/> */}
    //     <OAPsDisplay/>
    //     {/* <section className="mx-auto px-6 py-10 bg-white mt-3">
    //   <h3 className="text-xl font-bold text-purple-800 mb-4">On-Air Personalities</h3>

    //   <div className="grid md:grid-cols-3 gap-6">
    //     {oapsData.map((oap) => (
    //       <motion.article
    //         key={oap.id}
    //         layout
    //         whileHover={{ scale: 1.02 }}
    //         whileTap={{ scale: 0.99 }}
    //         className="bg-white rounded-xl p-4 shadow border-t-4 border-purple-300"
    //       >
    //         <Link to={`/oaps/${oap.id}`} className="block">
    //           <div className="flex items-center gap-4">
    //             <img src={oap.photo} alt={oap.name} className="w-20 h-20 rounded-lg object-cover" />

    //             <div className="flex-1">
    //               <div className="font-semibold text-purple-800">{oap.name}</div>
    //               <div className="text-sm text-gray-600">Host: {oap.show}</div>

    //               <div className="flex gap-2 mt-2">
    //                 <a href={oap.instagram} onClick={(e)=>e.stopPropagation()} target="_blank" rel="noreferrer">
    //                   <Instagram size={18} className="text-gray-600 hover:text-pink-500" />
    //                 </a>
    //                 <a href={oap.facebook} onClick={(e)=>e.stopPropagation()} target="_blank" rel="noreferrer">
    //                   <Facebook size={18} className="text-gray-600 hover:text-blue-600" />
    //                 </a>
    //                 <a href={oap.twitter} onClick={(e)=>e.stopPropagation()} target="_blank" rel="noreferrer">
    //                   <Twitter size={18} className="text-gray-600 hover:text-blue-400" />
    //                 </a>
    //               </div>

    //               <div className="mt-3">
    //                 <span className="text-sm text-yellow-500 mt-2 inline-block">View Profile →</span>
    //               </div>
    //             </div>
    //           </div>
    //         </Link>
    //       </motion.article>
    //     ))}
    //   </div>
    // </section> */}
    // </div>
