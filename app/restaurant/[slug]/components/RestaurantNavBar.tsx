import Link from "next/link";

export default function RestaurantNavBar({ slug }: { slug: string }) {
  return (
    <nav className="flex text-reg border-b border-[var(--line)] pb-3 gap-6">
      <Link
        href={`/restaurant/${slug}`}
        className="font-semibold text-[var(--ink)] hover:text-[var(--accent)]"
      >
        Overview
      </Link>
      <Link
        href={`/restaurant/${slug}/menu`}
        className="font-semibold text-[var(--ink)] hover:text-[var(--accent)]"
      >
        Menu
      </Link>
    </nav>
  );
}
