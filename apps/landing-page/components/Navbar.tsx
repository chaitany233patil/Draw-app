"use client";

import clsx from "clsx";
import { PencilRuler, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleTabClick = (href: string) => {
    setCurrentTab(href);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <div className="flex justify-center">
        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          exit={{ opacity: 1, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 8,
            duration: 0.5,
          }}
          className="max-w-6xl mx-auto fixed left-4 right-4 lg:left-8 lg:right-8 top-4 p-4 sm:top-6 z-50 bg-black/40 backdrop-blur-md flex justify-between items-center rounded-xl border border-white/10 shadow-lg shadow-black/20"
        >
          {/* Logo and Title */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <PencilRuler className="w-8 h-8 p-1.5 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg shadow-lg shadow-blue-600/30 text-white group-hover:scale-105 transition-transform duration-200" />
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg blur opacity-30 group-hover:opacity-50 transition-opacity"></div>
            </div>
            <span className="text-xl sm:text-2xl font-semibold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              DrawSync
            </span>
          </Link>

          {/* Desktop Navigation Items */}
          <div className="hidden lg:flex items-center gap-8">
            {NavItems.map((item) => {
              const isTabActive = currentTab === item.href;
              return (
                <div key={item.name} className="relative">
                  <Link
                    href={item.href}
                    className={clsx(
                      "cursor-pointer py-2 px-3 rounded-lg font-medium transition-all duration-200 hover:bg-white/5",
                      isTabActive
                        ? "text-blue-400"
                        : "text-gray-300 hover:text-white"
                    )}
                    onClick={() => handleTabClick(item.href)}
                  >
                    {item.name}
                  </Link>
                  {isTabActive && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full"
                      layoutId="underline"
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                    />
                  )}
                </div>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="lg:hidden p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
            aria-label="Toggle mobile menu"
          >
            <motion.div
              animate={{ rotate: isMobileMenuOpen ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </motion.div>
          </button>
        </motion.nav>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/10 backdrop-blur-sm z-40 lg:hidden"
              onClick={toggleMobileMenu}
            />

            {/* Mobile Menu Panel */}
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="fixed top-20 left-4 right-4 bg-black/90 backdrop-blur-md rounded-xl border border-white/10 shadow-2xl z-50 lg:hidden overflow-hidden"
            >
              <div className="py-4">
                {NavItems.map((item, index) => {
                  const isTabActive = currentTab === item.href;
                  return (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Link
                        href={item.href}
                        className={clsx(
                          "block px-6 py-4 font-medium transition-all duration-200 border-l-2",
                          isTabActive
                            ? "text-blue-400 bg-blue-500/10 border-blue-400"
                            : "text-gray-300 hover:text-white hover:bg-white/5 border-transparent hover:border-white/20"
                        )}
                        onClick={() => handleTabClick(item.href)}
                      >
                        {item.name}
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
