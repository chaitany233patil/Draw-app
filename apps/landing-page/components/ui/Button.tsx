import clsx from "clsx";

const variants = {
  primary: "bg-blue-600 text-white",
  secondary: "bg-gray-600 text-white",
};

export default function Button({
  children,
  variant = "primary",
  className,
}: {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
}) {
  return (
    <button
      className={clsx(
        variants[variant],
        "px-4 py-2 rounded-lg",
        "hover:bg-blue-700 hover:text-white",
        className
      )}
    >
      {children}
    </button>
  );
}
