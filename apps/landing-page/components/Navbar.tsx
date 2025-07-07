"use client";

import clsx from "clsx";
import { PencilRuler } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import Button from "./ui/Button";

const NavItems = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "About",
    href: "#about",
  },
  {
    name: "Features",
    href: "#features",
  },
  {
    name: "FAQ",
    href: "#faq",
  },
];

export default function Navbar() {
  const [currentTab, setCurrentTab] = useState<string>("/");

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
        className="fixed top-4 left-2 right-2 sm:top-6 sm:left-8 sm:right-8 md:left-15 md:right-15 z-50 bg-white/10 max-w-7xl mx-auto flex justify-between items-center p-4 sm:px-6 md:px-8 lg:px-10 rounded-lg backdrop-blur-sm border border-white/10"
      >
        <div className="text-white text-xl flex items-center justify-center gap-2">
          <PencilRuler className="w-6 h-6 sm:w-8 sm:h-8 p-2 bg-gradient-to-r from-blue-600 to-blue-800 rounded-sm shadow-lg shadow-blue-600/40" />
          <span className="text-xl sm:text-2xl font-medium">DrawSync</span>
        </div>
        <div className="text-white flex gap-10 items-center ">
          {NavItems.map((item) => (
            <div key={item.name}>
              <Link
                href={item.href}
                className={clsx(
                  "cursor-pointer hidden lg:block",
                  "text-white hover:text-blue-500 transition-colors duration-300"
                )}
                onClick={() => setCurrentTab(item.href)}
              >
                {item.name}
              </Link>
              {currentTab === item.href && (
                <motion.div
                  className="h-[2px] rounded-full w-full bg-gradient-to-r from-blue-400 to-blue-700"
                  layoutId="underline"
                />
              )}
            </div>
          ))}
          <div className="items-center hidden sm:block">
            <Button variant="secondary">Login</Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
