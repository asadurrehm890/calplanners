import Hero from "@/app/components/sections/Hero";
import Services from "@/app/components/sections/Services";
import CaseStudies from "@/app/components/sections/CaseStudies";
import About from "@/app/components/sections/About";
import Contact from "@/app/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <CaseStudies />
      <About />
      <Contact />
    </>
  );
}