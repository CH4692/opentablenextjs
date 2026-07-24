import { Item } from "@prisma/client";
import MenuCard from "./MenuCard";

export default function MenuComp({ menu }: { menu: Item[] }) {
  return (
    <div className="bg-white mt-5">
      <div className="mt-4 pb-1 mb-4">
        <h1 className="font-display font-bold text-3xl sm:text-4xl">Menu</h1>
      </div>
      {menu.length ? (
        <div className="flex flex-wrap gap-3 justify-between">
          {menu.map((item) => (
            <MenuCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <p className="text-[var(--muted)]">This restaurant does not have a menu yet.</p>
      )}
    </div>
  );
}
