"use client";

import Link from "next/link";
import { User, Briefcase, Zap, Mail, LayoutGrid } from "lucide-react";
import MagneticWrapper from "./MagneticWrapper";

export default function MobileNav() {
    return (
        <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] w-[90%] md:hidden bg-black/80 backdrop-blur-xl border border-white/[0.08] rounded-3xl p-3 shadow-[0_-4px_20px_rgba(0,0,0,0.5)] flex justify-around items-center">
            <Link href="#about" className="p-4 text-zinc-400 hover:text-red-500 active:scale-90 transition-all min-w-[56px] min-h-[56px] flex items-center justify-center">
                <User className="w-6 h-6" />
            </Link>
            <Link href="#projects" className="p-4 text-zinc-400 hover:text-red-500 active:scale-90 transition-all min-w-[56px] min-h-[56px] flex items-center justify-center">
                <LayoutGrid className="w-6 h-6" />
            </Link>
            <Link href="#arsenal" className="p-4 text-zinc-400 hover:text-red-500 active:scale-90 transition-all min-w-[56px] min-h-[56px] flex items-center justify-center">
                <Zap className="w-6 h-6" />
            </Link>
            <Link href="mailto:mohitrawat0079@gmail.com" className="bg-red-600 text-white p-4 rounded-2xl shadow-lg shadow-red-600/20 active:scale-90 transition-all min-w-[56px] min-h-[56px] flex items-center justify-center">
                <Mail className="w-6 h-6" />
            </Link>
        </nav>
    );
}
