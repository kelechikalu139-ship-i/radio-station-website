// import React, { useEffect, useState } from "react";
// import { Play, Pause } from "lucide-react";
// import { useAudio } from "../../context/AudioContext";


// const StickyListenButton = () => {
//     const { playing, toggle } = useAudio();
//   const [visible, setVisible] = useState(false);

//   useEffect(() => {
//     const onScroll = () => setVisible(window.scrollY > 150);
//     onScroll();
//     window.addEventListener("scroll", onScroll);
//     return () => window.removeEventListener("scroll", onScroll);
//   }, []);
  
//   return (
//         <button
//       onClick={toggle}
//       className={`fixed right-6 bottom-6 z-50 flex items-center gap-3 px-4 py-3 rounded-full shadow-lg transition-transform ${visible ? 'translate-y-0' : 'translate-y-6 opacity-0'}`}
//       style={{ background: 'linear-gradient(90deg,#FBBF24,#F59E0B)' }}
//       aria-pressed={playing}
//     >
//       {playing ? <Pause /> : <Play />} <span className="font-semibold text-purple-900">Listen</span>
//     </button>
//   )
// }

// export default StickyListenButton


// StickyListenButton.jsx
import React from 'react';
import { Play } from 'lucide-react';

export default function StickyListenButton() {
  return (
    <a href="/player" aria-label="Open player"
      className="fixed bottom-6 right-6 z-50 inline-flex items-center gap-3 rounded-full bg-yellow-400 text-purple-900 px-4 py-3 shadow-lg hover:scale-105 transition">
      <Play size={18} /> Listen
    </a>
  );
}
