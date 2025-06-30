import FaqQuestion from "@/components/ui/FaqQuestion";

export default function Faq() {
  return (
    <div className="min-h-screen flex pb-20 pt-28" id="faq">
      <div className="max-w-7xl m-auto">
        <div className="flex items-center justify-center gap-2 mb-8">
          <span className="relative flex items-center justify-center size-4">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75"></span>
            <span className="relative inline-flex size-2 rounded-full bg-sky-500"></span>
          </span>
          <h2 className="text-2xl text-white font-semibold">FAQ</h2>
        </div>

        <p className="text-gray-300 mb-8 text-center text-xl mx-auto">
          Find answers to the most common questions about our collaborative
          whiteboard experience.
        </p>

        <div className="flex flex-col gap-4 w-full mx-auto">
          <FaqQuestion
            Q="What is a collaborative whiteboard?"
            A="A collaborative whiteboard is a digital workspace that allows multiple users to brainstorm, visualize ideas, and work together in real-time, regardless of their location."
          />
          <FaqQuestion
            Q="How does real-time collaboration work?"
            A="Real-time collaboration is powered by live syncing technologies like WebSockets or WebRTC. Changes made by one user appear instantly for all users without needing a refresh."
          />
          <FaqQuestion
            Q="Is there a free trial available?"
            A="Yes! We offer a free trial so you can experience the core features and test it with your team before committing."
          />
          <FaqQuestion
            Q="Can I use the whiteboard on mobile or tablet?"
            A="Absolutely! Our platform is responsive and works seamlessly on tablets and mobile devices with full functionality."
          />
          <FaqQuestion
            Q="Do I need to install any software?"
            A="No downloads required. Everything works directly from your browser — just sign in and start collaborating!"
          />
        </div>
      </div>
    </div>
  );
}
