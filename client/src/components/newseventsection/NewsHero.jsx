export default function NewsHero() {
  return (
    <section className="relative h-[45vh] flex items-center justify-center bg-linear-to-r from-purple-900 to-purple-700 text-white">
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative text-center px-4">
        <h1 className="text-4xl md:text-5xl font-extrabold">
          News & Events
        </h1>
        <p className="mt-4 max-w-xl mx-auto text-white/90">
          Latest updates, station news, live events, and community activities from Nexter FM
        </p>
      </div>
    </section>
  );
}