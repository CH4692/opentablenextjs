import Title from "./components/Title";
import RestaurantNavBar from "./components/RestaurantNavBar";
import Ratings from "./components/Ratings";
import Description from "./components/Description";
import Images from "./components/Images";
import ReservationCard from "./components/ReservationCard";
import prisma from "../../../prisma/db";
import { Review } from "@prisma/client";
import Reviews from "./components/Reviews";
import { notFound } from "next/navigation";
import { parseImages } from "../../../utils/images";

type Restaurant = {
  id: number;
  name: string;
  images: string[];
  description: string;
  slug: string;
  reviews: Review[];
  open_time: string;
  close_time: string;
};

const fetchRestaurant = async (slug: string): Promise<Restaurant> => {
  const restaurant = await prisma.restaurant.findUnique({
    where: { slug },
    select: {
      id: true,
      name: true,
      images: true,
      description: true,
      slug: true,
      reviews: true,
      open_time: true,
      close_time: true,
    },
  });

  if (!restaurant) {
    notFound();
  }
  return {
    ...restaurant,
    images: parseImages(restaurant.images),
  };
};

export default async function RestaurantDetails({
  params,
}: {
  params: { slug: string };
}) {
  const restaurant = await fetchRestaurant(params.slug);
  return (
    <>
      <div className="bg-white w-full lg:w-[70%] rounded-2xl p-4 sm:p-6 border border-[var(--line)] shadow-[0_8px_30px_rgba(16,20,24,0.05)]">
        <RestaurantNavBar slug={restaurant.slug} />
        <Title name={restaurant.name} />
        <Ratings reviews={restaurant.reviews} />
        <Description description={restaurant.description} />
        <Images images={restaurant.images} />
        <Reviews reviews={restaurant.reviews} />
      </div>
      <div className="w-full lg:w-[28%] relative text-reg mt-6 lg:mt-0">
        <ReservationCard
          slug={restaurant.slug}
          openTime={restaurant.open_time}
          closeTime={restaurant.close_time}
        />
      </div>
    </>
  );
}
