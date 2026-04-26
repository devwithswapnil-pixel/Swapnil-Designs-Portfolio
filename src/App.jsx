import { motion, useScroll, useTransform } from "framer-motion";
import HeroSection from "./components/HeroSection";
import FeaturedWorks from "./components/FeaturedWorks";
import DesignPhilosophy from "./components/DesignPhilosophy";
import OutsideDesign from "./components/OutsideDesign";
import CTAFooter from "./components/CTAFooter";

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <motion.div style={{
      fontFamily: "'IBM Plex Mono', monospace",
      scrollBehavior: "smooth",
      overflowX: "hidden"
    }}>
      <motion.div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          height: "2px",
          backgroundColor: "#1a1a1a",
          width: "100%",
          scaleX: scaleX,
          transformOrigin: "left",
          zIndex: 100
        }}
      />
      <HeroSection />
      <div id="featured-works">
        <FeaturedWorks />
      </div>
      <div id="design-philosophy">
        <DesignPhilosophy />
      </div>
      <OutsideDesign />
      <CTAFooter />
    </motion.div>
  );
}
