"use client";

import { ChevronDown, HelpCircle } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function FaqQuestion({ Q, A }: { Q: string; A: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      className={`bg-gray-900/30 backdrop-blur-sm border border-gray-700/40 transition-all duration-300 rounded-xl cursor-pointer overflow-hidden hover:border-gray-600/50 ${
        isOpen ? "ring-1 ring-blue-500/50 border-blue-500/30" : ""
      }`}
      onClick={() => setIsOpen((prev) => !prev)}
      whileHover={{ scale: 1.01 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="flex justify-between items-center p-6">
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20">
            <HelpCircle className="text-blue-400 w-4 h-4" />
          </div>
          <span className="text-white text-base font-medium leading-relaxed pr-4">
            {Q}
          </span>
        </div>
        <ChevronDown
          className={`text-gray-400 w-5 h-5 transition-transform duration-300 shrink-0 ${
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
            <div className="px-6 pb-6 ml-12">
              <div className="text-gray-300 text-sm leading-relaxed max-w-3xl">
                {A}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function Faq() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <section
      className="min-h-screen flex items-center justify-center py-20 relative overflow-hidden bg-black"
      id="faq"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900/50 to-blue-950/10"></div>

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          {/* Section badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-500"></span>
            </span>
            <span className="text-blue-300 text-sm font-medium">FAQ</span>
          </div>

          {/* Main heading */}
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-white">Frequently Asked </span>
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Questions
            </span>
          </h2>

          {/* Description */}
          <p className="text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed">
            Everything you need to know about DrawSync&apos;s collaborative
            whiteboard platform and how it can transform your team&apos;s
            productivity.
          </p>
        </motion.div>

        <motion.div
          className="space-y-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div variants={itemVariants}>
            <FaqQuestion
              Q="What makes DrawSync different from other collaborative whiteboards?"
              A="DrawSync combines real-time collaboration with powerful drawing tools and seamless integration capabilities. Our platform offers infinite canvas space, advanced shape libraries, and cross-platform compatibility that works wherever your team does."
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <FaqQuestion
              Q="How does real-time sync work across different devices?"
              A="DrawSync uses advanced WebSocket technology to ensure instant synchronization across all devices. Changes appear in real-time without lag, and our conflict resolution system ensures smooth collaboration even when multiple users edit simultaneously."
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <FaqQuestion
              Q="Can I integrate DrawSync with my existing productivity tools?"
              A="Absolutely! DrawSync offers seamless integration with popular productivity tools including Slack, Microsoft Teams, Google Workspace, Notion, and more. Import content, export boards, and sync with your existing workflow effortlessly."
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <FaqQuestion
              Q="Is there a limit to how many people can collaborate on one board?"
              A="Our free plan supports up to 10 collaborators per board. Pro plans offer unlimited collaborators, and Enterprise plans include advanced user management and permission controls for large organizations."
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <FaqQuestion
              Q="Do I need to download any software to use DrawSync?"
              A="No downloads required! DrawSync runs entirely in your browser with full functionality. We also offer native apps for iOS and Android for the best mobile experience, but the web version works perfectly on all devices."
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <FaqQuestion
              Q="How secure is my data on DrawSync?"
              A="Security is our top priority. We use enterprise-grade encryption, secure data centers, and comply with GDPR, SOC 2, and other industry standards. Your boards are private by default, and you control all sharing permissions."
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <FaqQuestion
              Q="Can I use DrawSync for presentations and client meetings?"
              A="Yes! DrawSync includes presentation mode, screen sharing capabilities, and client-friendly sharing options. You can present directly from the whiteboard, export to PDF, or share view-only links for stakeholder reviews."
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <FaqQuestion
              Q="What drawing tools and templates are available?"
              A="DrawSync offers a comprehensive toolkit including freehand drawing, geometric shapes, flowchart elements, sticky notes, text boxes, and image uploads. We provide 100+ pre-built templates for brainstorming, project planning, design thinking, and more."
            />
          </motion.div>
        </motion.div>

        {/* CTA section */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-400 mb-6">Still have questions?</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors duration-200">
              Contact Support
            </button>
            <button className="px-6 py-3 border border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white rounded-lg font-medium transition-colors duration-200">
              View Documentation
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
