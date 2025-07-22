import React from "react";

export const Tool = ({
  children,
  selected,
  onClick,
  // icon,
}: {
  children: React.ReactNode;
  selected: boolean;
  onClick: () => void;
  // icon?: LucideIcon;
}) => {
  return (
    <div
      onClick={onClick}
      className={`px-2 py-1 cursor-pointer hover:bg-gray-500/20 rounded-lg ${selected ? "bg-[#4F4D8C]" : "text-white"}`}
    >
      {children}
    </div>
  );
};
