"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { formatDisplayTime, getAvailableTimes } from "../../../../utils/times";

export default function ReservationCard({
  slug,
  openTime,
  closeTime,
}: {
  slug: string;
  openTime: string;
  closeTime: string;
}) {
  const router = useRouter();
  const availableTimes = useMemo(
    () => getAvailableTimes(openTime, closeTime),
    [openTime, closeTime]
  );

  const today = new Date().toISOString().split("T")[0];
  const [partySize, setPartySize] = useState("2");
  const [date, setDate] = useState(today);
  const [time, setTime] = useState(availableTimes[0] || "19:00");

  const handleFindTime = () => {
    const params = new URLSearchParams({
      date,
      time,
      partySize,
    });
    router.push(`/reserve/${slug}?${params.toString()}`);
  };

  return (
    <div className="w-full sticky top-6 bg-white rounded-2xl p-5 border border-[var(--line)] shadow-[0_12px_40px_rgba(18,20,26,0.08)]">
      <div className="text-center border-b border-[var(--line)] pb-3">
        <h4 className="text-lg font-semibold text-[var(--ink)]">
          Make a Reservation
        </h4>
      </div>
      <div className="my-4 flex flex-col gap-1">
        <label htmlFor="party-size" className="text-sm text-[var(--muted)]">
          Party size
        </label>
        <select
          id="party-size"
          className="py-3 border-b border-[var(--line)] bg-transparent font-medium outline-none"
          value={partySize}
          onChange={(e) => setPartySize(e.target.value)}
        >
          {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
            <option key={n} value={n}>
              {n} {n === 1 ? "person" : "people"}
            </option>
          ))}
        </select>
      </div>
      <div className="flex justify-between gap-3">
        <div className="flex flex-col w-[48%] gap-1">
          <label htmlFor="date" className="text-sm text-[var(--muted)]">
            Date
          </label>
          <input
            id="date"
            type="date"
            min={today}
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="py-3 border-b border-[var(--line)] bg-transparent font-medium outline-none w-full"
          />
        </div>
        <div className="flex flex-col w-[48%] gap-1">
          <label htmlFor="time" className="text-sm text-[var(--muted)]">
            Time
          </label>
          <select
            id="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="py-3 border-b border-[var(--line)] bg-transparent font-medium outline-none"
          >
            {availableTimes.map((slot) => (
              <option key={slot} value={slot}>
                {formatDisplayTime(slot)}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="mt-6">
        <button
          type="button"
          onClick={handleFindTime}
          className="btn-primary w-full h-14"
        >
          Find a Time
        </button>
      </div>
    </div>
  );
}
