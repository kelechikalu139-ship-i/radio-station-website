// import React from "react";
// import { motion } from "framer-motion";
// import { Youtube, Play } from "lucide-react";

// const videos = [
//   {
//     id: 1,
//     title: "Live Studio Session - Morning Drive",
//     youtubeId: "https://youtu.be/am_ktV4s5v0?si=ZTSrltWv87hmtIK8", 
//   },
//   {
//     id: 2,
//     title: "DJ Kalu Exclusive Interview",
//     // youtubeId: "3tmd-ClpJxA",
//     youtubeId: "https://youtu.be/xUl2WimXdTw?si=hSFqtU5qsYlJuj-s"
//   },
//   {
//     id: 3,
//     title: "Nexter FM Behind the Scenes",
//     youtubeId: "https://youtu.be/-_6knYrXDBw?si=vyUhfkipi5JCo6MQ",
//   },
// ];

// export default function RadioVideoSection() {
//   return (
//     <section className="container mx-auto px-6 py-10">
//       {/* Header */}
//       <div className="flex items-center justify-between mb-6">
//         <h2 className="text-xl md:text-2xl font-bold text-white">
//           Watch Nexter FM Live & Highlights
//         </h2>

//         <a
//           href="https://youtube.com/@NEXTERTV"
//           target="_blank"
//           rel="noreferrer"
//           className="text-sm flex items-center gap-2 text-red-600 font-semibold"
//         >
//           <Youtube size={18} />
//           Visit Channel
//         </a>
//       </div>

//       {/* Video Grid */}
//       <div className="grid md:grid-cols-3 gap-6">
//         {videos.map((v) => (
//           <motion.div
//             key={v.id}
//             whileHover={{ scale: 1.02 }}
//             className="bg-white rounded-xl shadow-lg overflow-hidden border"
//           >
//             {/* Responsive YouTube iframe */}
//             <div className="relative w-full aspect-video bg-black">
//               {/* <iframe
//                 src={`https://www.youtube.com/embed/${v.youtubeId}`}
//                 title={v.title}
//                 className="absolute inset-0 w-full h-full rounded-t-xl"
//                 allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                 allowFullScreen
//               /> */}

//               <iframe 
//               width="560" height="315"
//                src="https://www.youtube.com/embed/xUl2WimXdTw?si=hSFqtU5qsYlJuj-s"
//                 title="YouTube video player" 
//                 frameborder="0" allow="accelerometer; 
//                 autoplay; clipboard-write; encrypted-media; 
//                 gyroscope; picture-in-picture; web-share" 
//                 referrerpolicy="strict-origin-when-cross-origin" 
//                 allowfullscreen></iframe>
//             </div>

//             {/* Info */}
//             <div className="p-4">
//               <h3 className="font-semibold text-gray-800 text-sm md:text-base">
//                 {v.title}
//               </h3>

//               <a
//                 href={`https://youtu.be/${v.youtubeId}`}
//                 target="_blank"
//                 rel="noreferrer"
//                 className="inline-flex items-center gap-2 text-sm text-purple-700 mt-2"
//               >
//                 <Play size={16} /> Watch Full Video
//               </a>
//             </div>
//           </motion.div>
//         ))}
//       </div>
//     </section>
//   );
// }




import React from "react";
import { motion } from "framer-motion";
import { Youtube, Play } from "lucide-react";

const videos = [
  {
    id: 1,
    title: "Live Studio Session - News Headlines",
    youtubeId: "am_ktV4s5v0",
  },
  {
    id: 2,
    title: "Gaskiyar Magana Game da Sabuwar Dokar Haraji ta 2025",
    youtubeId: "xUl2WimXdTw",
  },
  {
    id: 3,
    title: "Nexter Gist",
    youtubeId: "-_6knYrXDBw",
  },
];

export default function RadioVideoSection() {
  return (
    <section className="container mx-auto px-6 py-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl md:text-2xl font-bold text-white">
          Watch Nexter FM Live & Highlights
        </h2>

        <a
          href="https://youtube.com/@NEXTERTV"
          target="_blank"
          rel="noreferrer"
          className="text-sm flex items-center gap-2 text-red-600 font-semibold"
        >
          <Youtube size={18} />
          Visit Channel
        </a>
      </div>

      {/* Video Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {videos.map((v) => (
          <motion.div
            key={v.id}
            whileHover={{ scale: 1.02 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden border"
          >
            {/* Responsive YouTube iframe */}
            <div className="relative w-full aspect-video bg-black">
              <iframe
                src={`https://www.youtube.com/embed/${v.youtubeId}`}
                title={v.title}
                className="absolute inset-0 w-full h-full rounded-t-xl"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            {/* Info */}
            <div className="p-4">
              <h3 className="font-semibold text-gray-800 text-sm md:text-base">
                {v.title}
              </h3>

              <a
                href={`https://youtu.be/${v.youtubeId}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-sm text-purple-700 mt-2"
              >
                <Play size={16} /> Watch Full Video
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
