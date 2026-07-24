"use client";

import { useContext, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { getCookie } from "cookies-next";
import { AuthenticationContext } from "../../../context/AuthContext";
import { formatDisplayTime } from "../../../../utils/times";

type Props = {
  slug: string;
  date: string;
  time: string;
  partySize: string;
};

export default function Form({ slug, date, time, partySize }: Props) {
  const router = useRouter();
  const { data } = useContext(AuthenticationContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [inputs, setInputs] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    occasion: "",
    request: "",
  });

  useEffect(() => {
    if (data) {
      setInputs((prev) => ({
        ...prev,
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone,
        email: data.email,
      }));
    }
  }, [data]);

  const disabled = useMemo(() => {
    return !(
      inputs.firstName &&
      inputs.lastName &&
      inputs.phone &&
      inputs.email
    );
  }, [inputs]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const jwt = getCookie("jwt");
      await axios.post(
        "/api/reserve",
        {
          slug,
          date,
          time,
          partySize,
          firstName: inputs.firstName,
          lastName: inputs.lastName,
          email: inputs.email,
          phone: inputs.phone,
          occasion: inputs.occasion,
          request: inputs.request,
        },
        jwt
          ? { headers: { Authorization: `Bearer ${jwt}` } }
          : undefined
      );
      setSuccess(true);
    } catch (err: any) {
      setError(err.response?.data?.errorMessage || "Reservation failed");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="mt-10 max-w-xl rounded-2xl border border-[var(--line)] bg-white p-8 text-center animate-rise">
        <p className="text-sm uppercase tracking-[0.2em] text-[var(--accent)] mb-3">
          Confirmed
        </p>
        <h2 className="font-display text-3xl text-[var(--ink)] mb-3">
          You&apos;re booked
        </h2>
        <p className="text-[var(--muted)] mb-2">
          {formatDisplayTime(time)} on {date} · {partySize}{" "}
          {Number(partySize) === 1 ? "guest" : "guests"}
        </p>
        <p className="text-sm text-[var(--muted)] mb-8">
          A confirmation was saved for {inputs.email}.
        </p>
        <button
          type="button"
          className="btn-primary px-8 py-3"
          onClick={() => router.push(`/restaurant/${slug}`)}
        >
          Back to restaurant
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-10 flex flex-wrap justify-between gap-y-2 w-full max-w-[660px]"
    >
      {error && (
        <p className="w-full mb-3 rounded-lg bg-red-50 text-red-700 px-4 py-3 text-sm">
          {error}
        </p>
      )}
      <input
        type="text"
        name="firstName"
        value={inputs.firstName}
        onChange={handleChange}
        className="input-field w-full sm:w-[48%]"
        placeholder="First name"
        required
      />
      <input
        type="text"
        name="lastName"
        value={inputs.lastName}
        onChange={handleChange}
        className="input-field w-full sm:w-[48%]"
        placeholder="Last name"
        required
      />
      <input
        type="tel"
        name="phone"
        value={inputs.phone}
        onChange={handleChange}
        className="input-field w-full sm:w-[48%]"
        placeholder="Phone number"
        required
      />
      <input
        type="email"
        name="email"
        value={inputs.email}
        onChange={handleChange}
        className="input-field w-full sm:w-[48%]"
        placeholder="Email"
        required
      />
      <input
        type="text"
        name="occasion"
        value={inputs.occasion}
        onChange={handleChange}
        className="input-field w-full sm:w-[48%]"
        placeholder="Occasion (optional)"
      />
      <input
        type="text"
        name="request"
        value={inputs.request}
        onChange={handleChange}
        className="input-field w-full sm:w-[48%]"
        placeholder="Requests (optional)"
      />
      <button
        type="submit"
        disabled={disabled || loading}
        className="btn-primary w-full mt-2 py-3 disabled:opacity-50"
      >
        {loading ? "Booking…" : "Complete reservation"}
      </button>
      <p className="mt-4 text-sm text-[var(--muted)]">
        By completing this reservation you agree to Seatly&apos;s demo terms.
        This is a portfolio project — no real bookings are placed with
        restaurants.
      </p>
    </form>
  );
}
