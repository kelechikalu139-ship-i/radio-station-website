import React from 'react'
import {
  Play,
  Pause,
  Radio,
  Volume2,
  Twitter,
  Instagram,
  Facebook,
  ArrowRight,
  Link2
} from "lucide-react";
import { useAudio } from "../../context/AudioContext";

const ProgramHero = () => {
     const { playing, toggle, volume, setVolume, nowPlaying } = useAudio();
  return (
       <section
      aria-label="Nexter FM hero"
      className="relative min-h-screen flex items-center text-white overflow-hidden"
    >
      {/* Background gradient */}
      <div
        className="absolute inset-0 bg-linear-to-br from-purple-800 via-purple-700 to-yellow-400 transform-gpu"
        aria-hidden
      />

      {/* Decorative pattern */}
      <svg
        className="absolute inset-0 w-full h-full opacity-10"
        preserveAspectRatio="none"
        aria-hidden
      >
        <defs>
          <pattern id="dots-hero" width="80" height="80" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="2" fill="white" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dots-hero)" />
      </svg>

      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-black/30" aria-hidden />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center py-12">
          {/* Left: title, CTAs, now playing */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-3 mb-2">
              <span className="rounded-full bg-yellow-400/20 px-3 py-1 text-yellow-200 text-sm font-semibold flex items-center gap-2">
                <Radio size={16} className="text-yellow-300" /> Live 24/7
              </span>
              <span className="text-sm text-white/80">Studio • Minna</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight text-white drop-shadow-md">
              Nexter FM — <span className="text-yellow-300">Program Schedule</span>
            </h1>

            <p className="max-w-2xl text-lg text-white/85 leading-relaxed">
              World-class broadcasting, bold music curation, and fearless conversation.
              Tune in for live shows, exclusive interviews, and community stories.
            </p>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-4">
              <button
                onClick={toggle}
                className="inline-flex items-center gap-3 bg-linear-to-r from-yellow-400 to-yellow-300 text-purple-900 font-semibold px-5 py-3 rounded-xl shadow-lg hover:scale-[1.02] transition"
                aria-pressed={playing}
                aria-label={playing ? "Pause live stream" : "Play live stream"}
              >
                {playing ? <Pause size={18} /> : <Play size={18} />}
                <span>{playing ? "Pause Live" : "Listen Live"}</span>
              </button>

              <a
                href="/programs"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-white/20 text-sm font-semibold hover:bg-white/10 transition"
              >
                <span>See Programs</span>
                <ArrowRight size={16} />
              </a>

              <a
                href="/advertise"
                className="ml-0 sm:ml-2 inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm bg-white/5 hover:bg-white/10 transition"
              >
                <Link2 size={14} />
                Advertise
              </a>
            </div>

            {/* Now Playing card */}
            <div className="mt-6 w-full max-w-md bg-white/6 border border-white/8 rounded-2xl p-4 backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-white/80">Now Playing</div>
                  <div className="mt-1 font-semibold text-white text-lg">{nowPlaying.title}</div>
                  <div className="text-sm text-white/70">{nowPlaying.artist} • {nowPlaying.show}</div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Volume2 size={18} className="text-white/90" />
                    <input
                      aria-label="volume"
                      type="range"
                      min={0}
                      max={1}
                      step={0.01}
                      value={volume}
                      onChange={(e) => setVolume(Number(e.target.value))}
                      className="w-28 accent-yellow-300"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Thin stats */}
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
              <div className="bg-white/5 rounded-lg p-3">
                <div className="text-2xl font-bold text-yellow-300">12</div>
                <div className="text-white/70">Today's Programs</div>
              </div>
              <div className="bg-white/5 rounded-lg p-3">
                <div className="text-2xl font-bold text-yellow-300">40</div>
                <div className="text-white/70">Weekly</div>
              </div>
              <div className="bg-white/5 rounded-lg p-3">
                <div className="text-2xl font-bold text-yellow-300">10</div>
                <div className="text-white/70">OAPs on Air today</div>
              </div>
              <div className="bg-white/5 rounded-lg p-3">
                <div className="text-2xl font-bold text-yellow-300">Global</div>
                <div className="text-white/70">Streaming</div>
              </div>
            </div>
          </div>

          {/* Right: player card, up next, socials */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl ring-1 ring-black/30">
              <div className="bg-linear-to-b from-purple-700 to-purple-800 p-6">
                <div className="flex items-center gap-4">
                  <div className="w-28 h-28 rounded-xl bg-linear-to-br from-yellow-300 to-yellow-400 flex items-center justify-center text-purple-900 text-3xl font-extrabold">
                    NEX
                  </div>
                  <div className="flex-1">
                    <div className="text-sm text-yellow-200">Live Now</div>
                    <div className="mt-1 font-bold text-white text-2xl">{nowPlaying.title}</div>
                    <div className="text-sm text-white/80 mt-1">{nowPlaying.artist}</div>
                  </div>
                </div>

                <div className="mt-6 flex items-center gap-4">
                  <button
                    onClick={toggle}
                    className="h-14 w-44 bg-yellow-300 text-purple-900 rounded-full font-bold flex items-center justify-center gap-3 shadow-lg hover:scale-[1.02] transition"
                  >
                    {playing ? <Pause size={18} /> : <Play size={18} />}
                    <span>{playing ? "Pause" : "Play Live"}</span>
                  </button>

                  <a href="/schedule" className="inline-flex items-center gap-2 px-4 py-3 rounded-lg bg-white/5 hover:bg-white/10 transition">
                    <span className="text-sm font-semibold">Full schedule</span>
                  </a>
                </div>

                <div className="mt-6 bg-white/6 border border-white/8 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex-1">
                      <div className="text-xs text-white/80">Up Next</div>
                      <div className="font-semibold text-white mt-1">Evening Drive</div>
                      <div className="text-sm text-white/70">Host: DJ Kalu • 18:00 - 20:00</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-white/60">In</div>
                      <div className="font-bold text-yellow-300 text-lg">12m</div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex items-center gap-3">
                  <a href="https://twitter.com" aria-label="Twitter" className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-white/6 hover:bg-white/12 transition">
                    <Twitter size={16} />
                    <span className="text-sm">Twitter</span>
                  </a>
                  <a href="https://instagram.com" aria-label="Instagram" className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-white/6 hover:bg-white/12 transition">
                    <Instagram size={16} />
                    <span className="text-sm">Instagram</span>
                  </a>
                  <a href="https://facebook.com" aria-label="Facebook" className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-white/6 hover:bg-white/12 transition">
                    <Facebook size={16} />
                    <span className="text-sm">Facebook</span>
                  </a>
                </div>
              </div>

              {/* audio element is owned by AudioProvider; this is just a redundancy guard if needed */}
             
            </div>
          </div>
        </div>
         
      </div>
    </section>
  )
}

export default ProgramHero