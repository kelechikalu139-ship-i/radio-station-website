import { Bell } from "lucide-react";

// EventsList.jsx
const events = [
  {
    title: "Live Broadcast at Minna City Square",
    date: "Nov 15, 2025",
    location: "Minna"
  },
  {
    title: "Listeners Meet & Greet",
    date: "Dec 01, 2025",
    location: "Nexter FM Studio"
  },
  {
    title: "Nexter Radio Health Work",
    date: "Feb 01, 2026",
    location: "Nexter FM Studio"
  }
];

export default function EventsList() {
  return (
    <section className="bg-gray-50 py-14">
      <div className="container mx-auto px-5">
        <h3 className="text-2xl font-bold mb-6">Upcoming Events</h3>

        <div className="space-y-4">
          {events.map((event, i) => (
            <div key={i} className="bg-white p-5 rounded-xl shadow flex justify-between items-center">
              <div>
                <h4 className="font-semibold text-lg">{event.title}</h4>
                <p className="text-gray-500 text-sm">
                  {event.date} • {event.location}
                </p>
              </div>

              <span className="text-purple-700 font-bold">
                Upcoming
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
