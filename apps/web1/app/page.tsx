export default function Home() {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold">Landing Page here</h1>
      <div className="flex gap-6 mt-4">
        <button className="p-3 text-[20px] bg-blue-300 rounded-2xl cursor-pointer">
          Draw
        </button>
        <button className="p-3 text-[20px] border border-gray-400 rounded-2xl cursor-pointer">
          Rooms
        </button>
      </div>
    </div>
  );
}
