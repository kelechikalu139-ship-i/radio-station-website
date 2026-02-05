// src/components/aboutSection/TeamSection.jsx
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Instagram } from "lucide-react";
import oapsData from "../../../../shared/costants/oapData";

const owner = {
  name: "Umar Kolo",
  role: "Founder & Chairman",
  photo: "/images/team/nexter_ceo.jpeg",
  message:
    "Building a voice for the community through credible broadcasting and entertainment."
};

const management = [
  {
    name: "Mrs. Ada Okorie",
    role: "Station Manager",
    photo: "/images/team/station_manager.jpeg"
  },
  {
    name: "Engr. Musa Bello",
    role: "Technical Director",
    photo: "/images/team/technical director.jpeg"
  }
];

export default function TeamSection() {
  return (
    <section className="container mx-auto px-6 py-14">
      {/* ===== OWNER / GM ===== */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="bg-linear-to-r from-purple-800 to-purple-600 rounded-2xl p-8 text-white shadow-xl"
      >
        <div className="flex flex-col md:flex-row items-center gap-6">
          <img
            src={owner.photo}
            alt={owner.name}
            className="w-40 h-40 rounded-full object-cover border-4 border-yellow-400"
          />

          <div>
            <h2 className="text-2xl font-extrabold">{owner.name}</h2>
            <p className="text-yellow-300 font-semibold">{owner.role}</p>
            <p className="mt-4 text-white/90 max-w-xl">
              {owner.message}
            </p>
          </div>
        </div>
      </motion.div>

      {/* ===== MANAGEMENT ===== */}
      <div className="mt-16">
        <h3 className="text-xl font-bold text-purple-800 mb-6">
          Management Team
        </h3>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {management.map((m, i) => (
            <motion.article
              key={i}
              whileHover={{ y: -6 }}
              className="bg-white rounded-xl shadow-md p-6 text-center"
            >
              <img
                src={m.photo}
                alt={m.name}
                className="w-24 h-24 mx-auto rounded-full object-cover"
              />
              <h4 className="mt-4 font-bold text-purple-800">
                {m.name}
              </h4>
              <p className="text-gray-600 text-sm">{m.role}</p>
            </motion.article>
          ))}
        </div>
      </div>

      {/* ===== OAPS ===== */}
      <div className="mt-20">
        <h3 className="text-xl font-bold text-purple-800 mb-6">
          On-Air Personalities
        </h3>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {oapsData.map((o) => (
            <motion.article
              key={o.id}
              whileHover={{ scale: 1.03 }}
              className="bg-gray-50 rounded-xl p-4 shadow-sm"
            >
              <img
                src={o.photo}
                alt={o.name}
                className="w-full h-48 object-cover rounded-lg"
              />

              <div className="mt-4">
                <h4 className="font-bold text-purple-800">
                  {o.name}
                </h4>
                <p className="text-sm text-gray-600">
                  Host: {o.show}
                </p>

                <div className="mt-3 flex items-center justify-between">
                  <a href={o.instagram} target="_blank" rel="noreferrer">
                    <Instagram className="text-gray-600 hover:text-pink-500" />
                  </a>

                  <Link
                    to={`/oaps/${o.id}`}
                    className="text-sm text-yellow-500 font-semibold"
                  >
                    View Profile →
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
