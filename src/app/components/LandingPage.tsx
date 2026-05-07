"use client";
import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Phone, ArrowRight, CheckCircle, Anchor, FileText, GraduationCap, Globe, Star, Clock, Mail, MapPin, Menu, X, MessageCircle } from "lucide-react";
import Image from "next/image";
import Chatbot from "./Chatbot";

const NAV = ["Home","Services","Process","Testimonials","Contact"];
const PHONE1 = "+919003354028";
const PHONE2 = "+919025604842";
const WA = `https://wa.me/${PHONE1}`;
const EMAIL = "cruze1612@gmail.com";

const SERVICES = [
  { title:"Crew Manning", desc:"We place qualified seafarers with reputed global shipping companies — full documentation support included.", icon:Anchor, wa:"Crew Manning" },
  { title:"Marine College Admission", desc:"Expert guidance and processing for admissions to top maritime institutions across India.", icon:GraduationCap, wa:"Marine College Admission" },
  { title:"Courses Booking", desc:"End-to-end booking for STCW, watchkeeping, and certification courses. We handle it all.", icon:FileText, wa:"Courses Booking" },
  { title:"Passport Online", desc:"Fast-track passport application and renewal service specifically designed for seafarers.", icon:Globe, wa:"Passport Online" },
];

const STEPS = [
  { n:"01", title:"Reach Out", desc:"Call or WhatsApp us with your requirement — any time.", icon:Phone },
  { n:"02", title:"Share Documents", desc:"Send soft copies via WhatsApp or email. We verify everything.", icon:FileText },
  { n:"03", title:"We Process", desc:"Cruze submits and handles the entire application for you.", icon:Clock },
  { n:"04", title:"Done!", desc:"Receive confirmation within 48 hours. Hassle-free.", icon:CheckCircle },
];

const TESTIMONIALS = [
  { name:"Karthik R.", role:"AB Seaman", text:"Got my crew manning done in 2 days. Cruze knows every process inside out!" },
  { name:"Priya's Father", role:"Parent of Cadet", text:"They guided my son's marine college admission smoothly. Very reassuring team." },
  { name:"Senthil M.", role:"Engine Cadet", text:"STCW booking was handled end-to-end. WhatsApp them — they respond instantly." },
];

export default function LandingPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start","end start"] });
  const heroY = useTransform(scrollYProgress, [0,1], [0,-80]);
  const heroOpacity = useTransform(scrollYProgress, [0,0.6], [1,0]);

  return (
    <div className="min-h-screen text-foreground overflow-x-hidden">
      {/* Animated BG */}
      <div className="fixed inset-0 -z-20 bg-[linear-gradient(-45deg,#060e1a,#0a1628,#0c2340,#060e1a)] bg-[length:400%_400%] animate-ocean-drift" />
      <div className="fixed inset-0 -z-10 opacity-30 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(0,212,255,0.08),transparent)]" />

      {/* NAV */}
      <motion.header
        initial={{ y:-80, opacity:0 }}
        animate={{ y:0, opacity:1 }}
        transition={{ duration:0.7, ease:"easeOut" }}
        className="sticky top-0 z-50 glass border-b border-cyan/10"
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 relative">
              <Image src="/logo.png" alt="Cruze Marine" fill className="object-contain" />
            </div>
            <div>
              <div className="font-bold text-white text-sm tracking-wide">CRUZE MARINE</div>
              <div className="text-[10px] text-cyan/70 tracking-widest uppercase">Service · Tuticorin</div>
            </div>
          </div>

          <nav className="hidden md:flex gap-8 text-sm font-medium text-slate-300">
            {NAV.map(item => (
              <a key={item} href={`#${item.toLowerCase()}`}
                className="relative hover:text-cyan transition-colors group">
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-cyan transition-all group-hover:w-full" />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <motion.a href={WA} target="_blank" rel="noopener noreferrer"
              whileHover={{ scale:1.05 }} whileTap={{ scale:0.95 }}
              className="hidden md:flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-cyan to-teal text-bg-deep font-bold text-sm shadow-lg shadow-cyan/20">
              <Phone size={15} /> WhatsApp Us
            </motion.a>
            <button className="md:hidden text-white p-2" onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div initial={{ height:0, opacity:0 }} animate={{ height:"auto", opacity:1 }}
              exit={{ height:0, opacity:0 }} className="md:hidden glass border-t border-cyan/10 overflow-hidden">
              <div className="px-6 py-4 flex flex-col gap-4">
                {NAV.map(item => (
                  <a key={item} href={`#${item.toLowerCase()}`}
                    onClick={() => setMenuOpen(false)}
                    className="text-slate-300 hover:text-cyan transition-colors font-medium">{item}</a>
                ))}
                <a href={WA} target="_blank" rel="noopener noreferrer"
                  className="px-5 py-3 rounded-full bg-gradient-to-r from-cyan to-teal text-bg-deep font-bold text-sm text-center">
                  WhatsApp Us
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* HERO */}
      <section id="home" ref={heroRef} className="relative min-h-[92vh] flex items-center px-6 pt-20 pb-16">
        {/* Decorative rings */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-cyan/5 -z-10" />
        <div className="absolute right-16 top-1/2 -translate-y-1/2 w-[450px] h-[450px] rounded-full border border-cyan/5 -z-10" />
        <div className="absolute right-32 top-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full border border-gold/10 animate-spin-slow -z-10" />

        <motion.div style={{ y:heroY, opacity:heroOpacity }}
          className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <motion.div initial={{ opacity:0, x:-20 }} animate={{ opacity:1, x:0 }} transition={{ delay:0.2 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan/20 bg-cyan/5 text-cyan text-xs font-semibold mb-6 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-cyan animate-pulse" />
              Your Gateway to a Maritime Career
            </motion.div>

            <motion.h1 initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.8, delay:0.3 }}
              className="text-5xl md:text-7xl font-bold leading-tight mb-6">
              <span className="shimmer-text">Cruze</span>{" "}
              <span className="text-white">Marine</span>
              <br />
              <span className="text-gold gold-glow">Service</span>
            </motion.h1>

            <motion.p initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.8, delay:0.5 }}
              className="text-slate-400 text-lg leading-relaxed mb-10 max-w-lg">
              Crew Manning · College Admissions · STCW Bookings · Passport Services.
              Based in <span className="text-cyan">Tuticorin</span>, serving seafarers across India.
            </motion.p>

            <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.8, delay:0.7 }}
              className="flex flex-wrap gap-4">
              <a href="#services"
                className="px-8 py-4 rounded-full bg-gradient-to-r from-cyan to-teal text-bg-deep font-bold text-base shadow-lg shadow-cyan/25 flex items-center gap-2 hover:shadow-cyan/40 transition-shadow">
                Our Services <ArrowRight size={18} />
              </a>
              <a href={WA} target="_blank" rel="noopener noreferrer"
                className="px-8 py-4 rounded-full border border-white/15 text-white font-bold text-base hover:bg-white/5 transition-colors backdrop-blur-sm flex items-center gap-2">
                <Phone size={18} /> WhatsApp Now
              </a>
            </motion.div>
          </div>

          {/* Stats card */}
          <motion.div initial={{ opacity:0, scale:0.85, rotate:-3 }} animate={{ opacity:1, scale:1, rotate:0 }}
            transition={{ duration:1, delay:0.5 }}
            className="glass rounded-3xl p-8 card-border-glow animate-pulse-glow">
            <div className="flex justify-between items-center mb-8">
              <h3 className="uppercase tracking-widest text-xs font-bold text-slate-400">At a Glance</h3>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs text-slate-500">Live</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label:"Seafarers Placed",  value:"500+",   color:"text-cyan" },
                { label:"Processing Time",   value:"48 hrs", color:"text-emerald-400" },
                { label:"Colleges Covered",  value:"20+",    color:"text-gold" },
                { label:"Happy Clients",     value:"98%",    color:"text-violet-400" },
              ].map((s,i) => (
                <motion.div key={i} whileHover={{ scale:1.03 }}
                  className="bg-bg-deep/60 p-5 rounded-2xl border border-white/5 hover:border-cyan/20 transition-colors">
                  <div className="text-slate-500 text-xs mb-1">{s.label}</div>
                  <div className={`text-2xl font-bold ${s.color}`}>{s.value}</div>
                </motion.div>
              ))}
            </div>
            <div className="mt-6 p-4 rounded-2xl bg-gold/10 border border-gold/20">
              <div className="text-gold text-xs font-semibold mb-1">📍 Located in Tuticorin</div>
              <div className="text-slate-400 text-xs">146/3, Cruzpuram, Tuticorin – 628 001</div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-28 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
            className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan/20 bg-cyan/5 text-cyan text-xs font-semibold mb-5">
              What We Do
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Our <span className="text-cyan cyan-glow">Services</span>
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto">Four core services. One trusted team. Your career, our mission.</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES.map((s, i) => (
              <motion.div key={i}
                initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }}
                viewport={{ once:true }} transition={{ delay:i*0.1 }}
                whileHover={{ y:-8, scale:1.02 }}
                className="group glass glass-hover rounded-3xl p-7 relative overflow-hidden transition-all duration-300 cursor-default">
                <div className="absolute top-0 right-0 w-40 h-40 bg-cyan/5 rounded-full blur-3xl group-hover:bg-cyan/10 transition-colors" />
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan to-teal flex items-center justify-center text-bg-deep mb-6 shadow-lg shadow-cyan/20 group-hover:scale-110 transition-transform duration-300">
                  <s.icon size={26} />
                </div>
                <h3 className="text-lg font-bold mb-3 group-hover:text-cyan transition-colors">{s.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">{s.desc}</p>
                <a href={`https://wa.me/${PHONE1}?text=Hi, I need help with ${encodeURIComponent(s.wa)}`}
                  target="_blank" rel="noopener noreferrer"
                  className="flex items-center text-cyan text-sm font-semibold opacity-0 group-hover:opacity-100 translate-x-[-8px] group-hover:translate-x-0 transition-all duration-300">
                  WhatsApp for Details <ArrowRight size={15} className="ml-1.5" />
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section id="process" className="py-24 px-6 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
            className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold/20 bg-gold/5 text-gold text-xs font-semibold mb-5">
              Simple &amp; Transparent
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              How It <span className="text-gold gold-glow">Works</span>
            </h2>
            <p className="text-slate-400 max-w-md mx-auto">Most applications submitted within 48 hours.</p>
          </motion.div>

          <div className="relative grid md:grid-cols-4 gap-8">
            {/* connector */}
            <div className="hidden md:block absolute top-10 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-cyan/30 to-transparent" />

            {STEPS.map((p, i) => (
              <motion.div key={i}
                initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }}
                viewport={{ once:true }} transition={{ delay:i*0.15 }}
                className="relative text-center group">
                <div className="w-20 h-20 mx-auto rounded-full bg-bg-card border-2 border-bg-deep flex items-center justify-center mb-6 relative z-10 group-hover:border-cyan/40 transition-colors">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-cyan to-teal flex items-center justify-center text-bg-deep shadow-lg shadow-cyan/20 group-hover:scale-110 transition-transform">
                    <p.icon size={22} />
                  </div>
                </div>
                <div className="text-4xl font-bold text-cyan/10 mb-2 group-hover:text-cyan/20 transition-colors">{p.n}</div>
                <h3 className="text-lg font-bold mb-2 group-hover:text-cyan transition-colors">{p.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="testimonials" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
            className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Client <span className="text-cyan cyan-glow">Stories</span>
            </h2>
            <p className="text-slate-400">What our seafarers &amp; families say.</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t, i) => (
              <motion.div key={i}
                initial={{ opacity:0, scale:0.92 }} whileInView={{ opacity:1, scale:1 }}
                viewport={{ once:true }} transition={{ delay:i*0.1 }}
                whileHover={{ y:-6 }}
                className="glass rounded-2xl p-8 border border-white/5 hover:border-cyan/15 transition-all">
                <div className="flex gap-1 mb-5">
                  {[...Array(5)].map((_,j) => <Star key={j} size={14} className="text-gold fill-gold" />)}
                </div>
                <p className="text-slate-300 italic leading-relaxed mb-6">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan/30 to-teal/30 border border-cyan/20 flex items-center justify-center text-cyan font-bold text-sm">
                    {t.name[0]}
                  </div>
                  <div>
                    <div className="font-bold text-sm text-white">{t.name}</div>
                    <div className="text-xs text-slate-500">{t.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-24 px-6 bg-black/20">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-14 items-start">
          <motion.div initial={{ opacity:0, x:-20 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold/20 bg-gold/5 text-gold text-xs font-semibold mb-6">
              Get In Touch
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Contact <span className="text-cyan cyan-glow">Us</span>
            </h2>
            <p className="text-slate-400 text-lg leading-relaxed mb-10">
              WhatsApp us your requirement and we'll reply with a checklist. No fees disclosed until we understand your case.
            </p>
            <div className="space-y-5">
              {[
                { icon:Phone, label:"Primary", val:"+91 90033 54028", href:`tel:${PHONE1}` },
                { icon:Phone, label:"Alternate", val:"+91 90256 04842", href:`tel:${PHONE2}` },
                { icon:Mail,  label:"Email",    val:EMAIL,             href:`mailto:${EMAIL}` },
                { icon:MapPin,label:"Address",  val:"146/3, Cruzpuram, Tuticorin – 628 001", href:"#" },
              ].map((c,i) => (
                <a key={i} href={c.href}
                  className="flex items-center gap-4 group">
                  <div className="w-11 h-11 rounded-full bg-cyan/10 border border-cyan/20 flex items-center justify-center text-cyan group-hover:bg-cyan/20 transition-colors shrink-0">
                    <c.icon size={18} />
                  </div>
                  <div>
                    <div className="text-slate-500 text-xs">{c.label}</div>
                    <div className="text-white font-medium text-sm group-hover:text-cyan transition-colors">{c.val}</div>
                  </div>
                </a>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity:0, x:20 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }}
            className="glass rounded-3xl p-8 card-border-glow">
            <h3 className="text-xl font-bold mb-2">Send us a Message</h3>
            <p className="text-slate-400 text-sm mb-6">We'll redirect you to WhatsApp to connect directly.</p>
            <form onSubmit={(e) => {
              e.preventDefault();
              const fd = new FormData(e.currentTarget);
              const name = fd.get("name"); const mobile = fd.get("mobile");
              const service = fd.get("service"); const msg = fd.get("msg");
              const text = `Hi Cruze Marine!%0A%0A*Name:* ${name}%0A*Mobile:* ${mobile}%0A*Service:* ${service}%0A*Message:* ${msg}`;
              window.open(`https://wa.me/${PHONE1}?text=${text}`, "_blank");
            }} className="space-y-4">
              {[
                { name:"name",   type:"text", placeholder:"Your Full Name" },
                { name:"mobile", type:"tel",  placeholder:"Mobile Number" },
              ].map(f => (
                <input key={f.name} name={f.name} type={f.type} placeholder={f.placeholder} required
                  className="w-full bg-bg-deep border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan/50 transition-colors text-sm" />
              ))}
              <select name="service"
                className="w-full bg-bg-deep border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan/50 transition-colors text-sm appearance-none">
                {["Crew Manning","Marine College Admission","Courses Booking","Passport Online","Other"].map(o => (
                  <option key={o}>{o}</option>
                ))}
              </select>
              <textarea name="msg" rows={3} placeholder="Your message or question..."
                className="w-full bg-bg-deep border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan/50 transition-colors text-sm resize-none" />
              <motion.button type="submit" whileHover={{ scale:1.02 }} whileTap={{ scale:0.98 }}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan to-teal text-bg-deep font-bold shadow-lg shadow-cyan/20 hover:shadow-cyan/35 transition-shadow">
                Send via WhatsApp
              </motion.button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/5 bg-bg-deep py-12 px-6 text-center relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-px bg-gradient-to-r from-transparent via-cyan/40 to-transparent" />
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8 mb-10 text-left text-sm">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-10 h-10 relative"><Image src="/logo.png" alt="Cruze Marine" fill className="object-contain" /></div>
              <span className="font-bold text-white">Cruze Marine</span>
            </div>
            <p className="text-slate-500 text-xs leading-relaxed">Your Gateway to a Maritime Career. Based in Tuticorin, Tamil Nadu.</p>
          </div>
          <div>
            <h4 className="font-bold mb-3 text-white">Services</h4>
            <ul className="space-y-2 text-slate-500">
              {["Crew Manning","College Admission","Courses Booking","Passport Online"].map(s => (
                <li key={s}><a href="#services" className="hover:text-cyan transition-colors">{s}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-3 text-white">Company</h4>
            <ul className="space-y-2 text-slate-500">
              {["About Us","How It Works","Testimonials","Contact"].map(s => (
                <li key={s}><a href={`#${s.toLowerCase().replace(/ /g,"-")}`} className="hover:text-cyan transition-colors">{s}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-3 text-white">Contact</h4>
            <ul className="space-y-2 text-slate-500 text-xs">
              <li className="flex items-center gap-2"><Phone size={12} /> +91 90033 54028</li>
              <li className="flex items-center gap-2"><Phone size={12} /> +91 90256 04842</li>
              <li className="flex items-center gap-2"><Mail size={12} /> cruze1612@gmail.com</li>
              <li className="flex items-center gap-2"><MapPin size={12} /> Tuticorin – 628 001</li>
            </ul>
          </div>
        </div>
        <p className="text-slate-600 text-xs">© {new Date().getFullYear()} Cruze Marine Service. All rights reserved.</p>
      </footer>

      {/* STICKY MOBILE BAR */}
      <div className="fixed bottom-0 left-0 w-full glass border-t border-cyan/10 p-4 flex gap-3 md:hidden z-40">
        <a href={`tel:${PHONE1}`}
          className="flex-1 bg-bg-card border border-white/10 text-white font-bold py-3 rounded-full flex items-center justify-center gap-2 text-sm">
          <Phone size={16} /> Call
        </a>
        <a href={WA} target="_blank" rel="noopener noreferrer"
          className="flex-1 bg-gradient-to-r from-cyan to-teal text-bg-deep font-bold py-3 rounded-full flex items-center justify-center gap-2 text-sm shadow-lg shadow-cyan/20">
          <MessageCircle size={16} /> WhatsApp
        </a>
      </div>

      <Chatbot />
    </div>
  );
}
