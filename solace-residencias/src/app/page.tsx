import SmoothScroll from "@/components/SmoothScroll";
import IntroAnimation from "@/components/IntroAnimation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Statistics from "@/components/Statistics";
import Projects from "@/components/Projects";
import Beliefs from "@/components/Beliefs";
import Values from "@/components/Values";
import Amenities from "@/components/Amenities";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <SmoothScroll>
      <IntroAnimation>
        <main>
          <Hero />
          <About />
          <Statistics />
          <Projects />
          <Beliefs />
          <Values />
          <Amenities />
          <Footer />
        </main>
      </IntroAnimation>
    </SmoothScroll>
  );
}
