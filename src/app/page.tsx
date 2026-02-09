"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue
} from "framer-motion";
import {
  ArrowUpRight,
  Mail,
  Linkedin,
  Code2,
  Palette,
  Layers,
  Briefcase,
  Award,
  Globe,
  Zap,
  LayoutGrid,
  Search,
  PenTool,
  Cpu,
  Rocket,
  Monitor,
  Smartphone,
  Package,
  Quote,
  Sparkles,
  Target,
  User,
  ArrowRight
} from "lucide-react";
import MagneticWrapper from "@/components/MagneticWrapper";
import LiveClock from "@/components/LiveClock";
import CustomCursor from "@/components/CustomCursor";
import SkillMarquee from "@/components/SkillMarquee";
import MobileNav from "@/components/MobileNav";
import TiltCard from "@/components/TiltCard";
import NeuralBackground from "@/components/NeuralBackground";
import HolographicConsole, { logToConsole } from "@/components/HolographicConsole";
import { sounds } from "@/utils/sounds";

const CharacterReveal = ({ text, className = "", glitch = false }: { text: string; className?: string; glitch?: boolean }) => {
  const characters = text.split("");

  const container: any = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.02, delayChildren: 0.02 * i },
    }),
  };

  const child: any = {
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 200,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      filter: "blur(10px)",
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 200,
      },
    },
  };

  return (
    <motion.div
      style={{ display: "flex", flexWrap: "wrap" }}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className={className}
    >
      {characters.map((char, index) => (
        <motion.span
          variants={child}
          key={index}
          style={{ display: "inline-block", whiteSpace: "pre" }}
          className={glitch ? "hover:glitch-text" : ""}
          data-text={char}
        >
          {char}
        </motion.span>
      ))}
    </motion.div>
  );
};

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-red-600 origin-left z-[100]"
      style={{ scaleX }}
    />
  );
};

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const scrollSpring = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const backgroundYReverse = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);

  useEffect(() => {
    const handleInteraction = () => {
      sounds.init();
      window.removeEventListener("click", handleInteraction);
    };

    window.addEventListener("click", handleInteraction);
    return () => {
      window.removeEventListener("click", handleInteraction);
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.06,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: any = {
    hidden: {
      y: 40,
      opacity: 0,
      scale: 0.95,
      rotateX: -10
    },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      rotateX: 0,
      transition: {
        duration: 1.2,
        ease: [0.23, 1, 0.32, 1],
      },
    },
  };

  const floatVariants: any = {
    initial: { y: 0 },
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const skills = ["Figma", "Adobe Suite", "After Effects", "Midjourney", "Principle", "User Research", "Wireframing", "Prototyping", "Interaction Design", "Motion"];

  return (
    <main className="relative min-h-screen bg-black text-white selection:bg-red-600/30 overflow-x-hidden pb-20 md:pb-32">
      <CustomCursor />
      <MobileNav />
      <ScrollProgress />
      <NeuralBackground />
      <HolographicConsole />

      {/* Visual FX */}
      <div className="noise" />
      <motion.div
        style={{ y: backgroundY }}
        className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-red-900/10 blur-[120px] rounded-full pointer-events-none"
      />
      <motion.div
        style={{ y: backgroundYReverse }}
        className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-red-900/5 blur-[120px] rounded-full pointer-events-none"
      />

      {/* Navigation */}
      <nav className="fixed top-4 md:top-6 left-1/2 -translate-x-1/2 z-[100] w-[95%] md:w-[90%] max-w-2xl px-4 md:px-6 py-2 md:py-3 glass rounded-full flex justify-between items-center border border-white/10 shadow-2xl shadow-black">
        <MagneticWrapper>
          <div className="font-outfit font-black tracking-tighter text-lg bg-white text-black px-2 rounded cursor-pointer">MR.</div>
        </MagneticWrapper>
        <div className="hidden md:flex gap-8 text-[10px] font-bold uppercase tracking-widest opacity-60">
          <Link href="#about" className="hover:text-red-500 transition-colors">About</Link>
          <Link href="#projects" className="hover:text-red-500 transition-colors">Work</Link>
          <Link href="#arsenal" className="hover:text-red-500 transition-colors">Skills</Link>
        </div>
        <MagneticWrapper>
          <Link
            href="mailto:mohitrawat0079@gmail.com"
            onMouseEnter={() => { sounds.blip(); logToConsole("SECURITY_ENCRYPTED_MAIL_LINK: active", "info"); }}
            className="bg-red-600 text-white text-[10px] font-bold px-4 py-2 rounded-full hover:bg-white hover:text-black transition-all uppercase tracking-wider block"
          >
            Contact
          </Link>
        </MagneticWrapper>
      </nav>

      <motion.div
        ref={containerRef}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto px-4 md:px-6 pt-24 md:pt-32 pb-20"
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 auto-rows-[80px] md:auto-rows-[120px]">

          {/* Hero Section - Main Intro */}
          <motion.div variants={itemVariants} className="md:col-span-8 md:row-span-4 perspective-1000">
            <TiltCard className="h-full">
              <motion.section id="about"
                className="h-full glass-card rounded-[1.5rem] md:rounded-[2.5rem] p-6 md:p-8 lg:p-12 flex flex-col justify-end relative overflow-hidden group border border-white/5 shimmer"
                onViewportEnter={() => logToConsole("ACTIVE_STATUS: Online", "success")}
              >
                <div className="spotlight-border" />
                <motion.div
                  variants={floatVariants}
                  initial="initial"
                  animate="animate"
                  className="absolute top-10 right-10 opacity-5 group-hover:opacity-10 transition-opacity"
                >
                  <Palette className="w-64 h-64 text-red-600" />
                </motion.div>
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-6">
                    <motion.span
                      className="w-12 h-[1px] bg-red-600"
                      initial={{ width: 0 }}
                      animate={{ width: 48 }}
                      transition={{ duration: 1, delay: 0.5 }}
                    />
                    <span className="text-red-500 text-[10px] font-black tracking-[0.3em] uppercase flex items-center gap-2">
                      Product Designer // Noida, IN <span className="opacity-30">|</span> <LiveClock />
                    </span>
                  </div>
                  <CharacterReveal
                    text="DESIGNING"
                    glitch={true}
                    className="text-4xl sm:text-5xl md:text-7xl lg:text-9xl font-black italic tracking-tighter leading-[0.85] mb-1 md:mb-2"
                  />
                  <CharacterReveal
                    text="THE ELITE"
                    glitch={true}
                    className="text-4xl sm:text-5xl md:text-7xl lg:text-9xl font-black italic tracking-tighter leading-[0.85] mb-1 md:mb-2"
                  />
                  <CharacterReveal
                    text="FUTURE."
                    glitch={true}
                    className="text-4xl sm:text-5xl md:text-7xl lg:text-9xl font-black italic tracking-tighter text-gradient leading-[0.85] mb-4 md:mb-8"
                  />
                  <p className="text-sm md:text-lg lg:text-xl text-zinc-400 font-medium max-w-xl leading-snug">
                    I am <span className="text-white font-bold text-base md:text-xl uppercase italic">Mohit Rawat</span>. A self-taught <span className="text-red-500 font-bold underline decoration-red-600/30 underline-offset-4">Product Designer</span> with 9 months hands-on experience in building data-driven digital solutions.
                  </p>
                </div>
              </motion.section>
            </TiltCard>
          </motion.div>

          {/* Profile Photo Card */}
          <motion.div variants={itemVariants} className="md:col-span-4 md:row-span-4 perspective-1000">
            <TiltCard className="h-full">
              <div className="h-full glass-card rounded-[1.5rem] md:rounded-[2.5rem] p-2 overflow-hidden border border-white/5 group relative bg-gradient-to-br from-red-950/20 to-transparent flex flex-col">
                <div className="spotlight-border" />
                <div className="w-full h-full rounded-[2rem] bg-zinc-900/50 border border-white/5 overflow-hidden relative flex items-center justify-center flex-1">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-red-600/20 via-transparent to-blue-600/10"
                    animate={{
                      scale: [1, 1.1, 1],
                      rotate: [0, 5, 0],
                    } as any}
                    transition={{
                      duration: 10,
                      repeat: Infinity,
                      ease: "easeInOut"
                    } as any}
                  />
                  <img
                    src="/mohit_profile.png"
                    alt="Mohit Rawat"
                    className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-700 grayscale hover:grayscale-0 shadow-2xl"
                  />
                  <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-green-500 animate-pulse z-20 shadow-[0_0_10px_rgba(34,197,94,0.8)]" />
                  <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/80 to-transparent z-10 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                    <div className="text-[10px] font-black uppercase tracking-[0.3em] text-red-500 mb-1">Status: Active</div>
                    <div className="text-[8px] font-medium opacity-60">Verified Specialist // Noida, IN</div>
                  </div>
                </div>
              </div>
            </TiltCard>
          </motion.div>

          {/* Core Process Card */}
          <motion.div variants={itemVariants} className="md:col-span-4 md:row-span-4 perspective-1000">
            <TiltCard className="h-full">
              <motion.section
                className="h-full glass-card rounded-[1.5rem] md:rounded-[2.5rem] p-6 md:p-8 border border-white/5 flex flex-col group overflow-hidden bg-red-950/10 shimmer"
                onViewportEnter={() => logToConsole("MODULE_LOAD: Operational_Logic.dll", "info")}
              >
                <div className="spotlight-border" />
                <div className="flex items-center gap-3 mb-8 relative z-10">
                  <Cpu className="w-4 h-4 text-red-600" />
                  <CharacterReveal
                    text="OPERATIONAL LOGIC"
                    className="text-[10px] font-black uppercase tracking-[0.3em] opacity-50"
                  />
                </div>
                <div className="space-y-6 relative z-10 flex-grow">
                  <motion.div
                    className="flex items-center gap-6 group/item"
                    whileHover={{ x: 10 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover/item:bg-red-600 group-hover/item:text-white transition-colors">
                      <Search className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-black uppercase tracking-widest">01 / Research</h4>
                      <p className="text-[10px] text-zinc-500 mt-1">Analyzing user pain points and market gaps.</p>
                    </div>
                  </motion.div>
                  <motion.div
                    className="flex items-center gap-6 group/item"
                    whileHover={{ x: 10 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover/item:bg-red-600 group-hover/item:text-white transition-colors">
                      <PenTool className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-black uppercase tracking-widest">02 / Design</h4>
                      <p className="text-[10px] text-zinc-500 mt-1">Wireframing and high-fidelity prototyping.</p>
                    </div>
                  </motion.div>
                  <motion.div
                    className="flex items-center gap-6 group/item"
                    whileHover={{ x: 10 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover/item:bg-red-600 group-hover/item:text-white transition-colors">
                      <Rocket className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-black uppercase tracking-widest">03 / Deploy</h4>
                      <p className="text-[10px] text-zinc-500 mt-1">Developer handoff and quality assurance.</p>
                    </div>
                  </motion.div>
                </div>
                <div className="mt-6 pt-6 border-t border-white/5 relative z-10">
                  <div className="text-[9px] font-black uppercase tracking-widest text-red-500">The Design Architecture</div>
                </div>
              </motion.section>
            </TiltCard>
          </motion.div>

          {/* Availability Status */}
          <motion.div variants={itemVariants} className="md:col-span-4 md:row-span-2 glass-card rounded-[1.5rem] md:rounded-[2.5rem] p-6 md:p-10 flex flex-col justify-center text-center space-y-3 md:space-y-4 border border-white/5 bg-zinc-950/20">
            <div className="spotlight-border" />
            <motion.div
              className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-green-500/10 text-green-500 text-[9px] font-black uppercase tracking-[0.2em] border border-green-500/20 mx-auto relative z-10"
              animate={{
                scale: [1, 1.05, 1],
              } as any}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              } as any}
            >
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              Ready for Missions
            </motion.div>
            <CharacterReveal
              text="LET'S SOLVE"
              className="text-xl md:text-2xl font-black tracking-tight leading-tight uppercase justify-center italic"
            />
            <CharacterReveal
              text="YOUR PROBLEM."
              className="text-xl md:text-2xl font-black tracking-tight leading-tight uppercase justify-center italic"
            />
          </motion.div>

          {/* Social Links */}
          <motion.div variants={itemVariants} className="md:col-span-4 md:row-span-2 grid grid-cols-2 gap-4">
            <Link href="https://www.linkedin.com/in/mohit-rawat-18a00b21b/" target="_blank" className="glass-card rounded-[1.5rem] md:rounded-[2rem] flex flex-col items-center justify-center gap-2 md:gap-3 p-4 group border border-white/5 overflow-hidden min-h-[88px]">
              <div className="spotlight-border" />
              <Linkedin className="w-6 h-6 text-white group-hover:text-blue-400 group-hover:scale-125 transition-all relative z-10" />
              <span className="text-[9px] font-black uppercase tracking-[0.2em] opacity-40 relative z-10">LinkedIn</span>
            </Link>
            <Link href="https://www.behance.net/mohitrawat1" target="_blank" className="glass-card rounded-[1.5rem] md:rounded-[2rem] flex flex-col items-center justify-center gap-2 md:gap-3 p-4 group border border-white/5 overflow-hidden min-h-[88px]">
              <div className="spotlight-border" />
              <Award className="w-6 h-6 text-white group-hover:text-red-500 group-hover:scale-125 transition-all relative z-10" />
              <span className="text-[9px] font-black uppercase tracking-[0.2em] opacity-40 relative z-10">Behance</span>
            </Link>
          </motion.div>

          {/* Experience - Service Record */}
          <motion.div variants={itemVariants} className="md:col-span-4 md:row-span-4 perspective-1000">
            <TiltCard className="h-full">
              <motion.section
                className="h-full glass-card rounded-[1.5rem] md:rounded-[2.5rem] p-6 md:p-8 border border-white/5 flex flex-col group"
                onViewportEnter={() => logToConsole("MODULE_LOAD: Service_Record.dll", "info")}
              >
                <div className="spotlight-border" />
                <div className="flex items-center gap-3 mb-10 relative z-10">
                  <Briefcase className="w-4 h-4 text-red-600" />
                  <CharacterReveal
                    text="SERVICE RECORD"
                    className="text-[10px] font-black uppercase tracking-[0.3em] opacity-50"
                  />
                </div>
                <div className="space-y-10 flex-grow relative z-10">
                  <motion.div
                    className="relative pl-6 border-l border-white/10"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="absolute top-0 left-[-4.5px] w-2 h-2 rounded-full bg-red-600" />
                    <h4 className="font-black text-xl text-white uppercase tracking-tighter">Yumix Technologies</h4>
                    <p className="text-[10px] text-red-500 font-black mb-2 uppercase tracking-widest">Product Designer Intern // Mar 2025 - Jun 2025</p>
                    <p className="text-xs text-zinc-500 font-medium leading-relaxed">Redesigned Shramik and Venture Mozart from scratch. Focused on usability and engagement.</p>
                  </motion.div>
                  <motion.div
                    className="relative pl-6 border-l border-white/10"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="absolute top-0 left-[-4.5px] w-2 h-2 rounded-full bg-white/20" />
                    <h4 className="font-black text-xl text-white uppercase tracking-tighter">MUIT Noida - Coding Club</h4>
                    <p className="text-[10px] text-zinc-500 font-black mb-2 uppercase tracking-widest">Design and Branding Head // Jul 2023 - Jul 2024</p>
                    <p className="text-xs text-zinc-600 font-medium">Led design projects and organized events for 500+ participants.</p>
                  </motion.div>
                </div>
                <div className="mt-6 pt-6 border-t border-white/5 relative z-10">
                  <div className="text-[9px] font-black uppercase tracking-widest opacity-30">Security Clearance: Level 04</div>
                </div>
              </motion.section>
            </TiltCard>
          </motion.div>

          {/* Stats/Achievements */}
          <motion.div variants={itemVariants} className="md:col-span-4 md:row-span-4 perspective-1000">
            <TiltCard className="h-full">
              <div className="h-full glass-card rounded-[1.5rem] md:rounded-[2.5rem] p-6 md:p-8 border border-white/5 flex flex-col relative overflow-hidden group bg-gradient-to-br from-red-950/10 to-transparent shimmer">
                <div className="spotlight-border" />
                <div className="relative z-10 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-8">
                      <Sparkles className="w-5 h-5 text-red-600" />
                      <CharacterReveal
                        text="ACHIEVEMENTS"
                        className="text-[10px] font-black uppercase tracking-[0.3em] opacity-50"
                      />
                    </div>
                    <div className="space-y-8">
                      <motion.div
                        whileHover={{ scale: 1.05, translateZ: 20 }}
                        className="text-center p-6 rounded-2xl bg-white/5 border border-white/5"
                      >
                        <div className="text-5xl font-black text-gradient mb-2">30+</div>
                        <p className="text-[9px] font-black uppercase tracking-widest opacity-40">Google Cloud Badges</p>
                      </motion.div>
                      <motion.div
                        whileHover={{ scale: 1.05, translateZ: 20 }}
                        className="text-center p-6 rounded-2xl bg-white/5 border border-white/5"
                      >
                        <div className="text-sm font-black text-red-500 mb-2 uppercase">BTech - CSE</div>
                        <p className="text-[9px] font-black uppercase tracking-widest opacity-40">Maharishi University of IT // 2022-2026</p>
                      </motion.div>
                      <motion.div
                        whileHover={{ scale: 1.05, translateZ: 20 }}
                        className="text-center p-6 rounded-2xl bg-white/5 border border-white/5"
                      >
                        <div className="text-5xl font-black text-white mb-2">98%</div>
                        <p className="text-[9px] font-black uppercase tracking-widest opacity-40">Client Satisfaction</p>
                      </motion.div>
                    </div>
                  </div>
                </div>
                <motion.div
                  className="absolute -bottom-10 -left-10 w-48 h-48 bg-red-600/10 rounded-full blur-[80px]"
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.3, 0.5, 0.3],
                  } as any}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut"
                  } as any}
                />
              </div>
            </TiltCard>
          </motion.div>

          {/* Service Specialities Section */}
          <motion.div variants={itemVariants} className="md:col-span-12 md:row-span-3 perspective-1000">
            <TiltCard className="h-full">
              <motion.section
                className="h-full glass-card rounded-[2rem] md:rounded-[3.5rem] p-6 md:p-10 lg:p-12 border border-white/5 relative overflow-hidden group shimmer"
                onViewportEnter={() => logToConsole("INIT_SUBSYSTEM: Core_Services", "success")}
              >
                <div className="spotlight-border" />
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-10">
                    <Target className="w-5 h-5 text-red-600" />
                    <CharacterReveal
                      text="CORE SERVICES"
                      className="text-3xl md:text-5xl lg:text-6xl font-black italic tracking-tighter uppercase"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <motion.div
                      className="p-6 md:p-8 rounded-2xl md:rounded-3xl bg-white/5 border border-white/5 group/service hover:bg-red-950/20 transition-all"
                      whileHover={{ y: -10, scale: 1.02, translateZ: 30 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Monitor className="w-8 h-8 text-red-600 mb-6" />
                      <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight mb-2 md:mb-3">Web Design</h3>
                      <p className="text-xs md:text-sm text-zinc-400 leading-relaxed">Responsive, high-conversion web experiences built for modern businesses.</p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        <span className="text-[8px] px-2 py-1 rounded bg-white/5 font-bold uppercase tracking-wider">SaaS</span>
                        <span className="text-[8px] px-2 py-1 rounded bg-white/5 font-bold uppercase tracking-wider">E-Commerce</span>
                      </div>
                    </motion.div>
                    <motion.div
                      className="p-6 md:p-8 rounded-2xl md:rounded-3xl bg-white/5 border border-white/5 group/service hover:bg-red-950/20 transition-all"
                      whileHover={{ y: -10, scale: 1.02, translateZ: 30 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Smartphone className="w-8 h-8 text-red-600 mb-6" />
                      <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight mb-2 md:mb-3">Mobile Apps</h3>
                      <p className="text-xs md:text-sm text-zinc-400 leading-relaxed">Native-quality iOS and Android app designs with exceptional UX flows.</p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        <span className="text-[8px] px-2 py-1 rounded bg-white/5 font-bold uppercase tracking-wider">Healthcare</span>
                        <span className="text-[8px] px-2 py-1 rounded bg-white/5 font-bold uppercase tracking-wider">Social</span>
                      </div>
                    </motion.div>
                    <motion.div
                      className="p-6 md:p-8 rounded-2xl md:rounded-3xl bg-white/5 border border-white/5 group/service hover:bg-red-950/20 transition-all"
                      whileHover={{ y: -10, scale: 1.02, translateZ: 30 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Package className="w-8 h-8 text-red-600 mb-6" />
                      <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight mb-2 md:mb-3">Product Strategy</h3>
                      <p className="text-xs md:text-sm text-zinc-400 leading-relaxed">From user research to final design systems—comprehensive product thinking.</p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        <span className="text-[8px] px-2 py-1 rounded bg-white/5 font-bold uppercase tracking-wider">Research</span>
                        <span className="text-[8px] px-2 py-1 rounded bg-white/5 font-bold uppercase tracking-wider">Systems</span>
                      </div>
                    </motion.div>
                  </div>
                </div>
                <motion.div
                  className="absolute -bottom-20 -right-20 w-96 h-96 bg-red-900/10 rounded-full blur-[120px]"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3],
                  } as any}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut"
                  } as any}
                />
              </motion.section>
            </TiltCard>
          </motion.div>

          {/* Project 01 - Bento */}
          <motion.div variants={itemVariants} id="projects" className="md:col-span-8 md:row-span-4 perspective-1000">
            <TiltCard className="h-full">
              <motion.section
                className="h-full glass-card rounded-[1.5rem] md:rounded-[3rem] p-2 overflow-hidden border border-white/5 group bg-zinc-950/20 shimmer"
                onViewportEnter={() => logToConsole("DATA_FOUND: Project_DOCQUE_Active", "warning")}
              >
                <div className="spotlight-border" />
                <div className="grid grid-cols-1 md:grid-cols-2 h-full relative z-10">
                  <div className="p-6 md:p-10 flex flex-col justify-between order-2 md:order-1">
                    <div>
                      <div className="flex gap-2 mb-4">
                        <motion.span
                          className="px-2 py-0.5 rounded bg-red-600/20 text-red-500 text-[8px] font-black uppercase tracking-widest"
                          whileHover={{ scale: 1.1 }}
                        >
                          Retention +22%
                        </motion.span>
                        <span className="px-2 py-0.5 rounded bg-white/5 text-zinc-400 text-[8px] font-black uppercase tracking-widest">Core Mission</span>
                      </div>
                      <CharacterReveal
                        text="MORAXE"
                        className="text-4xl md:text-6xl font-black mb-3 md:mb-4 tracking-tighter italic"
                      />
                      <p className="text-zinc-400 text-xs md:text-sm leading-relaxed max-w-xs font-sans font-medium">
                        Mobile-first social platform for entrepreneurs. Designed mini-video interactions and branding assets.
                      </p>
                    </div>
                    <MagneticWrapper>
                      <Link
                        href="https://www.figma.com/design/m3ypZCcePZl4FPoUPlvIIj/Moraxe-Project?node-id=1-4259"
                        onMouseEnter={() => { sounds.notify(); logToConsole("ACCESSING_DATABASE: Project_MORAXE", "warning"); }}
                        className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] group-hover:text-red-500 transition-colors"
                      >
                        Founder-led Project <ArrowUpRight className="w-4 h-4" />
                      </Link>
                    </MagneticWrapper>
                  </div>
                  <div className="bg-zinc-900/50 rounded-[2.5rem] border border-white/5 m-2 relative overflow-hidden order-1 md:order-2">
                    <motion.div
                      className="absolute inset-0 flex items-center justify-center"
                      whileHover={{ scale: 1.05, rotate: 2, translateZ: 40 }}
                      transition={{ type: "spring", stiffness: 200 }}
                    >
                      <h4 className="text-8xl font-black italic opacity-5 group-hover:opacity-10 transition-opacity">MX</h4>
                    </motion.div>
                    <div className="absolute bottom-4 right-6 text-[8px] font-black uppercase tracking-widest opacity-20">ENTREPRENEUR ECOSYSTEM</div>
                  </div>
                </div>
              </motion.section>
            </TiltCard>
          </motion.div>

          {/* Design Philosophy */}
          <motion.div variants={itemVariants} className="md:col-span-4 md:row-span-4 perspective-1000">
            <TiltCard className="h-full">
              <motion.section
                className="h-full glass-card rounded-[1.5rem] md:rounded-[2.5rem] p-6 md:p-10 overflow-hidden relative group border border-white/5 bg-gradient-to-br from-transparent to-red-950/10"
                onViewportEnter={() => logToConsole("PHILOSOPHY_LOADED: Empathy_&_Data", "info")}
              >
                <div className="spotlight-border" />
                <div className="relative z-10 h-full flex flex-col justify-between">
                  <div>
                    <Quote className="w-8 h-8 text-red-600 mb-6 opacity-40" />
                    <h3 className="text-2xl md:text-3xl font-black italic mb-4 md:mb-6 leading-tight">"Practical design for visually appealing solutions."</h3>
                  </div>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <CharacterReveal
                        text="MY PHILOSOPHY"
                        className="text-[10px] font-black uppercase tracking-[0.3em] text-red-500"
                      />
                      <p className="text-sm text-zinc-400 leading-relaxed">
                        I combine a background in tech and operations to create user-friendly designs that solve real user problems through elegant, intuitive interaction.
                      </p>
                    </div>
                    <div className="pt-6 border-t border-white/5">
                      <div className="flex items-center gap-3">
                        <Sparkles className="w-4 h-4 text-red-600" />
                        <span className="text-[9px] font-black uppercase tracking-widest opacity-30">Driven by Empathy & Data</span>
                      </div>
                    </div>
                  </div>
                </div>
                <motion.div
                  className="absolute top-0 right-0 w-32 h-32 bg-red-600/5 rounded-full blur-[60px]"
                  animate={{
                    scale: [1, 1.5, 1],
                  } as any}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  } as any}
                />
              </motion.section>
            </TiltCard>
          </motion.div>

          {/* Project 02 - Zappy */}
          <motion.div variants={itemVariants} className="md:col-span-6 md:row-span-3 perspective-1000">
            <TiltCard className="h-full">
              <motion.section
                className="h-full glass-card rounded-[1.5rem] md:rounded-[2.5rem] p-6 md:p-10 overflow-hidden relative group border border-white/5 hover:bg-zinc-950/40"
                onViewportEnter={() => logToConsole("DATA_FOUND: Project_ZAPPY_Active", "success")}
              >
                <div className="spotlight-border" />
                <div className="relative z-10 flex flex-col justify-between h-full">
                  <div>
                    <div className="flex gap-2 mb-4">
                      <motion.span
                        className="px-2 py-0.5 rounded bg-green-600/20 text-green-500 text-[8px] font-black uppercase tracking-widest"
                        whileHover={{ scale: 1.1 }}
                      >
                        10-Min Promise
                      </motion.span>
                    </div>
                    <CharacterReveal
                      text="ZAPPY"
                      className="text-3xl md:text-4xl font-black mb-2 md:mb-3 italic"
                    />
                    <p className="text-xs md:text-sm text-zinc-400 leading-relaxed max-w-xs font-sans font-medium">
                      On-demand home services offering 10-minute delivery promise. Clickable prototype with 15+ high-fidelity screens.
                    </p>
                  </div>
                  <MagneticWrapper>
                    <Link href="https://www.behance.net/gallery/234579615/Zappy-App-UX-Case-Study" className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] group-hover:text-red-500 transition-colors">
                      Case Study <ArrowUpRight className="w-4 h-4" />
                    </Link>
                  </MagneticWrapper>
                </div>
                <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-red-600/5 rounded-full blur-[80px] group-hover:bg-red-600/10 transition-all"></div>
              </motion.section>
            </TiltCard>
          </motion.div>

          {/* Project 03 - DocQue */}
          <motion.div variants={itemVariants} className="md:col-span-6 md:row-span-3 perspective-1000">
            <TiltCard className="h-full">
              <motion.section
                className="h-full glass-card rounded-[1.5rem] md:rounded-[2.5rem] p-6 md:p-10 overflow-hidden relative group border border-white/5 hover:bg-zinc-950/40"
                onViewportEnter={() => logToConsole("DATA_FOUND: Project_DOCQUE_Active", "info")}
              >
                <div className="spotlight-border" />
                <div className="relative z-10 flex flex-col justify-between h-full">
                  <div>
                    <div className="flex gap-2 mb-4">
                      <motion.span
                        className="px-2 py-0.5 rounded bg-blue-600/20 text-blue-500 text-[8px] font-black uppercase tracking-widest"
                        whileHover={{ scale: 1.1 }}
                      >
                        Healthcare
                      </motion.span>
                    </div>
                    <CharacterReveal
                      text="DOCQUE"
                      className="text-3xl md:text-4xl font-black mb-2 md:mb-3 italic"
                    />
                    <p className="text-xs md:text-sm text-zinc-400 leading-relaxed max-w-xs font-sans font-medium">
                      Modern healthcare platform streamlining patient interactions with a premium AI-driven interface.
                    </p>
                  </div>
                  <MagneticWrapper>
                    <Link href="https://www.figma.com/design/8ymbe1A6FTITwTloenThwb/DocQue-App?node-id=0-1" className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] group-hover:text-red-500 transition-colors">
                      Analyze UX <ArrowUpRight className="w-4 h-4" />
                    </Link>
                  </MagneticWrapper>
                </div>
                <div className="absolute top-[-20px] right-[-20px] w-32 h-32 bg-white/5 rounded-full blur-[60px]"></div>
              </motion.section>
            </TiltCard>
          </motion.div>

          {/* Skills Area - Marquee Section */}
          <motion.section
            variants={itemVariants}
            id="arsenal"
            className="md:col-span-12 mt-10"
            onViewportEnter={() => logToConsole("INIT_DATABASE: Technical_Arsenal", "info")}
          >
            <div className="flex justify-between items-end mb-8">
              <div>
                <h3 className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40 mb-2">Technical Core</h3>
                <CharacterReveal
                  text="THE ARSENAL"
                  className="text-3xl md:text-5xl lg:text-6xl font-black italic tracking-tighter uppercase"
                />
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-20 hidden md:block">Infinite Drift Layer</span>
            </div>
            <SkillMarquee items={skills} />
          </motion.section>

          {/* Contact - Final Card */}
          <motion.footer
            variants={itemVariants}
            className="md:col-span-12 md:row-span-4 glass-card rounded-[2rem] md:rounded-[4rem] p-8 md:p-12 lg:p-16 text-center flex flex-col items-center justify-center space-y-6 md:space-y-10 mt-10 border border-white/5 bg-gradient-to-b from-transparent to-zinc-950/40 relative group"
            onViewportEnter={() => logToConsole("SECURITY_ENCRYPTED_COMMS: online", "success")}
          >
            <div className="spotlight-border" />
            <div className="space-y-4 relative z-10">
              <motion.span
                className="text-[10px] font-black tracking-[0.5em] text-red-500 uppercase"
                animate={{
                  opacity: [0.5, 1, 0.5],
                } as any}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                } as any}
              >
                Operational Status: Online
              </motion.span>
              <CharacterReveal
                text="READY TO DEPLOY."
                className="text-3xl sm:text-4xl md:text-6xl lg:text-9xl font-black tracking-tighter text-gradient leading-[0.85] text-center justify-center italic"
              />
            </div>

            <div className="flex flex-wrap justify-center gap-6 pt-4 relative z-10">
              <MagneticWrapper>
                <Link href="mailto:mohitrawatux@gmail.com" className="bg-white text-black px-8 md:px-12 py-4 md:py-6 rounded-full font-black uppercase tracking-[0.15em] md:tracking-[0.2em] text-[10px] md:text-xs hover:bg-red-600 hover:text-white transition-all shadow-2xl shadow-white/5 flex items-center gap-2 md:gap-4 border border-transparent hover:border-white/20 min-h-[56px]">
                  Initialize Contact <Mail className="w-5 h-5" />
                </Link>
              </MagneticWrapper>
              <div className="flex items-center gap-4 bg-zinc-900/50 p-2 rounded-full border border-white/10">
                <MagneticWrapper>
                  <Link href="https://www.linkedin.com/in/mohit-rawat-18a00b21b/" target="_blank" className="w-12 h-12 md:w-14 md:h-14 glass rounded-full flex items-center justify-center hover:bg-white hover:text-black transition-all">
                    <Linkedin className="w-5 h-5" />
                  </Link>
                </MagneticWrapper>
                <MagneticWrapper>
                  <Link href="https://www.behance.net/mohitrawat1" target="_blank" className="w-12 h-12 md:w-14 md:h-14 glass rounded-full flex items-center justify-center hover:bg-white hover:text-black transition-all">
                    <Award className="w-5 h-5" />
                  </Link>
                </MagneticWrapper>
              </div>
            </div>

            <div className="w-full pt-8 md:pt-16 mt-8 md:mt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 md:gap-8 relative z-10">
              <div className="text-[8px] md:text-[9px] font-black uppercase tracking-[0.3em] md:tracking-[0.4em] opacity-30 text-center md:text-left">© 2026 Mohit Rawat // Noida, India</div>
              <div className="flex gap-6 md:gap-10 text-[8px] md:text-[9px] font-black uppercase tracking-[0.3em] md:tracking-[0.4em] opacity-30">
                <Link href="#about" className="hover:text-red-500 transition-colors">About</Link>
                <Link href="#projects" className="hover:text-red-500 transition-colors">Work</Link>
                <Link href="#arsenal" className="hover:text-red-500 transition-colors">Arsenal</Link>
              </div>
              <div className="text-[8px] md:text-[9px] font-black uppercase tracking-[0.3em] md:tracking-[0.4em] text-red-500 flex items-center gap-2">
                <motion.span
                  className="w-1.5 h-1.5 rounded-full bg-red-600"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [1, 0.5, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                All Systems Nominal
              </div>
            </div>
          </motion.footer>
        </div>
      </motion.div>
    </main>
  );
}
