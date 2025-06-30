import clsx from "clsx";

const variants = {
  primary:
    "bg-blue-600 text-white hover:bg-blue-700 hover:text-white px-4 py-2 rounded-lg",
  secondary:
    "bg-gray-600 text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-lg",
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
    <button className={clsx(variants[variant], className)}>{children}</button>
  );
}
