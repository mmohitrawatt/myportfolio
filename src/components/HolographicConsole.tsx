"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Shield, Cpu, Activity } from "lucide-react";

interface Log {
    id: string;
    message: string;
    type: "info" | "success" | "warning" | "error";
    timestamp: string;
}

export default function HolographicConsole() {
    const [logs, setLogs] = useState<Log[]>([]);
    const scrollRef = useRef<HTMLDivElement>(null);

    const addLog = (message: string, type: Log["type"] = "info") => {
        const newLog: Log = {
            id: crypto.randomUUID(),
            message,
            type,
            timestamp: new Date().toLocaleTimeString([], { hour12: false }),
        };
        setLogs((prev) => [...prev.slice(-15), newLog]);
    };

    useEffect(() => {
        addLog("SYSTEM_BOOT: Mohit Rawat Portfolio OS v4.0", "success");
        addLog("MODULE_LOAD: Neural_Mesh_Background.so", "info");
        addLog("MODULE_LOAD: Bento_Grid_Architecture.so", "info");
        addLog("SECURITY_CHECK: All protocols active.", "success");

        const handleLogEvent = (e: any) => {
            if (e.detail) {
                addLog(e.detail.message, e.detail.type || "info");
            }
        };

        window.addEventListener("system-log", handleLogEvent);
        return () => window.removeEventListener("system-log", handleLogEvent);
    }, []);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [logs]);

    return (
        <div className="fixed bottom-10 right-10 z-[110] w-72 pointer-events-none hidden md:block">
            <motion.div
                initial={{ opacity: 0, x: 50, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                className="glass p-4 rounded-2xl border border-red-600/20 shadow-2xl shadow-red-600/5 relative overflow-hidden backdrop-blur-xl"
            >
                {/* Terminal Header */}
                <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-2">
                    <div className="flex items-center gap-2">
                        <Terminal className="w-3 h-3 text-red-600" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-red-500">Live_Console</span>
                    </div>
                    <div className="flex gap-1">
                        <div className="w-1 h-1 rounded-full bg-red-600 animate-pulse" />
                        <div className="w-1 h-1 rounded-full bg-zinc-600" />
                    </div>
                </div>

                {/* Console Logs */}
                <div
                    ref={scrollRef}
                    className="h-48 overflow-y-auto space-y-2 font-mono scrollbar-none"
                >
                    <AnimatePresence mode="popLayout">
                        {logs.map((log) => (
                            <motion.div
                                key={log.id}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="text-[9px] leading-relaxed flex gap-2"
                            >
                                <span className="opacity-30">[{log.timestamp}]</span>
                                <span className={
                                    log.type === "success" ? "text-green-500" :
                                        log.type === "warning" ? "text-yellow-500" :
                                            log.type === "error" ? "text-red-500" :
                                                "text-zinc-400"
                                }>
                                    {log.message}
                                </span>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {/* HUD Stats */}
                <div className="mt-4 pt-2 border-t border-white/10 grid grid-cols-2 gap-2 text-[8px] font-black uppercase opacity-40">
                    <div className="flex items-center gap-1">
                        <Cpu className="w-2 h-2" /> CPU: 42%
                    </div>
                    <div className="flex items-center gap-1">
                        <Activity className="w-2 h-2" /> NET: 1.2gb/s
                    </div>
                </div>

                {/* Scanline Overlay */}
                <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.02),rgba(0,255,0,0.01),rgba(0,0,255,0.02))] bg-[length:100%_4px,3px_100%]" />
            </motion.div>
        </div>
    );
}

// Global Helper to trigger logs from anywhere
export const logToConsole = (message: string, type: Log["type"] = "info") => {
    if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("system-log", { detail: { message, type } }));
    }
};
