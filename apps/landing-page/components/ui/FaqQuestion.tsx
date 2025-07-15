"use client";

import { ChevronDown, HelpCircle } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function FaqQuestion({ Q, A }: { Q: string; A: string }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div
      className={`bg-white/10 transition-all duration-300 rounded-2xl cursor-pointer overflow-hidden ${
        isOpen ? "ring-1 ring-sky-500" : ""
      }`}
      onClick={() => setIsOpen((prev) => !prev)}
    >
      <div className="flex justify-between items-center p-6">
        <div className="flex items-center gap-3">
          <HelpCircle className="text-sky-400 size-4 shrink-0" />
          <span className="text-white text-[17px] font-medium">{Q}</span>
        </div>
        <ChevronDown
          className={`text-stone-400 size-5 transition-transform duration-300 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        />
      </div>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="px-6 pb-5 text-stone-300 text-sm leading-relaxed will-change-[height,opacity] max-w-4xl">
              {A}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
