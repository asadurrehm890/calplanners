import Hero from "@/app/components/sections/Hero";
import TrustBanner from "@/app/components/sections/TrustBanner";
import Services from "@/app/components/sections/Services";
import Process from "@/app/components/sections/Process";
import CaseStudies from "@/app/components/sections/CaseStudies";
import Blog from "@/app/components/sections/Blog";
import ResumeHighlight from "@/app/components/sections/ResumeHighlight";
import CtaBanner from "@/app/components/sections/CtaBanner";
import Contact from "@/app/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustBanner />
      <Services />
      <Process />
      <CaseStudies />
      <Blog />
      <ResumeHighlight />
      <CtaBanner />
      <Contact />
    </>
  );
}