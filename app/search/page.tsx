import Header from "./components/Header";
import RestaurantCard from "./components/RestaurantCard";
import SearchSideBar from "./components/SearchSideBar";
import prisma from "../../prisma/db";
import { PRICE } from "@prisma/client";

type SearchParams = {
  city?: string;
  cuisine?: string;
  price?: PRICE;
};

const fetchRestaurant = (searchParams: SearchParams) => {
  const where: any = {};

  if (searchParams.city) {
    const location = {
      name: {
        equals: searchParams.city.toLowerCase(),
      },
    };
    where.location = location;
  }

  if (searchParams.cuisine) {
    const cuisine = {
      name: {
        equals: searchParams.cuisine.toLowerCase(),
      },
    };
    where.cuisine = cuisine;
  }
  if (searchParams.price) {
    const price = {
      equals: searchParams.price,
    };
    where.price = price;
  }

  const select = {
    id: true,
    name: true,
    main_image: true,
    price: true,
    cuisine: true,
    location: true,
    slug: true,
    reviews: true,
  };

  return prisma.restaurant.findMany({
    where,
    select,
  });
};

const fetchCuisines = async () => {
  const cuisines = await prisma.cuisine.findMany();
  return cuisines;
};

const fetchLocations = async () => {
  const locations = await prisma.location.findMany();
  return locations;
};

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
      <div className="flex py-4 m-auto w-2/3 justify-between items-start">
        <SearchSideBar
          locations={locations}
          cuisines={cuisines}
          searchParams={searchParams}
        />
        <div className="w-5/6">
          {restaurants.length ? (
            <>
              {restaurants.map((restaurant) => (
                <RestaurantCard key={restaurant.id} restaurant={restaurant} />
              ))}
            </>
          ) : (
            <p>Sorry, we found no restaurants in this area</p>
          )}
        </div>
      </div>
    </>
  );
}
