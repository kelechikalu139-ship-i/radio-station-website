import { Link } from "react-router-dom";

// FeaturedNews.jsx
export default function FeaturedNews() {
  return (
    <section className="container mx-auto px-5 py-14">
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <img
          src="/images/news/news1.jpeg"
          className="rounded-xl shadow-lg object-cover h-72 w-full"
          alt="Featured News"
        />

        <div>
          <span className="text-yellow-500 font-bold text-sm">FEATURED</span>
          <h2 className="mt-2 text-3xl font-bold text-white">
            Nexter FM Hosts Youth Media Bootcamp
          </h2>
          <p className="mt-4 text-gray-400">
            Nexter FM Minna organized a youth media bootcamp focused on broadcasting,
            journalism, and digital storytelling.
          </p>
          <button className="mt-5 bg-purple-700 text-white px-6 py-3 rounded-lg">
            Read More
          </button>
           {/* <Link
                to={`/newsevent/${news.id}`}
                className="mt-5 bg-purple-700 text-white px-6 py-3 rounded-lg"
              >
                Read More →
              </Link> */}
        </div>
      </div>
    </section>
  );
}
