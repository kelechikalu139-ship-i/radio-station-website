// import React from "react";
// import { motion, AnimatePresence } from "framer-motion";

// const OnAirOAP = () => {

//     /* small visualizer bars used in hero and player */
//     function Bars({ playing, className = "" }) {
//       const bars = [1, 2, 3, 4, 5];
//       return (
//         <div className={`flex items-end gap-1 ${className}`}>
//           {bars.map((b, i) => (
//             <motion.span
//               key={i}
//               animate={playing ? { height: ["8px", `${8 + (i + 1) * 10}px`, "8px"] } : { height: "8px" }}
//               transition={{ duration: 0.6 + i * 0.06, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
//               className="w-1.5 bg-yellow-300 rounded-sm"
//               style={{ display: "inline-block" }}
//             />
//           ))}
//         </div>
//       );
//     }

//   return (
//     <div className="relative bg-linear-to-b from-purple-800 to-purple-900 rounded-3xl p-6 shadow-2xl text-center overflow-hidden">

//       {/* Live pulse */}
//       <span className="absolute top-4 right-4 flex items-center gap-2 text-xs font-bold text-red-400">
//         <span className="relative flex h-3 w-3">
//           <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
//           <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
//         </span>
//         ON AIR
//       </span>

//       {/* OAP Image */}
//       <div className="relative mx-auto w-36 h-36 rounded-full overflow-hidden ring-4 ring-yellow-300 shadow-lg">
//         <img
//           src="/images/oaps/oap1.jpeg"
//           alt="On Air OAP"
//           className="w-full h-full object-cover"
//         />
//       </div>

//       {/* Wave animation */}
//       <div className="flex justify-center gap-1 mt-4">
//         <span className="h-1">
//             <Bars  />
//         </span>
//         {/* {[...Array(5)].map((_, i) => (
//           <span
//             key={i}
//             className="w-1 h-6 bg-yellow-300 rounded-full animate-pulse"
//             style={{ animationDelay: `${i * 0.15}s` }}
//           />
//         ))} */}
//       </div>
      
       

//       {/* OAP Info */}
//       <h3 className="mt-4 text-xl font-bold text-white">
//         STJ
//       </h3>
//       <p className="text-yellow-300 font-semibold">
//         Morning Drive
//       </p>
//       <p className="text-white/70 text-sm">
//         Live • 7:00 AM – 10:00 AM
//       </p>
//     </div>
//   );
// };

// export default OnAirOAP;



import React, { useState, useEffect } from "react";
import { motion} from "framer-motion";
import api from "../../api/api";

function Bars({ playing = true }) {
  const bars = [1, 2, 3, 4, 5];
  return (
    <div className="flex items-end gap-1">
      {bars.map((_, i) => (
        <motion.span
          key={i}
          animate={
            playing
              ? { height: ["8px", `${8 + (i + 1) * 10}px`, "8px"] }
              : { height: "8px" }
          }
          transition={{ duration: 0.6 + i * 0.06, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
          className="w-1.5 bg-yellow-300 rounded-sm"
        />
      ))}
    </div>
  );
}

export default function OnAirOAP() {
  const [current, setCurrent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // api.get("/live-program")
    api.get("/api/schedule/live-program")
      .then(res => {
        setCurrent(res.data.live);
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="text-white">Loading...</div>;

  if (!current) {
    return (
      <div className="relative bg-linear-to-b from-purple-800 to-purple-900 rounded-3xl p-6 shadow-2xl text-center">
        <p className="text-white text-xl">No one on air right now</p>
      </div>
    );
  }

  return (
    <div className="relative bg-linear-to-b from-purple-800 to-purple-900 rounded-3xl p-6 shadow-2xl text-center overflow-hidden">
      <span className="absolute top-4 right-4 flex items-center gap-2 text-xs font-bold text-red-400">
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
          <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500" />
        </span>
        ON AIR
      </span>

      <div className="relative mx-auto w-36 h-36 rounded-full overflow-hidden ring-4 ring-yellow-300 shadow-lg">
        <img
          src={current.host_image || "/images/oaps/placeholder.jpg"}
          alt={current.host_name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* <div className="flex justify-center gap-1 mt-4">
        <Bars playing={true} />
      </div> */}

       {/* Wave animation */}
       <div className="flex justify-center gap-1 mt-4">
         <span className="h-2">
             <Bars  />
        </span>
         {/* {[...Array(5)].map((_, i) => (
           <span
             key={i}
             className="w-1 h-6 bg-yellow-300 rounded-full animate-pulse"
             style={{ animationDelay: `${i * 0.15}s` }}           />
        ))} */}
       </div>

       

      <h3 className="mt-7 text-xl font-bold text-white">
        {current.host_name || "STJ"}
      </h3>
      <p className="text-yellow-300 font-semibold">
        {current.title || "Morning Drive"}
      </p>
      <p className="text-white/70 text-sm">
        Live • {new Date(current.start_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} –{" "}
        {new Date(current.end_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
      </p>
    </div>
  );
}
