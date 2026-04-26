import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const ease = [0.76, 0, 0.24, 1];

const mediaItems = [
    { type: "video", src: "/media/v1.mp4" },
    { type: "image", src: "/media/p2.jpeg" },
    { type: "video", src: "/media/v2.mp4" },
    { type: "image", src: "/media/p3.jpeg" },
    { type: "video", src: "/media/v3.mp4" },
    { type: "image", src: "/media/p4.jpeg" },
    { type: "video", src: "/media/v4.mp4" },
    { type: "image", src: "/media/p5.jpeg" },
    { type: "video", src: "/media/v5.mp4" },
    { type: "image", src: "/media/p4.jpeg" },
];

const orbits = [
    { radius: 130, count: 4, speed: 22, cardW: 95, cardH: 125 },
    { radius: 225, count: 4, speed: 32, cardW: 85, cardH: 112 },
    { radius: 320, count: 4, speed: 46, cardW: 76, cardH: 100 },
];

export default function OutsideDesign() {
    const [baseIndex, setBaseIndex] = useState(0);

    // GLOBAL PING — Change every 5 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setBaseIndex(prev => (prev + 1) % mediaItems.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    // FORCE VIDEO AUTOPLAY on mount and when baseIndex shifts
    useEffect(() => {
        const videos = document.querySelectorAll("#outside-design video");
        videos.forEach(v => {
            v.muted = true;
            v.play().catch(() => { });
        });
    }, [baseIndex]);

    return (
        <section
            id="outside-design"
            style={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
                minHeight: "100vh",
                backgroundColor: "#F5F0E8",
                alignItems: "center",
                padding: "0 80px",
                overflow: "hidden",
                boxSizing: "border-box",
                position: "relative"
            }}
        >

            {/* SECTION DIVIDER */}
            <div style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "1px",
                background: "#1a1a1a",
                opacity: 0.12,
                zIndex: 5
            }} />

            {/* LEFT COLUMN (35%) */}
            <div style={{
                width: "35%",
                flexShrink: 0,
                paddingRight: "60px",
                boxSizing: "border-box",
                zIndex: 2
            }}>
                <motion.div
                    initial={{ opacity: 0, x: -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.9, ease }}
                    viewport={{ once: true }}
                >
                    <div style={{
                        fontSize: "10px",
                        color: "#888888",
                        textTransform: "uppercase",
                        letterSpacing: "3px",
                        marginBottom: "24px",
                        fontFamily: "IBM Plex Mono, monospace"
                    }}>
                        OUTSIDE DESIGN
                    </div>

                    <h2 style={{
                        fontSize: "48px",
                        fontWeight: 700,
                        color: "#1a1a1a",
                        lineHeight: 1.1,
                        marginBottom: "24px",
                        fontFamily: "IBM Plex Mono, monospace",
                        margin: "0 0 24px 0"
                    }}>
                        Life beyond the screen.
                    </h2>

                    <p style={{
                        fontSize: "13px",
                        color: "#888888",
                        lineHeight: "1.8",
                        fontFamily: "IBM Plex Mono, monospace",
                        margin: 0
                    }}>
                        Design thinking doesn't stop at the desk. Travel, photography, and curiosity fuel everything I create.
                    </p>
                </motion.div>
            </div>

            {/* RIGHT COLUMN (65%) */}
            <div style={{
                width: "65%",
                height: "100vh",
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
                zIndex: 1
            }}>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.2, ease }}
                    viewport={{ once: true, amount: 0.3 }}
                    style={{
                        position: "relative",
                        width: "600px",
                        height: "600px"
                    }}
                >
                    {/* CENTER CIRCLE */}
                    <div style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: "50px",
                        height: "50px",
                        borderRadius: "50%",
                        border: "1.5px solid rgba(26,26,26,0.30)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        zIndex: 10,
                        backgroundColor: "#F5F0E8"
                    }}>
                        <span style={{
                            fontFamily: "IBM Plex Mono, monospace",
                            color: "#1a1a1a",
                            fontSize: "16px",
                            fontWeight: "bold"
                        }}>S</span>
                    </div>

                    {orbits.map((orbit, orbitIdx) => (
                        <div
                            key={orbitIdx}
                            style={{
                                position: "absolute",
                                top: "50%",
                                left: "50%",
                                width: `${orbit.radius * 2}px`,
                                height: `${orbit.radius * 2}px`,
                                marginTop: `-${orbit.radius}px`,
                                marginLeft: `-${orbit.radius}px`,
                                borderRadius: "50%",
                                border: "1px dashed rgba(26,26,26,0.20)",
                                animation: `spin ${orbit.speed}s linear infinite`,
                            }}
                        >
                            {[...Array(orbit.count)].map((_, cardIdx) => {
                                const angle = (cardIdx / orbit.count) * 2 * Math.PI;
                                const x = orbit.radius + orbit.radius * Math.cos(angle) - orbit.cardW / 2;
                                const y = orbit.radius + orbit.radius * Math.sin(angle) - orbit.cardH / 2;

                                // UNIQUE INDEX PER CARD logic
                                const globalCardIndex = (orbitIdx * 4) + cardIdx;
                                const mediaIndex = (baseIndex + globalCardIndex) % mediaItems.length;
                                const item = mediaItems[mediaIndex];

                                return (
                                    <div
                                        key={cardIdx}
                                        style={{
                                            position: "absolute",
                                            left: `${x}px`,
                                            top: `${y}px`,
                                            width: `${orbit.cardW}px`,
                                            height: `${orbit.cardH}px`,
                                            borderRadius: "14px",
                                            overflow: "hidden",
                                            border: "1px solid rgba(26,26,26,0.10)",
                                            boxShadow: "0 6px 24px rgba(0,0,0,0.08)",
                                            animation: `spin ${orbit.speed}s linear infinite reverse`,
                                            backgroundColor: "#eee"
                                        }}
                                    >
                                        <AnimatePresence mode="wait">
                                            <motion.div
                                                key={item.src + mediaIndex}
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                transition={{ duration: 0.5 }}
                                                style={{ width: "100%", height: "100%" }}
                                            >
                                                {item.type === "video" ? (
                                                    <video
                                                        src={item.src}
                                                        autoPlay
                                                        loop
                                                        muted
                                                        playsInline
                                                        style={{
                                                            width: "100%",
                                                            height: "100%",
                                                            objectFit: "cover",
                                                            display: "block",
                                                        }}
                                                    />
                                                ) : (
                                                    <img
                                                        src={item.src}
                                                        alt=""
                                                        style={{
                                                            width: "100%",
                                                            height: "100%",
                                                            objectFit: "cover",
                                                            display: "block",
                                                        }}
                                                    />
                                                )}
                                            </motion.div>
                                        </AnimatePresence>
                                    </div>
                                );
                            })}
                        </div>
                    ))}
                </motion.div>
            </div>

        </section>
    );
}
