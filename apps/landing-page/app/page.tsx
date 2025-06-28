import Faq from "@/components/Faq";
import Features from "@/components/Features";
import Hero from "@/components/Hero";

export default function Home() {
  return (
    <div className="text-white flex flex-col items-center justify-center">
      <Hero />
      <Features />
      <Faq />
    </div>
  );
}
