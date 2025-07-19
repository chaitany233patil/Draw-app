import { ReactNode } from "react";

export const Tool = ({
  children,
  selected,
  onClick,
}: {
  children: ReactNode;
  selected: boolean;
  onClick: () => void;
}) => {
  return (
    <div
      onClick={onClick}
      className={`p-2 cursor-pointer hover:border-1 border-gray-400 ${selected ? "text-red-400" : "text-white"}`}
    >
      {children}
    </div>
  );
};
