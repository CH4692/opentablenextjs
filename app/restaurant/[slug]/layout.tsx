import React from "react";
import Header from "./components/Header";
import prisma from "../../../prisma/db";

async function fetchHero(slug: string) {
  const restaurant = await prisma.restaurant.findUnique({
    where: { slug },
    select: { name: true, main_image: true },
  });
  return restaurant;
}

export default async function RestaurantLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { slug: string };
}) {
  const restaurant = await fetchHero(params.slug);

  return (
    <div>
      <Header
        name={restaurant?.name || params.slug}
        image={restaurant?.main_image}
      />
      <div className="flex flex-col lg:flex-row gap-6 m-auto w-full max-w-6xl px-4 sm:px-6 justify-between items-start -mt-10 sm:-mt-14 relative z-10 pb-16">
        {children}
      </div>
    </div>
  );
}
