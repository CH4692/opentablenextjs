"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SearchBar() {
  const router = useRouter();
  const [location, setLocation] = useState("");

  const go = () => {
    if (!location.trim()) return;
    router.push(`/search?city=${encodeURIComponent(location.trim())}`);
    setLocation("");
  };

  return (
    <div className="text-left text-base sm:text-lg m-auto flex flex-col sm:flex-row gap-3 justify-center max-w-2xl">
      <input
        className="rounded-xl p-3 sm:p-3.5 w-full sm:flex-1 bg-white/95 text-[var(--ink)] shadow-lg outline-none focus:ring-2 focus:ring-teal-300"
        type="text"
        placeholder="Try ottawa, toronto, or niagara"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") go();
        }}
      />
      <button
        type="button"
        className="btn-primary rounded-xl px-8 py-3.5 whitespace-nowrap"
        onClick={go}
      >
        Let&apos;s go
      </button>
    </div>
  );
}
