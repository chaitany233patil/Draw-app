import clsx from "clsx";
import { ReactNode } from "react";

const variants = {
  primary: "bg-blue-600 text-white hover:text-white px-4 py-2 rounded-lg",
  secondary:
    "bg-gray-600 text-black hover:bg-gray-200 bg-white px-3 py-2 rounded-lg flex items-center gap-2 justify-center",
};

export default function Button({
  children,
  variant = "primary",
  className,
  onClick,
  icon,
}: {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
  onClick?: () => void;
  icon?: ReactNode;
}) {
  return (
    <button onClick={onClick} className={clsx(variants[variant], className)}>
      {icon}
      {children}
    </button>
  );
}
