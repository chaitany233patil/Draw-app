import Link from "next/link";

export const Navbar = () => {
  return (
    <div className="flex justify-between px-5 py-3 items-center border-gray-300">
      <div className="text-2xl text-gray-400 font-bold tracking-tight cursor-pointer">
        <Link href={"/"}>ExcaliDraw</Link>
      </div>
      <div className="flex gap-3">
        <div className="text-md hover:underline decoration-blue-600 cursor-pointer">
          <Link href={"/api/signin"}>SignIn</Link>
        </div>
        <div className="text-md hover:underline decoration-blue-600 cursor-pointer">
          <Link href={"/api/signup"}>SignUp</Link>
        </div>
      </div>
    </div>
  );
};
