import Faq from "./(landin-page)/components/Faq";
import Features from "./(landin-page)/components/Features";
import Hero from "./(landin-page)/components/Hero";

export default function Home() {
  return (
    <div className="text-white flex flex-col items-center justify-center">
      <Hero />
      <Features />
      <Faq />
    </div>
  );
}
