import Hero from "@/app/components/sections/Hero";
import Services from "@/app/components/sections/Services";
import Work from "@/app/components/sections/Work";
import About from "@/app/components/sections/About";
import Blog from "@/app/components/sections/Blog";
import Contact from "@/app/components/sections/Contact";
import TrustBadges from "@/app/components/sections/TrustBadges";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustBadges />
      <Services />
      <Work />
      <About />
      <Blog />
      <Contact />
    </>
  );
}