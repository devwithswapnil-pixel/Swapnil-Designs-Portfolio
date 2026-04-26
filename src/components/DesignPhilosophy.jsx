import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring, animate } from "framer-motion";
import bgSwirl from "../assets/bg-swirl.png";
import avatarImg from "../assets/avatar.png";

const ease = [0.76, 0, 0.24, 1];

export default function DesignPhilosophy() {
    // Tilt Card logic
    const tiltX = useMotionValue(0);
    const tiltY = useMotionValue(0);
    const [isHovered, setIsHovered] = useState(false);
    const [spotPos, setSpotPos] = useState({ x: 50, y: 50 });

    const springConfig = { damping: 20, stiffness: 150, mass: 0.5 };
    const tiltXSpring = useSpring(tiltX, springConfig);
    const tiltYSpring = useSpring(tiltY, springConfig);

    const rotateX = useTransform(tiltYSpring, [-0.5, 0.5], ["12deg", "-12deg"]);
    const rotateY = useTransform(tiltXSpring, [-0.5, 0.5], ["-12deg", "12deg"]);

    // Avatar moves opposite to tilt — parallax depth
    const avatarX = useTransform(tiltXSpring, [-0.5, 0.5], ["-18px", "18px"]);
    const avatarY = useTransform(tiltYSpring, [-0.5, 0.5], ["-18px", "18px"]);

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        tiltX.set((e.clientX - rect.left) / rect.width - 0.5);
        tiltY.set((e.clientY - rect.top) / rect.height - 0.5);
        setSpotPos({
            x: ((e.clientX - rect.left) / rect.width) * 100,
            y: ((e.clientY - rect.top) / rect.height) * 100,
        });
    };

    const handleMouseLeave = () => {
        tiltX.set(0);
        tiltY.set(0);
        setIsHovered(false);
    };

    return (
        <section style={{
            width: "100%",
            backgroundColor: "#F5F0E8",
            fontFamily: "'IBM Plex Mono', monospace"
        }}>

            {/* DIVIDER LINE */}
            <div style={{
                height: "1px",
                background: "#1a1a1a",
                opacity: 0.12,
                width: "100%"
            }} />

            {/* SECTION WRAPPER */}
            <div style={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
                minHeight: "620px",
                alignItems: "stretch",
                position: "relative"
            }}>

                {/* LEFT COLUMN — flex 1 */}
                <div style={{
                    flex: 1,
                    paddingTop: "80px",
                    paddingBottom: "80px",
                    paddingLeft: "80px",
                    paddingRight: "60px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    boxSizing: "border-box"
                }}>
                    {/* Label */}
                    <div style={{
                        fontSize: "10px",
                        color: "#888888",
                        textTransform: "uppercase",
                        letterSpacing: "3px",
                        marginBottom: "24px"
                    }}>
                        MY DESIGN PHILOSOPHY
                    </div>

                    {/* Quote Block */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.15, ease }}
                        viewport={{ once: true, amount: 0.3 }}
                        style={{
                            fontSize: "36px",
                            fontWeight: 700,
                            color: "#1a1a1a",
                            lineHeight: 1.2,
                            marginBottom: "32px"
                        }}
                    >
                        Great experiences emerge when design understands people before solving problems.
                    </motion.div>

                    {/* Paragraph 1 */}
                    <motion.p
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.9, ease }}
                        viewport={{ once: true, amount: 0.3 }}
                        style={{
                            fontSize: "13px",
                            color: "#888888",
                            lineHeight: "1.8",
                            marginBottom: "16px",
                            margin: "0 0 16px 0"
                        }}
                    >
                        UX / Product Designer focused on creating intuitive digital experiences through research, interaction design, and human-centered thinking.
                    </motion.p>

                    {/* Paragraph 2 */}
                    <motion.p
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.9, delay: 0.1, ease }}
                        viewport={{ once: true, amount: 0.3 }}
                        style={{
                            fontSize: "13px",
                            color: "#888888",
                            lineHeight: "1.8",
                            margin: 0
                        }}
                    >
                        I create experiences that are intuitive, accessible, and built around user needs.
                    </motion.p>
                </div>

                {/* RIGHT COLUMN — 45% width, tilt card */}
                <div style={{
                    width: "45%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "60px 60px 60px 40px",
                    backgroundColor: "#F5F0E8",
                    flexShrink: 0
                }}>
                    <div style={{ perspective: "1000px" }}>
                        <motion.div
                            onMouseMove={handleMouseMove}
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={handleMouseLeave}
                            style={{
                                rotateX,
                                rotateY,
                                transformStyle: "preserve-3d",
                                willChange: "transform",
                                width: "360px",
                                height: "480px",
                                borderRadius: "20px",
                                overflow: "hidden",
                                position: "relative",
                                cursor: "crosshair",
                                boxShadow: "0 40px 80px rgba(0,0,0,0.2)",
                            }}
                        >
                            {/* LAYER 1 — Rotating swirl background */}
                            <div style={{
                                position: "absolute",
                                inset: "-20%",
                                backgroundImage: `url(${bgSwirl})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                                animation: "swirlRotate 10s linear infinite",
                                zIndex: 1,
                            }} />

                            {/* LAYER 2 — Dark overlay for contrast */}
                            <div style={{
                                position: "absolute",
                                inset: 0,
                                background: "rgba(8,6,18,0.45)",
                                zIndex: 2,
                            }} />

                            {/* LAYER 3 — Avatar with parallax and floating animation */}
                            <motion.div
                                style={{
                                    position: "absolute",
                                    bottom: "0",
                                    left: "50%",
                                    x: "-50%",
                                    translateX: avatarX,
                                    translateY: avatarY,
                                    zIndex: 3,
                                    width: "100%",
                                    height: "100%",
                                    transformStyle: "preserve-3d",
                                }}
                                animate={{
                                    y: [0, -12, 0],
                                    scale: [1, 1.02, 1],
                                }}
                                transition={{
                                    duration: 4,
                                    ease: "easeInOut",
                                    repeat: Infinity,
                                    repeatType: "loop",
                                }}
                            >
                                <img
                                    src={avatarImg}
                                    alt="Swapnil"
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        display: "block",
                                        objectFit: "cover",
                                        objectPosition: "center top",
                                        mixBlendMode: "screen",
                                        filter: "drop-shadow(0 20px 60px rgba(120,80,255,0.5))",
                                        pointerEvents: "none",
                                    }}
                                />
                            </motion.div>

                            {/* LAYER 4 — Cursor spotlight */}
                            {isHovered && (
                                <div style={{
                                    position: "absolute",
                                    inset: 0,
                                    pointerEvents: "none",
                                    zIndex: 4,
                                    background: `radial-gradient(
                    circle at ${spotPos.x}% ${spotPos.y}%,
                    rgba(255,255,255,0.14) 0%,
                    transparent 60%
                  )`,
                                }} />
                            )}

                            {/* LAYER 5 — Text overlay at bottom */}
                            <div style={{
                                position: "absolute",
                                bottom: 0,
                                left: 0,
                                right: 0,
                                padding: "20px 24px",
                                zIndex: 5,
                                background: "linear-gradient(transparent, rgba(0,0,0,0.7))",
                            }}>
                                <p style={{
                                    fontFamily: "IBM Plex Mono, monospace",
                                    fontSize: "10px",
                                    color: "rgba(255,255,255,0.55)",
                                    letterSpacing: "3px",
                                    textTransform: "uppercase",
                                    margin: 0,
                                }}>Swapnil · UX Designer</p>
                            </div>

                        </motion.div>
                    </div>
                </div>

            </div>
        </section>
    );
}
