import Link from "next/link";
import { RestaurantCardType } from "../page";
import Price from "./Price";
import Stars from "./Stars";

type Props = {
  restaurant: RestaurantCardType;
};

export default function RestaurantCard({ restaurant }: Props) {
  return (
    <article className="w-full max-w-[16.5rem] m-2 sm:m-3 rounded-2xl overflow-hidden border border-[var(--line)] bg-white cursor-pointer card-hover">
      <Link href={`/restaurant/${restaurant.slug}`} className="block">
        <img
          src={restaurant.main_image}
          alt={restaurant.name}
          className="w-full h-40 object-cover"
        />
        <div className="p-3">
          <h3 className="font-semibold text-xl mb-2 leading-snug line-clamp-2">
            {restaurant.name}
          </h3>
          <div className="flex items-center flex-wrap gap-y-1">
            <Stars reviews={restaurant.reviews} />
            <p className="ml-2 text-sm text-[var(--muted)]">
              {restaurant.reviews.length} review
              {restaurant.reviews.length === 1 ? "" : "s"}
            </p>
          </div>
          <div className="flex flex-wrap gap-x-3 gap-y-1 text-reg text-[var(--muted)] mt-2 capitalize">
            <p>{restaurant.cuisine.name}</p>
            <Price price={restaurant.price} />
            <p>{restaurant.location.name}</p>
          </div>
        </div>
      </Link>
    </article>
  );
}
