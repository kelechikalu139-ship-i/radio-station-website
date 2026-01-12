import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, Volume2, Share2, RefreshCcw, Radio } from "lucide-react";
import { useAudio } from "../../context/AudioContext";

/**
 * Player.jsx
 * - Compact hero (shorter than other pages) + animated player UI
 * - Requirements: AudioProvider (useAudio), framer-motion, lucide-react, Tailwind
 */

/* small visualizer bars used in hero and player */
function Bars({ playing, className = "" }) {
  const bars = [1, 2, 3, 4, 5];
  return (
    <div className={`flex items-end gap-1 ${className}`}>
      {bars.map((b, i) => (
        <motion.span
          key={i}
          animate={playing ? { height: ["8px", `${8 + (i + 1) * 10}px`, "8px"] } : { height: "8px" }}
          transition={{ duration: 0.6 + i * 0.06, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
          className="w-1.5 bg-yellow-300 rounded-sm"
          style={{ display: "inline-block" }}
        />
      ))}
    </div>
  );
}

const PlayerHero = () => {
      const { playing, toggle, volume, setVolume, nowPlaying } = useAudio();
  const [quality, setQuality] = useState("128kbps");

  // show liveSince if provided
  const [liveSince, setLiveSince] = useState(null);
  useEffect(() => {
    if (nowPlaying?.updatedAt) setLiveSince(new Date(nowPlaying.updatedAt));
  }, [nowPlaying?.updatedAt]);

  // fake progress for live stream (pulse)
  const progress = useMemo(() => (playing ? 40 + Math.floor(Math.random() * 30) : 0), [playing]);

  return (
        <section
        aria-label="Player hero"
        className="relative min-h-[60vh] flex items-center text-white overflow-hidden"
      >
        <div className="absolute inset-0 bg-linear-to-br from-purple-800 via-purple-700 to-yellow-400" aria-hidden />
        <div className="absolute inset-0 bg-black/30" aria-hidden />

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center py-8">
            <div className="md:col-span-8">
              <div className="inline-flex items-center gap-3 mb-2">
                <span className="rounded-full bg-yellow-400/20 px-3 py-1 text-yellow-200 text-sm font-semibold flex items-center gap-2">
                  <Radio size={16} className="text-yellow-300" /> Live
                </span>
                <span className="text-sm text-white/80">Streaming • Nexter Studio</span>
              </div>

              <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold leading-tight">
                Nexter FM Player — <span className="text-yellow-300">Listen Live</span>
              </h1>

              <p className="max-w-2xl text-sm md:text-base text-white/85 mt-3">
                Tune into live shows, curated music and exclusive interviews. Use the player controls below to
                play, pause and adjust quality.
              </p>

              <div className="mt-4 flex items-center gap-3">
                <button
                  onClick={toggle}
                  className="inline-flex items-center gap-2 bg-linear-to-r from-yellow-400 to-yellow-300 text-purple-900 font-semibold px-4 py-2 rounded-full shadow hover:scale-[1.02] transition"
                  aria-pressed={playing}
                >
                  {playing ? <Pause size={16} /> : <Play size={16} />}
                  <span className="text-sm">{playing ? "Pause Live" : "Listen Live"}</span>
                </button>

                <a
                  href="/programs"
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-full border border-white/20 text-sm hover:bg-white/10 transition"
                >
                  See Programs
                </a>

                <div className="ml-2 hidden sm:flex items-center gap-3">
                  <div className="text-xs text-white/80">Quality</div>
                  <div className="flex items-center gap-1 bg-white/6 rounded-md px-2 py-1">
                    <button onClick={() => setQuality("64kbps")} className={`px-2 py-1 rounded ${quality === "64kbps" ? "bg-white/10" : ""}`}>64</button>
                    <button onClick={() => setQuality("128kbps")} className={`px-2 py-1 rounded ${quality === "128kbps" ? "bg-white/10" : ""}`}>128</button>
                    <button onClick={() => setQuality("256kbps")} className={`px-2 py-1 rounded ${quality === "256kbps" ? "bg-white/10" : ""}`}>256</button>
                  </div>
                </div>
              </div>
            </div>

            {/* small hero card on right */}
            <div className="md:col-span-4">
              <div className="rounded-2xl p-4 bg-white/6 border border-white/8 shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-lg bg-linear-to-br from-yellow-300 to-yellow-400 flex items-center justify-center text-purple-900 font-extrabold">NEX</div>
                  <div className="flex-1">
                    <div className="text-xs text-yellow-300">Now Playing</div>
                    <div className="font-semibold text-white text-lg">{nowPlaying?.title ?? "Nexter FM Live"}</div>
                    <div className="text-xs text-white/70 mt-1">{nowPlaying?.artist ?? "Various"}</div>
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between">
                  <Bars playing={playing} />
                  <div className="text-xs text-white/60">{liveSince ? `Live since ${liveSince.toLocaleTimeString()}` : "Live"}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
  )
}

export default PlayerHero