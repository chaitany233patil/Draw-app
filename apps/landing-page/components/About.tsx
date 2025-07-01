"use client";

import { motion } from "framer-motion";
import { Video } from "./Video";

export default function About() {
  return (
    <div id="about" className="min-h-screen flex">
      <div className="max-w-6xl m-auto">
        <div className="grid grid-cols-2 gap-24">
          {/* Left: Text Content */}
          <motion.div
            className=""
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
              About <span className="text-blue-500">DrawSync</span>
            </h2>
            <p className="text-gray-300 text-xl mb-6 leading-8">
              DrawSync is a collaborative whiteboard designed for teams to
              brainstorm, plan, and build visually — in real time. Whether
              you&apos;re sketching flowcharts, mapping ideas, or collaborating
              remotely, we make it simple, intuitive, and fast.
            </p>
            <p className="text-gray-400 text-md mb-6 leading-7">
              Built during a hackathon and powered by a passion for seamless
              collaboration, DrawSync removes the barriers of distance. It’s not
              just a whiteboard — it’s your team’s creative canvas.
            </p>
          </motion.div>

          {/* Right: Demo Video or Image */}
          <motion.div
            className=""
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <div className="relative w-full h-full ring-10 ring-blue-500/40 rounded-xl overflow-hidden">
              <Video />
            </div>
            {/* You can use an image fallback like below: */}
            {/* <img src="/drawsync-preview.png" alt="DrawSync demo" className="rounded-xl shadow-lg border border-white/10 w-full max-w-md" /> */}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
