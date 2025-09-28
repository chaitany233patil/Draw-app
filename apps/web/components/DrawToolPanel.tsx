import { Tool } from "./Tool";
import {
  Hand,
  MousePointer,
  Circle,
  RectangleHorizontal,
  Minus,
  Pencil,
  LetterText,
} from "lucide-react";

const DRAW_TOOLS = [
  { selctedTool: "pan", icon: Hand, count: null },
  { selctedTool: "cursor", icon: MousePointer, count: 1 },
  { selctedTool: "circle", icon: Circle, count: 2 },
  { selctedTool: "rect", icon: RectangleHorizontal, count: 3 },
  { selctedTool: "line", icon: Minus, count: 4 },
  { selctedTool: "pen", icon: Pencil, count: 5 },
  { selctedTool: "text", icon: LetterText, count: 6 },
];

interface Props {
  isSelected: string;
  setSettingModel: (boolean: boolean) => void;
  setIsSelected: (isSelected: string) => void;
}

export function DrawToolPanel({
  isSelected,
  setSettingModel,
  setIsSelected,
}: Props) {
  return (
    <div className="absolute top-4 flex w-full ">
      <div className="mx-auto flex gap-2 bg-[#232329] rounded-xl p-1 shadow-xl">
        {DRAW_TOOLS.map((tool) => (
          <Tool
            key={tool.selctedTool}
            selected={isSelected == tool.selctedTool}
            onClick={() => {
              setSettingModel(true);
              setIsSelected(tool.selctedTool);
            }}
            count={tool.count!}
          >
            <tool.icon height={18} width={14} className="h-3.5 w-3.5" />
          </Tool>
        ))}
      </div>
    </div>
  );
}
