import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, ArrowLeft, Facebook, Twitter, Linkedin, MessageCircle, Share2 } from "lucide-react";
import api from "../api/api";

export default function NewsEventFullPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/api/news/${id}`);   // Note: /api/news/ not /news/
        setNews(res.data);
      } catch (err) {
        console.error("Failed to fetch news:", err);
        setError("News not found");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchNews();
  }, [id]);

  // Share Function
  const handleShare = (platform) => {
    if (!news) return;
    const shareUrl = window.location.href;
    const title = news.title;

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
        navigator.clipboard.writeText(shareUrl).then(() => alert("Link copied to clipboard!"));
        break;
    }
  };

  if (loading) {
    return <div className="container mx-auto px-6 py-20 text-center">Loading article...</div>;
  }

  if (error || !news) {
    return (
      <div className="container mx-auto px-6 py-20 text-center">
        <p className="text-red-500">Article not found</p>
        <Link to="/newsevent" className="text-purple-600 mt-4 inline-block">
          ← Back to News & Events
        </Link>
      </div>
    );
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto px-4 md:px-6 py-12"
    >
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition"
      >
        <ArrowLeft size={20} />
        Back to News & Events
      </button>

      {/* Title */}
      <h1 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">
        {news.title}
      </h1>

      {/* Meta Info */}
      <div className="flex flex-wrap items-center gap-4 mt-6 text-gray-400">
        <div className="flex items-center gap-2">
          <Calendar size={18} />
          <span>{new Date(news.created_at).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</span>
        </div>
        {news.author && <span>• {news.author}</span>}
        {news.category && <span className="bg-purple-700 px-3 py-1 text-xs rounded-full">{news.category}</span>}
      </div>

      {/* Featured Image */}
      <div className="mt-10">
        <img
          src={news.image_url || news.photo}
          alt={news.title}
          className="w-full rounded-3xl shadow-2xl object-cover max-h-125"
        />
      </div>

      {/* Share Buttons */}
      <div className="flex items-center gap-3 mt-8 mb-10">
        <span className="text-gray-400 text-sm font-medium">Share this article:</span>
        <div className="flex gap-2">
          <button onClick={() => handleShare("facebook")} className="p-3 bg-gray-800 hover:bg-blue-600 rounded-full transition">
            <Facebook size={20} />
          </button>
          <button onClick={() => handleShare("twitter")} className="p-3 bg-gray-800 hover:bg-black rounded-full transition">
            <Twitter size={20} />
          </button>
          <button onClick={() => handleShare("linkedin")} className="p-3 bg-gray-800 hover:bg-blue-700 rounded-full transition">
            <Linkedin size={20} />
          </button>
          <button onClick={() => handleShare("whatsapp")} className="p-3 bg-gray-800 hover:bg-green-600 rounded-full transition">
            <MessageCircle size={20} />
          </button>
          <button onClick={() => handleShare("copy")} className="p-3 bg-gray-800 hover:bg-gray-700 rounded-full transition">
            <Share2 size={20} />
          </button>
        </div>
      </div>

      {/* Article Content */}
      <div className="prose prose-invert prose-lg max-w-none text-gray-200 leading-relaxed">
        {news.content ? (
          <div dangerouslySetInnerHTML={{ __html: news.content }} />
        ) : (
          news.article?.split("\n").map((paragraph, index) => (
            <p key={index} className="mb-6">
              {paragraph}
            </p>
          ))
        )}
      </div>
    </motion.article>
  );
}