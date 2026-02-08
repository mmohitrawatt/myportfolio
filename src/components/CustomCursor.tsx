"use client";

import { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export default function CustomCursor() {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const [isHovering, setIsHovering] = useState(false);

    const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
    const cursorX = useSpring(mouseX, springConfig);
    const cursorY = useSpring(mouseY, springConfig);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (!target) return;

            const isInteractive =
                target.tagName === "BUTTON" ||
                target.tagName === "A" ||
                target.closest(".glass-card") ||
                target.closest("button") ||
                target.closest("a");

            setIsHovering(!!isInteractive);
        };

        window.addEventListener("mousemove", handleMouseMove, { passive: true });
        document.addEventListener("mouseover", handleMouseOver, { passive: true });

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseover", handleMouseOver);
        };
    }, [mouseX, mouseY]);

    return (
        <div className="fixed inset-0 pointer-events-none z-[9999] hidden md:block">
            <motion.div
                className="w-8 h-8 rounded-full border border-red-600 bg-red-600/10 flex items-center justify-center -translate-x-1/2 -translate-y-1/2"
                style={{
                    x: cursorX,
                    y: cursorY,
                    scale: isHovering ? 2.5 : 1,
                    borderColor: isHovering ? "rgba(255, 0, 0, 0.4)" : "rgba(255, 0, 0, 0.8)",
                    backgroundColor: isHovering ? "rgba(255, 0, 0, 0.05)" : "rgba(255, 0, 0, 0.1)",
                }}
                transition={{ type: "spring", stiffness: 250, damping: 20 }}
            >
                <div className={`w-1 h-1 bg-red-600 rounded-full transition-opacity duration-300 ${isHovering ? 'opacity-0' : 'opacity-100'}`} />
            </motion.div>
        </div>
    );
}
