import React, { useState, useEffect } from "react";
import { Facebook, Instagram, Twitter, X } from "lucide-react";

// Single-file React component that shows OAP cards and a modal for full profile/bio
// Requirements: Tailwind CSS + lucide-react installed in your project

export default function OAPSProfileWithModal() {
  const [selected, setSelected] = useState(null); // the selected OAP object
  const [isOpen, setIsOpen] = useState(false);

  const oaps = [
    {
      id: 1,
      name: "S.D Bawa",
      show: "Morning Ride",
      photo:
        "https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=500&q=80",
      instagram: "https://instagram.com",
      facebook: "https://facebook.com",
      twitter: "https://twitter.com",
      bio:
        "S.D Bawa has hosted 'Morning Ride' for 6 years. Passionate about new music, local artists, and community events. When he's not on-air he volunteers with local youth radio programs and runs vinyl nights.",
    },
    {
      id: 2,
      name: "Grace Daniels",
      show: "Afternoon Vibes",
      photo:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=500&q=80",
      instagram: "https://instagram.com",
      facebook: "https://facebook.com",
      twitter: "https://twitter.com",
      bio:
        "Grace is a storyteller who connects listeners to human stories across the city. Her show focuses on local culture and interviews with creatives.",
    },
    {
      id: 3,
      name: "John Matrix",
      show: "Night Groove",
      photo:
        "https://images.unsplash.com/photo-1504595403659-9088ce801e29?auto=format&fit=crop&w=500&q=80",
      instagram: "https://instagram.com",
      facebook: "https://facebook.com",
      twitter: "https://twitter.com",
      bio:
        "John curates deep cuts and late-night mixes. Expect chilled beats, long-form conversations and the occasional live session.",
    },
  ];

  // Open modal for a given OAP
  function openProfile(oap) {
    setSelected(oap);
    setIsOpen(true);
  }

  // Close modal
  function closeModal() {
    setIsOpen(false);
    setSelected(null);
  }

  // close on escape
  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") closeModal();
    }
    if (isOpen) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen]);

  return (
    <div>
      <section className="mx-auto px-6 py-10 bg-white mt-3">
        <h3 className="text-xl font-bold text-purple-800 mb-4">On-Air Personalities</h3>

        <div className="grid md:grid-cols-3 gap-6">
          {oaps.map((oap) => (
            <article
              key={oap.id}
              className="bg-white rounded-xl p-4 shadow border-t-4 border-purple-300 hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => openProfile(oap)}
              aria-label={`Open profile of ${oap.name}`}>

              <div className="flex items-center gap-4">
                <img
                  src={oap.photo}
                  alt={oap.name}
                  className="w-20 h-20 rounded-lg object-cover"
                />

                <div className="flex-1">
                  <div className="font-semibold text-purple-800">{oap.name}</div>
                  <div className="text-sm text-gray-600">Host: {oap.show}</div>

                  <div className="flex gap-2 mt-2">
                    <a href={oap.instagram} target="_blank" rel="noreferrer" onClick={(e)=>e.stopPropagation()}>
                      <Instagram size={18} className="text-gray-600 hover:text-pink-500" />
                    </a>
                    <a href={oap.facebook} target="_blank" rel="noreferrer" onClick={(e)=>e.stopPropagation()}>
                      <Facebook size={18} className="text-gray-600 hover:text-blue-600" />
                    </a>
                    <a href={oap.twitter} target="_blank" rel="noreferrer" onClick={(e)=>e.stopPropagation()}>
                      <Twitter size={18} className="text-gray-600 hover:text-blue-400" />
                    </a>
                  </div>

                  <div className="mt-3">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        openProfile(oap);
                      }}
                      className="text-sm text-yellow-500 mt-2 inline-block">
                      View Profile →
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Modal */}
      {isOpen && selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="oap-modal-title"
        >
          {/* overlay */}
          <div
            className="fixed inset-0 bg-black/50"
            onClick={closeModal}
            aria-hidden="true"
          />

          {/* modal panel */}
          <div className="relative max-w-3xl w-full bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="flex items-start justify-between p-4 border-b">
              <div>
                <h4 id="oap-modal-title" className="text-lg font-semibold text-purple-800">
                  {selected.name}
                </h4>
                <p className="text-sm text-gray-600">Host: {selected.show}</p>
              </div>

              <button
                onClick={closeModal}
                className="p-2 rounded-md hover:bg-gray-100"
                aria-label="Close profile modal"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-6 grid md:grid-cols-3 gap-6">
              <div className="md:col-span-1 flex flex-col items-center">
                <img
                  src={selected.photo}
                  alt={selected.name}
                  className="w-48 h-48 rounded-lg object-cover shadow"
                />

                <div className="flex gap-3 mt-4">
                  <a href={selected.instagram} target="_blank" rel="noreferrer">
                    <Instagram size={20} className="text-gray-600 hover:text-pink-500" />
                  </a>
                  <a href={selected.facebook} target="_blank" rel="noreferrer">
                    <Facebook size={20} className="text-gray-600 hover:text-blue-600" />
                  </a>
                  <a href={selected.twitter} target="_blank" rel="noreferrer">
                    <Twitter size={20} className="text-gray-600 hover:text-blue-400" />
                  </a>
                </div>
              </div>

              <div className="md:col-span-2">
                <h5 className="text-sm font-medium text-gray-700">About</h5>
                <p className="mt-2 text-sm text-gray-700 leading-relaxed">{selected.bio}</p>

                <div className="mt-6">
                  <h5 className="text-sm font-medium text-gray-700">Recent Shows / Highlights</h5>
                  <ul className="list-disc pl-5 mt-2 text-sm text-gray-600">
                    <li>Guest interview with Rising Artist — Aug 2025</li>
                    <li>Special vinyl night live session — Jun 2025</li>
                    <li>Community Radio Workshop host — Mar 2025</li>
                  </ul>
                </div>

                <div className="mt-6 flex gap-2">
                  <a
                    href={`/hosts/${selected.id}`}
                    className="inline-block px-4 py-2 rounded-md bg-purple-700 text-white text-sm"
                  >
                    Full Host Page
                  </a>

                  <button
                    onClick={closeModal}
                    className="inline-block px-4 py-2 rounded-md border text-sm"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
