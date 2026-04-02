import React from "react";
import { Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { Facebook, Twitter, Linkedin, MessageCircle, Share2 } from "lucide-react";

export default function LatestUpdates({ updates = [] }) {
  if (updates.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-6 text-center text-gray-500">
        No updates available at the moment.
      </div>
    );
  }

  const handleShare = (e, platform, item) => {
    e.preventDefault();
    e.stopPropagation();

    const newsId = item.id || item._id;
    const shareUrl = `${window.location.origin}/newsevent/${newsId}`;
    const title = item.title;

    switch (platform) {
      case "facebook":
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, "_blank");
        break;
      case "twitter":
        window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(title)}`, "_blank");
        break;
      case "linkedin":
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`, "_blank");
        break;
      case "whatsapp":
        window.open(`https://wa.me/?text=${encodeURIComponent(title + "\n" + shareUrl)}`, "_blank");
        break;
      case "copy":
        navigator.clipboard.writeText(shareUrl).then(() => alert("Link copied!"));
        break;
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow">
      <h4 className="text-lg font-bold text-gray-800 mb-5">Latest Updates</h4>

      <div className="space-y-4">
        {updates.slice(0, 5).map((item) => {
          const newsId = item.id || item._id;

          return (
            <div key={newsId} className="group bg-gray-50 hover:bg-white p-5 rounded-xl transition-all border border-transparent hover:border-gray-100">
              <Link to={`/newsevent/${newsId}`} className="block">
                <div className="font-medium text-gray-800 group-hover:text-purple-700 line-clamp-2 leading-snug">
                  {item.title}
                </div>

                <div className="flex items-center gap-2 mt-3 text-xs text-gray-500">
                  <Calendar size={14} />
                  <span>
                    {item.created_at
                      ? new Date(item.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric" })
                      : "Recent"}
                  </span>
                </div>
              </Link>

              {/* Minimal Share Icons */}
              <div className="flex gap-4 mt-4 text-gray-400">
                <button onClick={(e) => handleShare(e, "facebook", item)} className="hover:text-blue-600 transition">
                  <Facebook size={16} />
                </button>
                <button onClick={(e) => handleShare(e, "twitter", item)} className="hover:text-black transition">
                  <Twitter size={16} />
                </button>
                <button onClick={(e) => handleShare(e, "linkedin", item)} className="hover:text-blue-700 transition">
                  <Linkedin size={16} />
                </button>
                <button onClick={(e) => handleShare(e, "whatsapp", item)} className="hover:text-green-600 transition">
                  <MessageCircle size={16} />
                </button>
                <button onClick={(e) => handleShare(e, "copy", item)} className="hover:text-gray-600 transition">
                  <Share2 size={16} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}