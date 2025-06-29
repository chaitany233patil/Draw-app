"use client";

import { Users2, PencilRuler, Layers3 } from "lucide-react";
import { JSX } from "react";
import { motion } from "framer-motion";

export default function Features() {
  return (
    <div className="min-h-screen flex">
      <div className="max-w-7xl m-auto">
        <div className="flex items-center justify-center gap-2 mb-8">
          <span className="relative flex items-center justify-center size-4">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75"></span>
            <span className="relative inline-flex size-2 rounded-full bg-sky-500"></span>
          </span>
          <div className="text-2xl font-semibold text-white">Features</div>
        </div>

        {/* Section Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", delay: 0.1, duration: 0.5 }}
          className="text-gray-300 mb-10 text-xl max-w-2xl leading-8 mx-auto text-center"
        >
          Our collaborative whiteboard is packed with features designed to
          enhance your team&apos;s productivity and creativity.
        </motion.div>

        {/* Feature Cards */}
        <div className="flex flex-wrap justify-center gap-12 max-w-6xl mb-20">
          {/* Feature Card */}
          <FeatureCard
            icon={<Users2 className="w-10 h-10 text-sky-400 mb-4" />}
            title="Real-Time Collaboration"
            description="Work together with your team in real-time, no matter where they are. See changes instantly and keep everyone on the same page."
          />
          <FeatureCard
            icon={<PencilRuler className="w-10 h-10 text-violet-400 mb-4" />}
            title="Versatile Drawing Tools"
            description="Choose from a wide range of drawing tools, shapes, and templates to express your ideas visually and effectively."
          />
          <FeatureCard
            icon={<Layers3 className="w-10 h-10 text-emerald-400 mb-4" />}
            title="Seamless Integration"
            description="Integrate with your favorite productivity tools to streamline your workflow and keep all your work in one place."
          />
        </div>
      </div>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: JSX.Element;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-white/10 hover:bg-white/20 backdrop-blur-[80px] hover:shadow-lg transition-all duration-300 w-80 p-6 rounded-3xl flex flex-col items-center text-center">
      {icon}
      <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
      <p className="text-sm text-stone-300 leading-relaxed">{description}</p>
    </div>
  );
}
