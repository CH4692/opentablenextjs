export default function Title({ name }: { name: string }) {
  return (
    <div className="mt-4 border-b border-[var(--line)] pb-6">
      <h1 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl leading-tight">
        {name}
      </h1>
    </div>
  );
}
