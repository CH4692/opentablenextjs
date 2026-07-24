export default function Header({
  name,
  image,
}: {
  name: string;
  image?: string;
}) {
  return (
    <div className="h-72 sm:h-96 overflow-hidden relative">
      {image ? (
        <img
          src={image}
          alt={name}
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : null}
      <div className="absolute inset-0 bg-gradient-to-r from-[rgba(11,28,36,0.85)] to-[rgba(22,58,64,0.55)]" />
      <div className="relative h-full flex justify-center items-center px-4">
        <h1 className="font-display text-4xl sm:text-6xl md:text-7xl text-white capitalize text-shadow text-center animate-rise">
          {name}
        </h1>
      </div>
    </div>
  );
}
