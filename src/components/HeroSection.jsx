import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";

const IMAGES = ["/photo1.jpeg", "/photo2.jpeg", "/photo3.jpeg"];
const cinematicEase = [0.76, 0, 0.24, 1];

const STATS = [
  { number: 4.3, display: "4.3", label: "RATING", sub: "Freelance Work" },
  { number: 12, display: "12+", label: "PROJECTS", sub: "UX / UI Design" },
  { number: 2, display: "2+", label: "YEARS", sub: "Design Experience" },
  { number: 8, display: "8+", label: "CLIENTS", sub: "Worldwide" },
];

function CountUp({ end, decimals, trigger, display }) {
  const [current, setCurrent] = useState("0");

  useEffect(() => {
    if (!trigger) return;

    const chars = "0123456789";
    const duration = 2000;
    const settleDuration = 1400;
    const interval = 40;
    let elapsed = 0;

    const timer = setInterval(() => {
      elapsed += interval;

      if (elapsed >= duration) {
        // Settled to final value
        setCurrent(display);
        clearInterval(timer);
        return;
      }

      if (elapsed < settleDuration) {
        // Pure random scramble phase
        const len = display.replace(/[^0-9]/g, "").length;
        let scrambled = "";
        for (let i = 0; i < display.length; i++) {
          const char = display[i];
          if (char === "." || char === "+") {
            scrambled += char;
          } else {
            scrambled += chars[Math.floor(Math.random() * chars.length)];
          }
        }
        setCurrent(scrambled);
      } else {
        // Settling phase — gradually lock digits
        const progress = (elapsed - settleDuration) /
          (duration - settleDuration);
        const lockCount = Math.floor(
          progress * display.replace(/[^0-9]/g, "").length
        );

        let result = "";
        let digitsSeen = 0;
        for (let i = 0; i < display.length; i++) {
          const char = display[i];
          if (char === "." || char === "+") {
            result += char;
          } else {
            if (digitsSeen < lockCount) {
              result += display[i];
            } else {
              result += chars[
                Math.floor(Math.random() * chars.length)
              ];
            }
            digitsSeen++;
          }
        }
        setCurrent(result);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [trigger, end, display]);

  return <span>{current}</span>;
}

export default function HeroSection() {
  const [isLoading, setIsLoading] = useState(true);
  const [imgIndex, setImgIndex] = useState(0);
  const [count, setCount] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const wrapperRef = useRef(null);
  const ovalRef = useRef(null);

  // Loading
  useEffect(() => {
    const interval = setInterval(() => {
      setCount(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsLoading(false), 400);
          return 100;
        }
        return prev + 1;
      });
    }, 25);
    return () => clearInterval(interval);
  }, []);

  // Image rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setImgIndex(prev => (prev + 1) % IMAGES.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Scroll detection
  useEffect(() => {
    const handleScroll = () =>
      setHasScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Custom cursor
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const ringX = useSpring(cursorX, { stiffness: 140, damping: 18 });
  const ringY = useSpring(cursorY, { stiffness: 140, damping: 18 });

  useEffect(() => {
    const move = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  // Scroll transforms
  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end end"]
  });

  const { scrollYProgress: heroScrollProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end start"]
  });

  const hiY = useTransform(heroScrollProgress, [0, 1], [0, -30]);
  const swapnilY = useTransform(heroScrollProgress, [0, 1], [0, -50]);
  const subOpacity = useTransform(heroScrollProgress, [0, 0.3], [1, 0]);

  const ovalScale = useTransform(heroScrollProgress, [0, 0.5], [1, 3.5]);
  const ovalOpacity = useTransform(heroScrollProgress, [0, 0.4], [1, 0]);

  // --- STATS TRIGGER ---
  const [statsTriggered, setStatsTriggered] = useState(false);
  useEffect(() => {
    return scrollYProgress.onChange((latest) => {
      if (latest > 0.45 && !statsTriggered) {
        setStatsTriggered(true);
      }
    });
  }, [scrollYProgress, statsTriggered]);



  const statsOpacity = useTransform(scrollYProgress, [0.45, 0.65], [0, 1]);
  const smoothStatsOpacity = useSpring(statsOpacity, {
    stiffness: 80,
    damping: 25
  });

  const statsY = useTransform(scrollYProgress, [0.45, 0.65], [30, 0]);
  const smoothStatsY = useSpring(statsY, {
    stiffness: 80,
    damping: 25
  });

  const pageEndOpacity = useTransform(scrollYProgress, [0.75, 0.85, 1.0], [1, 1, 0]);
  const smoothPageEnd = useSpring(pageEndOpacity, {
    stiffness: 60,
    damping: 20
  });



  return (
    <>
      {/* FILM GRAIN */}
      <div style={{
        position: "fixed", inset: 0,
        pointerEvents: "none", zIndex: 9997,
        opacity: 0.04,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        backgroundRepeat: "repeat",
        backgroundSize: "128px"
      }} />

      {/* CUSTOM CURSOR */}
      <div style={{
        position: "fixed", inset: 0,
        pointerEvents: "none", zIndex: 9998
      }}>
        <motion.div style={{
          position: "absolute",
          x: ringX, y: ringY,
          translateX: "-50%", translateY: "-50%",
          border: "1px solid rgba(0,0,0,0.5)",
          borderRadius: "50%",
          width: isHovering ? 48 : 28,
          height: isHovering ? 48 : 28,
        }} transition={{ type: "spring" }} />
        <motion.div style={{
          position: "absolute",
          x: cursorX, y: cursorY,
          translateX: "-50%", translateY: "-50%",
          backgroundColor: "#111",
          borderRadius: "50%",
          width: isHovering ? 3 : 7,
          height: isHovering ? 3 : 7,
        }} />
      </div>

      {/* ENTIRE PAGE FADE MAP */}
      <motion.div style={{ opacity: smoothPageEnd }}>
        {/* LOADING SCREEN */}
        <AnimatePresence>
          {isLoading && (
            <motion.div
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              style={{
                position: "fixed", inset: 0,
                backgroundColor: "#F5F0E8",
                zIndex: 9999,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "IBM Plex Mono, monospace"
              }}
            >
              <div style={{
                fontSize: "11px", color: "#888",
                letterSpacing: "0.3em", marginBottom: "48px"
              }}>EST. 2026</div>
              <div style={{
                fontSize: "clamp(48px,8vw,100px)",
                fontWeight: 900, color: "#111",
                letterSpacing: "-0.03em", marginBottom: "16px"
              }}>SWAPNIL</div>
              <div style={{
                fontSize: "11px", color: "#888",
                letterSpacing: "0.4em", marginBottom: "32px"
              }}>— PORTFOLIO —</div>
              <div style={{
                fontSize: "13px", color: "#555",
                fontFamily: "IBM Plex Mono"
              }}>{String(count).padStart(2, "0")}%</div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* NAVBAR */}
        <motion.nav
          initial={{ y: -60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.9, ease: cinematicEase, delay: 2.9 }}
          style={{
            position: "fixed", top: 0, left: 0,
            width: "100%", zIndex: 100,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "20px 48px",
            backgroundColor: "rgba(245,240,232,0.85)",
            backdropFilter: "blur(12px)",
            borderBottom: "1px solid rgba(0,0,0,0.08)",
            boxSizing: "border-box",
            fontFamily: "IBM Plex Mono, monospace"
          }}
        >
          <div style={{
            fontSize: "13px", fontWeight: 600,
            color: "#111", letterSpacing: "0.1em",
            textTransform: "uppercase"
          }}>Swapnil.design</div>
          <div style={{ display: "flex", gap: "48px" }}>
            {["✦ ↓ Resume", "Work", "About Me"].map(link => {
              if (link === "✦ ↓ Resume") {
                return (
                  <motion.a
                    key={link}
                    href="/Resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                    style={{
                      fontSize: "13px", color: "#111",
                      textDecoration: "none",
                      letterSpacing: "0.05em",
                      position: "relative", paddingBottom: "2px"
                    }}
                  >
                    {link}
                    <motion.span
                      style={{
                        position: "absolute", bottom: 0, left: 0,
                        height: "1px", backgroundColor: "#111",
                        width: "100%", scaleX: 0, originX: 0
                      }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.a>
                );
              }
              return (
                <a
                  key={link}
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    const id = link === "Work" ? "featured-works" : "design-philosophy";
                    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
                  }}
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                  style={{
                    fontSize: "13px", color: "#111",
                    textDecoration: "none",
                    letterSpacing: "0.05em",
                    position: "relative", paddingBottom: "2px",
                    cursor: "pointer"
                  }}
                >
                  {link}
                  <motion.span
                    style={{
                      position: "absolute", bottom: 0, left: 0,
                      height: "1px", backgroundColor: "#111",
                      width: "100%", scaleX: 0, originX: 0
                    }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </a>
              );
            })}
          </div>
        </motion.nav>

        {/* SCROLL WRAPPER — gives scroll distance */}
        <div ref={wrapperRef} style={{ height: "600vh", position: "relative" }}>

          {/* HERO — fixed while scrolling */}
          <motion.div style={{
            position: "sticky", top: 0,
            width: "100%", height: "100vh",
            backgroundColor: "#F5F0E8",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
            fontFamily: "IBM Plex Mono, monospace"
          }}>

            {/* BACKGROUND TEXT WRAPPER */}
            <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
              <div style={{ position: "absolute", inset: 0, pointerEvents: "auto" }}>
                {/* DECORATIVE STRIP */}
                <div style={{
                  position: "absolute", top: "72px",
                  width: "100%", textAlign: "center",
                  padding: "8px 0", fontSize: "11px",
                  color: "#888", letterSpacing: "0.3em",
                  borderBottom: "1px solid rgba(0,0,0,0.08)",
                  zIndex: 10
                }}>
                  ✦ UX DESIGNER · PHOTOGRAPHER · VISUAL STORYTELLER ✦
                </div>

                {/* VOL LABEL */}
                <div style={{
                  position: "absolute", top: "110px", right: "48px",
                  fontSize: "10px", color: "#888",
                  letterSpacing: "0.2em", zIndex: 10
                }}>VOL.01 / 2026</div>

                {/* ISSUE NO */}
                <div style={{
                  position: "absolute", left: "24px", top: "50%",
                  transform: "translateY(-50%) rotate(-90deg)",
                  fontSize: "10px", color: "#888",
                  letterSpacing: "0.3em", whiteSpace: "nowrap",
                  opacity: 0.5, zIndex: 10
                }}>ISSUE NO.01</div>

                {/* SCROLL TEXT */}
                <motion.div
                  animate={{ opacity: hasScrolled ? 0 : 0.5 }}
                  transition={{ duration: 0.5 }}
                  style={{
                    position: "absolute", right: "24px", top: "50%",
                    transform: "translateY(-50%) rotate(90deg)",
                    fontSize: "10px", color: "#888",
                    letterSpacing: "0.3em", whiteSpace: "nowrap",
                    zIndex: 10
                  }}
                >SCROLL ↓</motion.div>

                {/* INDEX BAR */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 3.5 }}
                  style={{
                    position: "absolute", bottom: "24px",
                    left: 0, width: "100%",
                    padding: "0 48px", boxSizing: "border-box",
                    display: "flex", alignItems: "center",
                    justifyContent: "space-between", zIndex: 20
                  }}
                >
                  <div style={{
                    fontSize: "9px", color: "#888",
                    letterSpacing: "0.25em",
                    fontFamily: "IBM Plex Mono"
                  }}>SWAPNIL.DESIGN</div>
                  <div style={{ display: "flex", gap: "32px", position: "relative" }}>
                    <div style={{
                      position: "absolute", top: "50%",
                      left: "-16px", right: "-16px",
                      height: "1px",
                      backgroundColor: "rgba(0,0,0,0.12)", zIndex: -1
                    }} />
                    {[0, 1, 2, 3, 4, 5].map(i => (
                      <span key={i} style={{
                        fontSize: "11px",
                        color: imgIndex % IMAGES.length === i % IMAGES.length
                          ? "#111" : "#888",
                        fontWeight: imgIndex % IMAGES.length === i % IMAGES.length
                          ? 700 : 400,
                        fontFamily: "IBM Plex Mono",
                        backgroundColor: "#F5F0E8",
                        padding: "0 4px"
                      }}>0{i + 1}</span>
                    ))}
                  </div>
                  <div style={{
                    fontSize: "9px", color: "#888",
                    letterSpacing: "0.25em",
                    fontFamily: "IBM Plex Mono"
                  }}>2026 ®</div>
                </motion.div>
              </div>
            </div>

            {/* HERO CONTENT */}
            <div style={{
              display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center",
              width: "100%", height: "100%",
              position: "relative", zIndex: 5
            }}>

              {/* ROW 1: HI! [OVAL] I'M */}
              <div style={{
                display: "flex", alignItems: "center",
                justifyContent: "center",
                gap: "24px", width: "100%"
              }}>

                {/* HI! */}
                <motion.span
                  initial={{ y: 80, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.85, ease: cinematicEase, delay: 3.0 }}
                  style={{
                    y: hiY,
                    fontSize: "clamp(56px,9vw,130px)",
                    fontWeight: 300, color: "#888",
                    fontFamily: "IBM Plex Mono", lineHeight: 1,
                    display: "block", position: "relative", zIndex: 2
                  }}
                >HI!</motion.span>

                {/* OVAL — in flex row, not absolute */}
                <motion.div
                  style={{
                    scale: ovalScale,
                    opacity: ovalOpacity,
                    width: "140px",
                    height: "200px",
                    borderRadius: "70px",
                    overflow: "hidden",
                    position: "relative",
                    flexShrink: 0,
                    zIndex: 1,
                    transformOrigin: "center center",
                    willChange: "transform, opacity",
                  }}
                >
                  <img
                    src="/photo1.jpeg"
                    alt=""
                    style={{
                      width: "100%", height: "100%",
                      objectFit: "cover",
                      objectPosition: "center 20%",
                      display: "block",
                      pointerEvents: "none",
                    }}
                  />
                </motion.div>

                {/* I'M */}
                <motion.span
                  initial={{ y: 80, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.85, ease: cinematicEase, delay: 3.1 }}
                  style={{
                    y: hiY,
                    fontSize: "clamp(56px,9vw,130px)",
                    fontWeight: 300, color: "#888",
                    fontFamily: "IBM Plex Mono", lineHeight: 1,
                    display: "block", position: "relative", zIndex: 2
                  }}
                >I'M</motion.span>

              </div>

              {/* ROW 2: SWAPNIL */}
              <motion.div
                style={{ y: swapnilY, width: "100%", position: "relative", zIndex: 2, marginTop: "-8px" }}
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.85, ease: cinematicEase, delay: 3.15 }}
              >
                <div style={{
                  fontSize: "clamp(90px,17vw,230px)",
                  fontWeight: 900, color: "#1a1a1a",
                  fontFamily: "IBM Plex Mono",
                  textAlign: "center",
                  lineHeight: 0.85,
                  letterSpacing: "0.12em", width: "100%",
                  willChange: "transform"
                }}>SWAPNIL</div>
              </motion.div>

              {/* ROW 3: SUBTITLE */}
              <motion.div
                style={{ opacity: subOpacity, position: "relative", zIndex: 2, marginTop: "24px" }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, ease: cinematicEase, delay: 3.4 }}
              >
                <div style={{ fontSize: "14px", color: "#888", marginBottom: "12px", textAlign: "center" }}>— ✦ —</div>
                <div style={{
                  fontSize: "12px", color: "#888",
                  letterSpacing: "0.08em", lineHeight: 1.9,
                  maxWidth: "400px", margin: "0 auto", textAlign: "center"
                }}>
                  A curious, thoughtful designer turning everyday
                  observations into meaningful experiences
                </div>
              </motion.div>

            </div>
          </motion.div>

          {/* STATS SECTION */}
          <motion.section style={{
            opacity: smoothStatsOpacity,
            y: smoothStatsY,
            position: "fixed",
            top: 0, left: 0,
            width: "100%", height: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#F5F0E8",
            padding: 0,
            margin: 0,
            zIndex: 49,
            pointerEvents: "none",
            fontFamily: "IBM Plex Mono, monospace"
          }}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
              viewport={{ once: true, amount: 0.5 }}
              style={{ width: "100%" }}
            >
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(4,1fr)",
                width: "100%",
                margin: 0,
                padding: 0,
                borderTop: "1px solid rgba(0,0,0,0.1)",
                borderBottom: "1px solid rgba(0,0,0,0.1)"
              }}>
                {STATS.map((stat, i) => (
                  <div key={i} style={{
                    padding: "32px 24px",
                    borderRight: i < 3 ? "1px solid rgba(0,0,0,0.1)" : "none",
                    textAlign: "center"
                  }}>
                    <div style={{
                      fontSize: "clamp(32px, 4vw, 56px)",
                      fontWeight: 700, color: "#1a1a1a",
                      lineHeight: 1
                    }}>
                      <CountUp
                        end={stat.number}
                        decimals={0}
                        trigger={statsTriggered}
                        display={stat.display}
                      />
                    </div>
                    <div style={{
                      fontSize: "10px", color: "#444",
                      letterSpacing: "0.2em",
                      marginTop: "16px",
                      textTransform: "uppercase"
                    }}>{stat.label}</div>
                    <div style={{
                      fontSize: "10px", color: "#888",
                      letterSpacing: "0.1em", marginTop: "6px"
                    }}>{stat.sub}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.section>

        </div>
      </motion.div>
    </>
  );
}
