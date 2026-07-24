import { formatDisplayTime } from "../../../../utils/times";

type Props = {
  name: string;
  image: string;
  date: string;
  time: string;
  partySize: string;
};

export default function Header({ name, image, date, time, partySize }: Props) {
  const prettyDate = new Date(`${date}T12:00:00`).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div>
      <p className="text-sm uppercase tracking-[0.18em] text-[var(--accent)] mb-2">
        Almost done
      </p>
      <h3 className="font-display text-3xl text-[var(--ink)]">
        Confirm your table
      </h3>
      <div className="mt-6 flex flex-col sm:flex-row gap-4">
        <img
          src={image}
          alt={name}
          className="w-full sm:w-36 h-28 object-cover rounded-xl"
        />
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold text-[var(--ink)]">
            {name}
          </h1>
          <div className="flex flex-wrap gap-x-6 gap-y-1 mt-3 text-[var(--muted)]">
            <p>{prettyDate}</p>
            <p>{formatDisplayTime(time)}</p>
            <p>
              {partySize} {Number(partySize) === 1 ? "person" : "people"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
