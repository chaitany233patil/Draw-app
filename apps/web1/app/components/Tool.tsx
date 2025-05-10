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
      className={`border-1 border-gray-400 p-3 rounded-full  cursor-pointer ${selected ? "text-red-400" : "text-white"}`}
    >
      {children}
    </div>
  );
};
