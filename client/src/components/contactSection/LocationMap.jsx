// src/components/LocationMap.jsx
import React from "react";
import { MapPin } from "lucide-react";

const LocationMap = () => {
  return (
    <section className="py-16 bg-linear-to-br from-purple-50 via-white to-yellow-50">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-purple-800 mb-2">
            Visit <span className="text-yellow-500">Nexter FM</span>
          </h2>
          <p className="text-gray-600 text-sm md:text-base">
            We’re always happy to welcome our listeners, sponsors, and guests.
          </p>
        </div>

        {/* Map + Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Google Map Embed */}
          <div className="rounded-2xl overflow-hidden shadow-lg ring-1 ring-gray-200 hover:ring-yellow-400 transition-all">
            <iframe
              title="Nexter FM Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3975.859804048182!2d7.4977!3d9.0588!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x104e0a5a7a5!2sMinna%20Nigeria!5e0!3m2!1sen!2sng!4v1691179999999!5m2!1sen!2sng"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-[350px] md:h-[420px]"
            ></iframe>
          </div>

          {/* Info Section */}
          <div className="flex flex-col justify-center space-y-6">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-purple-100 text-purple-700">
                <MapPin size={26} />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-purple-800">
                  Our Office
                </h3>
                <p className="text-gray-600">
                  Plot 12 Radio Avenue, Off Ibrahim Road, Minna, Niger State,
                  Nigeria.
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-purple-800 mb-1">
                Contact
              </h3>
              <p className="text-gray-600">
                Email:{" "}
                <a
                  href="mailto:hello@nexterfm.com"
                  className="text-purple-700 hover:underline"
                >
                  hello@nexterfm.com
                </a>
                <br />
                Phone:{" "}
                <a
                  href="tel:+2348000000000"
                  className="text-purple-700 hover:underline"
                >
                  +234 800 000 0000
                </a>
              </p>
            </div>

            <button className="self-start mt-4 bg-linear-to-r from-purple-700 to-purple-900 text-white px-6 py-3 rounded-xl shadow-lg font-semibold hover:scale-105 transition">
              Get Directions
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationMap;
