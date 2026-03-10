

// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import api from "../../api/api";

// // Simple featured card skeleton
// function FeaturedCardSkeleton() {
//   return (
//     <div className="bg-gray-800/50 rounded-xl overflow-hidden shadow-lg animate-pulse">
//       <div className="h-64 bg-gray-700"></div>
//       <div className="p-6">
//         <div className="h-4 bg-gray-600 rounded w-24 mb-3"></div>
//         <div className="h-8 bg-gray-600 rounded w-4/5 mb-4"></div>
//         <div className="space-y-3">
//           <div className="h-4 bg-gray-600 rounded w-full"></div>
//           <div className="h-4 bg-gray-600 rounded w-full"></div>
//           <div className="h-4 bg-gray-600 rounded w-5/6"></div>
//         </div>
//         <div className="mt-6 h-12 bg-gray-600 rounded w-36"></div>
//       </div>
//     </div>
//   );
// }

// export default function FeaturedNews() {
//   const [featuredItems, setFeaturedItems] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     let mounted = true;

//     async function loadFeatured() {
//       try {
//         setLoading(true);
//         setError(null);

//         const res = await api.get("/api/news", {
//           params: { featured: 1 },
//         });

//         // Optional: limit to e.g. 3–6 items
//         const items = (res.data || []).slice(0, 6);

//         if (mounted) {
//           setFeaturedItems(items);
//         }
//       } catch (err) {
//         console.error("Failed to load featured news:", err);
//         if (mounted) {
//           setError("Couldn't load featured stories");
//         }
//       } finally {
//         if (mounted) {
//           setLoading(false);
//         }
//       }
//     }

//     loadFeatured();

//     return () => {
//       mounted = false;
//     };
//   }, []);

//   // Helper to create clean excerpt
//   const getExcerpt = (html, max = 140) => {
//     if (!html) return "";
//     const text = html.replace(/<[^>]+>/g, "").trim();
//     return text.length > max ? text.slice(0, max) + "..." : text;
//   };

//   if (loading) {
//     return (
//       <section className="container mx-auto px-5 py-14">
//         <h2 className="text-3xl font-bold text-white mb-8">Featured Stories</h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {[...Array(3)].map((_, i) => (
//             <FeaturedCardSkeleton key={i} />
//           ))}
//         </div>
//       </section>
//     );
//   }

//   if (error || featuredItems.length === 0) {
//     return null; // or: <div className="text-center py-20 text-gray-400">{error || "No featured stories at the moment"}</div>
//   }

//   return (
//     <section className="container mx-auto px-5 py-14">
//       <h2 className="text-3xl font-bold text-white mb-8">Featured Stories</h2>

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         {featuredItems.map((item) => (
//           <div
//             key={item.id}
//             className="bg-gray-800/50 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col h-full"
//           >
//             <div className="relative">
//               <img
//                 src={item.image_url || "/images/news/fallback.jpg"}
//                 alt={item.title}
//                 className="w-full h-56 object-cover"
//                 loading="lazy"
//               />
//               <span className="absolute top-4 left-4 bg-yellow-500 text-black text-xs font-bold px-3 py-1 rounded-full">
//                 FEATURED
//               </span>
//             </div>

//             <div className="p-6 flex flex-col flex-grow">
//               <h3 className="text-xl font-bold text-white mb-3 line-clamp-2">
//                 {item.title}
//               </h3>

//               <p className="text-gray-400 text-sm mb-6 line-clamp-3 flex-grow">
//                 {getExcerpt(item.content)}
//               </p>

//               <div className="mt-auto">
//                 <Link
//                   to={`/news/${item.id}`}           // ← adjust to your actual route
//                   className="inline-flex items-center bg-purple-700 hover:bg-purple-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
//                 >
//                   Read More →
//                 </Link>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }


// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import api from "../../api/api";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation, Pagination, Autoplay } from "swiper/modules";

// // ── Import Swiper styles ──
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";

// // ── Skeleton for one card ──
// function FeaturedCardSkeleton() {
//   return (
//     <div className="bg-gray-800/50 rounded-xl overflow-hidden shadow-lg animate-pulse flex flex-col h-full">
//       <div className="h-56 bg-gray-700"></div>
//       <div className="p-6 flex flex-col flex-grow">
//         <div className="h-5 bg-gray-600 rounded w-20 mb-3"></div>
//         <div className="h-7 bg-gray-600 rounded w-4/5 mb-4"></div>
//         <div className="space-y-2 mb-6 flex-grow">
//           <div className="h-4 bg-gray-600 rounded w-full"></div>
//           <div className="h-4 bg-gray-600 rounded w-full"></div>
//           <div className="h-4 bg-gray-600 rounded w-3/4"></div>
//         </div>
//         <div className="h-11 bg-gray-600 rounded w-32"></div>
//       </div>
//     </div>
//   );
// }

// // ── Format date helper ──
// const formatDate = (isoString) => {
//   if (!isoString) return "";
//   const date = new Date(isoString);
//   return date.toLocaleDateString("en-US", {
//     month: "short",
//     day: "numeric",
//     year: "numeric",
//   });
// };

// // ── Clean excerpt ──
// const getExcerpt = (html = "", max = 140) => {
//   const text = html.replace(/<[^>]+>/g, "").trim();
//   return text.length > max ? text.slice(0, max) + "..." : text;
// };

// export default function FeaturedNews({ variant = "grid" } = {}) {
//   // "grid" | "carousel"
//   const [featuredItems, setFeaturedItems] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     let mounted = true;

//     async function loadFeatured() {
//       try {
//         setLoading(true);
//         setError(null);

//         const res = await api.get("/api/news", {
//           params: { featured: 1 },
//         });

//         // Sort by newest first + optional limit
//         const items = (res.data || [])
//           .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
//           .slice(0, 6); // feel free to change limit

//         if (mounted) setFeaturedItems(items);
//       } catch (err) {
//         console.error("Failed to load featured news:", err);
//         if (mounted) setError("Couldn't load featured stories");
//       } finally {
//         if (mounted) setLoading(false);
//       }
//     }

//     loadFeatured();
//     return () => {
//       mounted = false;
//     };
//   }, []);

//   if (loading) {
//     return (
//       <section className="container mx-auto px-5 py-14">
//         <h2 className="text-3xl md:text-4xl font-bold text-white mb-10">
//           Featured Stories
//         </h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
//           {[...Array(3)].map((_, i) => (
//             <FeaturedCardSkeleton key={i} />
//           ))}
//         </div>
//       </section>
//     );
//   }

//   if (error || featuredItems.length === 0) {
//     return null; // silent fail — common for featured/promotional sections
//     // Alternative: return <p className="text-center py-20 text-gray-400">{error || "No featured stories available right now."}</p>
//   }

//   const renderCard = (item) => (
//     <div
//       key={item.id}
//       className="bg-gray-800/60 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 flex flex-col h-full border border-gray-700/50"
//     >
//       <div className="relative">
//         <img
//           src={item.image_url || "/images/news/fallback.jpg"}
//           alt={item.title}
//           className="w-full h-56 object-cover"
//           loading="lazy"
//         />
//         <span className="absolute top-4 left-4 bg-yellow-500 text-black text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
//           FEATURED
//         </span>
//       </div>

//       <div className="p-6 flex flex-col flex-grow">
//         <div className="text-xs text-gray-500 mb-2">
//           {formatDate(item.created_at)} • {item.author || "Team"}
//         </div>

//         <h3 className="text-xl font-bold text-white mb-3 line-clamp-2">
//           {item.title}
//         </h3>

//         <p className="text-gray-300 text-sm mb-6 line-clamp-3 flex-grow">
//           {getExcerpt(item.content)}
//         </p>

//         <div className="mt-auto">
//           <Link
//             to={`/news/${item.id}`} // ← adjust route if needed (e.g. /newsevent/:id)
//             className="inline-flex items-center bg-purple-700 hover:bg-purple-600 text-white px-6 py-3 rounded-lg font-medium transition-colors shadow-sm"
//           >
//             Read Story →
//           </Link>
//         </div>
//       </div>
//     </div>
//   );

//   return (
//     <section className="container mx-auto px-5 py-14">
//       <div className="flex items-center justify-between mb-10">
//         <h2 className="text-3xl md:text-4xl font-bold text-white">
//           Featured Stories
//         </h2>
//         <Link
//           to="/news?featured=1" // ← adjust to your all-news or filtered page
//           className="text-purple-400 hover:text-purple-300 font-medium transition-colors flex items-center gap-2"
//         >
//           View All <span aria-hidden>→</span>
//         </Link>
//       </div>

//       {variant === "carousel" ? (
//         <Swiper
//           modules={[Navigation, Pagination, Autoplay]}
//           spaceBetween={24}
//           slidesPerView={1}
//           breakpoints={{
//             640: { slidesPerView: 2 },
//             1024: { slidesPerView: 3 },
//           }}
//           navigation
//           pagination={{ clickable: true }}
//           autoplay={{ delay: 5000, disableOnInteraction: false }}
//           loop={featuredItems.length > 3}
//           className="!pb-12"
//         >
//           {featuredItems.map((item) => (
//             <SwiperSlide key={item.id}>{renderCard(item)}</SwiperSlide>
//           ))}
//         </Swiper>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
//           {featuredItems.map(renderCard)}
//         </div>
//       )}
//     </section>
//   );
// }


// FeaturedNews.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/api";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

function FeaturedCardSkeleton() {
  return (
    <div className="bg-gray-800/50 rounded-xl overflow-hidden shadow-lg animate-pulse flex flex-col h-full">
      <div className="h-56 bg-gray-700"></div>
      <div className="p-6 flex flex-col flex-grow">
        <div className="h-5 bg-gray-600 rounded w-20 mb-3"></div>
        <div className="h-7 bg-gray-600 rounded w-4/5 mb-4"></div>
        <div className="space-y-2 mb-6 flex-grow">
          <div className="h-4 bg-gray-600 rounded w-full"></div>
          <div className="h-4 bg-gray-600 rounded w-full"></div>
          <div className="h-4 bg-gray-600 rounded w-3/4"></div>
        </div>
        <div className="h-11 bg-gray-600 rounded w-32"></div>
      </div>
    </div>
  );
}

const formatDate = (isoString) => {
  if (!isoString) return "";
  return new Date(isoString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const getExcerpt = (html = "", max = 140) => {
  const text = html.replace(/<[^>]+>/g, "").trim();
  return text.length > max ? text.slice(0, max) + "..." : text;
};

export default function FeaturedNews({ variant = "grid" }) {
  const [featuredItems, setFeaturedItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function loadFeatured() {
      try {
        setLoading(true);
        const res = await api.get("/api/news", {
          params: {
            type: "news",
            featured: 1,
          },
        });

        const items = (res.data || [])
          .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
          .slice(0, 6);

        if (mounted) setFeaturedItems(items);
      } catch (err) {
        console.error("Failed to load featured news:", err);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    loadFeatured();
    return () => { mounted = false; };
  }, []);

  if (loading) {
    return (
      <section className="container mx-auto px-5 py-14">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-10">
          Featured Stories
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {[...Array(3)].map((_, i) => (
            <FeaturedCardSkeleton key={i} />
          ))}
        </div>
      </section>
    );
  }

  if (featuredItems.length === 0) {
    return null;
  }

  const renderCard = (item) => (
    <div
      key={item.id}
      className="bg-gray-800/60 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 flex flex-col h-full border border-gray-700/50"
    >
      <div className="relative">
        <img
          src={item.image_url || "/images/news/fallback.jpg"}
          alt={item.title}
          className="w-full h-56 object-cover"
          loading="lazy"
        />
        <span className="absolute top-4 left-4 bg-yellow-500 text-black text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
          FEATURED
        </span>
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <div className="text-xs text-gray-500 mb-2">
          {formatDate(item.created_at)} • {item.author || "Team"}
        </div>

        <h3 className="text-xl font-bold text-white mb-3 line-clamp-2">
          {item.title}
        </h3>

        <p className="text-gray-300 text-sm mb-6 line-clamp-3 flex-grow">
          {getExcerpt(item.content)}
        </p>

        <div className="mt-auto">
          <Link
            to={`/newsevent/${item.id}`}
            className="inline-flex items-center bg-purple-700 hover:bg-purple-600 text-white px-6 py-3 rounded-lg font-medium transition-colors shadow-sm"
          >
            Read Story →
          </Link>
        </div>
      </div>
    </div>
  );

  return (
    <section className="container mx-auto px-5 py-14">
      <div className="flex items-center justify-between mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-white">
          Featured Stories
        </h2>
        <Link
          to="/news?type=news"
          className="text-purple-400 hover:text-purple-300 font-medium transition-colors flex items-center gap-2"
        >
          View All <span aria-hidden>→</span>
        </Link>
      </div>

      {variant === "carousel" ? (
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={24}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          loop={featuredItems.length > 3}
          className="!pb-12"
        >
          {featuredItems.map((item) => (
            <SwiperSlide key={item.id}>{renderCard(item)}</SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {featuredItems.map(renderCard)}
        </div>
      )}
    </section>
  );
}