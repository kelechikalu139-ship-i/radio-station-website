import React from "react";
import { Twitter, Instagram, Facebook } from "lucide-react";

const MainFooter = () => {
  return (
    <footer className="mt-12 bg-linear-to-b from-purple-900 to-purple-800 text-white dark:bg-gradient-to-b dark:from-gray-900 dark:to-gray-800 py-8">
      <div className="container mx-auto px-6 grid md:grid-cols-3 gap-6">
        <div>
          <div className="font-bold text-2xl">Nexter FM</div>
          <div className="text-sm text-white/80 dark:text-gray-300 mt-2">Next generation radio • Minna</div>
        </div>

        <div>
          <div className="font-semibold dark:text-gray-100">Contact</div>
          <div className="text-sm text-white/80 dark:text-gray-300">studio@nexter.fm</div>
          <div className="text-sm text-white/80 dark:text-gray-300">+234 800 000 000</div>
        </div>

        <div>
          <div className="font-semibold dark:text-gray-100">Follow</div>
          <div className="flex gap-3 mt-2">
            <a aria-label="Twitter" className="bg-white/6 p-2 rounded dark:bg-white/6/10"><Twitter /></a>
            <a aria-label="Instagram" className="bg-white/6 p-2 rounded dark:bg-white/6/10"><Instagram /></a>
            <a aria-label="Facebook" className="bg-white/6 p-2 rounded dark:bg-white/6/10"><Facebook /></a>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 text-center text-white/80 dark:text-gray-400">
        © {new Date().getFullYear()} Nexter FM — All rights reserved
      </div>
    </footer>
  );
};

export default MainFooter;
