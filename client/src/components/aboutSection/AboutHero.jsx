import React from "react";
import {
  Play,
  Pause,
  Radio,
  Volume2,
  Twitter,
  Instagram,
  Facebook,
  ArrowRight,
  Link2,
} from "lucide-react";
import { useAudio } from "../../context/AudioContext";
// import AboutUs from '../components/AboutUs'

const AboutHero = () => {
    
  const { playing, toggle, volume, setVolume, nowPlaying } = useAudio();
  return (
    <div>
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
          <pattern
            id="dots-hero"
            width="80"
            height="80"
            patternUnits="userSpaceOnUse"
          >
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
              Nexter FM — <span className="text-yellow-300">Who We Are</span>
            </h1>

            <p className="max-w-2xl text-lg text-white/85 leading-relaxed">
              World-class broadcasting, bold music curation, and fearless
              conversation. Tune in for live shows, exclusive interviews, and
              community stories.
            </p>

           
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
              <div className="bg-white/5 rounded-lg p-3">
                <div className="text-2xl font-bold text-yellow-300">1.2K</div>
                <div className="text-white/70">Live listeners</div>
              </div>
              <div className="bg-white/5 rounded-lg p-3">
                <div className="text-2xl font-bold text-yellow-300">120+</div>
                <div className="text-white/70">Episodes</div>
              </div>
              <div className="bg-white/5 rounded-lg p-3">
                <div className="text-2xl font-bold text-yellow-300">10</div>
                <div className="text-white/70">OAPs</div>
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
                    <h4 className="text-4xl">About Us</h4>
                    <div className="text-sm text-yellow-200">Next Generation Radio</div>
                    <div className="mt-1 font-bold text-white text-2xl">
                      {/* {nowPlaying.title} */}
                    </div>
                    <div className="text-sm text-white/80 mt-1">
                      {/* {nowPlaying.artist} */}
                    </div>
                  </div>
                </div>
              </div>

              {/* audio element is owned by AudioProvider; this is just a redundancy guard if needed */}
            </div>
          </div>
        </div>
      </div>
    </section>
    </div>
  )
}

export default AboutHero