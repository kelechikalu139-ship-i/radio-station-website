// import React, { useEffect, useMemo, useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { Play, Pause, Volume2, Share2, RefreshCcw, Radio } from "lucide-react";
// import { useAudio } from "../../context/AudioContext";


// /* small visualizer bars used in hero and player */
// function Bars({ playing, className = "" }) {
//   const bars = [1, 2, 3, 4, 5];
//   return (
//     <div className={`flex items-end gap-1 ${className}`}>
//       {bars.map((b, i) => (
//         <motion.span
//           key={i}
//           animate={playing ? { height: ["8px", `${8 + (i + 1) * 10}px`, "8px"] } : { height: "8px" }}
//           transition={{ duration: 0.6 + i * 0.06, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
//           className="w-1.5 bg-yellow-300 rounded-sm"
//           style={{ display: "inline-block" }}
//         />
//       ))}
//     </div>
//   );
// }

// const MainPlayer = () => {

//     const { playing, toggle, volume, setVolume, nowPlaying } = useAudio();
//   const [quality, setQuality] = useState("128kbps");

//   // show liveSince if provided
//   const [liveSince, setLiveSince] = useState(null);
//   useEffect(() => {
//     if (nowPlaying?.updatedAt) setLiveSince(new Date(nowPlaying.updatedAt));
//   }, [nowPlaying?.updatedAt]);

//   // fake progress for live stream (pulse)
//   const progress = useMemo(() => (playing ? 40 + Math.floor(Math.random() * 30) : 0), [playing]);

  
//   return (
//     <div>
//         <main className="container mx-auto px-6 py-10">
//         <motion.section
//           initial={{ opacity: 0, y: 8 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.45 }}
//           className="bg-linear-to-br from-purple-800 to-purple-700 text-white rounded-3xl shadow-2xl overflow-hidden border-t-4 border-yellow-400"
//           aria-label="Nexter FM Player"
//         >
//           <div className="grid md:grid-cols-3 gap-6 p-6">
//             {/* Left: album / station art + visualizer */}
//             <div className="md:col-span-1 flex flex-col items-center gap-4">
//               <motion.div
//                 layout
//                 className="w-48 h-48 rounded-2xl bg-linear-to-br from-yellow-300 to-yellow-400 flex items-center justify-center text-purple-900 text-4xl font-extrabold shadow-inner"
//               >
//                 NEX
//               </motion.div>

//               <div className="flex items-center gap-4 mt-2">
//                 <AnimatePresence mode="wait" initial={false}>
//                   <motion.div
//                     key={playing ? "playing" : "paused"}
//                     initial={{ opacity: 0, y: 8 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     exit={{ opacity: 0, y: -8 }}
//                     transition={{ duration: 0.25 }}
//                   >
//                     <Bars playing={playing} />
//                   </motion.div>
//                 </AnimatePresence>
//               </div>

//               <div className="text-xs text-white/70 mt-3">{quality}</div>
//               <div className="flex items-center gap-2 mt-2">
//                 <button onClick={() => setQuality("64kbps")} className="px-2 py-1 rounded-md text-xs bg-white/6 hover:bg-white/10 transition" aria-label="Set quality 64">64</button>
//                 <button onClick={() => setQuality("128kbps")} className="px-2 py-1 rounded-md text-xs bg-white/6 hover:bg-white/10 transition" aria-label="Set quality 128">128</button>
//                 <button onClick={() => setQuality("256kbps")} className="px-2 py-1 rounded-md text-xs bg-white/6 hover:bg-white/10 transition" aria-label="Set quality 256">256</button>
//               </div>
//             </div>

//             {/* Center: metadata + big controls */}
//             <div className="md:col-span-2 flex flex-col justify-center gap-4">
//               <div className="flex items-start justify-between gap-4">
//                 <div>
//                   <div className="text-sm text-yellow-300 font-semibold">Now Playing</div>
//                   <h2 className="text-2xl md:text-3xl font-extrabold text-white/98">{nowPlaying?.title ?? "Nexter FM Live"}</h2>
//                   <div className="text-sm text-white/80 mt-1">{nowPlaying?.artist ?? "Various Artists"}</div>
//                   <div className="text-xs text-white/60 mt-2">Show: {nowPlaying?.show ?? "24/7 Live Stream"}</div>
//                 </div>

//                 <div className="text-right">
//                   <div className="text-xs text-white/70">Listeners</div>
//                   <div className="font-bold text-xl">{nowPlaying?.listeners ?? "—"}</div>
//                   <div className="text-xs text-white/60 mt-1">{nowPlaying?.bitrate ? `${nowPlaying.bitrate} kbps` : "Live"}</div>
//                 </div>
//               </div>

//               {/* Big controls */}
//               <div className="mt-4 flex items-center gap-4">
//                 <button
//                   onClick={toggle}
//                   aria-pressed={playing}
//                   className="inline-flex items-center gap-3 bg-linear-to-r from-yellow-400 to-yellow-300 text-purple-900 font-bold px-6 py-3 rounded-full shadow-lg hover:scale-[1.03] transition focus:outline-none focus:ring-2 focus:ring-yellow-300"
//                 >
//                   {playing ? <Pause size={18} /> : <Play size={18} />}
//                   <span className="text-base">{playing ? "Pause" : "Play"}</span>
//                 </button>

//                 <div className="flex items-center gap-3 bg-white/6 rounded-xl px-3 py-2">
//                   <Volume2 />
//                   <input aria-label="Volume" type="range" min={0} max={1} step={0.01} value={volume} onChange={(e) => setVolume(Number(e.target.value))} className="w-48 accent-yellow-300" />
//                 </div>

//                 <button onClick={() => window.open("/share", "_blank")} className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-white/6 hover:bg-white/10 transition" aria-label="Share">
//                   <Share2 />
//                   <span className="text-sm">Share</span>
//                 </button>

//                 <button onClick={() => window.location.reload()} className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-white/6 hover:bg-white/10 transition" aria-label="Reconnect stream">
//                   <RefreshCcw />
//                   <span className="text-sm">Reconnect</span>
//                 </button>
//               </div>

//               {/* Live progress / placeholder */}
//               <div className="mt-4">
//                 <div className="w-full bg-white/6 rounded-full h-2 overflow-hidden">
//                   <motion.div initial={{ width: 0 }} animate={{ width: `${progress}%` }} transition={{ duration: 0.9, ease: "easeOut" }} className="h-2 bg-yellow-300" />
//                 </div>
//                 <div className="flex items-center justify-between text-xs text-white/70 mt-2">
//                   <span>{playing ? "Live" : "Paused"}</span>
//                   <span>{new Date().toLocaleTimeString()}</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </motion.section>

//         {/* Extra: small playlist / recent tracks card */}
//         <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.12 }} className="mt-6">
//           <div className="grid md:grid-cols-3 gap-4">
//             <div className="bg-white rounded-xl p-4 shadow border-t-4 border-yellow-400">
//               <div className="text-sm text-gray-600">Recent tracks (demo)</div>
//               <ul className="mt-3 space-y-2 text-sm">
//                 <li className="flex items-center justify-between">
//                   <div>Artist — Song title</div>
//                   <div className="text-xs text-gray-500">2m ago</div>
//                 </li>
//                 <li className="flex items-center justify-between">
//                   <div>Artist — Song title</div>
//                   <div className="text-xs text-gray-500">12m ago</div>
//                 </li>
//                 <li className="flex items-center justify-between">
//                   <div>Artist — Song title</div>
//                   <div className="text-xs text-gray-500">35m ago</div>
//                 </li>
//               </ul>
//             </div>

//             <div className="bg-white rounded-xl p-4 shadow border-t-4 border-purple-700">
//               <div className="text-sm text-gray-600">Show info</div>
//               <div className="mt-2 text-sm text-gray-800">
//                 <div className="font-semibold">{nowPlaying?.show ?? "24/7 Live Stream"}</div>
//                 <div className="text-xs text-gray-500 mt-1">Host: DJ Kalu</div>
//                 <p className="mt-2 text-xs text-gray-600">Tune in for exclusive interviews and live sets.</p>
//               </div>
//             </div>

//             <div className="bg-white rounded-xl p-4 shadow border-t-4 border-purple-700">
//               <div className="text-sm text-gray-600">Player tips</div>
//               <ul className="mt-3 text-xs space-y-2 text-gray-700">
//                 <li>Use the reconnect button if stream fails.</li>
//                 <li>Mobile browsers require a tap to start audio.</li>
//                 <li>Quality selector changes the streamed bitrate (if server supports).</li>
//               </ul>
//             </div>
//           </div>
//         </motion.section>
//       </main>
//     </div>
//   )
// }

// export default MainPlayer


import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, Volume2, Share2, RefreshCcw, Radio } from "lucide-react";
import { useAudio } from "../../context/AudioContext";


/* Visualizer bars */
function Bars({ playing }) {
  return (
    <div className="flex items-end gap-1 h-6">
      {[...Array(5)].map((_, i) => (
        <motion.span
          key={i}
          animate={{
            height: playing ? [6, 18 + i * 6, 6] : 6,
          }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
            delay: i * 0.05,
          }}
          className="w-1.5 bg-yellow-300 rounded"
        />
      ))}
    </div>
  );
}

export default function MainPlayer() {
  const { playing, toggle, volume, setVolume, nowPlaying } = useAudio();
  const [quality, setQuality] = useState("128kbps");

  const progress = useMemo(
    () => (playing ? 45 + Math.random() * 20 : 0),
    [playing]
  );

  return (
    <main className="container mx-auto px-4 py-6">
      <motion.section
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-linear-to-br from-purple-800 to-purple-700 text-white rounded-3xl shadow-xl overflow-hidden"
      >
        {/* MAIN CONTENT */}
        <div className="grid lg:grid-cols-2 gap-6 p-5">

          {/* LEFT: ART + VISUALIZER */}
          <div className="flex flex-col items-center text-center gap-4">
            <div className="relative">
              <div className="w-44 h-44 sm:w-52 sm:h-52 rounded-2xl bg-linear-to-br from-yellow-300 to-yellow-400 flex items-center justify-center text-purple-900 text-4xl font-extrabold shadow-lg">
                NEX
              </div>

              <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-purple-900 px-3 py-1 text-xs rounded-full flex items-center gap-2">
                <Radio size={14} /> LIVE
              </span>
            </div>

            <AnimatePresence>
              <Bars playing={playing} />
            </AnimatePresence>

            {/* Quality selector */}
            <div className="flex gap-2 mt-1">
              {["64", "128", "256"].map(q => (
                <button
                  key={q}
                  onClick={() => setQuality(`${q}kbps`)}
                  className={`px-3 py-1 text-xs rounded-full ${
                    quality.startsWith(q)
                      ? "bg-yellow-300 text-purple-900 font-semibold"
                      : "bg-white/10"
                  }`}
                >
                  {q}
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT: INFO + CONTROLS */}
          <div className="flex flex-col justify-between gap-6">
            {/* Metadata */}
            <div>
              <div className="text-sm text-yellow-300 font-semibold">
                Now Playing
              </div>
              <h2 className="text-xl sm:text-2xl font-bold mt-1">
                {nowPlaying?.title || "Nexter FM Live"}
              </h2>
              <p className="text-sm text-white/80 mt-1">
                {nowPlaying?.artist || "Various Artists"}
              </p>
              <p className="text-xs text-white/60 mt-1">
                Show: {nowPlaying?.show || "24/7 Live Stream"}
              </p>
            </div>

            {/* Controls */}
            <div className="flex flex-col gap-4">
              <button
                onClick={toggle}
                className="w-full h-14 rounded-full bg-linear-to-r from-yellow-400 to-yellow-300 text-purple-900 font-bold flex items-center justify-center gap-3 shadow-lg active:scale-95"
              >
                {playing ? <Pause size={22} /> : <Play size={22} />}
                {playing ? "Pause Live" : "Play Live"}
              </button>

              {/* Volume */}
              <div className="flex items-center gap-3 bg-white/10 rounded-xl px-4 py-3">
                <Volume2 size={18} />
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.01}
                  value={volume}
                  onChange={(e) => setVolume(Number(e.target.value))}
                  className="flex-1 accent-yellow-300"
                />
              </div>

              {/* Actions */}
              <div className="flex justify-between gap-3">
                <button className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-white/10">
                  <Share2 size={16} /> Share
                </button>
                <button
                  onClick={() => window.location.reload()}
                  className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-white/10"
                >
                  <RefreshCcw size={16} /> Reconnect
                </button>
              </div>
            </div>

            {/* Progress */}
            <div>
              <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  animate={{ width: `${progress}%` }}
                  className="h-2 bg-yellow-300"
                />
              </div>
              <div className="flex justify-between text-xs text-white/70 mt-2">
                <span>{playing ? "LIVE" : "PAUSED"}</span>
                <span>{new Date().toLocaleTimeString()}</span>
              </div>
            </div>
          </div>
        </div>
      </motion.section>
    </main>
  );
}
