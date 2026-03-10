import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, ArrowRight } from "lucide-react";
import api from "../../api/api";
import { SkeletonLoader } from "../ui/SkeletonLoader";

export default function HomeFeaturedNews() {
  const [featured, setFeatured] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;

    async function loadFeatured() {
      try {
        setLoading(true);
        setError(null);

        const res = await api.get("/api/news", {
          params: { featured: 1 },
        });

        const featuredItem = res.data?.[0] || null;

        if (mounted) {
          setFeatured(featuredItem);
        }
      } catch (err) {
        console.error("Failed to load featured news:", err);
        if (mounted) {
          setError("Could not load featured news");
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadFeatured();

    return () => {
      mounted = false;
    };
  }, []);

  if (loading) {
    return <SkeletonLoader />;
  }

  if (error || !featured) {
    return null;
  }

  const excerpt =
    featured.content?.replace(/<[^>]+>/g, "").slice(0, 150) + "...";

  return (
    <section className="container mx-auto px-5 py-14">
      <motion.article
        whileHover={{ y: -4 }}
        className="lg:col-span-7 rounded-3xl overflow-hidden shadow-lg bg-white"
      >
        {/* Image */}
        <div className="relative h-64 sm:h-72">
          <img
            src={featured.image_url || "/images/news/news1.jpeg"}
            alt={featured.title}
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent" />

          {/* Badge */}
          <span className="absolute top-4 left-4 bg-yellow-400 text-purple-900 text-xs font-bold px-3 py-1 rounded-full">
            FEATURED
          </span>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-center gap-3 text-sm text-gray-500">
            <span className="flex items-center gap-1">
              <Calendar size={14} />
              {new Date(featured.created_at).toLocaleDateString()}
            </span>

            {featured.category && (
              <span className="text-purple-700 font-semibold">
                {featured.category}
              </span>
            )}
          </div>

          <h3 className="mt-3 text-2xl font-bold text-gray-900">
            {featured.title}
          </h3>

          <p className="mt-3 text-gray-600 leading-relaxed">
            {excerpt}
          </p>

          <Link
            to={`/news/${featured.id}`}
            className="inline-flex items-center gap-2 mt-5 font-semibold text-purple-700 hover:text-purple-900"
          >
            Read more
            <ArrowRight size={16} />
          </Link>
        </div>
      </motion.article>
    </section>
  );
}