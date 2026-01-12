// src/components/aboutSection/CTAJoin.jsx
import React from "react";
import { Mail } from "lucide-react";
import { Link } from "react-router-dom";

export default function CTAJoin() {
  return (
    <div className="container mx-auto mt-8 p-6">
      <div className="bg-linear-to-r from-purple-700 to-purple-600 text-white rounded-lg p-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="text-xl font-semibold">Join the Nexter community</h4>
          <p className="text-sm opacity-90 mt-1">Become a guest, volunteer, or support our next live event.</p>
        </div>

        <div className="flex items-center gap-3">
          <Link to="/contact" className="inline-flex items-center gap-2 px-4 py-2 bg-white text-purple-700 rounded-md font-medium">
            <Mail size={16} /> Contact Us
          </Link>
          <a href="#" className="px-4 py-2 border rounded-md">Donate</a>
        </div>
      </div>
    </div>
  );
}
