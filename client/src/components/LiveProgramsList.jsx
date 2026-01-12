import React from 'react'
import { Calendar, Users } from "lucide-react";
import Button from '../../../shared/utils/Button';

const LiveProgramsList = ({ title = "Live Programs" }) => {
    const demo = [
  { id: 1, title: "Morning Drive", host: "DJ Kalu", time: "06:00 - 09:00" },
  { id: 2, title: "Midday Mix", host: "Ada Okoye", time: "12:00 - 14:00" },
  { id: 3, title: "Talk & Tell", host: "Emma Bello", time: "15:00 - 16:00" },
];
  return (
    <section className="bg-linear-to-b from-white/0 to-white/2 rounded-2xl p-6 shadow-2xl">
    {/* // <section className="bg-red-100 rounded-2xl p-6"> */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-white">{title}</h3>
        <div className="text-xs text-gray-100 inline-flex items-center gap-2"><Calendar size={14}/> Today</div>
      </div>

      <ul className="space-y-3">
        {demo.map((p) => (
          <li key={p.id} className="bg-white/5 rounded-lg p-3 flex items-center justify-between">
            <div>
              <div className="font-semibold text-white">{p.title}</div>
              <div className="text-xs text-white">{p.host}</div>
            </div>
            <div className="text-sm text-yellow-300 font-medium">{p.time}</div>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default LiveProgramsList