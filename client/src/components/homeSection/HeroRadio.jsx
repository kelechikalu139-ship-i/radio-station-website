// import React, { useEffect, useState } from "react";
// import {
//   Play,
//   Pause,
//   Radio,
//   Volume2,
//   Twitter,
//   Instagram,
//   Facebook,
//   ArrowRight,
//   Link2,
// } from "lucide-react";
// import { useAudio } from "../../context/AudioContext";

// const HeroRadio = () => {
//   const { playing, toggle, volume, setVolume, nowPlaying } = useAudio();

//   /* ================================
//      HERO BACKGROUND CAROUSEL SETUP
//   ================================= */
//   const heroImages = [
//     "/images/hero/hero1.jpeg",
//     "/images/hero/hero2.jpeg",
//     "/images/hero/hero3.jpeg",
//   ];

//   const fallbackImage = "/images/hero/fallback.jpg";

//   const [currentImage, setCurrentImage] = useState(0);
//   const [loadedImages, setLoadedImages] = useState({});

//   /* Preload images + detect failures */
//   useEffect(() => {
//     heroImages.forEach((src) => {
//       const img = new Image();
//       img.src = src;

//       img.onload = () => {
//         setLoadedImages((prev) => ({ ...prev, [src]: true }));
//       };

//       img.onerror = () => {
//         setLoadedImages((prev) => ({ ...prev, [src]: false }));
//       };
//     });
//   }, []);

//   /* Auto rotate background */
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentImage((prev) => (prev + 1) % heroImages.length);
//     }, 7000);

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <section
//       aria-label="Nexter FM hero"
//       className="relative min-h-svh flex items-center text-white overflow-hidden"
//     >
//       {/* ================================
//           IMAGE CAROUSEL BACKGROUND
//       ================================= */}
//       <div className="absolute inset-0 overflow-hidden">
//         {heroImages.map((img, index) => {
//           const isActive = index === currentImage;
//           const isLoaded = loadedImages[img] !== false;
//           const bgImage = isLoaded ? img : fallbackImage;

//           return (
//             <div
//               key={img}
//               className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
//                 isActive ? "opacity-100" : "opacity-0"
//               }`}
//               style={{
//                 backgroundImage: `url(${bgImage})`,
//                 backgroundRepeat: "no-repeat",
//                 backgroundPosition: "center",
//                 backgroundSize: "cover",
//               }}
//             />
//           );
//         })}
//       </div>

//       {/* ================================
//           GRADIENT & DARK OVERLAYS
//       ================================= */}
//       <div className="absolute inset-0 bg-linear-to-br from-purple-900/90 via-purple-900/80 to-yellow-400/60 z-10" />
//       <div className="absolute inset-0 bg-black/40 z-20" />

//       {/* ================================
//           MAIN CONTENT
//       ================================= */}
//       <div className="container mx-auto px-6 relative z-30">
//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center py-12">
//           {/* LEFT CONTENT */}
//           <div className="lg:col-span-7 space-y-6">
//             <div className="inline-flex items-center gap-3">
//               <span className="rounded-full bg-yellow-400/20 px-3 py-1 text-yellow-200 text-sm font-semibold flex items-center gap-2">
//                 <Radio size={16} /> Live 24/7
//               </span>
//               <span className="text-sm text-white/80">Studio • Minna</span>
//             </div>

//             <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight">
//               Nexter FM —{" "}
//               <span className="text-yellow-300">Sound That Moves</span>
//             </h1>

//             <p className="max-w-2xl text-lg text-white/85 leading-relaxed">
//               World-class broadcasting, bold music curation, and fearless
//               conversation. Tune in for live shows, exclusive interviews, and
//               community stories.
//             </p>

//             <div className="flex flex-wrap gap-4">
//               <button
//                 onClick={toggle}
//                 className="inline-flex items-center gap-3 bg-linear-to-r from-yellow-400 to-yellow-300 text-purple-900 font-semibold px-5 py-3 rounded-xl shadow-lg hover:scale-[1.02] transition"
//               >
//                 {playing ? <Pause size={18} /> : <Play size={18} />}
//                 {playing ? "Pause Live" : "Listen Live"}
//               </button>

//               <a
//                 href="/programs"
//                 className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-white/20 hover:bg-white/10 transition"
//               >
//                 Programs <ArrowRight size={16} />
//               </a>

//               <a
//                 href="/advertise"
//                 className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition"
//               >
//                 <Link2 size={14} /> Advertise
//               </a>
//             </div>

//             {/* NOW PLAYING */}
//             <div className="mt-6 max-w-md bg-white/10 backdrop-blur border border-white/10 rounded-2xl p-4">
//               <div className="flex justify-between items-center">
//                 <div>
//                   <div className="text-sm text-white/80">Now Playing</div>
//                   <div className="font-semibold text-lg">
//                     {nowPlaying.title}
//                   </div>
//                   <div className="text-sm text-white/70">
//                     {nowPlaying.artist} • {nowPlaying.show}
//                   </div>
//                 </div>

//                 <div className="flex items-center gap-2">
//                   <Volume2 size={18} />
//                   <input
//                     type="range"
//                     min={0}
//                     max={1}
//                     step={0.01}
//                     value={volume}
//                     onChange={(e) => setVolume(Number(e.target.value))}
//                     className="w-28 accent-yellow-300"
//                   />
//                 </div>
//               </div>
//             </div>

//             {/* STATS */}
//             <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm mt-8">
//               {[
//                 ["1.2K", "Live listeners"],
//                 ["120+", "Episodes"],
//                 ["10", "OAPs"],
//                 ["Global", "Streaming"],
//               ].map(([value, label]) => (
//                 <div key={label} className="bg-white/10 rounded-lg p-3">
//                   <div className="text-2xl font-bold text-yellow-300">
//                     {value}
//                   </div>
//                   <div className="text-white/70">{label}</div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* RIGHT CARD */}
//           <div className="lg:col-span-5">
//             <div className="rounded-3xl bg-linear-to-b from-purple-700 to-purple-800 p-6 shadow-2xl ring-1 ring-black/30">
//               <div className="flex items-center gap-4">
//                 <div className="w-28 h-28 rounded-xl bg-linear-to-br from-yellow-300 to-yellow-400 flex items-center justify-center text-purple-900 text-3xl font-extrabold">
//                   NEX
//                 </div>
//                 <div>
//                   <div className="text-yellow-200 text-sm">Live Now</div>
//                   <div className="font-bold text-2xl">
//                     {nowPlaying.title}
//                   </div>
//                   <div className="text-white/80">
//                     {nowPlaying.artist}
//                   </div>
//                 </div>
//               </div>

//               <button
//                 onClick={toggle}
//                 className="mt-6 w-full bg-yellow-300 text-purple-900 py-4 rounded-full font-bold flex justify-center items-center gap-3 hover:scale-[1.02] transition"
//               >
//                 {playing ? <Pause size={18} /> : <Play size={18} />}
//                 {playing ? "Pause" : "Play Live"}
//               </button>

//               <div className="mt-6 flex gap-3 justify-center">
//                 {[Twitter, Instagram, Facebook].map((Icon, i) => (
//                   <a
//                     key={i}
//                     href="#"
//                     className="p-3 bg-white/10 rounded-lg hover:bg-white/20 transition"
//                   >
//                     <Icon size={16} />
//                   </a>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default HeroRadio;



import React, { useEffect, useState } from "react";
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
import api from "../../api/api";

const HeroRadio = () => {
  const { playing, toggle, volume, setVolume } = useAudio();

  /* ================================
     HERO BACKGROUND CAROUSEL SETUP
  ================================= */
  const heroImages = [
    "/images/hero/hero1.jpeg",
    "/images/hero/hero2.jpeg",
    "/images/hero/hero3.jpeg",
  ];

  const fallbackImage = "/images/hero/fallback.jpg";

  const [currentImage, setCurrentImage] = useState(0);
  const [loadedImages, setLoadedImages] = useState({});
  const [liveProgram, setLiveProgram] = useState(null);

  const fallbackProgram = {
    title: "Nexter FM Live",
    host_name: "24/7 Radio",
    status: "Always On Air",
  };

  useEffect(() => {
    heroImages.forEach((src) => {
      const img = new Image();
      img.src = src;

      img.onload = () => {
        setLoadedImages((prev) => ({ ...prev, [src]: true }));
      };

      img.onerror = () => {
        setLoadedImages((prev) => ({ ...prev, [src]: false }));
      };
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 7000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let isMounted = true;

    const fetchLiveProgram = async () => {
      try {
        const res = await api.get("/api/schedule/live-program");
        if (isMounted) {
          setLiveProgram(res.data?.live || null);
        }
      } catch (error) {
        if (isMounted) {
          setLiveProgram(null);
        }
      }
    };

    fetchLiveProgram();
    const interval = setInterval(fetchLiveProgram, 60000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  const heroOnAir = liveProgram
    ? {
        title: liveProgram.title || fallbackProgram.title,
        host_name: liveProgram.host_name || "Nexter FM OAP",
        status: "Program On Air",
      }
    : fallbackProgram;

  return (
    <section
      aria-label="Nexter FM hero"
      className="relative min-h-svh flex items-center text-white overflow-hidden"
    >
      {/* IMAGE CAROUSEL BACKGROUND */}
      <div className="absolute inset-0 overflow-hidden">
        {heroImages.map((img, index) => {
          const isActive = index === currentImage;
          const isLoaded = loadedImages[img] !== false;
          const bgImage = isLoaded ? img : fallbackImage;

          return (
            <div
              key={img}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                isActive ? "opacity-100" : "opacity-0"
              }`}
              style={{
                backgroundImage: `url(${bgImage})`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundSize: "cover",
              }}
            />
          );
        })}
      </div>

      {/* GRADIENT & DARK OVERLAYS */}
      <div className="absolute inset-0 bg-linear-to-br from-purple-900/90 via-purple-900/80 to-yellow-400/60 z-10" />
      <div className="absolute inset-0 bg-black/40 z-20" />

      {/* MAIN CONTENT */}
      <div className="container mx-auto px-6 relative z-30">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center py-12">
          {/* LEFT CONTENT */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-3">
              <span className="rounded-full bg-yellow-400/20 px-3 py-1 text-yellow-200 text-sm font-semibold flex items-center gap-2">
                <Radio size={16} /> Live 24/7
              </span>
              <span className="text-sm text-white/80">Studio • Minna</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight">
              Nexter FM —{" "}
              <span className="text-yellow-300">Sound That Moves</span>
            </h1>

            <p className="max-w-2xl text-lg text-white/85 leading-relaxed">
              World-class broadcasting, bold music curation, and fearless
              conversation. Tune in for live shows, exclusive interviews, and
              community stories.
            </p>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={toggle}
                className="inline-flex items-center gap-3 bg-linear-to-r from-yellow-400 to-yellow-300 text-purple-900 font-semibold px-5 py-3 rounded-xl shadow-lg hover:scale-[1.02] transition"
              >
                {playing ? <Pause size={18} /> : <Play size={18} />}
                {playing ? "Pause Live" : "Listen Live"}
              </button>

              <a
                href="/programs"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-white/20 hover:bg-white/10 transition"
              >
                Programs <ArrowRight size={16} />
              </a>

              <a
                href="/advertise"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition"
              >
                <Link2 size={14} /> Advertise
              </a>
            </div>

            {/* ON AIR */}
            <div className="mt-6 max-w-md bg-white/10 backdrop-blur border border-white/10 rounded-2xl p-4">
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-sm text-white/80">On Air Now</div>
                  <div className="font-semibold text-lg">
                    {heroOnAir.title}
                  </div>
                  <div className="text-sm text-white/70">{heroOnAir.host_name}</div>
                  <div className="text-xs text-white/60">{heroOnAir.status}</div>
                </div>

                <div className="flex items-center gap-2">
                  <Volume2 size={18} />
                  <input
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

            {/* STATS */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm mt-8">
              {[
                ["1.2K", "Live listeners"],
                ["120+", "Episodes"],
                ["10", "OAPs"],
                ["Global", "Streaming"],
              ].map(([value, label]) => (
                <div key={label} className="bg-white/10 rounded-lg p-3">
                  <div className="text-2xl font-bold text-yellow-300">
                    {value}
                  </div>
                  <div className="text-white/70">{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT CARD */}
          <div className="lg:col-span-5">
            <div className="rounded-3xl bg-linear-to-b from-purple-700 to-purple-800 p-6 shadow-2xl ring-1 ring-black/30">
              <div className="flex items-center gap-4">
                <div className="w-28 h-28 rounded-xl bg-linear-to-br from-yellow-300 to-yellow-400 flex items-center justify-center text-purple-900 text-3xl font-extrabold">
                  NEX
                </div>
                <div>
                  <div className="text-yellow-200 text-sm">Live Now</div>
                  <div className="font-bold text-2xl">
                    {heroOnAir.title}
                  </div>
                  <div className="text-white/80">
                    {heroOnAir.host_name}
                  </div>
                </div>
              </div>

              <button
                onClick={toggle}
                className="mt-6 w-full bg-yellow-300 text-purple-900 py-4 rounded-full font-bold flex justify-center items-center gap-3 hover:scale-[1.02] transition"
              >
                {playing ? <Pause size={18} /> : <Play size={18} />}
                {playing ? "Pause" : "Play Live"}
              </button>

              <div className="mt-6 flex gap-3 justify-center">
                {[Twitter, Instagram, Facebook].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="p-3 bg-white/10 rounded-lg hover:bg-white/20 transition"
                  >
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroRadio;
