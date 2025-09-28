import { Undo2, Redo2 } from "lucide-react";

interface Props {
    Undo: () => void;
    Redo: () => void;
}

export function UndoRedoPanel({Undo, Redo}: Props) {
  return (
    <div className="absolute bottom-5 right-10 text-white flex items-center gap-4 rounded-lg">
      <button
        onClick={Undo}
        className="bg-[#232329] cursor-pointer shadow-2xl p-2.5 rounded-full"
      >
        <Undo2 size={18} />
      </button>
      <button
        onClick={Redo}
        className="bg-[#232329] cursor-pointer shadow-2xl p-2.5 rounded-full"
      >
        <Redo2 size={18} />
      </button>
    </div>
  );
}
