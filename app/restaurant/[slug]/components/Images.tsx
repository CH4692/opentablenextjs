export default function Images({ images }: { images: string[] }) {
  return (
    <div>
      <h1 className="font-semibold text-2xl sm:text-3xl mt-10 mb-7 border-b border-[var(--line)] pb-5">
        {images.length} photo{images.length === 1 ? "" : "s"}
      </h1>
      <div className="flex flex-wrap gap-2">
        {images.map((image, index) => (
          <img
            key={`${image}-${index}`}
            className="w-full sm:w-56 h-44 object-cover rounded-xl"
            src={image}
            alt={`Restaurant photo ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
