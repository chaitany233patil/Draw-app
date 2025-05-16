import { Navbar } from "./components/Navbar";

export default function Home() {
  return (
    <div className="h-screen w-screen bg-gradient-to-b from-[#0f3e8f] via-black to-black min-h-screen overflow-x-hidden">
      <Navbar />
      <div className="w-screen h-screen flex flex-col items-center justify-center">
        <div>
          <h1 className="text-4xl text-center font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gray-50 to-gray-400 p-2">
            Landing Page here
          </h1>
        </div>
        <div className="flex gap-6 mt-8">
          <button className="p-3 text-[20px] bg-blue-300 rounded-2xl cursor-pointer">
            Draw
          </button>
          <button className="p-3 text-[20px] text-white border border-gray-600 rounded-2xl cursor-pointer">
            Rooms
          </button>
        </div>
      </div>
    </div>
  );
}
