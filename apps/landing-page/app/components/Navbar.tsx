export default function Navbar() {
  return (
    <div className="flex items-center justify-center">
      <div className="min-w-[1300px] flex justify-between p-8">
        <div className="text-white text-xl border-l-5 pl-3 border-blue-600">
          DrawSync
        </div>
        <div className="text-white flex gap-10">
          <div className="cursor-pointer underline underline-offset-5 decoration-blue-600">
            Home
          </div>
          <div className="cursor-pointer">About</div>
          <div className="cursor-pointer">Features</div>
        </div>
      </div>
    </div>
  );
}
