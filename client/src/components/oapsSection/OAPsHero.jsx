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
  Link2,
  Youtube,
  MessageCircle,
  Mic,
  Mic2Icon,
} from "lucide-react";
import { useAudio } from "../../context/AudioContext";

const OAPsHero = () => {
    const { playing, toggle, volume, setVolume, nowPlaying } = useAudio();
  return (
    <div>
           <section
        aria-label="Nexter FM — Contact hero"
        className="relative min-h-[80vh] flex items-center text-white overflow-hidden"
      >
        {/* Background gradient */}
        <div
          className="absolute inset-0 bg-linear-to-br from-purple-800 via-purple-700 to-yellow-400 transform-gpu"
          aria-hidden
        />

        {/* Decorative pattern */}
        <svg
          className="absolute inset-0 w-full h-full opacity-8"
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

        {/* Dark overlay for contrast */}
        <div className="absolute inset-0 bg-black/35" aria-hidden />

        <div className="container mx-auto px-6 relative z-10 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left copy */}
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-3">
                <span className="rounded-full bg-yellow-400/20 px-3 py-1 text-yellow-200 text-sm font-semibold flex items-center gap-2">
                  <Radio size={16} className="text-yellow-300" /> Live 24/7
                </span>
                <span className="text-sm text-white/80">Studio • Minna</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight">
                Nexter FM — <span className="text-yellow-300">Meet Our OAPs</span>
              </h1>

              <p className="max-w-2xl text-lg text-white/85 leading-relaxed">
                World-class broadcasting, bold music curation, and fearless conversation.
                We’d love to hear from listeners, sponsors and partners — reach out and we’ll respond quickly.
              </p>

              <div className="flex flex-wrap items-center gap-3 mt-4">
                <button
                  onClick={toggle}
                  className="inline-flex items-center gap-3 bg-linear-to-r from-yellow-400 to-yellow-300 text-purple-900 font-semibold px-4 py-2 rounded-xl shadow hover:scale-[1.02] transition"
                  aria-pressed={playing}
                >
                  {playing ? <Pause size={16} /> : <Play size={16} />}
                  <span className="text-sm">{playing ? "Pause Live" : "Listen Live"}</span>
                </button>

                <a
                  href="/programs"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-white/20 text-sm font-semibold hover:bg-white/10 transition"
                >
                  See Programs
                  <ArrowRight size={14} />
                </a>

                <a
                  href="/advertise"
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm bg-white/5 hover:bg-white/10 transition"
                >
                  <Link2 size={14} />
                  Advertise
                </a>
              </div>

              {/* Socials */}
              <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                <a
                  href="https://twitter.com"
                  className="flex items-center gap-3 bg-white/6 rounded-lg p-3 hover:bg-white/12 transition"
                  aria-label="X / Twitter"
                >
                  {/* <div className="text-yellow-300 font-bold">X</div> */}
                  <Twitter/>
                  <div className="text-white/80">Follow</div>
                </a>

                <a
                  href="https://facebook.com"
                  className="flex items-center gap-3 bg-white/6 rounded-lg p-3 hover:bg-white/12 transition"
                  aria-label="Facebook"
                >
                  <Facebook />
                  <div className="text-white/80">Like</div>
                </a>

                <a
                  href="https://instagram.com"
                  className="flex items-center gap-3 bg-white/6 rounded-lg p-3 hover:bg-white/12 transition"
                  aria-label="Instagram"
                >
                  <Instagram />
                  <div className="text-white/80">Follow</div>
                </a>

                <a
                  href="https://youtube.com"
                  className="flex items-center gap-3 bg-white/6 rounded-lg p-3 hover:bg-white/12 transition"
                  aria-label="YouTube"
                >
                  <Youtube />
                  <div className="text-white/80">Subscribe</div>
                </a>
              </div>

        
            </div>

            {/* Right card */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl overflow-hidden shadow-2xl ring-1 ring-black/30 bg-linear-to-b from-purple-700 to-purple-800 p-6">
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 rounded-xl bg-linear-to-br from-yellow-300 to-yellow-400 flex items-center justify-center text-purple-900 text-3xl font-extrabold">
                    NEX
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-white">OAPS</h3>
                    <div className="text-sm text-yellow-200 mt-1">Next Generation Radio</div>
                    <div className="mt-3 text-white/90 font-semibold">{nowPlaying?.title}</div>
                    <div className="text-sm text-white/80">{nowPlaying?.artist}</div>
                  </div>
                </div>

                <div className="mt-6 bg-white/6 border border-white/8 rounded-xl p-4">
                  <div className="text-sm text-white/80 animate-pulse"><Mic2Icon/></div>
                  <div className="mt-1 font-semibold text-white">Me the faces behide the mic</div>
                  <div className="text-sm text-white/70 mt-1">Blazing your airwayes</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default OAPsHero