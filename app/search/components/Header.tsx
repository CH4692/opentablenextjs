import SearchBar from "../../components/SearchBar";

export default function Header() {
  return (
    <div className="hero-surface p-4 sm:p-6">
      <div className="max-w-3xl mx-auto py-4">
        <SearchBar />
      </div>
    </div>
  );
}
