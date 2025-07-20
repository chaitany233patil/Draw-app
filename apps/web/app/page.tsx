import { Navbar } from "@/components/Navbar";
import { Main } from "@/components/Main";

export default function Home() {
  return (
    <div className="flex flex-col">
      <Navbar />
      <Main />
    </div>
  );
}
