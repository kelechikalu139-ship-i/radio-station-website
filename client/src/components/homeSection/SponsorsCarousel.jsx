// src/components/homeSection/SponsorsCarousel.jsx
import React, { useEffect, useRef, useState, useCallback } from "react";
import placeholderImg from "../../assets/px.jpg"; // keep a small placeholder in src/assets

// Inline sponsor data (no external file)
const SPONSORS = [
  { id: 1, pic: "/images/react.svg", alt: "React" },
  { id: 2, pic: "/images/sponsor2.png", alt: "Sponsor B" },
  { id: 3, pic: "/images/sponsor3.png", alt: "Sponsor C" },
  { id: 4, pic: "/images/sponsor4.png", alt: "Sponsor D" },
];

export default function SponsorsCarousel({
  speed = 40, // pixels per second
  gap = 24,   // gap between items in px
}) {
  const [sponsors] = useState(SPONSORS); // inline data; replace or mutate as needed
  const containerRef = useRef(null);
  const rafRef = useRef(null);
  const lastTimeRef = useRef();
  const pausedRef = useRef(false);
  const isUserInteractingRef = useRef(false);

  // Helper: image error -> placeholder
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

    // start from current scrollLeft so it continues smoothly
    let current = el.scrollLeft;

    function step(now) {
      if (!lastTimeRef.current) lastTimeRef.current = now;
      const delta = (now - lastTimeRef.current) / 1000; // seconds
      lastTimeRef.current = now;

      if (!pausedRef.current && !isUserInteractingRef.current) {
        current += speed * delta;
        // wrap-around when we've scrolled more than half (because we duplicate list)
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
  }, [sponsors, speed]);

  // Pause on hover/interaction and resume after activity
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

  // Use sponsors or a minimal fallback
  const items = sponsors && sponsors.length ? sponsors : [
    { id: 0, pic: placeholderImg, alt: "placeholder" },
  ];

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
          {/* duplicate items to create seamless loop */}
          {[...items, ...items].map((s, i) => {
            const src = s.pic || placeholderImg;
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
