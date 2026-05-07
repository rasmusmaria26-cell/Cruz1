"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { Phone, ArrowRight, Anchor, FileText, GraduationCap, Globe, Clock, CheckCircle, Mail, MapPin, Menu, X, MessageCircle, ChevronDown } from "lucide-react";
import Image from "next/image";
import Chatbot from "./Chatbot";
import CustomCursor from "./CustomCursor";
import AnimatedCounter from "./AnimatedCounter";
import { SmokeBackground } from "./SmokeBackground";

const P1 = "+919003354028";
const WA = `https://wa.me/${P1}`;

const SERVICES = [
  { n: "01", title: "Crew Manning", desc: "We place qualified seafarers with reputed global shipping companies. Full documentation support included.", wa: "Crew Manning" },
  { n: "02", title: "College Admissions", desc: "Guidance and processing for admissions to top maritime institutions across India.", wa: "Marine College Admission" },
  { n: "03", title: "Courses Booking", desc: "End-to-end booking for STCW, watchkeeping, and certification courses.", wa: "Courses Booking" },
  { n: "04", title: "Passport Online", desc: "Fast-track passport application and renewal, designed for seafarers.", wa: "Passport Online" },
];

const STEPS = [
  { n: "01", title: "Reach Out", desc: "Call or WhatsApp us with your requirement." },
  { n: "02", title: "Share Documents", desc: "Send soft copies via WhatsApp or email." },
  { n: "03", title: "We Process", desc: "Cruze submits and tracks everything for you." },
  { n: "04", title: "Confirmed", desc: "Receive confirmation within 48 hours." },
];

const STATS = [
  { label: "Placed", to: 500, suffix: "+" },
  { label: "Processing", val: "48 hr" },
  { label: "Colleges", to: 20, suffix: "+" },
  { label: "Success", to: 98, suffix: "%" },
];

const TESTI = [
  { name: "Karthik R.", role: "AB Seaman", text: "Got my crew manning done in 2 days. Cruze knows every process inside out!" },
  { name: "Priya's Father", role: "Parent of Cadet", text: "They guided my son's marine college admission smoothly. Very reassuring team." },
  { name: "Senthil M.", role: "Engine Cadet", text: "STCW booking was handled end-to-end. WhatsApp them — they respond instantly." },
];

const NAV = ["Home", "Services", "Process", "Testimonials", "Contact"];

const EASE_SMOOTH = [0.25, 0.46, 0.45, 0.94];
const EASE_SNAPPY = [0.34, 1.56, 0.64, 1];
const EASE_CINEMATIC = [0.76, 0, 0.24, 1];

export default function LandingPage() {
  const [menu, setMenu] = useState(false);
  const [activeTesti, setActiveTesti] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);
  const testiScrollRef = useRef<HTMLDivElement>(null);
  
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const { scrollY } = useScroll();
  
  const navBg = useTransform(scrollY, [0, 100], ["rgba(10, 12, 15, 0)", "rgba(10, 12, 15, 0.9)"]);
  const navBackdrop = useTransform(scrollY, [0, 100], ["blur(0px)", "blur(12px)"]);
  
  const progressBarWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  useEffect(() => {
    setIsDesktop(window.innerWidth > 768);
    const handleResize = () => setIsDesktop(window.innerWidth > 768);
    window.addEventListener("resize", handleResize);

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveTesti(Number(entry.target.getAttribute("data-index")));
        }
      });
    }, { root: testiScrollRef.current, threshold: 0.6 });

    const items = document.querySelectorAll(".testi-card");
    items.forEach((item) => observer.observe(item));
    return () => {
      items.forEach((item) => observer.unobserve(item));
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="min-h-screen relative font-serif pb-[64px] md:pb-0">
      <CustomCursor />

      {/* Global Scroll Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 h-[2px] bg-[var(--color-gold)] z-[100] origin-left"
        style={{ width: progressBarWidth }}
      />

      {/* NAVBAR */}
      <motion.header 
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1, ease: EASE_SMOOTH }}
        style={{ backgroundColor: navBg, backdropFilter: navBackdrop }}
        className="fixed top-0 left-0 right-0 z-50 h-[56px] md:h-[68px]"
      >
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-[36px] md:w-[40px] h-[36px] md:h-[40px] relative mix-blend-lighten">
              <Image src="/logo (2).png" alt="Cruze Marine" fill className="object-contain" priority />
            </div>
            <div className="font-sans font-semibold text-[12px] text-[var(--color-ivory)] tracking-[0.2em] hidden sm:block">CRUZE MARINE</div>
          </div>

          <nav className="hidden md:flex gap-12 font-sans font-medium text-[11px] uppercase tracking-[0.18em]">
            {NAV.map(n => (
              <a key={n} href={`#${n.toLowerCase()}`} className="nav-group text-[var(--color-ivory)] flex">
                {n.split('').map((char, i) => (
                  <span key={i} className="nav-link-char" style={{ transitionDelay: `${i * 0.02}s` }}>
                    {char === ' ' ? '\u00A0' : char}
                  </span>
                ))}
              </a>
            ))}
          </nav>

          <div className="hidden md:block">
            <a href={WA} target="_blank" rel="noopener noreferrer" className="border border-[var(--color-gold)] text-[var(--color-gold)] px-6 py-3 font-sans font-semibold text-[13px] uppercase tracking-[0.12em] hover:bg-[var(--color-gold)] hover:text-[var(--color-ink)] transition-colors rounded-none" style={{ touchAction: "manipulation" }}>
              WhatsApp Us
            </a>
          </div>

          <button onClick={() => setMenu(true)} className="md:hidden text-[var(--color-gold)] w-[44px] h-[44px] flex items-center justify-center" style={{ touchAction: "manipulation" }}>
            <Menu size={24} strokeWidth={1.5} />
          </button>
        </div>
      </motion.header>

      {/* MOBILE FULL SCREEN MENU */}
      <AnimatePresence>
        {menu && (
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.45, ease: EASE_CINEMATIC }}
            className="fixed inset-0 z-[100] bg-[var(--color-ink)] flex flex-col"
          >
            <div className="h-[56px] px-6 flex items-center justify-between">
              <div className="w-[60px] h-[60px] relative mix-blend-lighten opacity-50">
                <Image src="/logo (2).png" alt="Cruze Marine" fill className="object-contain" />
              </div>
              <button onClick={() => setMenu(false)} className="text-[var(--color-gold)] w-[44px] h-[44px] flex items-center justify-center" style={{ touchAction: "manipulation" }}>
                <X size={28} strokeWidth={1.5} />
              </button>
            </div>
            <div className="flex-1 flex flex-col items-center justify-center gap-6 relative px-6">
              {NAV.map((n, i) => (
                <React.Fragment key={n}>
                  <motion.a 
                    href={`#${n.toLowerCase()}`} 
                    onClick={() => setMenu(false)}
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 + i * 0.08, duration: 0.5, ease: EASE_SMOOTH }}
                    className="font-display font-black italic text-[clamp(48px,12vw,64px)] text-[var(--color-ivory)] leading-none text-center"
                    style={{ touchAction: "manipulation" }}
                  >
                    {n}
                  </motion.a>
                  {i !== NAV.length - 1 && (
                    <motion.div 
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ delay: 0.4 + i * 0.08, duration: 0.5 }}
                      className="w-[1px] h-[1px] min-w-[60%] bg-[var(--color-rule)]" 
                    />
                  )}
                </React.Fragment>
              ))}
            </div>
            <div className="p-6">
              <a href={WA} target="_blank" rel="noopener noreferrer" className="block w-full text-center bg-[var(--color-gold)] text-[var(--color-ink)] font-sans font-semibold text-[14px] uppercase tracking-[0.12em] py-5 rounded-none" style={{ touchAction: "manipulation" }}>
                WHATSAPP US
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO */}
      <section id="home" className="min-h-[100svh] relative grid grid-cols-1 md:grid-cols-12 overflow-hidden pb-24 md:pb-0">
        {/* WebGL Ocean Mist — desktop only; mobile falls back to CSS vignette */}
        <div className="hidden md:block absolute inset-0 z-0">
          <SmokeBackground smokeColor="#6ab0d8" />
        </div>
        {/* Radial vignette overlay — always on, adds gold warmth + darkens edges */}
        <div className="absolute inset-0 hero-radial-vignette pointer-events-none z-[1]" />
        {/* Scan lines — always on */}
        <div className="absolute inset-0 scan-lines pointer-events-none z-[2]" />
        {/* Bottom fade — blends smoke into the next section seamlessly */}
        <div className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none z-[3]"
          style={{ background: "linear-gradient(to bottom, transparent 0%, #0a0c0f 100%)" }} />
        <div className="md:col-span-7 flex flex-col justify-center px-6 pt-8 pb-6 md:px-12 xl:px-20 md:pt-20 md:py-12 relative z-10 min-w-0">
          
          <div className="md:hidden mb-8 flex flex-col items-center justify-center relative mt-16">
            <div className="font-sans font-medium text-[9px] uppercase tracking-[0.2em] text-[var(--color-smoke)] mb-6 relative z-10">EST. TUTICORIN · TAMIL NADU</div>
            <div className="relative flex justify-center items-center w-full">
              <div className="absolute rounded-full border border-dashed border-[var(--color-gold)] opacity-25 animate-spin-slow m-auto w-[160px] h-[160px]" style={{ borderWidth: '1px' }} />
              <div className="absolute rounded-full border border-[var(--color-gold-dim)] animate-spin-slow-reverse m-auto w-[120px] h-[120px]" style={{ borderWidth: '1px' }} />
              <motion.div
                initial={reduced ? { opacity: 0 } : { scale: 0.6, opacity: 0 }}
                animate={reduced ? { opacity: 1 } : { scale: 1, opacity: 1 }}
                transition={{ duration: 1.2, ease: EASE_SNAPPY }}
                className="w-[88px] h-[88px] relative mix-blend-lighten z-10"
                style={{ filter: 'drop-shadow(0 4px 24px rgba(200,136,42,0.4))' }}
              >
                <Image src="/logo (2).png" alt="Cruze Marine Logo" fill className="object-contain" priority />
              </motion.div>
            </div>
            <div className="flex items-center justify-center gap-[2px] mt-10 opacity-60 w-full text-[var(--color-gold-dim)] text-[8px] tracking-[0.2em] select-none">
              <span className="w-1 h-1 rounded-full bg-[var(--color-gold-dim)]" />
              <span className="w-12 h-[1px] bg-[var(--color-gold-dim)]" />
              <span className="w-1 h-1 rounded-full bg-[var(--color-gold-dim)]" />
              <span className="w-16 h-[1px] bg-[var(--color-gold-dim)]" />
              <span className="w-1 h-1 rounded-full bg-[var(--color-gold-dim)]" />
            </div>
          </div>

          <div className="flex flex-col leading-[1.0] mb-8 min-w-0 relative">
            <div className="absolute left-[-16px] top-2 bottom-2 w-[2px] bg-[var(--color-gold)] hidden md:block" />
            <div className="md:hidden absolute left-[-16px] top-1 bottom-1 w-[2px] bg-[var(--color-gold)]" />
            
            <div className="flex flex-col gap-1 md:gap-2 relative">
              {/* Subtle text backdrop to ensure legibility against the smoke */}
              <div className="absolute -inset-10 bg-[radial-gradient(ellipse_at_center,rgba(10,12,15,0.6)_0%,transparent_70%)] pointer-events-none -z-10" />
              
              <motion.h1 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="font-display font-black italic text-[clamp(48px,6vw,84px)] leading-[1.05] tracking-tight text-[var(--color-ivory)]"
              >
                Your Gateway
              </motion.h1>
              <motion.h2 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7, duration: 0.8 }}
                className="font-display font-medium italic text-[clamp(40px,5vw,72px)] leading-[1.05] tracking-tight text-[var(--color-ivory)] opacity-90"
              >
                to a Maritime
              </motion.h2>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="font-display font-black italic text-[clamp(56px,7.5vw,96px)] leading-[1] tracking-tight text-[var(--color-gold-warm)]"
                style={{ textShadow: '0 4px 24px rgba(200,136,42,0.4)' }}
              >
                Career.
              </motion.div>
            </div>
          </div>

          <div className="mb-6 md:mb-10">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.8 }}
              className="italic text-[clamp(15px,2vw,17px)] text-[var(--color-ivory)] opacity-80 max-w-[280px] md:max-w-[420px] leading-[1.85] mb-4"
            >
              A trusted institution guiding seafarers
            </motion.p>
            <div className="flex flex-wrap gap-2">
              {['Crew Manning', 'Admissions', 'STCW & Passports'].map((tag, i) => (
                <motion.span 
                  key={tag}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.0 + i * 0.1, duration: 0.5 }}
                  className="inline-flex font-sans text-[10px] font-semibold uppercase text-[var(--color-gold)] border border-[var(--color-gold-dim)] px-[10px] py-[4px]"
                >
                  {tag}
                </motion.span>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mt-2">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1 }} className="w-full sm:w-auto">
              <a href="#services" className="shimmer-sweep group bg-[var(--color-gold)] text-[var(--color-ink)] font-sans font-bold text-[13px] uppercase tracking-[0.12em] w-full sm:w-auto min-h-[52px] flex items-center justify-center gap-2 px-8 transition-colors hover:bg-[var(--color-gold-light)] rounded-none" style={{ touchAction: "manipulation" }}>
                Get Started <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.25 }} className="w-full sm:w-auto">
              <a href="tel:+919003354028" className="border border-[var(--color-gold)] text-[var(--color-gold)] font-sans font-semibold text-[13px] uppercase tracking-[0.12em] w-full sm:w-auto min-h-[52px] flex items-center justify-center gap-2 px-8 transition-colors active:bg-[var(--color-gold)] active:text-[var(--color-ink)] md:hover:bg-[var(--color-surface)] rounded-none" style={{ touchAction: "manipulation" }}>
                <Phone size={16} /> Call Now
              </a>
            </motion.div>
          </div>
        </div>

        {/* Desktop Right Panel (Logo + Stats) */}
        <div className="hidden md:flex md:col-span-5 flex-col justify-center items-center relative border-l border-[var(--color-rule)] min-w-0">
          <div className="relative mb-20 w-full flex justify-center">
            <div className="absolute inset-0 rounded-full border border-dashed border-[var(--color-gold)] opacity-25 animate-spin-slow m-auto w-[240px] h-[240px]" style={{ borderWidth: '1px' }} />
            <div className="absolute inset-0 rounded-full border border-[var(--color-gold-dim)] animate-spin-slow-reverse m-auto w-[200px] h-[200px]" style={{ borderWidth: '1px' }} />
            <motion.div
              initial={reduced ? { opacity: 0 } : { scale: 0.6, opacity: 0 }}
              animate={reduced ? { opacity: 1 } : { scale: 1, opacity: 1 }}
              transition={{ duration: 1.2, ease: EASE_SNAPPY }}
              className="w-[160px] h-[160px] relative mix-blend-lighten z-10"
              style={{ filter: 'drop-shadow(0 4px 24px rgba(200,136,42,0.4))' }}
            >
              <Image src="/logo (2).png" alt="Cruze Marine Logo" fill className="object-contain" priority />
            </motion.div>
          </div>

          <div className="w-full grid grid-cols-2 gap-x-4 gap-y-8 px-6 lg:px-12">
            {STATS.map((s, i) => (
              <div key={i} className="flex flex-col min-w-0 relative">
                {i % 2 === 0 && <div className="absolute left-[-16px] top-0 bottom-0 w-[2px] bg-[var(--color-gold)] opacity-50" />}
                <div className="font-display font-black italic text-[clamp(28px,3vw,56px)] text-[var(--color-gold)] leading-none mb-2 whitespace-nowrap">
                  {s.val ? s.val : <AnimatedCounter to={s.to!} duration={1.2} delay={1.5} />}
                  {!s.val && s.suffix}
                </div>
                <div className="font-sans font-semibold text-[11px] uppercase tracking-[0.18em] text-[var(--color-parchment)] opacity-80">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Stats Strip */}
        <div className="md:hidden absolute bottom-0 left-0 right-0 border-y border-[var(--color-rule)] bg-[var(--color-surface)] w-full block z-20">
          <div className="flex overflow-x-auto hide-scrollbar snap-x snap-mandatory">
            {STATS.map((s, i) => (
              <div key={i} className="min-w-[140px] snap-start flex flex-col justify-center px-6 py-4 relative border-r border-[var(--color-rule)] last:border-r-0">
                {i === 0 && <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[var(--color-gold)]" />}
                <div className="font-display font-black italic text-[24px] text-[var(--color-gold)] leading-none mb-1">
                  {s.val ? s.val : <AnimatedCounter to={s.to!} duration={1.2} delay={1.5} />}
                  {!s.val && s.suffix}
                </div>
                <div className="font-sans font-semibold text-[10px] uppercase tracking-[0.18em] text-[var(--color-parchment)] opacity-80">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          style={{ opacity: useTransform(scrollY, [0, 100], [1, 0]) }}
          className="absolute bottom-[90px] md:bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 pointer-events-none z-10"
        >
          <span className="font-sans font-semibold text-[9px] uppercase tracking-[0.18em] text-[var(--color-parchment)] opacity-80">Scroll</span>
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.5, ease: "easeInOut", repeat: Infinity }}>
            <ChevronDown size={20} className="text-[var(--color-gold-dim)]" />
          </motion.div>
        </motion.div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-24 md:py-32 bg-[var(--color-deep)] border-t border-[var(--color-rule)]">
        <div className="px-6 md:px-12 xl:px-24 mb-16">
          <div className="font-sans font-medium text-[11px] uppercase tracking-[0.18em] text-[var(--color-smoke)] mb-4">What We Do</div>
          <motion.div 
            initial={{ scaleX: 0 }} 
            whileInView={{ scaleX: 1 }} 
            viewport={{ once: true, margin: "-80px" }} 
            transition={{ duration: 0.8, ease: EASE_CINEMATIC }}
            className="h-[1px] bg-[var(--color-rule)] w-24 origin-left mb-6" 
          />
          <motion.h2 
            initial={reduced ? { opacity: 0 } : { clipPath: "inset(0 100% 0 0)" }}
            whileInView={reduced ? { opacity: 1 } : { clipPath: "inset(0 0% 0 0)" }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: EASE_CINEMATIC }}
            className="font-display font-bold text-[clamp(40px,8vw,72px)] text-[var(--color-ivory)] leading-none"
          >
            Our Services
          </motion.h2>
        </div>

        <div className="flex flex-col">
          {SERVICES.map((s, i) => (
            <a
              key={i}
              href={`https://wa.me/${P1}?text=Hi, I need help with ${encodeURIComponent(s.wa)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group block border-b border-[var(--color-rule)] px-6 md:px-12 xl:px-24 py-5 md:py-8 transition-colors active:bg-[var(--color-surface)] hover:bg-[var(--color-surface)]"
              style={{ touchAction: "manipulation" }}
            >
              <motion.div
                initial={reduced ? { opacity: 0 } : { opacity: 0, x: -30 }}
                whileInView={reduced ? { opacity: 1 } : { opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.8, delay: i * 0.1, ease: EASE_SMOOTH }}
                className="flex flex-col md:flex-row md:items-center justify-between gap-2 md:gap-8"
              >
                <div className="flex-1 flex flex-col md:flex-row md:items-center gap-2 md:gap-8">
                  <div className="flex items-center gap-4">
                    <span className="font-display font-black italic text-[28px] text-[var(--color-gold-dim)] leading-none w-10">
                      <AnimatedCounter to={parseInt(s.n)} duration={0.4} delay={i * 0.1} />
                    </span>
                    <h3 className="font-sans font-semibold text-[16px] md:font-display md:font-bold md:text-[32px] text-[var(--color-ivory)] leading-none relative overflow-hidden">
                      {s.title}
                      <div className="hidden md:block absolute bottom-0 left-0 w-full h-[1px] bg-[var(--color-gold)] scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-250 ease-out" />
                    </h3>
                  </div>
                  <p className="font-serif text-[14px] md:text-[16px] text-[var(--color-parchment)] line-clamp-2 md:line-clamp-none max-w-xl md:ml-auto md:text-right leading-[1.85]">
                    {s.desc}
                  </p>
                </div>
                <div className="font-sans font-medium text-[11px] uppercase tracking-[0.18em] text-[var(--color-gold)] md:opacity-0 md:-translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 whitespace-nowrap mt-2 md:mt-0">
                  Enquire on WhatsApp →
                </div>
              </motion.div>
            </a>
          ))}
        </div>
      </section>

      {/* PROCESS */}
      <section id="process" className="py-24 md:py-32 bg-[var(--color-ink)] border-t border-[var(--color-rule)] relative overflow-hidden">
        <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 watermark text-[200px] leading-none whitespace-nowrap">
          HOW IT WORKS
        </div>
        
        <div className="px-6 md:px-12 xl:px-24 mb-16 relative z-10">
          <div className="font-sans font-medium text-[11px] uppercase tracking-[0.18em] text-[var(--color-smoke)] mb-4">Simple & Transparent</div>
          <motion.div 
            initial={{ scaleX: 0 }} 
            whileInView={{ scaleX: 1 }} 
            viewport={{ once: true, margin: "-80px" }} 
            transition={{ duration: 0.8, ease: EASE_CINEMATIC }}
            className="h-[1px] bg-[var(--color-rule)] w-24 origin-left mb-6" 
          />
          <motion.h2 
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: 30 }}
            whileInView={reduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: EASE_SMOOTH }}
            className="font-display font-bold text-[clamp(40px,8vw,72px)] text-[var(--color-ivory)] leading-none"
          >
            How It Works
          </motion.h2>
        </div>

        <div className="px-6 md:px-12 xl:px-24 relative z-10">
          {/* Mobile Vertical Timeline */}
          <div className="md:hidden relative">
            <motion.div
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1.4, ease: EASE_CINEMATIC }}
              className="absolute left-[3px] top-2 bottom-2 w-[2px] bg-[var(--color-gold)] origin-top"
            />
            <div className="flex flex-col gap-[40px]">
              {STEPS.map((p, i) => (
                <div key={i} className="relative pl-6">
                  <motion.div 
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ type: "spring", stiffness: 400, damping: 20, delay: 0.3 + i * 0.2 }}
                    className="absolute left-0 top-1.5 w-[8px] h-[8px] rounded-full bg-[var(--color-gold)]" 
                  />
                  <div className="absolute left-6 top-[-10px] font-display font-black italic text-[56px] text-[var(--color-gold)] opacity-15 leading-none select-none pointer-events-none">{p.n}</div>
                  <motion.div
                    initial={reduced ? { opacity: 0 } : { opacity: 0, x: 24 }}
                    whileInView={reduced ? { opacity: 1 } : { opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.6, delay: 0.3 + i * 0.2, ease: EASE_SMOOTH }}
                  >
                    <h3 className="font-display font-bold text-[28px] text-[var(--color-ivory)] leading-none mb-2 relative pt-2">{p.title}</h3>
                    <p className="font-serif text-[14px] text-[var(--color-smoke)] relative">{p.desc}</p>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>

          {/* Desktop Horizontal Timeline */}
          <div className="hidden md:flex relative pt-12">
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1.6, ease: EASE_CINEMATIC }}
              className="absolute top-[28px] left-0 right-0 h-[1px] border-t border-dashed border-[var(--color-gold-dim)] origin-left"
            />
            <div className="grid grid-cols-4 gap-8 w-full">
              {STEPS.map((p, i) => (
                <div key={i} className="relative">
                  <motion.div 
                    initial={{ scale: 1 }}
                    whileInView={{ scale: [1, 1.2, 1] }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.4, delay: 0.2 + i * 0.2 }}
                    className="w-[12px] h-[12px] rounded-full bg-[var(--color-gold)] mb-8 relative z-10 outline outline-4 outline-[var(--color-ink)]" 
                  />
                  <div className="absolute top-[-40px] left-[-10px] font-display font-black italic text-[80px] text-[var(--color-gold)] opacity-15 leading-none select-none pointer-events-none">{p.n}</div>
                  <motion.div
                    initial={reduced ? { opacity: 0 } : { opacity: 0, y: 20 }}
                    whileInView={reduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.6, delay: 0.3 + i * 0.2, ease: EASE_SMOOTH }}
                  >
                    <h3 className="font-display font-bold text-[36px] text-[var(--color-ivory)] leading-none mb-3 relative">{p.title}</h3>
                    <p className="font-serif text-[16px] text-[var(--color-parchment)] relative max-w-[90%]">{p.desc}</p>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="testimonials" className="py-24 md:py-32 border-t border-[var(--color-rule)] bg-[var(--color-deep)]">
        <div className="px-6 md:px-12 xl:px-24 mb-12 md:mb-16">
          <div className="font-sans font-medium text-[11px] uppercase tracking-[0.18em] text-[var(--color-smoke)] mb-4">Client Stories</div>
          <motion.div 
            initial={{ scaleX: 0 }} 
            whileInView={{ scaleX: 1 }} 
            viewport={{ once: true, margin: "-80px" }} 
            transition={{ duration: 0.8, ease: EASE_CINEMATIC }}
            className="h-[1px] bg-[var(--color-rule)] w-24 origin-left mb-6" 
          />
          <motion.h2 
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: 30 }}
            whileInView={reduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: EASE_SMOOTH }}
            className="font-display font-bold text-[clamp(40px,8vw,72px)] text-[var(--color-ivory)] leading-none"
          >
            What They Say
          </motion.h2>
        </div>

        <div className="px-6 md:px-12 xl:px-24">
          <div ref={testiScrollRef} className="flex md:grid md:grid-cols-3 gap-6 overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-8 md:pb-0">
            {TESTI.map((t, i) => (
              <motion.div
                key={i}
                data-index={i}
                style={{
                  rotateY: isDesktop ? (i === 0 ? -3 : i === 2 ? 3 : 0) : 0,
                  transformStyle: "preserve-3d",
                  perspective: 1000
                }}
                className="testi-card min-w-[88vw] md:min-w-0 snap-start bg-[var(--color-surface)] border border-[var(--color-rule)] p-[28px] md:p-10 relative flex flex-col"
              >
                <motion.div 
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true, margin: "-80px" }}
                  className="font-display font-black text-[80px] text-[var(--color-gold)] opacity-15 leading-none absolute top-4 left-4 select-none"
                >
                  "
                </motion.div>
                <p className="font-serif italic text-[16px] text-[var(--color-ivory)] leading-[1.7] mb-8 relative z-10 flex-1 mt-6">
                  {t.text}
                </p>
                <div className="mt-auto">
                  <div className="font-sans font-semibold text-[11px] uppercase tracking-[0.18em] text-[var(--color-parchment)] mb-1">{t.name}</div>
                  <div className="font-sans font-normal text-[10px] text-[var(--color-smoke)]">{t.role}</div>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Mobile Dots */}
          <div className="md:hidden flex justify-center gap-3 mt-4">
            {TESTI.map((_, i) => (
              <div key={i} className={`w-2 h-2 rounded-full transition-colors ${activeTesti === i ? "bg-[var(--color-gold)]" : "bg-[var(--color-smoke)]"}`} />
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-24 md:py-32 border-t border-[var(--color-rule)] bg-[var(--color-surface)]">
        <div className="px-6 md:px-12 xl:px-24 grid md:grid-cols-2 gap-16">
          <div className="flex flex-col justify-center">
            <div className="font-sans font-medium text-[11px] uppercase tracking-[0.18em] text-[var(--color-smoke)] mb-4">Get In Touch</div>
            <motion.div 
              initial={{ scaleX: 0 }} 
              whileInView={{ scaleX: 1 }} 
              viewport={{ once: true, margin: "-80px" }} 
              transition={{ duration: 0.8, ease: EASE_CINEMATIC }}
              className="h-[1px] bg-[var(--color-rule)] w-24 origin-left mb-6" 
            />
            <motion.h2 
              initial={reduced ? { opacity: 0 } : { opacity: 0, y: 30 }}
              whileInView={reduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease: EASE_SMOOTH }}
              className="font-display font-black italic text-[clamp(48px,12vw,72px)] text-[var(--color-ivory)] leading-none mb-10"
            >
              Talk To Us
            </motion.h2>
            
            <div className="space-y-2">
              {[
                { icon: Phone, label: "Primary", val: "+91 90033 54028", href: "tel:+919003354028" },
                { icon: Phone, label: "Alternate", val: "+91 90256 04842", href: "tel:+919025604842" },
                { icon: Mail, label: "Email", val: "cruze1612@gmail.com", href: "mailto:cruze1612@gmail.com" }
              ].map((c, i) => (
                <a key={c.label} href={c.href} className="flex items-center gap-4 h-[48px] group" style={{ touchAction: "manipulation" }}>
                  <motion.div 
                    initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ type: "spring", delay: i * 0.08 }}
                    className="w-[28px] h-[28px] rounded-full border border-[var(--color-gold)] text-[var(--color-gold)] flex items-center justify-center shrink-0 group-active:bg-[var(--color-gold)] group-active:text-[var(--color-ink)] transition-colors"
                  >
                    <c.icon size={12} />
                  </motion.div>
                  <motion.div initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 + i * 0.08, duration: 0.4 }}>
                    <span className="font-sans text-[11px] uppercase tracking-[0.18em] text-[var(--color-smoke)] mr-4">{c.label}</span>
                    <span className="font-serif text-[16px] text-[var(--color-ivory)] group-active:text-[var(--color-gold)] transition-colors">{c.val}</span>
                  </motion.div>
                </a>
              ))}
              <div className="flex items-center gap-4 h-[48px]">
                <motion.div 
                  initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ type: "spring", delay: 0.24 }}
                  className="w-[28px] h-[28px] rounded-full border border-[var(--color-gold)] text-[var(--color-gold)] flex items-center justify-center shrink-0"
                >
                  <MapPin size={12} />
                </motion.div>
                <motion.div initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.44, duration: 0.4 }}>
                  <span className="font-sans text-[11px] uppercase tracking-[0.18em] text-[var(--color-smoke)] mr-4">Address</span>
                  <span className="font-serif text-[16px] text-[var(--color-ivory)]">146/3, Cruzpuram, Tuticorin – 628 001</span>
                </motion.div>
              </div>
            </div>
          </div>

          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="bg-[var(--color-ink)] border border-[var(--color-rule)] p-6 md:p-10 relative">
            <form onSubmit={e => {
              e.preventDefault();
              const fd = new FormData(e.currentTarget);
              const text = `Hi Cruze Marine!%0A%0A*Name:* ${fd.get("name")}%0A*Mobile:* ${fd.get("mobile")}%0A*Service:* ${fd.get("service")}%0A*Message:* ${fd.get("msg")}`;
              window.open(`https://wa.me/${P1}?text=${text}`, "_blank");
            }} className="flex flex-col gap-4">
              <input name="name" type="text" placeholder="Full Name" required className="w-full h-[52px] bg-[var(--color-ink)] border border-[var(--color-rule)] px-4 font-serif text-[16px] text-[var(--color-ivory)] outline-none focus:border-[var(--color-gold)] transition-colors duration-200 rounded-none" />
              <input name="mobile" type="tel" placeholder="Mobile Number" required className="w-full h-[52px] bg-[var(--color-ink)] border border-[var(--color-rule)] px-4 font-serif text-[16px] text-[var(--color-ivory)] outline-none focus:border-[var(--color-gold)] transition-colors duration-200 rounded-none" />
              <select name="service" className="w-full h-[52px] bg-[var(--color-ink)] border border-[var(--color-rule)] px-4 font-serif text-[16px] text-[var(--color-ivory)] outline-none focus:border-[var(--color-gold)] transition-colors duration-200 rounded-none cursor-pointer">
                {SERVICES.map(s => <option key={s.title}>{s.title}</option>)}
                <option>Other / General Enquiry</option>
              </select>
              <textarea name="msg" placeholder="How can we help?" rows={3} className="w-full h-[100px] bg-[var(--color-ink)] border border-[var(--color-rule)] p-4 font-serif text-[16px] text-[var(--color-ivory)] outline-none focus:border-[var(--color-gold)] transition-colors duration-200 rounded-none resize-none" />
              <button type="submit" className="group relative w-full h-[56px] bg-[var(--color-gold)] text-[var(--color-ink)] font-sans font-semibold text-[14px] uppercase tracking-[0.12em] mt-2 overflow-hidden" style={{ touchAction: "manipulation" }}>
                <div className="absolute inset-0 bg-[var(--color-gold-light)] scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300 ease-out" />
                <span className="relative z-10">SEND VIA WHATSAPP</span>
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="pt-16 px-6 md:px-12 xl:px-24 border-t border-[var(--color-rule)] relative overflow-hidden bg-[var(--color-ink)] flex flex-col">
        <motion.div 
          animate={{ y: [-20, 0, -20] }} 
          transition={{ duration: 12, ease: "easeInOut", repeat: Infinity }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 watermark text-[30vw] leading-none whitespace-nowrap opacity-5"
        >
          CRUZE MARINE
        </motion.div>
        
        <div className="grid md:grid-cols-4 gap-12 relative z-10 mb-[80px] md:mb-[60px]">
          <div className="flex flex-col">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-[36px] h-[36px] relative mix-blend-lighten"><Image src="/logo (2).png" alt="Cruze Marine" fill className="object-contain" /></div>
              <div className="font-sans font-semibold text-[12px] tracking-[0.2em] text-[var(--color-ivory)]">CRUZE MARINE</div>
            </div>
            <p className="font-serif text-[15px] text-[var(--color-parchment)] leading-[1.85] max-w-[250px]">
              Authoritative maritime consultancy based in Tuticorin, Tamil Nadu.
            </p>
          </div>
          <div className="flex flex-col">
            <div className="font-sans font-medium text-[10px] uppercase tracking-[0.18em] text-[var(--color-smoke)] mb-3">Services</div>
            {SERVICES.map(s => <a key={s.title} href="#services" className="group font-serif text-[15px] text-[var(--color-smoke)] leading-[2.4] hover:text-[var(--color-gold)] transition-colors flex items-center relative"><span className="w-[4px] h-[4px] rounded-full bg-[var(--color-gold)] absolute -left-3 opacity-0 group-hover:opacity-100 transition-opacity" />{s.title}</a>)}
          </div>
          <div className="flex flex-col">
            <div className="font-sans font-medium text-[10px] uppercase tracking-[0.18em] text-[var(--color-smoke)] mb-3">Navigate</div>
            {NAV.map(n => <a key={n} href={`#${n.toLowerCase()}`} className="group font-serif text-[15px] text-[var(--color-smoke)] leading-[2.4] hover:text-[var(--color-gold)] transition-colors flex items-center relative"><span className="w-[4px] h-[4px] rounded-full bg-[var(--color-gold)] absolute -left-3 opacity-0 group-hover:opacity-100 transition-opacity" />{n}</a>)}
          </div>
          <div className="flex flex-col">
            <div className="font-sans font-medium text-[10px] uppercase tracking-[0.18em] text-[var(--color-smoke)] mb-3">Contact</div>
            <a href="tel:+919003354028" className="font-serif text-[15px] text-[var(--color-smoke)] leading-[2.4]">+91 90033 54028</a>
            <a href="tel:+919025604842" className="font-serif text-[15px] text-[var(--color-smoke)] leading-[2.4]">+91 90256 04842</a>
            <a href="mailto:cruze1612@gmail.com" className="font-serif text-[15px] text-[var(--color-smoke)] leading-[2.4]">cruze1612@gmail.com</a>
          </div>
        </div>
        
        <div className="font-sans font-medium text-[10px] text-[var(--color-smoke)] text-center pb-6 relative z-10 uppercase tracking-[0.18em] md:pb-[64px]">
          © {new Date().getFullYear()} CRUZE MARINE SERVICE. ALL RIGHTS RESERVED.
        </div>
      </footer>

      {/* MOBILE STICKY BAR */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 h-[64px] z-[60] bg-[var(--color-raised)] border-t border-[var(--color-rule)] flex">
        <a href="tel:+919003354028" className="flex-1 flex items-center justify-center gap-2 border-r border-[var(--color-rule)] text-[var(--color-ivory)] font-sans font-semibold text-[12px] uppercase tracking-[0.1em] active:bg-[var(--color-surface)]" style={{ touchAction: "manipulation" }}>
          <Phone size={16} /> CALL
        </a>
        <a href={WA} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 bg-[var(--color-gold)] text-[var(--color-ink)] font-sans font-semibold text-[12px] uppercase tracking-[0.1em] active:bg-[var(--color-gold-light)]" style={{ touchAction: "manipulation" }}>
          <MessageCircle size={16} /> WHATSAPP
        </a>
      </div>

      <Chatbot />
    </div>
  );
}
