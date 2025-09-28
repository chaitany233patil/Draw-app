import React from "react";

export const Tool = ({
  children,
  selected,
  onClick,
  count,
  // icon,
}: {
  children: React.ReactNode;
  selected: boolean;
  onClick: () => void;
  count: number;
  // icon?: LucideIcon;
}) => {
  return (
    <div
      onClick={onClick}
      className={`relative p-3 cursor-pointer hover:bg-gray-500/15 rounded-lg ${selected ? "bg-[#4F4D8C]" : "text-white"}`}
    >
      {children}
      <span
        className={`absolute bottom-1 right-1 ${selected ? "text-white" : "text-[#7A7A7A]"}  text-[7px]`}
      >
        {count}
      </span>
    </div>
  );
};
