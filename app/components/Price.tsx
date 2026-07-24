import { PRICE } from "@prisma/client";
import React from "react";

export default function Price({ price }: { price: PRICE }) {
  const renderPrice = () => {
    if (price === PRICE.CHEAP) {
      return (
        <>
          <span>$</span>
          <span className="text-gray-300">$$</span>
        </>
      );
    }
    if (price === PRICE.REGULAR) {
      return (
        <>
          <span>$$</span>
          <span className="text-gray-300">$</span>
        </>
      );
    }
    return <span>$$$</span>;
  };
  return <p className="flex mr-3 tracking-tight">{renderPrice()}</p>;
}
