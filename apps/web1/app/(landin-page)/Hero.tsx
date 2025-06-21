import { MousePointer2 } from "lucide-react";

export default function Hero() {
  return (
    <div className="min-w-[1300px] flex justify-between px-8 py-4">
      <div className="flex-1">
        <div className="text-6xl max-w-130 leading-17">
          Unleash Your Team’s Creativity with Our Collaborative Whiteboard
        </div>
        <div className="mt-7 max-w-130 text-[19px]">
          Transform brainstorming with our powerful online whiteboard —
          collaborate live, visualize ideas, and bring projects to life.
        </div>
        <button className="mt-10 bg-blue-800 p-3 rounded-full">
          Get Started
        </button>
      </div>
      <div className="relative flex-1">
        <div className="">
          <div>John</div>
          <MousePointer2 />
        </div>
        <div className="squre absolute right-40 h-50 w-90 border-3 border-[#1DCFDC]"></div>
        <div className="squre absolute bottom-4 top-0 left-20 h-100 border-2 rotate-35 border-pink-400"></div>
        <div className="squre absolute right-0 top-20 h-80 w-70 border-3 border-blue-500"></div>
        <div className="squre absolute bottom-0 right-40 h-70 w-70 rounded-full border-3 border-red-500"></div>
      </div>
    </div>
  );
}
