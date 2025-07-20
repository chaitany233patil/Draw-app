import { PencilRuler } from "lucide-react";

export function Navbar() {
  return (
    <div className="w-full">
      <div className="max-w-6xl flex justify-between items-center border bg-white/5 border-gray-500/30 rounded-xl fixed top-8 left-5 right-5 mx-auto p-3 backdrop-blur-2xl">
        <div className="flex items-center gap-2">
          <span className="bg-blue-600 p-2 rounded-lg">
            <PencilRuler className="h-4 w-4" />
          </span>
          <div className="text-xl font-bold">DrawSync</div>
        </div>
        <div className="flex items-center justify-center gap-1 bg-gray-200/40 rounded-full p-2">
          <span className="bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 rounded-full h-6 w-6 flex items-center justify-center">
            C
          </span>
          <div className="text-sm">Chaitany Patil</div>
        </div>
      </div>
    </div>
  );
}
