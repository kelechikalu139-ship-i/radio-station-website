import React from "react";
import { Calendar, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Facebook, Twitter, Linkedin, MessageCircle, Share2 } from "lucide-react";
import { motion } from "framer-motion";

export default function HomeFeaturedNews({ featuredNews }) {
  if (!featuredNews) {
    return (
      <div className="bg-white rounded-3xl h-96 flex items-center justify-center text-gray-500">
        No featured news available
      </div>
    );
  }

  const newsId = featuredNews.id || featuredNews._id;
  const shareUrl = `${window.location.origin}/newsevent/${newsId}`;
  const shareTitle = featuredNews.title;

  const handleShare = (platform) => {
    switch (platform) {
      case "facebook":
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, "_blank");
        break;
      case "twitter":
        window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`, "_blank");
        break;
      case "linkedin":
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`, "_blank");
        break;
      case "whatsapp":
        window.open(`https://wa.me/?text=${encodeURIComponent(shareTitle + "\n" + shareUrl)}`, "_blank");
        break;
      case "copy":
        navigator.clipboard.writeText(shareUrl).then(() => alert("Link copied!"));
        break;
    }
  };

  const excerpt = featuredNews.content
    ? featuredNews.content.replace(/<[^>]+>/g, "").slice(0, 130) + "..."
    : featuredNews.excerpt || "";

  return (
    <motion.article
      whileHover={{ y: -4 }}
      className="bg-white rounded-3xl overflow-hidden shadow-lg"
    >
      {/* Image */}
      <div className="relative h-[260px] md:h-[300px]">
        <img
          src={featuredNews.image_url || featuredNews.photo || "/images/news/news1.jpeg"}
          alt={featuredNews.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

        <span className="absolute top-4 left-4 bg-yellow-400 text-purple-900 text-xs font-bold px-4 py-1 rounded-full">
          FEATURED
        </span>
      </div>

      {/* Content - Very Compact */}
      <div className="p-6">
        <div className="flex items-center gap-3 text-sm text-gray-500 mb-3">
          <Calendar size={15} />
          <span>
            {new Date(featuredNews.created_at).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </span>
        </div>

        <h3 className="text-[22px] leading-tight font-bold text-gray-900 mb-4 line-clamp-2">
          {featuredNews.title}
        </h3>

        <p className="text-gray-600 text-[15px] leading-relaxed mb-6 line-clamp-3">
          {excerpt}
        </p>

        {/* Read Full Story + Small Share Icons */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <Link
            to={`/newsevent/${newsId}`}
            className="text-purple-700 font-semibold flex items-center gap-1.5 hover:text-purple-800 transition text-[15px]"
          >
            Read Full Story
            <ArrowRight size={17} />
          </Link>

          {/* Very Small Share Buttons - Matching Screenshot Style */}
          <div className="flex gap-3 text-gray-400">
            <button onClick={() => handleShare("facebook")} className="hover:text-blue-600 transition" title="Facebook">
              <Facebook size={17} />
            </button>
            <button onClick={() => handleShare("twitter")} className="hover:text-black transition" title="X">
              <Twitter size={17} />
            </button>
            <button onClick={() => handleShare("linkedin")} className="hover:text-blue-700 transition" title="LinkedIn">
              <Linkedin size={17} />
            </button>
            <button onClick={() => handleShare("whatsapp")} className="hover:text-green-600 transition" title="WhatsApp">
              <MessageCircle size={17} />
            </button>
            <button onClick={() => handleShare("copy")} className="hover:text-gray-600 transition" title="Copy">
              <Share2 size={17} />
            </button>
          </div>
        </div>
      </div>
    </motion.article>
  );
}