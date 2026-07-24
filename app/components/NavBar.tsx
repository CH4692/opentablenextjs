"use client";

import Link from "next/link";
import { useContext } from "react";
import AuthModal from "./AuthModal";
import { AuthenticationContext } from "../context/AuthContext";
import useAuth from "../../hooks/useAuth";

export default function NavBar() {
  const { data, loading } = useContext(AuthenticationContext);
  const { signout } = useAuth();

  return (
    <nav className="sticky top-0 z-40 backdrop-blur-md bg-[rgba(250,249,246,0.85)] border-b border-[var(--line)] px-4 sm:px-8 py-3 flex items-center justify-between">
      <Link href="/" className="brand-mark text-2xl sm:text-3xl tracking-tight">
        Seatly
      </Link>
      <div className="flex items-center gap-2 sm:gap-3">
        {loading ? (
          <div className="h-9 w-28 rounded-lg bg-[var(--mist)] animate-pulse" />
        ) : data ? (
          <>
            <span className="hidden sm:inline text-sm text-[var(--muted)]">
              Hi, {data.firstName}
            </span>
            <button
              type="button"
              onClick={signout}
              className="border border-[var(--line)] px-4 py-2 rounded-lg text-sm font-medium text-[var(--ink)] hover:bg-white transition"
            >
              Sign out
            </button>
          </>
        ) : (
          <>
            <AuthModal isSignIn={true} />
            <AuthModal isSignIn={false} />
          </>
        )}
      </div>
    </nav>
  );
}
