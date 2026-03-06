// import { Link } from "react-router-dom";
// import NewsData from "../../../../shared/costants/news"
// export default function NewsList() {
//   return (
//     <section className="container mx-auto px-5 pb-14">
//       <h3 className="text-2xl font-bold mb-6 text-white">Latest News</h3>

//       <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         {NewsData.map(item => (
//           <div key={item.id} className="bg-white shadow rounded-xl p-5">
//                <img
//                 src={item.photo}
//                 className="rounded-xl shadow-lg object-cover h-50 w-full"
//                 alt="Featured News"
//               />
              
              
//             <span className="text-sm text-gray-500">{item.date}</span>
//             <h4 className="mt-2 font-semibold text-lg">{item.title}</h4>
//             <p className="text-sm text-gray-500 font-light">written by: <span className="text-red-500">{item.author}</span></p>
//             {/* <button className="mt-3 text-purple-700 font-semibold">
//               Read →
//             </button> */}
//             <Link to={`/newsevent/${item.id}`} className="mt-3 text-purple-700 font-semibold">
            
//               Read more →
//             </Link>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }


// NewsList.jsx
// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import api from "../../api/api";   // ← your axios instance

// function NewsCardSkeleton() {
//   return (
//     <div className="bg-white shadow rounded-xl p-5 animate-pulse">
//       <div className="h-48 bg-gray-200 rounded-xl mb-4"></div>
//       <div className="h-4 bg-gray-300 rounded w-32 mb-2"></div>
//       <div className="h-6 bg-gray-300 rounded w-4/5 mb-2"></div>
//       <div className="h-4 bg-gray-300 rounded w-48"></div>
//       <div className="mt-4 h-8 bg-gray-300 rounded w-28"></div>
//     </div>
//   );
// }

// export default function NewsList() {
//   const [news, setNews] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     let mounted = true;

//     async function fetchNews() {
//       try {
//         setLoading(true);
//         const res = await api.get("/api/news", {
//           params: {
//             status: "published",     // if your backend supports it
//             // type: "news",         // optional
//             // limit: 9,             // if you want to limit results
//           },
//         });

//         if (mounted) {
//           // Sort newest first (if backend doesn't already)
//           const sorted = (res.data || []).sort(
//             (a, b) => new Date(b.created_at) - new Date(a.created_at)
//           );
//           setNews(sorted);
//         }
//       } catch (err) {
//         console.error("Failed to load news", err);
//       } finally {
//         if (mounted) setLoading(false);
//       }
//     }

//     fetchNews();

//     return () => {
//       mounted = false;
//     };
//   }, []);

//   return (
//     <section className="container mx-auto px-5 pb-14">
//       <h3 className="text-2xl font-bold mb-6 text-white">Latest News</h3>

//       {loading ? (
//         <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {[...Array(6)].map((_, i) => (
//             <NewsCardSkeleton key={i} />
//           ))}
//         </div>
//       ) : news.length === 0 ? (
//         <p className="text-gray-400 text-center py-10">No news available at the moment.</p>
//       ) : (
//         <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {news.map((item) => (
//             <div
//               key={item.id}
//               className="bg-white shadow rounded-xl p-5 hover:shadow-xl transition-shadow"
//             >
//               <img
//                 src={item.image_url || "/images/news/fallback.jpg"}
//                 className="rounded-xl shadow-lg object-cover h-48 w-full mb-4"
//                 alt={item.title}
//                 loading="lazy"
//               />

//               <span className="text-sm text-gray-500">
//                 {item.created_at
//                   ? new Date(item.created_at).toLocaleDateString("en-US", {
//                       year: "numeric",
//                       month: "short",
//                       day: "numeric",
//                     })
//                   : "—"}
//               </span>

//               <h4 className="mt-2 font-semibold text-lg line-clamp-2">
//                 {item.title}
//               </h4>

//               <p className="text-sm text-gray-500 font-light mt-1">
//                 written by:{" "}
//                 <span className="text-red-500">{item.author || "Admin"}</span>
//               </p>

//               <Link
//                 to={`/newsevent/${item.id}`}   // or /news/${item.id} — choose one
//                 className="mt-4 inline-block text-purple-700 font-semibold hover:text-purple-900 transition-colors"
//               >
//                 Read more →
//               </Link>
//             </div>
//           ))}
//         </div>
//       )}
//     </section>
//   );
// }


// NewsList.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/api";

function NewsCardSkeleton() {
  return (
    <div className="bg-white shadow rounded-xl p-5 animate-pulse">
      <div className="h-48 bg-gray-200 rounded-xl mb-4"></div>
      <div className="h-4 bg-gray-300 rounded w-32 mb-2"></div>
      <div className="h-6 bg-gray-300 rounded w-4/5 mb-2"></div>
      <div className="h-4 bg-gray-300 rounded w-48"></div>
      <div className="mt-4 h-8 bg-gray-300 rounded w-28"></div>
    </div>
  );
}

export default function NewsList() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;

    async function fetchNews() {
      try {
        setLoading(true);
        setError(null);

        const res = await api.get("/api/news", {
          params: {
            type: "news",
            status: "published",
          },
        });

        if (mounted) {
          // Sort by newest first (in case backend doesn't sort)
          const sorted = [...(res.data || [])].sort(
            (a, b) => new Date(b.created_at) - new Date(a.created_at)
          );
          setNews(sorted);
        }
      } catch (err) {
        console.error("Failed to load latest news:", err);
        if (mounted) {
          setError("Could not load news at this time.");
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    fetchNews();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section className="container mx-auto px-5 pb-14">
      <h3 className="text-2xl font-bold mb-6 text-white">Latest News</h3>

      {loading ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <NewsCardSkeleton key={i} />
          ))}
        </div>
      ) : error ? (
        <div className="text-center py-12 text-gray-400">{error}</div>
      ) : news.length === 0 ? (
        <div className="text-center py-12 text-gray-400">
          No published news available at the moment.
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.map((item) => (
            <div
              key={item.id}
              className="bg-white shadow rounded-xl p-5 hover:shadow-xl transition-shadow duration-300"
            >
              <img
                src={item.image_url || "/images/news/fallback.jpg"}
                className="rounded-xl object-cover h-48 w-full mb-4"
                alt={item.title || "News image"}
                loading="lazy"
              />

              <span className="text-sm text-gray-500 block">
                {item.created_at
                  ? new Date(item.created_at).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })
                  : "—"}
              </span>

              <h4 className="mt-2 font-semibold text-lg line-clamp-2">
                {item.title}
              </h4>

              <p className="text-sm text-gray-500 font-light mt-1">
                written by:{" "}
                <span className="text-red-500">{item.author || "Admin"}</span>
              </p>

              <Link
                to={`/newsevent/${item.id}`}
                className="mt-4 inline-block text-purple-700 font-semibold hover:text-purple-800 transition-colors"
              >
                Read more →
              </Link>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
