import { Link } from "react-router-dom";
import NewsData from "../../../../shared/costants/news"
export default function NewsList() {
  return (
    <section className="container mx-auto px-5 pb-14">
      <h3 className="text-2xl font-bold mb-6 text-white">Latest News</h3>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {NewsData.map(item => (
          <div key={item.id} className="bg-white shadow rounded-xl p-5">
               <img
                src={item.photo}
                className="rounded-xl shadow-lg object-cover h-50 w-full"
                alt="Featured News"
              />
              
              
            <span className="text-sm text-gray-500">{item.date}</span>
            <h4 className="mt-2 font-semibold text-lg">{item.title}</h4>
            <p className="text-sm text-gray-500 font-light">written by: <span className="text-red-500">{item.author}</span></p>
            {/* <button className="mt-3 text-purple-700 font-semibold">
              Read →
            </button> */}
            <Link to={`/newsevent/${item.id}`} className="mt-3 text-purple-700 font-semibold">
            
              Read more →
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
