import { motion, useInView } from "framer-motion";
import { useState, useEffect, useRef } from "react";

const ease = [0.76, 0, 0.24, 1];
const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%";
const finalText = "LET'S WORK TOGETHER";

export default function CTAFooter() {
    const [displayText, setDisplayText] = useState(finalText);
    const containerRef = useRef(null);
    const isInView = useInView(containerRef, { once: true, amount: 0.5 });

    const startScramble = () => {
        let iteration = 0;
        const interval = setInterval(() => {
            setDisplayText(
                finalText.split("").map((char, i) => {
                    if (char === " ") return " ";
                    if (i < iteration) return finalText[i];
                    return chars[Math.floor(Math.random() * chars.length)];
                }).join("")
            );

            iteration += 0.5;
            if (iteration >= finalText.length) clearInterval(interval);
        }, 40);
        return () => clearInterval(interval);
    };

    useEffect(() => {
        if (isInView) {
            startScramble();
        }
    }, [isInView]);

    return (
        <section
            ref={containerRef}
            style={{
                backgroundColor: "#1a1a1a",
                width: "100%",
                padding: "120px 80px 60px 80px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                position: "relative",
                overflow: "hidden",
                boxSizing: "border-box"
            }}
        >
            {/* TOP DIVIDER */}
            <div style={{
                width: "100%",
                height: "1px",
                background: "rgba(245,240,232,0.10)",
                marginBottom: "80px"
            }} />

            {/* MAIN HEADING */}
            <motion.div
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease }}
                viewport={{ once: true }}
            >
                <h2 style={{
                    fontSize: "72px",
                    fontWeight: "700",
                    fontFamily: "IBM Plex Mono, monospace",
                    color: "#F5F0E8",
                    textAlign: "center",
                    lineHeight: "1.0",
                    letterSpacing: "-2px",
                    marginBottom: "48px",
                    margin: "0 0 48px 0"
                }}>
                    {displayText}
                </h2>
            </motion.div>

            {/* SUBTITLE */}
            <p style={{
                fontSize: "14px",
                fontFamily: "IBM Plex Mono, monospace",
                color: "#888888",
                textAlign: "center",
                marginBottom: "56px",
                margin: "0 0 56px 0"
            }}>
                Available for freelance projects and full-time roles.
            </p>

            {/* BUTTONS ROW */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2, ease }}
                viewport={{ once: true }}
                style={{
                    display: "flex",
                    gap: "16px",
                    justifyContent: "center",
                    marginBottom: "120px"
                }}
            >
                <motion.a
                    whileHover={{ opacity: 0.8 }}
                    transition={{ duration: 0.2 }}
                    href="https://www.linkedin.com/in/swapnil-verma11"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                        textDecoration: "none",
                        backgroundColor: "#F5F0E8",
                        color: "#1a1a1a",
                        padding: "16px 40px",
                        fontFamily: "IBM Plex Mono, monospace",
                        fontSize: "12px",
                        letterSpacing: "2px",
                        border: "none",
                        cursor: "pointer",
                        borderRadius: "0",
                        display: "inline-block"
                    }}
                >
                    LINKEDIN →
                </motion.a>

                <motion.a
                    whileHover={{ opacity: 0.8 }}
                    transition={{ duration: 0.2 }}
                    href="mailto:workwithswapnil1105@gmail.com"
                    style={{
                        textDecoration: "none",
                        backgroundColor: "transparent",
                        color: "#F5F0E8",
                        border: "1px solid rgba(245,240,232,0.25)",
                        padding: "16px 40px",
                        fontFamily: "IBM Plex Mono, monospace",
                        fontSize: "12px",
                        letterSpacing: "2px",
                        borderRadius: "0",
                        display: "inline-block"
                    }}
                >
                    DROP A MAIL →
                </motion.a>
            </motion.div>

            {/* FOOTER BAR */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
                style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    borderTop: "1px solid rgba(245,240,232,0.08)",
                    paddingTop: "32px"
                }}
            >
                <div style={{
                    fontFamily: "IBM Plex Mono, monospace",
                    fontSize: "11px",
                    color: "rgba(245,240,232,0.4)",
                    letterSpacing: "2px"
                }}>
                    SWAPNIL.DESIGN
                </div>

                <div style={{
                    fontFamily: "IBM Plex Mono, monospace",
                    fontSize: "11px",
                    color: "rgba(245,240,232,0.25)",
                    letterSpacing: "1px"
                }}>
                    DESIGNED & BUILT BY SWAPNIL
                </div>

                <div style={{
                    fontFamily: "IBM Plex Mono, monospace",
                    fontSize: "11px",
                    color: "rgba(245,240,232,0.4)",
                    letterSpacing: "2px"
                }}>
                    © 2026
                </div>
            </motion.div>
        </section>
    );
}
