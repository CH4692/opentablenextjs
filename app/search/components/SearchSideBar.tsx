import { Cuisine, Location, PRICE } from "@prisma/client";
import Link from "next/link";

export default function SearchSideBar({
  locations,
  cuisines,
  searchParams,
}: {
  locations: Location[];
  cuisines: Cuisine[];
  searchParams: { city?: string; cuisine?: string; price?: PRICE };
}) {
  const prices = [
    {
      price: PRICE.CHEAP,
      label: "$",
      className: "border border-[var(--line)] w-full text-center text-reg font-medium rounded-l-lg p-2 hover:bg-white",
    },
    {
      price: PRICE.REGULAR,
      label: "$$",
      className: "border-y border-[var(--line)] w-full text-center text-reg font-medium p-2 hover:bg-white",
    },
    {
      price: PRICE.EXPENSIVE,
      label: "$$$",
      className: "border border-[var(--line)] w-full text-center text-reg font-medium rounded-r-lg p-2 hover:bg-white",
    },
  ];

  return (
    <aside className="w-full lg:w-52 shrink-0 rounded-2xl border border-[var(--line)] bg-white p-4">
      <div className="border-b border-[var(--line)] pb-4 flex flex-col gap-1">
        <h2 className="mb-2 font-semibold">Region</h2>
        {locations.map((location) => (
          <Link
            href={{
              pathname: "/search",
              query: {
                ...searchParams,
                city: location.name,
              },
            }}
            key={location.id}
            className={`font-medium text-reg capitalize rounded-lg px-2 py-1 ${
              searchParams.city === location.name
                ? "bg-[var(--mist)] text-[var(--accent-deep)]"
                : "text-[var(--muted)] hover:text-[var(--ink)]"
            }`}
          >
            {location.name}
          </Link>
        ))}
      </div>
      <div className="border-b border-[var(--line)] pb-4 mt-3 flex flex-col gap-1">
        <h2 className="mb-2 font-semibold">Cuisine</h2>
        {cuisines.map((cuisine) => (
          <Link
            href={{
              pathname: "/search",
              query: {
                ...searchParams,
                cuisine: cuisine.name,
              },
            }}
            key={cuisine.id}
            className={`font-medium text-reg capitalize rounded-lg px-2 py-1 ${
              searchParams.cuisine === cuisine.name
                ? "bg-[var(--mist)] text-[var(--accent-deep)]"
                : "text-[var(--muted)] hover:text-[var(--ink)]"
            }`}
          >
            {cuisine.name}
          </Link>
        ))}
      </div>
      <div className="mt-3 pb-1">
        <h2 className="mb-2 font-semibold">Price</h2>
        <div className="flex">
          {prices.map(({ price, label, className }) => (
            <Link
              key={price}
              href={{
                pathname: "/search",
                query: {
                  ...searchParams,
                  price,
                },
              }}
              className={`${className} ${
                searchParams.price === price ? "bg-[var(--mist)]" : ""
              }`}
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
}
