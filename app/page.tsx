import Header from "./components/Header";
import RestaurantCard from "./components/RestaurantCard";
import { Cuisine, Location, PRICE, Review } from "@prisma/client";
import prisma from "../prisma/db";

export const dynamic = "force-dynamic";

export type RestaurantCardType = {
  id: number;
  name: string;
  main_image: string;
  price: PRICE;
  cuisine: Cuisine;
  location: Location;
  slug: string;
  reviews: Review[];
};

const fetchRestaurants = async (): Promise<RestaurantCardType[]> => {
  const restaurants = await prisma.restaurant.findMany({
    select: {
      id: true,
      name: true,
      main_image: true,
      slug: true,
      cuisine: true,
      location: true,
      price: true,
      reviews: true,
    },
  });
  return restaurants;
};

export default async function Home() {
  const restaurants = await fetchRestaurants();
  return (
    <>
      <Header />
      <section className="px-4 sm:px-10 py-12 sm:py-16">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8 sm:mb-10 animate-rise">
            <p className="text-sm uppercase tracking-[0.2em] text-[var(--accent)] mb-2">
              Featured
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[var(--ink)]">
              Popular restaurants
            </h2>
          </div>
          <div className="flex flex-wrap justify-center sm:justify-start">
            {restaurants.map((restaurant) => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
