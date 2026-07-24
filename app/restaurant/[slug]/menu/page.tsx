import MenuComp from "../components/MenuComp";
import RestaurantNavBar from "../components/RestaurantNavBar";
import prisma from "../../../../prisma/db";
import { notFound } from "next/navigation";

const fetchRestaurantMenu = async (slug: string) => {
  const restaurant = await prisma.restaurant.findUnique({
    where: { slug },
    select: { items: true },
  });
  if (!restaurant) {
    notFound();
  }
  return restaurant.items;
};

export default async function Menu({ params }: { params: { slug: string } }) {
  const menu = await fetchRestaurantMenu(params.slug);
  return (
    <div className="bg-white w-full rounded-2xl p-4 sm:p-6 border border-[var(--line)] shadow-[0_8px_30px_rgba(16,20,24,0.05)]">
      <RestaurantNavBar slug={params.slug} />
      <MenuComp menu={menu} />
    </div>
  );
}
