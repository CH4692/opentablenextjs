"use client";

import Image from "next/image";
import Link from "next/link";
import errorMascot from "../../public/error.png";

export default function Error({ error }: { error: Error }) {
  return (
    <div className="min-h-[70vh] flex flex-col justify-center items-center px-4 py-16">
      <Image src={errorMascot} alt="error" className="w-44 mb-8" />
      <div className="bg-white px-8 py-10 border border-[var(--line)] rounded-2xl max-w-md text-center">
        <h3 className="font-display text-3xl font-bold mb-2">
          Well, this is embarrassing
        </h3>
        <p className="text-reg text-[var(--muted)]">{error.message}</p>
        <Link href="/" className="btn-primary inline-flex mt-8 px-6 py-3">
          Back home
        </Link>
      </div>
    </div>
  );
}
