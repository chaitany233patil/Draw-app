import { Menu } from "lucide-react";

export function MenuIcon() {
  return (
    <div className="absolute top-4 left-3 bg-[#232329] p-2 rounded-lg cursor-pointer shadow-2xl hidden sm:block">
      <Menu strokeWidth={1} className="h-5 w-5" />
    </div>
  );
}
