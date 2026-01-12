// src/components/homeSection/SponsorsCarousel.jsx
import React, { useEffect, useRef, useState, useCallback } from "react";
import placeholderImg from "../../assets/px.jpg";

// If your shared JSON is inside the project you can import it directly.
// Fix your import path and filename — note I corrected "costants" -> "constants".
// Example path: project-root/shared/constants/sponsors.json
import SponsorsDataImported from "../../../../shared/constants/sponsors.json";

// Local fallback sponsors (used if both import & fetch fail)
const LOCAL_SPONSORS = [
  { id: 1, pic: "/images/sponsor1.png", alt: "Sponsor 1" },
  { id: 2, pic: "/images/sponsor2.png", alt: "Sponsor 2" },
  { id: 3, pic: "/images/sponsor3.png", alt: "Sponsor 3" },
  { id: 4, pic: "/images/sponsor4.png", alt: "Sponsor 4" },
];

export default function SponsorsCarousel({
  src = "/sponsors.json", // optional public json
  speed = 40,             // pixels per second
  gap = 24,               // gap between items in px (used for clones spacing)
}) {
  const [sponsors, setSponsors] = useState([]);
  const containerRef = useRef(null);
  const rafRef = useRef(null);
  const lastTimeRef = useRef();
  const pausedRef = useRef(false);
  const isUserInteractingRef = useRef(false);

  // Load sponsors:
  // Priority:
  // 1. SponsorsDataImported (if imported JSON/module exists)
  // 2. fetch(src) from public (if provided and exists)
  // 3. LOCAL_SPONSORS fallback
  useEffect(() => {
    let mounted = true;

    async function load() {
      // 1) If import provided, use it immediately
      if (Array.isArray(SponsorsDataImported) && SponsorsDataImported.length) {
        if (mounted) setSponsors(SponsorsDataImported);
        return;
      }

      // 2) Try fetching from public src
      try {
        const res = await fetch(src, { cache: "no-store" });
        if (!res.ok) throw new Error("Fetch failed");
        const data = await res.json();
        if (mounted && Array.isArray(data) && data.length) {
          setSponsors(data);
          return;
        }
      } catch (err) {
        // fetch failed — fall through to local fallback
        console.warn("Sponsors fetch failed:", err);
      }

      // 3) fallback
      if (mounted) setSponsors(LOCAL_SPONSORS);
    }

    load();

    return () => {
      mounted = false;
    };
  }, [src]);

  // helper: when an image fails, swap to placeholder
  const onImgError = useCallback((e) => {
    if (e?.target?.src && !e.target.dataset.fallback) {
      e.target.dataset.fallback = "true";
      e.target.src = placeholderImg;
    }
  }, []);

  // Auto-scroll logic using requestAnimationFrame
  useEffect(() => {
    const el = containerRef.current;
    if (!el || sponsors.length === 0) return;

    let current = el.scrollLeft;

    function step(now) {
      if (!lastTimeRef.current) lastTimeRef.current = now;
      const delta = (now - lastTimeRef.current) / 1000;
      lastTimeRef.current = now;

      if (!pausedRef.current && !isUserInteractingRef.current) {
        current += speed * delta;
        if (current >= el.scrollWidth - el.clientWidth) {
          current = current - (el.scrollWidth / 2);
        }
        el.scrollLeft = current;
      }

      rafRef.current = requestAnimationFrame(step);
    }

    rafRef.current = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(rafRef.current);
      lastTimeRef.current = null;
    };
  }, [sponsors, speed, gap]);

  // Pause on hover/focus and when user scrolls manually
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onEnter = () => (pausedRef.current = true);
    const onLeave = () => (pausedRef.current = false);

    const onPointerDown = () => {
      isUserInteractingRef.current = true;
      pausedRef.current = true;
    };
    const onPointerUp = () => {
      isUserInteractingRef.current = false;
      pausedRef.current = false;
    };

    const onScroll = () => {
      isUserInteractingRef.current = true;
      pausedRef.current = true;
      clearTimeout(el._userScrollTimer);
      el._userScrollTimer = setTimeout(() => {
        isUserInteractingRef.current = false;
        pausedRef.current = false;
      }, 1200);
    };

    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);
    el.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointerup", onPointerUp);
    el.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
      el.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerup", onPointerUp);
      el.removeEventListener("scroll", onScroll);
      if (el._userScrollTimer) clearTimeout(el._userScrollTimer);
    };
  }, []);

  // Render: duplicate the list once to create an infinite feel
  const items = sponsors.length ? sponsors : LOCAL_SPONSORS;

  return (
    <section className="mt-10 py-6">
      <div className="bg-white rounded-lg p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <h5 className="text-sm font-semibold text-gray-700">Our Partners</h5>
          <a href="/about" className="text-sm text-purple-700">Support us</a>
        </div>

        <div
          ref={containerRef}
          className="mt-4 flex items-center gap-6 overflow-x-auto py-2 scroll-smooth"
          style={{ WebkitOverflowScrolling: "touch", scrollbarWidth: "none" }}
          aria-label="Sponsors carousel"
        >
          {[...items, ...items].map((s, i) => {
            // s.pic might be "/images/xxx.png" (public) or an imported string
            const src = s.pic || s.image || s.src || placeholderImg;
            return (
              <div
                key={`${s.id}-${i}`}
                className="flex-shrink-0 w-36 h-16 flex items-center justify-center bg-gray-50 rounded-md shadow-sm"
                style={{ marginRight: gap }}
              >
                <img
                  src={src}
                  alt={s.alt || `sponsor-${s.id}`}
                  onError={onImgError}
                  className="max-h-12 object-contain"
                  loading="lazy"
                  draggable={false}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
