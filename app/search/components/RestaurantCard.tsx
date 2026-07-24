import Link from "next/link";
import { Cuisine, Location, Review, PRICE } from "@prisma/client";
import Price from "../../components/Price";
import { calculateReviewRatingAverage } from "../../../utils/calculateRatings";
import Stars from "../../components/Stars";

type Restaurant = {
  name: string;
  location: Location;
  id: number;
  main_image: string;
  price: PRICE;
  cuisine: Cuisine;
  slug: string;
  reviews: Review[];
};

export default function RestaurantCard({
  restaurant,
}: {
  restaurant: Restaurant;
}) {
  const renderRatingText = () => {
    const rating = calculateReviewRatingAverage(restaurant.reviews);

    if (rating > 4) return "Awesome";
    if (rating > 3) return "Good";
    if (rating > 0) return "Average";
    return "";
  };

  return (
    <div className="border border-[var(--line)] rounded-2xl bg-white flex flex-col sm:flex-row gap-4 p-4 mb-4 card-hover">
      <img
        src={restaurant.main_image}
        alt={restaurant.name}
        className="w-full sm:w-44 h-40 object-cover rounded-xl shrink-0"
      />
      <div className="min-w-0">
        <h2 className="text-2xl font-semibold">{restaurant.name}</h2>
        <div className="flex items-center mt-1">
          <Stars reviews={restaurant.reviews} />
          <p className="ml-2 text-sm text-[var(--muted)]">{renderRatingText()}</p>
        </div>
        <div className="mt-3 mb-5 font-medium flex flex-wrap gap-x-4 gap-y-1 text-reg text-[var(--muted)]">
          <Price price={restaurant.price} />
          <p className="capitalize">{restaurant.cuisine.name}</p>
          <p className="capitalize">{restaurant.location.name}</p>
        </div>
        <Link
          href={`/restaurant/${restaurant.slug}`}
          className="text-[var(--accent)] font-semibold hover:underline"
        >
          View more information
        </Link>
      </div>
    </div>
  );
}
