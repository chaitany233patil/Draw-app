"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function FaqQuestion({ Q, A }: { Q: string; A: string }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="bg-white/15 p-6 rounded-2xl min-w-160">
      <div className="flex justify-between">
        <div className="flex items-center justify-center gap-2">
          <div className="h-2 w-2 rounded-full bg-white/40"></div>
          <div>{Q}</div>
        </div>
        <div
          className={`cursor-pointer ${isOpen ? "rotate-180" : "rotate-0"}`}
          onClick={() => {
            setIsOpen((prev) => !prev);
          }}
        >
          <ChevronDown />
        </div>
      </div>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="p-4 text-stone-400">{A}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
