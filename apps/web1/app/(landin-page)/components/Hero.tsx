import { MousePointer2 } from "lucide-react";

export default function Hero() {
  return (
    <div className="min-w-[1300px] flex justify-between px-8 py-4">
      <div className="flex-1">
        <div className="text-6xl max-w-130 leading-17">
          Unleash Your Team’s Creativity with Our Collaborative Whiteboard
        </div>
        <div className="mt-7 max-w-130 text-[19px] text-stone-400">
          Transform brainstorming with our powerful online whiteboard —
          collaborate live, visualize ideas, and bring projects to life.
        </div>
        <button className="mt-10 bg-blue-600 hover:bg-blue-800 cursor-pointer px-3 py-2 rounded-full ring-1 border-white">
          Get Started
        </button>
      </div>
      <div className="relative flex-1">
        <div className="absolute top-20 left-[-30px] animate-wiggle animate-[wiggle_2s_ease-in-out_infinite] ">
          <div className="absolute top-[-35px] left-[15px] bg-purple-500 inline text-sm py-1 px-2 rounded-full border-1 border-white">
            John
          </div>
          <MousePointer2 />
        </div>
        <div className="absolute bottom-20 left-50 animate-wiggle animate-[wiggle_2s_ease-in-out_infinite] ">
          <div className="absolute top-[-35px] left-[15px] bg-green-500 inline text-sm py-1 px-2 rounded-full border-1 border-white">
            Mikkle
          </div>
          <MousePointer2 />
        </div>
        <div className="absolute top-8 right-15 animate-wiggle animate-[wiggle_2s_ease-in-out_infinite] ">
          <div className="absolute top-[-35px] left-[15px] bg-pink-500 inline text-sm py-1 px-2 rounded-full border-1 border-white">
            Lucy
          </div>
          <MousePointer2 />
        </div>
        <div className="squre absolute top-0 right-40 h-50 w-90 border-3 border-[#1DCFDC]"></div>
        <div className="squre absolute bottom-4 top-0 left-20 h-100 border-2 rotate-35 border-pink-400"></div>
        <div className="squre absolute right-0 top-20 h-80 w-70 border-3 border-blue-500"></div>
        <div className="squre absolute bottom-0 right-40 h-70 w-70 rounded-full border-3 border-red-500"></div>
      </div>
    </div>
  );
}
