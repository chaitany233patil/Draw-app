import Faq from "@/components/Faq";
import Features from "@/components/Features";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <div className="text-white">
      <Hero />
      <About />
      <Features />
      <Faq />
      <Contact />
    </div>
  );
}
