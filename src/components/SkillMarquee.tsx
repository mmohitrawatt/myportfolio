"use client";

import { motion } from "framer-motion";

export default function SkillMarquee({ items }: { items: string[] }) {
    // Duplicate items for seamless loop
    const duplicatedItems = [...items, ...items, ...items];

    return (
        <div className="relative w-full overflow-hidden py-10 bg-white/5 border-y border-white/5">
            <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-black to-transparent z-10" />
            <div className="absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-black to-transparent z-10" />

            <motion.div
                className="flex whitespace-nowrap gap-20 px-10"
                animate={{
                    x: [0, -1000],
                }}
                transition={{
                    x: {
                        repeat: Infinity,
                        repeatType: "loop",
                        duration: 30,
                        ease: "linear",
                    },
                }}
            >
                {duplicatedItems.map((item, idx) => (
                    <span
                        key={idx}
                        className="text-4xl md:text-6xl font-black text-zinc-500 hover:text-white transition-colors uppercase tracking-widest flex items-center gap-4"
                    >
                        <span className="w-2 h-2 rounded-full bg-red-600" />
                        {item}
                    </span>
                ))}
            </motion.div>
        </div>
    );
}
