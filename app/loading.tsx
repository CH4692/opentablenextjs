import React from "react";
import Header from "./components/Header";

export default function Loading() {
  return (
    <>
      <Header />
      <div className="px-4 sm:px-10 py-12">
        <div className="max-w-6xl mx-auto flex flex-wrap justify-center sm:justify-start">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
            <div
              key={num}
              className="animate-pulse bg-[var(--mist)] w-64 h-72 m-3 rounded-2xl"
            />
          ))}
        </div>
      </div>
    </>
  );
}
