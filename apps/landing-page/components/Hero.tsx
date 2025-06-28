"use client";

import Button from "@/components/ui/Button";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="min-h-screen text-white flex">
      <div className="max-w-7xl pt-22 px-4 m-auto">
        <div className="grid grid-cols-2 gap-4 items-center">
          <div className="p-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              exit={{ opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                type: "spring",
                damping: 10,
                duration: 0.5,
              }}
              className="text-6xl font-[550] mb-4 leading-[70px]"
            >
              Unleash Your Team’s Creativity with Our{" "}
              <span className="bg-gradient-to-r from-blue-800 via-blue-400 to-blue-800 bg-clip-text text-transparent">
                Collaborative Whiteboard
              </span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              exit={{ opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                type: "spring",
                damping: 10,
                duration: 0.5,
                delay: 0.1,
              }}
              className="text-lg text-gray-300 mb-4"
            >
              Transform brainstorming with our powerful online whiteboard <br />
              — collaborate live, visualize ideas, and bring projects to life.
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              exit={{ opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                type: "spring",
                damping: 10,
                duration: 0.5,
                delay: 0.2,
              }}
            >
              <Button className="mt-4 bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 shadow-lg shadow-blue-600/40 hover:shadow-blue-600/50 transition-all duration-300">
                Get Started
              </Button>
            </motion.div>
          </div>
          <div className=" rounded-lg p-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              exit={{ opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                type: "spring",
                damping: 5,
                duration: 0.5,
                delay: 0.1,
              }}
            >
              <img
                src="/hero.svg"
                alt="hero"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
