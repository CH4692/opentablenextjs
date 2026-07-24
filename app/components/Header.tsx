import SearchBar from "./SearchBar";

export default function Header() {
  return (
    <section className="hero-surface relative min-h-[70vh] sm:min-h-[62vh] flex items-center overflow-hidden">
      <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_80%_10%,rgba(255,255,255,0.18),transparent_40%)]" />
      <div className="relative z-10 w-full px-5 sm:px-10 py-16 sm:py-20 text-center max-w-4xl mx-auto">
        <p className="animate-rise text-teal-200/90 text-xs sm:text-sm uppercase tracking-[0.28em] mb-5">
          Seatly
        </p>
        <h1 className="animate-rise font-display text-white text-4xl sm:text-5xl md:text-6xl font-bold mb-4 text-shadow leading-tight">
          Find your table for any occasion
        </h1>
        <p className="animate-rise-delay text-white/80 text-base sm:text-lg max-w-xl mx-auto mb-8">
          Discover restaurants, browse menus, and reserve a seat in seconds.
        </p>
        <div className="animate-rise-delay">
          <SearchBar />
        </div>
      </div>
    </section>
  );
}
