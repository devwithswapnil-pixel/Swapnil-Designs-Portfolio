import React, { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

const projects = [
    { title: "FOLKMAP BOARD", category: "ETHNOGRAPHY UX CASE STUDY", duration: "5 MONTHS", type: "UX RESEARCH", link: "https://www.figma.com/design/jSNN7YdYgOYaBdij7n9lO2/PORTFOLIO?node-id=201-2&t=avGOXr7jHDSOEJtS-1", image: "/images/FOLKMAP.png" },
    { title: "PATIENT PORT", category: "MOBILE APP", duration: "4 WEEKS", type: "MOBILE APP", link: "https://www.figma.com/design/jSNN7YdYgOYaBdij7n9lO2/PORTFOLIO?node-id=149-2&t=avGOXr7jHDSOEJtS-1", image: "/images/PATIENTPORT.png" },
    { title: "SPHURTI 2025", category: "EVENT WEBSITE DESIGN", duration: "2 MONTHS", type: "WEBSITE DESIGN", link: "https://www.figma.com/design/jSNN7YdYgOYaBdij7n9lO2/PORTFOLIO?node-id=202-42456&t=avGOXr7jHDSOEJtS-1", image: "/images/SPHURTI.png" },
    { title: "BLURT BOMB", category: "GAME DESIGN", duration: "5 MONTHS", type: "BOARD GAME DESIGN", link: "https://www.figma.com/design/jSNN7YdYgOYaBdij7n9lO2/PORTFOLIO?node-id=202-42457&t=avGOXr7jHDSOEJtS-1", image: "/images/BLURTBOMB.png" },
];

function ProjectCard({ project, index }) {
    const [isHovered, setIsHovered] = useState(false);

    const cardContent = (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: index * 0.12, ease: [0.76, 0, 0.24, 1] }}
            viewport={{ once: true, amount: 0.2 }}
            style={{
                backgroundColor: "transparent",
                width: "100%",
                borderBottom: index < 2 ? "1px solid rgba(26,26,26,0.15)" : "none",
                borderRight: index % 2 === 0 ? "1px solid rgba(26,26,26,0.15)" : "none",
                display: "flex",
                flexDirection: "column",
                overflow: "hidden"
            }}
        >
            <div style={{
                fontFamily: "IBM Plex Mono, monospace",
                padding: "40px"
            }}>
                {/* ROW 1 */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "4px" }}>
                    <div style={{
                        fontWeight: 700, fontSize: "11px", letterSpacing: "0.08em",
                        color: "#1a1a1a", textTransform: "uppercase"
                    }}>{project.title}</div>
                    <div style={{
                        fontSize: "10px", letterSpacing: "0.1em",
                        color: "#888888", textTransform: "uppercase"
                    }}>{project.duration}</div>
                </div>

                {/* ROW 2 */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div style={{
                        fontSize: "10px", letterSpacing: "0.1em",
                        color: "#888888", textTransform: "uppercase"
                    }}>{project.category}</div>
                    <div style={{
                        fontSize: "10px", letterSpacing: "0.1em",
                        color: "#888888", textTransform: "uppercase"
                    }}>{project.type}</div>
                </div>
            </div>

            <div
                style={{
                    width: "100%",
                    aspectRatio: "4 / 3",
                    backgroundColor: "#d4d8dc",
                    overflow: "hidden",
                    position: "relative"
                }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <motion.div
                    animate={{ scale: isHovered ? 1.05 : 1 }}
                    transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
                    style={{ width: "100%", height: "100%", backgroundColor: "#d4d8dc" }}
                >
                    {project.image && (
                        <img
                            src={project.image}
                            alt={project.title}
                            style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                                objectPosition: "center center",
                                display: "block",
                            }}
                        />
                    )}
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isHovered ? 1 : 0 }}
                    transition={{ duration: 0.35 }}
                    style={{
                        position: "absolute", inset: 0,
                        backgroundColor: "rgba(26,26,26,0.72)",
                        display: "flex", alignItems: "center", justifyContent: "center"
                    }}
                >
                    <div style={{
                        fontFamily: "IBM Plex Mono, monospace", fontSize: "11px",
                        letterSpacing: "0.18em", color: "#F5F0E8", textTransform: "uppercase"
                    }}>
                        VIEW CASE STUDY →
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );

    if (project.link) {
        return (
            <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none", display: "block" }}
            >
                {cardContent}
            </a>
        );
    }

    return cardContent;
}

export default function FeaturedWorks() {
    return (
        <section style={{
            backgroundColor: "#F5F0E8",
            width: "100%",
            boxSizing: "border-box",
            fontFamily: "IBM Plex Mono, monospace"
        }}>
            {/* HEADER ROW */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                viewport={{ once: true }}
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    padding: "80px 60px 48px 60px"
                }}
            >
                <div style={{
                    fontSize: "clamp(13px, 1.2vw, 15px)",
                    letterSpacing: "0.12em",
                    color: "#1a1a1a",
                    textTransform: "uppercase"
                }}>
                    <span style={{ fontWeight: 700 }}>FEATURED WORKS</span>
                    <span style={{ fontWeight: 400 }}>[4]</span>
                </div>
                <div style={{
                    fontSize: "13px",
                    color: "#888888",
                    maxWidth: "300px",
                    lineHeight: 1.75,
                    textAlign: "right"
                }}>
                    A glimpse into the UX solutions I've designed — research-driven, user-focused, and purposeful.
                </div>
            </motion.div>

            {/* GRID LAYOUT */}
            <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                width: "100%",
                backgroundColor: "#F5F0E8"
            }}>
                {projects.map((project, index) => (
                    <ProjectCard key={index} project={project} index={index} />
                ))}
            </div>
        </section>
    );
}
