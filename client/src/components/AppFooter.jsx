import React from 'react'
import { Twitter, Instagram, Facebook } from "lucide-react";

const AppFooter = () => {
  return (
     <footer className="mt-12 bg-linear-to-b from-purple-900 to-purple-800 text-white py-8">
      <div className="container mx-auto px-6 grid md:grid-cols-3 gap-6">
        <div>
          <div className="font-bold text-2xl">Nexter FM</div>
          <div className="text-sm text-white/80 mt-2">Next generation radio • Minna</div>
        </div>

        <div>
          <div className="font-semibold">Contact</div>
          <div className="text-sm text-white/80">studio@nexter.fm</div>
          <div className="text-sm text-white/80">+234 800 000 000</div>
        </div>

        <div>
          <div className="font-semibold">Follow</div>
          <div className="flex gap-3 mt-2">
            <a aria-label="Twitter" className="bg-white/6 p-2 rounded"><Twitter /></a>
            <a aria-label="Instagram" className="bg-white/6 p-2 rounded"><Instagram /></a>
            <a aria-label="Facebook" className="bg-white/6 p-2 rounded"><Facebook /></a>
          </div>
        </div>
      </div>

      <div className="mt-6 text-center text-sm text-white/60">© {new Date().getFullYear()} Nexter FM. All rights reserved.</div>
    </footer>
  )
}

export default AppFooter