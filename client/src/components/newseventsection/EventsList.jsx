// import { Bell } from "lucide-react";

// // EventsList.jsx
// const events = [
//   {
//     title: "Live Broadcast at Minna City Square",
//     date: "Nov 15, 2025",
//     location: "Minna"
//   },
//   {
//     title: "Listeners Meet & Greet",
//     date: "Dec 01, 2025",
//     location: "Nexter FM Studio"
//   },
//   {
//     title: "Nexter Radio Health Work",
//     date: "Feb 01, 2026",
//     location: "Nexter FM Studio"
//   }
// ];

// export default function EventsList() {
//   return (
//     <section className="bg-gray-50 py-14">
//       <div className="container mx-auto px-5">
//         <h3 className="text-2xl font-bold mb-6">Upcoming Events</h3>

//         <div className="space-y-4">
//           {events.map((event, i) => (
//             <div key={i} className="bg-white p-5 rounded-xl shadow flex justify-between items-center">
//               <div>
//                 <h4 className="font-semibold text-lg">{event.title}</h4>
//                 <p className="text-gray-500 text-sm">
//                   {event.date} • {event.location}
//                 </p>
//               </div>

//               <span className="text-purple-700 font-bold">
//                 Upcoming
//               </span>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }



// EventsList.jsx
// import { useEffect, useState } from "react";
// import { Bell } from "lucide-react";
// import api from "../../api/api";

// function EventSkeleton() {
//   return (
//     <div className="bg-white p-5 rounded-xl shadow animate-pulse flex justify-between items-center">
//       <div className="flex-1">
//         <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
//         <div className="h-4 bg-gray-300 rounded w-48"></div>
//       </div>
//       <div className="h-6 bg-gray-300 rounded w-24"></div>
//     </div>
//   );
// }

// export default function EventsList() {
//   const [events, setEvents] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     let mounted = true;

//     async function fetchEvents() {
//       try {
//         setLoading(true);
//         // Adjust endpoint & params to match your backend
//         const res = await api.get("/api/events", {
//           params: {
//             status: "upcoming",     // ← most common filter
//             // type: "event",
//             // limit: 6,
//           },
//         });

//         if (mounted) {
//           setEvents(res.data || []);
//         }
//       } catch (err) {
//         console.error("Failed to load upcoming events", err);
//       } finally {
//         if (mounted) setLoading(false);
//       }
//     }

//     fetchEvents();

//     return () => {
//       mounted = false;
//     };
//   }, []);

//   return (
//     <section className="bg-gray-50 py-14">
//       <div className="container mx-auto px-5">
//         <h3 className="text-2xl font-bold mb-6">Upcoming Events</h3>

//         {loading ? (
//           <div className="space-y-4">
//             {[...Array(3)].map((_, i) => (
//               <EventSkeleton key={i} />
//             ))}
//           </div>
//         ) : events.length === 0 ? (
//           <p className="text-gray-500 text-center py-8">No upcoming events scheduled.</p>
//         ) : (
//           <div className="space-y-4">
//             {events.map((event) => (
//               <div
//                 key={event.id}
//                 className="bg-white p-5 rounded-xl shadow flex justify-between items-center hover:shadow-md transition-shadow"
//               >
//                 <div>
//                   <h4 className="font-semibold text-lg">{event.title}</h4>
//                   <p className="text-gray-500 text-sm mt-1">
//                     {event.date
//                       ? new Date(event.date).toLocaleDateString("en-US", {
//                           month: "short",
//                           day: "numeric",
//                           year: "numeric",
//                         })
//                       : "—"}
//                     {" • "}
//                     {event.location || "Nexter FM"}
//                   </p>
//                 </div>

//                 <span className="text-purple-700 font-bold whitespace-nowrap">
//                   Upcoming
//                 </span>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </section>
//   );
// }



// EventsList.jsx
// import { useEffect, useState } from "react";
// import api from "../../api/api";   // adjust path if needed

// function EventSkeleton() {
//   return (
//     <div className="bg-white p-5 rounded-xl shadow animate-pulse flex justify-between items-center">
//       <div className="flex-1">
//         <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
//         <div className="h-4 bg-gray-300 rounded w-56"></div>
//       </div>
//       <div className="h-6 bg-gray-300 rounded w-24"></div>
//     </div>
//   );
// }

// export default function EventsList() {
//   const [events, setEvents] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     let mounted = true;

//     async function fetchUpcomingEvents() {
//       try {
//         setLoading(true);
//         const res = await api.get("/api/news", {   // or /api/activities if renamed
//           params: {
//             type: "event",
//             upcoming: 1,           // ← backend will filter future dates
//             // limit: 8,           // optional
//           },
//         });

//         if (mounted) {
//           setEvents(res.data || []);
//         }
//       } catch (err) {
//         console.error("Failed to load upcoming events", err);
//       } finally {
//         if (mounted) setLoading(false);
//       }
//     }

//     fetchUpcomingEvents();

//     return () => { mounted = false; };
//   }, []);

//   const formatEventDate = (dateStr) => {
//     if (!dateStr) return "—";
//     return new Date(dateStr).toLocaleDateString("en-US", {
//       month: "short",
//       day: "numeric",
//       year: "numeric",
//     });
//   };

//   return (
//     <section className="bg-gray-50 py-14">
//       <div className="container mx-auto px-5">
//         <h3 className="text-2xl font-bold mb-6">Upcoming Events</h3>

//         {loading ? (
//           <div className="space-y-4">
//             {[...Array(4)].map((_, i) => <EventSkeleton key={i} />)}
//           </div>
//         ) : events.length === 0 ? (
//           <div className="text-center py-10 text-gray-600">
//             No upcoming events scheduled at the moment.
//           </div>
//         ) : (
//           <div className="space-y-4">
//             {events.map((event) => (
//               <div
//                 key={event.id}
//                 className="bg-white p-5 rounded-xl shadow flex justify-between items-center hover:shadow-lg transition"
//               >
//                 <div>
//                   <h4 className="font-semibold text-lg">{event.title}</h4>
//                   <p className="text-gray-600 text-sm mt-1.5">
//                     {formatEventDate(event.event_date || event.date || event.start_date)}
//                     {event.location ? ` • ${event.location}` : ""}
//                   </p>
//                 </div>

//                 <span className="text-purple-700 font-semibold whitespace-nowrap">
//                   Upcoming
//                 </span>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </section>
//   );
// }



// import { useEffect, useState } from "react";
// import api from "../../api/api";

// function EventSkeleton() {
//   return (
//     <div className="bg-white p-5 rounded-xl shadow animate-pulse flex justify-between items-center">
//       <div className="flex-1">
//         <div className="h-6 bg-gray-300 rounded w-3/4 mb-2" />
//         <div className="h-4 bg-gray-300 rounded w-56" />
//       </div>
//       <div className="h-6 bg-gray-300 rounded w-24" />
//     </div>
//   );
// }

// export default function EventsList() {
//   const [events, setEvents] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     let isMounted = true;

//     const fetchEvents = async () => {
//       try {
//         setLoading(true);
//         const response = await api.get("/api/news", {
//           params: {
//             type: "event",
//             // upcoming: 1,    // ← add this only if you implement it in backend
//           },
//         });

//         if (isMounted) {
//           // Simple client-side upcoming filter (adjust field name if needed)
//           const upcoming = (response.data || []).filter((ev) => {
//             const date = new Date(ev.created_at || ev.date || ev.event_date);
//             return date > new Date();
//           });

//           // Sort by soonest first
//           upcoming.sort((a, b) => {
//             const da = new Date(a.created_at || a.date || a.event_date);
//             const db = new Date(b.created_at || b.date || b.event_date);
//             return da - db;
//           });

//           setEvents(upcoming);
//         }
//       } catch (err) {
//         console.error("Error loading events:", err);
//       } finally {
//         if (isMounted) setLoading(false);
//       }
//     };

//     fetchEvents();

//     return () => {
//       isMounted = false;
//     };
//   }, []);

//   const formatDate = (dateStr) => {
//     if (!dateStr) return "Date TBA";
//     return new Date(dateStr).toLocaleDateString("en-US", {
//       month: "short",
//       day: "numeric",
//       year: "numeric",
//     });
//   };

//   return (
//     <section className="bg-gray-50 py-14">
//       <div className="container mx-auto px-5">
//         <h3 className="text-2xl font-bold mb-6">Upcoming Events</h3>

//         {loading ? (
//           <div className="space-y-4">
//             {[...Array(4)].map((_, i) => <EventSkeleton key={i} />)}
//           </div>
//         ) : events.length === 0 ? (
//           <p className="text-center py-10 text-gray-600">
//             No upcoming events scheduled.
//           </p>
//         ) : (
//           <div className="space-y-4">
//             {events.map((event) => (
//               <div
//                 key={event.id}
//                 className="bg-white p-5 rounded-xl shadow flex justify-between items-center hover:shadow-lg transition"
//               >
//                 <div>
//                   <h4 className="font-semibold text-lg">{event.title}</h4>
//                   <p className="text-gray-600 text-sm mt-1.5">
//                     {formatDate(event.created_at || event.date || event.event_date)}
//                     {event.location && ` • ${event.location}`}
//                   </p>
//                 </div>
//                 <span className="text-purple-700 font-semibold whitespace-nowrap">
//                   Upcoming
//                 </span>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </section>
//   );
// }


// src/pages/NewsEvent.jsx   (or wherever your detail page lives)
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../../api/api';  // adjust path if needed

export default function NewsEvent() {
  const { id } = useParams(); // gets the :id from URL → /newsevent/123

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;

    const fetchItem = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await api.get(`/api/news/${id}`);

        if (mounted) {
          setItem(res.data);
        }
      } catch (err) {
        console.error('Failed to load news/event:', err);
        if (mounted) {
          setError(
            err.response?.status === 404
              ? 'This item could not be found.'
              : 'Failed to load content. Please try again later.'
          );
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    fetchItem();

    return () => {
      mounted = false;
    };
  }, [id]);

  // Loading state
  if (loading) {
    return (
      <section className="container mx-auto px-5 py-14">
        <div className="max-w-4xl mx-auto animate-pulse">
          <div className="h-8 bg-gray-700 rounded w-3/4 mb-6"></div>
          <div className="h-96 bg-gray-700 rounded-xl mb-8"></div>
          <div className="space-y-4">
            <div className="h-4 bg-gray-600 rounded w-full"></div>
            <div className="h-4 bg-gray-600 rounded w-full"></div>
            <div className="h-4 bg-gray-600 rounded w-5/6"></div>
            <div className="h-4 bg-gray-600 rounded w-4/6"></div>
          </div>
        </div>
      </section>
    );
  }

  // Error or not found
  if (error || !item) {
    return (
      <section className="container mx-auto px-5 py-20 text-center">
        <h2 className="text-2xl font-bold text-white mb-4">Oops!</h2>
        <p className="text-gray-400 mb-8">{error || 'Content not found'}</p>
        <Link
          to="/"
          className="inline-block bg-purple-700 hover:bg-purple-600 text-white px-8 py-3 rounded-lg font-medium transition-colors"
        >
          Back to Home
        </Link>
      </section>
    );
  }

  // Render content
  const isEvent = item.type === 'event';
  const date = item.created_at
    ? new Date(item.created_at).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : 'Date not available';

  return (
    <section className="container mx-auto px-5 py-14">
      <div className="max-w-4xl mx-auto">
        {/* Back link */}
        <Link
          to={isEvent ? '/events' : '/news'}
          className="inline-flex items-center text-purple-400 hover:text-purple-300 mb-6 transition-colors"
        >
          ← Back to {isEvent ? 'Events' : 'News'}
        </Link>

        {/* Featured badge for featured news */}
        {item.is_featured === 1 && item.type === 'news' && (
          <span className="inline-block bg-yellow-500 text-black text-sm font-bold px-4 py-1 rounded-full mb-4">
            FEATURED
          </span>
        )}

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
          {item.title}
        </h1>

        {/* Meta */}
        <div className="flex flex-wrap items-center gap-4 text-gray-400 text-sm mb-8">
          <span>{date}</span>
          <span>•</span>
          <span>By {item.author || 'Admin'}</span>
          {item.type && (
            <>
              <span>•</span>
              <span className="capitalize">{item.type}</span>
            </>
          )}
        </div>

        {/* Image */}
        {item.image_url && (
          <div className="mb-10 rounded-xl overflow-hidden shadow-2xl">
            <img
              src={item.image_url}
              alt={item.title}
              className="w-full h-auto object-cover max-h-[600px]"
              loading="lazy"
            />
          </div>
        )}

        {/* Content – assuming content is HTML from rich editor */}
        <div
          className="prose prose-invert prose-lg max-w-none text-gray-300"
          dangerouslySetInnerHTML={{ __html: item.content || '' }}
        />

        {/* Fallback if no content */}
        {!item.content && (
          <p className="text-gray-400 italic mt-8">
            No additional content available for this {item.type}.
          </p>
        )}

        {/* Optional: share / next-prev links */}
        <div className="mt-12 pt-8 border-t border-gray-700 flex justify-between items-center text-sm text-gray-400">
          <Link to="/" className="hover:text-purple-400 transition-colors">
            ← Home
          </Link>
          <span>Share this {item.type}</span>
        </div>
      </div>
    </section>
  );
}