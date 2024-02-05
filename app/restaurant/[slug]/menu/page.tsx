import MenuComp from "../components/MenuComp";
import RestaurantNavBar from "../components/RestaurantNavBar";
import prisma from "../../../../prisma/db";

const fetchRestaurantMenu = async (slug: string) => {
  const restaurant = await prisma.restaurant.findUnique({
    where: {
      slug,
    },
    select: {
      items: true,
    },
  });
  if (!restaurant) {
    throw new Error();
  }
  return restaurant.items;
};

export default async function Menu({ params }: { params: { slug: string } }) {
  const menu = await fetchRestaurantMenu(params.slug);
  return (
    <div className="bg-white w-[100%] rounded p-3 shadow">
      <RestaurantNavBar slug={params.slug} />
      <MenuComp menu={menu} />
    </div>
  );
}
