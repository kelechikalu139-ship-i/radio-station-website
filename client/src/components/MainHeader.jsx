import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Radio, Play, Pause, Sun, Moon } from "lucide-react";
import { useAudio } from "../context/AudioContext";

/**
 * MainNavbar.jsx
 * - Sticky on scroll
 * - Read/play state from AudioContext
 * - Responsive mobile menu
 * - Theme toggle (dark mode) persisted in localStorage
 */

export default function MainNavbar() {
  const { playing, toggle } = useAudio();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Theme state (light | dark)
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem("theme") || "light";
    } catch {
      return "light";
    }
  });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Apply theme to document element and persist
  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    try {
      localStorage.setItem("theme", theme);
    } catch {}
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "backdrop-blur-sm bg-white/70 dark:bg-gray-900/70 border-b border-white/8 dark:border-gray-800/40"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-3">
            <div
              className={`w-15 h-15 rounded-lg bg-linear-to-br from-yellow-300 to-yellow-400 flex items-center justify-center text-purple-900 font-extrabold text-lg shadow-sm`}
            >
              {/* NEX */}
              <img src="/images/oaps/nexter_logo.jpeg" alt="`nexterlogo"
              className="w-full h-full  object-cover rounded-lg bg-yellow-350 p-1" 
              />
            </div>
            <div className="hidden sm:block">
              <div
                className={`font-bold text-lg leading-tight ${
                  scrolled ? "text-purple-900 dark:text-white" : "text-white"
                }`}
              >
                Nexter Radio
              </div>
              <div
                className={`text-xs -mt-0.5 ${
                  scrolled ? "text-gray-700 dark:text-gray-300" : "text-white/70"
                }`}
              >
                Next Gen Radio
                97.9
              </div>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link
              to="/programs"
              className={`${scrolled ? "text-gray-700 dark:text-gray-200" : "text-white/90"} text-sm hover:text-yellow-300 transition`}
            >
              Programs
            </Link>
            <Link
              to="/player"
              className={`${scrolled ? "text-gray-700 dark:text-gray-200" : "text-white/90"} text-sm hover:text-yellow-300 transition`}
            >
              Player
            </Link>
            <Link
              to="/about"
              className={`${scrolled ? "text-gray-700 dark:text-gray-200" : "text-white/90"} text-sm hover:text-yellow-300 transition`}
            >
              About
            </Link>
            <Link
              to="/oaps"
              className={`${scrolled ? "text-gray-700 dark:text-gray-200" : "text-white/90"} text-sm hover:text-yellow-300 transition`}
            >
              OAPS
            </Link>

            <Link
              to="/newsevent"
              className={`${scrolled ? "text-gray-700 dark:text-gray-200" : "text-white/90"} text-sm hover:text-yellow-300 transition`}
            >
              News and Event
            </Link>
            <Link
              to="/contact"
              className={`${scrolled ? "text-gray-700 dark:text-gray-200" : "text-white/90"} text-sm hover:text-yellow-300 transition`}
            >
              Contact
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            {/* Live pulse badge */}
            <div
              className={`hidden sm:flex items-center gap-2 px-3 py-1 rounded-full ${
                scrolled ? "bg-yellow-100/60" : "bg-white/6"
              } border border-white/6`}
            >
              <div className="relative">
                <span className="absolute -inset-1 rounded-full animate-ping bg-yellow-300/40 blur-sm" />
                <Radio size={14} className="text-yellow-300 relative z-10" />
              </div>
              <span className={`${scrolled ? "text-purple-900 dark:text-white" : "text-white/90"} text-sm`}>Live</span>
            </div>

            {/* Listen CTA */}
            <button
              onClick={() => {
                toggle();
                setOpen(false);
              }}
              className="hidden sm:inline-flex items-center gap-2 font-semibold px-4 py-2 rounded-xl shadow transition transform bg-linear-to-r from-yellow-400 to-yellow-300 text-purple-900 hover:scale-[1.02]"
              aria-label="Toggle live audio"
            >
              {playing ? <Pause size={16} /> : <Play size={16} />}
              <span className="text-sm">{playing ? "Pause" : "Listen Live"}</span>
            </button>

            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              title="Toggle dark mode"
              className={`p-2 rounded-md hover:bg-gray-100/40 dark:hover:bg-gray-800/40 transition ${
                scrolled ? "text-purple-900 dark:text-gray-100" : "text-white/90"
              }`}
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <button
              className={`${scrolled ? "text-purple-900 dark:text-gray-100" : "text-white/90"} md:hidden p-2 rounded-md`}
              onClick={() => setOpen((s) => !s)}
              aria-label={open ? "Close menu" : "Open menu"}
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="md:hidden mt-2 pb-4">
            <div className="flex flex-col gap-2 bg-white/6 dark:bg-gray-800/60 rounded-xl p-4 border border-white/6 backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <button
                  onClick={() => {
                    toggle();
                    setOpen(false);
                  }}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/8 dark:hover:bg-gray-700/40 transition"
                >
                  <span>{playing ? "Pause" : "Listen Live"}</span>
                  <span className="text-yellow-300 font-semibold">{playing ? "Live" : "Play"}</span>
                </button>

                <button
                  onClick={toggleTheme}
                  aria-label="Toggle theme"
                  title="Toggle dark mode"
                  className="p-2 rounded-md hover:bg-gray-100/40 dark:hover:bg-gray-700/40 transition"
                >
                  {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
                </button>
              </div>

              <Link to="/programs" onClick={() => setOpen(false)} className="px-3 py-2 rounded-lg hover:bg-white/8 dark:hover:bg-gray-700/40 transition">
                Programs
              </Link>
              <Link to="/player" onClick={() => setOpen(false)} className="px-3 py-2 rounded-lg hover:bg-white/8 dark:hover:bg-gray-700/40 transition">
                Player
              </Link>
              <Link to="/about" onClick={() => setOpen(false)} className="px-3 py-2 rounded-lg hover:bg-white/8 dark:hover:bg-gray-700/40 transition">
                About
              </Link>
              <Link to="/oaps" onClick={() => setOpen(false)} className="px-3 py-2 rounded-lg hover:bg-white/8 dark:hover:bg-gray-700/40 transition">
                OAPS
              </Link>
              <Link to="/newsevent" onClick={() => setOpen(false)} className="px-3 py-2 rounded-lg hover:bg-white/8 dark:hover:bg-gray-700/40 transition">
                News and Event
              </Link>
              <Link to="/contact" onClick={() => setOpen(false)} className="px-3 py-2 rounded-lg hover:bg-white/8 dark:hover:bg-gray-700/40 transition">
                Contact
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
