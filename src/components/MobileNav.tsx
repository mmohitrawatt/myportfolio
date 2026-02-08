"use client";

import Link from "next/link";
import { User, Briefcase, Zap, Mail, LayoutGrid } from "lucide-react";
import MagneticWrapper from "./MagneticWrapper";

export default function MobileNav() {
    return (
        <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] w-[90%] md:hidden bg-zinc-900/80 backdrop-blur-xl border border-white/10 rounded-3xl p-2 shadow-2xl flex justify-around items-center">
            <Link href="#about" className="p-4 text-zinc-400 hover:text-red-500 transition-colors">
                <User className="w-6 h-6" />
            </Link>
            <Link href="#projects" className="p-4 text-zinc-400 hover:text-red-500 transition-colors">
                <LayoutGrid className="w-6 h-6" />
            </Link>
            <Link href="#arsenal" className="p-4 text-zinc-400 hover:text-red-500 transition-colors">
                <Zap className="w-6 h-6" />
            </Link>
            <Link href="mailto:mohitrawat0079@gmail.com" className="bg-red-600 text-white p-4 rounded-2xl shadow-lg shadow-red-600/20">
                <Mail className="w-6 h-6" />
            </Link>
        </nav>
    );
}
