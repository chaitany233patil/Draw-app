import FaqQuestion from "./FaqQuestion";

export default function Faq() {
  return (
    <div className="mt-20 mb-20 ">
      <div className="flex items-center justify-center gap-2">
        <span className="relative flex items-center justify-center size-4">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75"></span>
          <span className="relative inline-flex size-2 rounded-full bg-sky-500"></span>
        </span>
        <div className="mt-7 text-3xl mb-8">FAQ</div>
      </div>
      <div className="max-w-160 flex flex-col gap-3">
        <FaqQuestion
          Q={`What is a collaborative whiteboard ?`}
          A={`A collaborative whiteboard is a digital workspace that allows multiple
        users to brainstorm, visualize ideas, and work together in real-time,
        regardless of their location.`}
        />
        <FaqQuestion
          Q={`How does real-time collaboration work ?`}
          A={`            A collaborative whiteboard is a digital workspace that allows
            multiple users to brainstorm, visualize ideas, and work together in
            real-time, regardless of their location.`}
        />
        <FaqQuestion
          Q={`Is there a free trail available ?`}
          A={`A collaborative whiteboard is a digital workspace that allows
            multiple users to brainstorm, visualize ideas, and work together in
            real-time, regardless of their location.`}
        />
      </div>
    </div>
  );
}
