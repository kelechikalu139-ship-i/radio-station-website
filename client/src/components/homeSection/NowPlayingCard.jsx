// import React from "react";
// import { Play, Pause, Music, Radio } from "lucide-react";
// // import { useAudio } from "../../context/AudioContext";
// import { useAudio } from "../../context/AudioContext";

// const NowPlayingCard = ({ className = "" }) => {
//      const { nowPlaying, playing, toggle } = useAudio();

//   return (
//     <div className={`bg-white/6 border border-white/8 rounded-2xl p-4 ${className}`}>
//       <div className="flex items-start gap-4">
//         <div className="w-20 h-20 rounded-lg bg-linear-to-br from-yellow-300 to-yellow-400 flex items-center justify-center text-purple-900 font-extrabold text-2xl">
//           NEX
//         </div>
//         <div className="flex-1">
//           <div className="text-xs text-white/80">Now Playing</div>
//           <div className="font-semibold text-white text-lg mt-1">{nowPlaying?.title ?? "Nexter FM Live"}</div>
//           <div className="text-sm text-white/70">{nowPlaying?.artist ?? "Various Artists"} • {nowPlaying?.show ?? "Live Stream"}</div>
//           <div className="mt-3 flex items-center gap-3">
//             <button onClick={toggle} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-linear-to-r from-yellow-400 to-yellow-300 text-purple-900 font-semibold shadow">
//               {playing ? <Pause /> : <Play />}
//               <span className="text-sm">{playing ? "Pause" : "Play"}</span>
//             </button>
//             <div className="text-xs text-white/70">Bitrate: {nowPlaying?.bitrate ?? "—"}</div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default NowPlayingCard



// NowPlayingCard.jsx
import React, { useState } from 'react';
import { Pause, Play } from 'lucide-react';

export default function NowPlayingCard() {
  const [playing, setPlaying] = useState(true);

  return (
    <div className="fixed left-6 bottom-6 z-40 bg-white rounded-lg shadow-md p-3 flex items-center gap-3 w-72">
      <div className="w-12 h-12 rounded-md bg-purple-100 flex items-center justify-center">
        <div className="font-semibold text-purple-700">SB</div>
      </div>

      <div className="flex-1">
        <div className="text-sm font-medium">S.D Bawa</div>
        <div className="text-xs text-gray-500">Morning Ride — Live</div>
      </div>

      <button onClick={() => setPlaying(p => !p)} aria-label={playing ? 'Pause' : 'Play'} className="p-2 rounded-full bg-gray-100">
        {playing ? <Pause size={14} /> : <Play size={14} />}
      </button>
    </div>
  );
}
