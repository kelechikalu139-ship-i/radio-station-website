


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