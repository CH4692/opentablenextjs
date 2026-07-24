import NavBar from "./components/NavBar";
import AuthContext from "./context/AuthContext";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body>
        <div className="min-h-screen w-screen bg-[var(--mist)]">
          <AuthContext>
            <div className="max-w-screen-2xl mx-auto bg-[var(--paper)] min-h-screen shadow-[0_0_80px_rgba(18,20,26,0.06)]">
              <NavBar />
              {children}
              <footer className="border-t border-[var(--line)] px-6 sm:px-10 py-10 mt-16 text-sm text-[var(--muted)] flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
                <p className="brand-mark text-xl text-[var(--ink)]">Seatly</p>
                <p>
                  Portfolio demo inspired by restaurant discovery apps. Not
                  affiliated with OpenTable.
                </p>
              </footer>
            </div>
          </AuthContext>
        </div>
      </body>
    </html>
  );
}
