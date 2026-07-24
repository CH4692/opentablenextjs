import Header from "./components/Header";
import Form from "./components/Form";
import prisma from "../../../prisma/db";
import { notFound } from "next/navigation";
import Link from "next/link";

const fetchRestaurant = async (slug: string) => {
  const restaurant = await prisma.restaurant.findUnique({
    where: { slug },
    select: {
      name: true,
      main_image: true,
      slug: true,
    },
  });
  if (!restaurant) notFound();
  return restaurant;
};

export default async function ReservePage({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { date?: string; time?: string; partySize?: string };
}) {
  const restaurant = await fetchRestaurant(params.slug);
  const date = searchParams.date;
  const time = searchParams.time;
  const partySize = searchParams.partySize;

  if (!date || !time || !partySize) {
    return (
      <div className="border-t border-[var(--line)] min-h-[70vh] px-4">
        <div className="py-16 max-w-xl mx-auto text-center">
          <h1 className="font-display text-3xl mb-3">Missing booking details</h1>
          <p className="text-[var(--muted)] mb-8">
            Choose a party size, date, and time on the restaurant page first.
          </p>
          <Link
            href={`/restaurant/${params.slug}`}
            className="btn-primary inline-flex px-6 py-3"
          >
            Back to restaurant
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="border-t border-[var(--line)] min-h-[70vh]">
      <div className="py-10 px-4 sm:px-8 w-full max-w-3xl mx-auto animate-rise">
        <Header
          name={restaurant.name}
          image={restaurant.main_image}
          date={date}
          time={time}
          partySize={partySize}
        />
        <Form
          slug={restaurant.slug}
          date={date}
          time={time}
          partySize={partySize}
        />
      </div>
    </div>
  );
}
