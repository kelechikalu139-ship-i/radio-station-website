import React from 'react'
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Instagram, Facebook, Twitter } from 'lucide-react';
import OAPsHero from '../components/oapsSection/OAPsHero'
// import OAPSProfile from '../components/oapsSection/OAPSProfile'
  //  import OAPs from '../components/oapsSection/OAPs'
  import oapsData from '../../../shared/costants/oapData'

const OAPs = () => {
  return (
    <div>
        <OAPsHero/>
        {/* <OAPSProfile/> */}
        {/* <OAPs/> */}
        <section className="mx-auto px-6 py-10 bg-white mt-3">
      <h3 className="text-xl font-bold text-purple-800 mb-4">On-Air Personalities</h3>

      <div className="grid md:grid-cols-3 gap-6">
        {oapsData.map((oap) => (
          <motion.article
            key={oap.id}
            layout
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.99 }}
            className="bg-white rounded-xl p-4 shadow border-t-4 border-purple-300"
          >
            <Link to={`/oaps/${oap.id}`} className="block">
              <div className="flex items-center gap-4">
                <img src={oap.photo} alt={oap.name} className="w-20 h-20 rounded-lg object-cover" />

                <div className="flex-1">
                  <div className="font-semibold text-purple-800">{oap.name}</div>
                  <div className="text-sm text-gray-600">Host: {oap.show}</div>

                  <div className="flex gap-2 mt-2">
                    <a href={oap.instagram} onClick={(e)=>e.stopPropagation()} target="_blank" rel="noreferrer">
                      <Instagram size={18} className="text-gray-600 hover:text-pink-500" />
                    </a>
                    <a href={oap.facebook} onClick={(e)=>e.stopPropagation()} target="_blank" rel="noreferrer">
                      <Facebook size={18} className="text-gray-600 hover:text-blue-600" />
                    </a>
                    <a href={oap.twitter} onClick={(e)=>e.stopPropagation()} target="_blank" rel="noreferrer">
                      <Twitter size={18} className="text-gray-600 hover:text-blue-400" />
                    </a>
                  </div>

                  <div className="mt-3">
                    <span className="text-sm text-yellow-500 mt-2 inline-block">View Profile →</span>
                  </div>
                </div>
              </div>
            </Link>
          </motion.article>
        ))}
      </div>
    </section>
    </div>
  )
}

export default OAPs


// src/pages/OAPs.jsx
// import React from 'react';
// import { Link } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { Instagram, Facebook, Twitter } from 'lucide-react';
// import oapsData from '../data/oapsData';

// export default function OAPs() {
//   return (
    
//   );
// }
