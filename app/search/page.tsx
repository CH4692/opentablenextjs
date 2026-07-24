import Header from "./components/Header";
import RestaurantCard from "./components/RestaurantCard";
import SearchSideBar from "./components/SearchSideBar";
import prisma from "../../prisma/db";
import { PRICE, Prisma } from "@prisma/client";

export const dynamic = "force-dynamic";

type SearchParams = {
  city?: string;
  cuisine?: string;
  price?: PRICE;
};

const fetchRestaurant = (searchParams: SearchParams) => {
  const where: Prisma.RestaurantWhereInput = {};

  if (searchParams.city) {
    where.location = {
      name: {
        equals: searchParams.city.toLowerCase(),
      },
    };
  }

  if (searchParams.cuisine) {
    where.cuisine = {
      name: {
        equals: searchParams.cuisine.toLowerCase(),
      },
    };
  }
  if (searchParams.price) {
    where.price = {
      equals: searchParams.price,
    };
  }

  return prisma.restaurant.findMany({
    where,
    select: {
      id: true,
      name: true,
      main_image: true,
      price: true,
      cuisine: true,
      location: true,
      slug: true,
      reviews: true,
    },
  });
};

const fetchCuisines = async () => prisma.cuisine.findMany();
const fetchLocations = async () => prisma.location.findMany();

export default async function Search({
  searchParams,
}: {
  searchParams: { city?: string; cuisine?: string; price?: PRICE };
}) {
  const restaurants = await fetchRestaurant(searchParams);
  const cuisines = await fetchCuisines();
  const locations = await fetchLocations();

  return (
    <>
      <Header />
      <div className="flex flex-col lg:flex-row gap-8 py-8 px-4 sm:px-8 m-auto w-full max-w-6xl items-start">
        <SearchSideBar
          locations={locations}
          cuisines={cuisines}
          searchParams={searchParams}
        />
        <div className="w-full lg:flex-1">
          {restaurants.length ? (
            restaurants.map((restaurant) => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))
          ) : (
            <div className="rounded-2xl border border-[var(--line)] bg-white p-8 text-center">
              <h2 className="font-display text-2xl mb-2">No matches</h2>
              <p className="text-[var(--muted)]">
                Try another city like ottawa, toronto, or niagara.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
