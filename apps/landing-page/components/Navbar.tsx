"use client";

import { PencilRuler } from "lucide-react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

const NavItems = [
  {
    name: "home",
    href: "/home",
  },
  {
    name: "About",
    href: "/about",
  },
  {
    name: "Features",
    href: "/features",
  },
];

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href;

  return (
    <div className="bg-black/50 flex justify-center">
      <div className="fixed top-0 left-0 right-0 z-50 bg-black/50 max-w-7xl mx-auto flex justify-between items-center p-4">
        <div className="text-white text-xl flex items-center justify-center gap-2">
          <PencilRuler className="w-8 h-8 p-1 bg-gradient-to-r from-blue-600 to-blue-800 rounded-sm shadow-lg shadow-blue-600/40" />
          <span className="text-2xl font-medium">DrawSync</span>
        </div>
        <div className="text-white flex gap-10">
          {NavItems.map((item) => (
            <div
              key={item.name}
              onClick={() => router.push(item.href)}
              className={`cursor-pointer ${isActive(item.href) ? "underline underline-offset-5 decoration-blue-600" : "text-white"} `}
            >
              {item.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
