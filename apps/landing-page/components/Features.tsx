"use client";

import { Users2, PencilRuler, Layers3 } from "lucide-react";
import { JSX } from "react";
import { motion } from "framer-motion";

export default function Features() {
  const features = [
    {
      icon: <Users2 className="w-12 h-12 text-sky-400" />,
      title: "Real-Time Collaboration",
      description:
        "Work together with your team in real-time, no matter where they are. See changes instantly and keep everyone on the same page.",
      color: "sky",
    },
    {
      icon: <PencilRuler className="w-12 h-12 text-violet-400" />,
      title: "Versatile Drawing Tools",
      description:
        "Choose from a wide range of drawing tools, shapes, and templates to express your ideas visually and effectively.",
      color: "violet",
    },
    {
      icon: <Layers3 className="w-12 h-12 text-emerald-400" />,
      title: "Seamless Integration",
      description:
        "Integrate with your favorite productivity tools to streamline your workflow and keep all your work in one place.",
      color: "emerald",
    },
  ];

  return (
    <div className="min-h-screen bg-black" id="features">
      <div className="max-w-7xl mx-auto px-6 py-20">
        {/* Header Section */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-3 mb-6"
          >
            <span className="relative flex items-center justify-center size-4">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75"></span>
              <span className="relative inline-flex size-2 rounded-full bg-sky-500"></span>
            </span>
            <h2 className="text-2xl font-bold text-white">Features</h2>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
          >
            Packed with Features to{" "}
            <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-emerald-400 bg-clip-text text-transparent">
              Enhance Productivity
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed"
          >
            Our collaborative whiteboard is designed to enhance your team&apos;s
            productivity and creativity with powerful tools and seamless
            collaboration.
          </motion.p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                type: "spring",
                stiffness: 100,
              }}
              whileHover={{ y: -8 }}
              viewport={{ once: true }}
              className="group"
            >
              <FeatureCard
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                color={feature.color}
              />
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="flex flex-wrap justify-center gap-4">
            <span className="inline-flex items-center gap-2 bg-blue-900/30 border border-blue-500/30 rounded-full px-4 py-2 text-sm text-blue-300">
              ✨ Real-time sync
            </span>
            <span className="inline-flex items-center gap-2 bg-purple-900/30 border border-purple-500/30 rounded-full px-4 py-2 text-sm text-purple-300">
              🎨 Infinite canvas
            </span>
            <span className="inline-flex items-center gap-2 bg-emerald-900/30 border border-emerald-500/30 rounded-full px-4 py-2 text-sm text-emerald-300">
              ⚡ Fast setup
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
  color,
}: {
  icon: JSX.Element;
  title: string;
  description: string;
  color: string;
}) {
  const colorClasses = {
    sky: "group-hover:shadow-sky-500/25 group-hover:border-sky-500/30",
    violet: "group-hover:shadow-violet-500/25 group-hover:border-violet-500/30",
    emerald:
      "group-hover:shadow-emerald-500/25 group-hover:border-emerald-500/30",
  };

  return (
    <div
      className={`
      relative h-full p-8 rounded-2xl 
      bg-slate-800/50 border border-slate-700/50 backdrop-blur-sm
      transition-all duration-300 ease-out
      group-hover:bg-slate-800/70 group-hover:scale-105
      ${colorClasses[color as keyof typeof colorClasses]}
      group-hover:shadow-2xl
    `}
    >
      {/* Background gradient on hover */}
      <div
        className={`
        absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300
        ${color === "sky" ? "bg-gradient-to-br from-sky-400 to-blue-600" : ""}
        ${color === "violet" ? "bg-gradient-to-br from-violet-400 to-purple-600" : ""}
        ${color === "emerald" ? "bg-gradient-to-br from-emerald-400 to-green-600" : ""}
      `}
      />

      <div className="relative z-10">
        {/* Icon */}
        <motion.div
          className="mb-6 p-3 rounded-xl bg-slate-700/50 w-fit"
          whileHover={{ rotate: [0, -5, 5, 0] }}
          transition={{ duration: 0.5 }}
        >
          {icon}
        </motion.div>

        {/* Content */}
        <h3 className="text-xl font-bold text-white mb-4 group-hover:text-white transition-colors">
          {title}
        </h3>

        <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
          {description}
        </p>

        {/* Subtle accent line */}
        <motion.div
          className={`
            absolute bottom-0 left-8 right-8 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300
            ${color === "sky" ? "bg-gradient-to-r from-transparent via-sky-400 to-transparent" : ""}
            ${color === "violet" ? "bg-gradient-to-r from-transparent via-violet-400 to-transparent" : ""}
            ${color === "emerald" ? "bg-gradient-to-r from-transparent via-emerald-400 to-transparent" : ""}
          `}
        />
      </div>
    </div>
  );
}
