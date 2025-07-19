"use client";

import { motion } from "framer-motion";
import { Video } from "./Video";

export default function About() {
  return (
    <div
      id="about"
      className="min-h-screen flex bg-black text-white relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
          }}
        />

        {/* Floating orbs */}
        <motion.div
          className="absolute top-20 left-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"
          animate={{
            x: [0, 50, -50, 0],
            y: [0, -30, 30, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute bottom-40 right-20 w-48 h-48 bg-purple-500/8 rounded-full blur-3xl"
          animate={{
            x: [0, -40, 40, 0],
            y: [0, 40, -40, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-6 xl:px-0 flex flex-col items-center justify-center py-20 relative z-10">
        {/* Section Indicator */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-500"></span>
          </span>
          <span className="text-blue-300 text-sm font-medium">About Us</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center text-center lg:text-left">
          {/* Text Content */}
          <div className="relative">
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 tracking-tight"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              About{" "}
              <span className="relative">
                <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600 bg-clip-text text-transparent">
                  DrawSync
                </span>
                {/* Subtle glow effect */}
                <span className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600 bg-clip-text text-transparent blur-sm opacity-30">
                  DrawSync
                </span>
              </span>
            </motion.h1>

            <motion.p
              className="text-neutral-200 text-lg sm:text-xl mb-6 leading-7 sm:leading-8 max-w-2xl"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              DrawSync is your team&apos;s digital canvas — designed for
              seamless real-time collaboration. Whether you&apos;re
              brainstorming ideas, mapping processes, or building flows,
              it&apos;s all possible in one intuitive space.
            </motion.p>

            <motion.p
              className="text-neutral-400 text-base leading-6 max-w-xl mb-8"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              Boost your productivity, keep your team aligned, and turn ideas
              into action — all within a powerful collaborative whiteboard that
              works wherever you do.
            </motion.p>

            {/* Enhanced Feature highlights */}
            <motion.div
              className="flex flex-wrap gap-4 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              {[
                { name: "Real-time Collaboration", color: "blue" },
                { name: "Intuitive Design", color: "purple" },
                { name: "Cross-platform", color: "emerald" },
              ].map((feature, index) => (
                <motion.span
                  key={index}
                  className={`
                    px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full 
                    text-sm text-neutral-300 hover:bg-white/10 transition-all duration-300
                    hover:border-${feature.color}-500/30 hover:text-${feature.color}-300
                    hover:shadow-lg hover:shadow-${feature.color}-500/10
                    cursor-default
                  `}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {feature.name}
                </motion.span>
              ))}
            </motion.div>
          </div>

          {/* Enhanced Video/Image Section */}
          <motion.div
            className="relative group"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            {/* Glowing background effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform scale-110" />

            <motion.div
              className="relative w-full ring-8 ring-blue-500/30 rounded-xl overflow-hidden shadow-2xl shadow-blue-900/30 border border-white/10 group-hover:ring-blue-400/50 transition-all duration-500"
              whileHover={{ scale: 1.02, rotate: [0, -0.5, 0.5, 0] }}
              transition={{ duration: 0.5 }}
            >
              <Video />

              {/* Overlay with subtle animation */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>

            {/* Floating elements around video */}
            <motion.div
              className="absolute -top-4 -right-4 w-8 h-8 bg-blue-500/20 rounded-full blur-sm"
              animate={{
                y: [0, -10, 0],
                opacity: [0.3, 0.7, 0.3],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute -bottom-4 -left-4 w-6 h-6 bg-purple-500/20 rounded-full blur-sm"
              animate={{
                y: [0, 8, 0],
                opacity: [0.4, 0.8, 0.4],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
            />
          </motion.div>
        </div>

        {/* Enhanced Bottom stats */}
        <motion.div
          className="mt-24 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center max-w-3xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          {[
            {
              title: "Real-time",
              desc: "Instant sync across devices",
              color: "blue",
            },
            {
              title: "Intuitive",
              desc: "Easy to learn and use",
              color: "purple",
            },
            {
              title: "Powerful",
              desc: "Enterprise-grade features",
              color: "emerald",
            },
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="space-y-2 group cursor-default"
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <div
                className={`
                text-2xl font-bold text-${stat.color}-400 
                group-hover:text-${stat.color}-300 transition-colors duration-300
              `}
              >
                {stat.title}
              </div>
              <div className="text-sm text-neutral-400 group-hover:text-neutral-300 transition-colors duration-300">
                {stat.desc}
              </div>

              {/* Subtle underline effect */}
              <motion.div
                className={`h-0.5 bg-gradient-to-r from-transparent via-${stat.color}-400/50 to-transparent mx-auto`}
                initial={{ width: 0 }}
                whileHover={{ width: "60%" }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
