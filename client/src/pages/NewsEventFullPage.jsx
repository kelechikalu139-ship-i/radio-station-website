// import React, { useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import {motion} from 'framer-motion';
// import newsData from "../../../shared/costants/news";
// export default function (){
//     const {id} = useParams();
//     const navigate = useNavigate();
//     const selected = newsData.find((o) => String(o.id) === String(id));

//     useEffect(() =>{
//         if(!selected){
//             const t = setTimeout(()=> navigate('/newsevent'), 1200);
//             return () => clearTimeout(t);
//         }
//     }, [selected, navigate]);

//     if(!selected){
//         return(
//             <div className="flex flex-col md:flex-row items-start gap-6">
//                 <p className="text-gray-600">News/Event not found. Redirecting...</p>
//             </div>
//         )
//     }
    
//     return(
//            <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -10 }}
//             transition={{ duration: 0.35 }}
//             className="max-w-5xl mx-auto p-6 mt-12 bg-white rounded-2xl shadow"
//     >
//              <div className=" gap-6">
//                 <div>
//                     <h1 className="text-gray-900 font-bold text-2xl">{selected.title}</h1>
//                 </div>

//                 <div className="flex gap-3 mt-4">
//                     <img src={selected.photo} alt={selected.name} className="w-88 h-88 rounded-lg object-cover shadow"/>
//                     <section>
//                         <p className="text-red-500">Published on: {selected.date} - <span className="text-gray-500">By: {selected.author}</span></p>
//                     <p className="text-gray-500 font-bold">{selected.article}</p>
//                     </section>
//                 </div>
//              </div>
//              <div className="mt-6 flex-gap">
//                 <button onClick={()=> navigate(-1)} className="px-4 py-2 rounded-md border hover:bg-amber-500 hover:border-0">Back</button>
//              </div>
             
//         </motion.div>
       
//     )
// }


import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import newsData from "../../../shared/costants/news";

export default function NewsDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const selected = newsData.find((n) => String(n.id) === String(id));

  useEffect(() => {
    if (!selected) {
      const t = setTimeout(() => navigate("/newsevent"), 1200);
      return () => clearTimeout(t);
    }
  }, [selected, navigate]);

  if (!selected) {
    return (
      <div className="container mx-auto px-6 py-20 text-center">
        <p className="text-gray-500">News/Event not found. Redirecting...</p>
      </div>
    );
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-4xl mx-auto px-4 md:px-6 py-12"
    >
      {/* Title */}
      <h1 className="text-2xl md:text-4xl font-extrabold text-white leading-tight">
        {selected.title}
      </h1>

      {/* Meta Info */}
      <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 mt-3">
        <span>🗓 {selected.date}</span>
        <span>•</span>
        <span>✍ {selected.author}</span>
        {selected.category && (
          <>
            <span>•</span>
            <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs font-semibold">
              {selected.category}
            </span>
          </>
        )}
      </div>

      {/* Image */}
      <div className="mt-6">
        <img
          src={selected.photo}
          alt={selected.title}
          className="w-full max-h-[420px] object-cover rounded-2xl shadow-lg"
        />
      </div>

      {/* Article Content */}
      <div className="mt-8 prose prose-lg max-w-none text-white leading-relaxed">
        {selected.article.split("\n").map((p, i) => (
          <p key={i} className="mb-4">{p}</p>
        ))}
      </div>

      {/* Author Card */}
      <div className="mt-10 bg-gray-50 p-4 rounded-xl flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold">
          {selected.author?.[0] || "N"}
        </div>
        <div>
          <p className="font-semibold text-gray-800">{selected.author}</p>
          <p className="text-sm text-gray-500">Nexter FM News Desk</p>
        </div>
      </div>

      {/* Buttons */}
      <div className="mt-10 flex flex-wrap gap-3">
        <button
          onClick={() => navigate(-1)}
          className="px-5 py-2 rounded-lg border border-gray-300 hover:bg-purple-600 hover:text-white transition"
        >
          ← Back to News
        </button>

        <button
          onClick={() => navigator.share?.({ title: selected.title })}
          className="px-5 py-2 rounded-lg bg-yellow-400 text-purple-900 font-semibold hover:bg-yellow-300 transition"
        >
          Share
        </button>
      </div>
    </motion.article>
  );
}
