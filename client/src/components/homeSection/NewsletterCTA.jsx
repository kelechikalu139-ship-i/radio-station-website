import React, { useState } from "react";

const NewsletterCTA = () => {
    const [email, setEmail] = useState("");
  const [ok, setOk] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    // TODO: wire to /api/newsletter
    setOk(true);
    setEmail("");
  };

  return (
     <section className="rounded-2xl p-6 bg-linear-to-r from-purple-800 to-purple-700 text-white my-10 py-10">
      <div className="max-w-2xl mx-auto text-center">
        <h4 className="text-2xl font-bold">Stay in the loop</h4>
        <p className="text-sm text-white/80 mt-2">Get our schedule, exclusive mixes and community updates.</p>

        <form onSubmit={submit} className="mt-4 flex gap-3 justify-center">
          <input required value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="you@domain.com" type="email" className="px-4 py-2 rounded-lg text-gray-900 w-72 bg-white outline-0" />
          <button className="px-4 py-2 rounded-lg bg-yellow-300 font-semibold text-purple-900">Subscribe</button>
        </form>

        {ok && <div className="mt-3 text-sm text-yellow-200">Thanks — check your inbox!</div>}
      </div>
    </section>
  )
}

export default NewsletterCTA