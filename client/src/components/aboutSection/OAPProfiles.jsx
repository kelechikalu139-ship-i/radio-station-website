import React from 'react'

const OAPProfiles = ({ oaps = [] }) => {
     const demo = oaps.length ? oaps : [
    { id: 1, name: "DJ Kalu", bio: "Morning show host and music curator.", photo: "" },
    { id: 2, name: "Ada", bio: "Afternoon presenter, listener requests.", photo: "" },
    { id: 3, name: "Emma", bio: "Talkbacks and interviews.", photo: "" }
  ];
  return (
    <div>
        <section className="container mx-auto px-6 py-10 bg-white mt-3">
      <h3 className="text-xl font-bold text-purple-800 mb-4">On-Air Personalities</h3>
      <div className="grid md:grid-cols-3 gap-6">
        {demo.map((p) => (
          <div key={p.id} className="bg-white rounded-xl p-4 shadow border-t-4 border-purple-700">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center text-purple-700 font-bold text-xl">
                {p.name.split(" ").map(n => n[0]).slice(0,2).join("")}
              </div>
              <div>
                <div className="font-semibold text-purple-800">{p.name}</div>
                <div className="text-sm text-gray-600">{p.bio}</div>
                <a href={`/hosts/${p.id}`} className="text-sm text-yellow-400 mt-2 inline-block">Profile →</a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
    </div>
  )
}

export default OAPProfiles