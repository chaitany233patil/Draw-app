"use client";

import clsx from "clsx";
import { PencilRuler } from "lucide-react";
import { motion } from "framer-motion";

const NavItems = [
  {
    name: "home",
    href: "/",
  },
  {
    name: "About Us",
    href: "#",
  },
  {
    name: "Pricing",
    href: "#",
  },
  {
    name: "Contact Us",
    href: "#",
  },
];

export default function Navbar() {
  return (
    <div className="bg-black/50 flex justify-center">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        exit={{ opacity: 1, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 8,
          duration: 0.5,
        }}
        className="fixed top-6 left-8 right-8 z-50 bg-white/10 max-w-7xl mx-auto flex justify-between items-center p-4 px-10 rounded-lg backdrop-blur-sm border border-white/10"
      >
        <div className="text-white text-xl flex items-center justify-center gap-2">
          <PencilRuler className="w-8 h-8 p-2 bg-gradient-to-r from-blue-600 to-blue-800 rounded-sm shadow-lg shadow-blue-600/40" />
          <span className="text-2xl font-medium">DrawSync</span>
        </div>
        <div className="text-white flex gap-10">
          {NavItems.map((item) => (
            <div key={item.name} className={clsx("")}>
              {item.name}
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
