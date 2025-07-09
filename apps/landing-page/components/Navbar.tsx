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
    <div className="flex justify-center">
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
        className="fixed left-8 right-8 lg:left-10 lg:right-10 top-4 p-4 sm:top-6 z-50 bg-white/8 flex justify-between items-center rounded-lg backdrop-blur-sm border border-white/10"
      >
        {/* Logo and Title */}
        <div className="text-white text-xl flex items-center justify-center gap-2">
          <PencilRuler className="w-6 h-6 sm:w-8 sm:h-8 p-2 bg-gradient-to-r from-blue-600 to-blue-800 rounded-sm shadow-lg shadow-blue-600/40" />
          <span className="text-xl sm:text-2xl font-medium">DrawSync</span>
        </div>

        {/* Desktop Navigation Items */}
        <div className="text-white gap-10 items-center hidden lg:flex">
          {NavItems.map((item) => (
            <div key={item.name}>
              <Link
                href={item.href}
                className={clsx(
                  "cursor-pointer text-white hover:text-blue-500 transition-colors duration-300"
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
          <div className="items-center">
            <Button variant="secondary">Login</Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
