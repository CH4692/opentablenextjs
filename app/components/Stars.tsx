import fullstar from "../../public/full-star.png";
import halfstar from "../../public/half-star.png";
import emptystar from "../../public/empty-star.png";
import Image from "next/image";
import { Review } from "@prisma/client";
import { calculateReviewRatingAverage } from "../../utils/calculateRatings";

export default function Stars({
  reviews,
  rating,
}: {
  reviews: Review[];
  rating?: number;
}) {
  const reviewRating = rating || calculateReviewRatingAverage(reviews);
  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      const difference = parseFloat((reviewRating - i).toFixed(1));
      if (difference >= 1) stars.push(fullstar);
      else if (difference < 1 && difference > 0) {
        if (difference <= 0.2) stars.push(emptystar);
        else if (difference > 0.2 && difference <= 0.6) stars.push(halfstar);
        else stars.push(fullstar);
      } else stars.push(emptystar);
    }
    return stars.map((star) => {
      return <Image src={star} alt="" className="w-4 h-4 mr-1" />;
    });
  };
  return <div className="flex items-center">{renderStars()}</div>;
}
