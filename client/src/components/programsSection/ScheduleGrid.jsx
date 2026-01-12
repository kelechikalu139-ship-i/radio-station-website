import React from 'react'

const days = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
const demo = [
  { time: "06:00", mon: "Morning Drive", tue: "Morning Drive", wed: "Morning Drive", thu:"Morning Drive", fri:"Morning Drive", sat:"Weekend Mix", sun:"Weekend Mix" },
  { time: "12:00", mon: "Midday Mix", tue: "Midday Mix", wed: "Midday Mix", thu:"Midday Mix", fri:"Midday Mix", sat:"Lunch Jams", sun:"Soul Brunch" },
  { time: "18:00", mon: "Evening Drive", tue: "Evening Drive", wed: "Talk & Tell", thu:"Evening Drive", fri:"Club Night", sat:"Club Night", sun:"Chillout" },
];

const ScheduleGrid = () => {
  return (
    <section className="rounded-2xl p-4 bg-white/4 border border-white/8">
    {/* // <section className="rounded-2xl p-4 bg-amber-950 border-white/8"> */}
      <h4 className="text-lg font-semibold text-purple-900 mb-3">Weekly Schedule</h4>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="text-xs text-white/70">
              <th className="py-2">Time</th>
              {days.map(d => <th key={d} className="py-2">{d}</th>)}
            </tr>
          </thead>
          <tbody>
            {demo.map((r, idx) => (
              <tr key={idx} className="border-t border-white/6">
                <td className="py-3 font-mono text-xs text-white/70 w-20">{r.time}</td>
                {days.map(d => (
                  <td key={d} className="py-3">
                    <div className="text-sm text-white">{r[d.toLowerCase()] ?? r.mon}</div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default ScheduleGrid