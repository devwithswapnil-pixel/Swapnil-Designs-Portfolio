import { useRef } from "react";
import { useScroll, useTransform } from "framer-motion";

export function useSectionParallax(inputRange = [0, 1], outputRange = [60, 0]) {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "start start"],
    });
    const y = useTransform(scrollYProgress, inputRange, outputRange);
    return { ref, y };
}
