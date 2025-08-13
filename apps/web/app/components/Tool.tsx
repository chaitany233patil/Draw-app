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
      className={`p-2.5 cursor-pointer hover:bg-gray-500/15 rounded-lg ${selected ? "bg-[#4F4D8C]" : "text-white"}`}
    >
      {children}
    </div>
  );
};
