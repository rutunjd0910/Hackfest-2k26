import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Leaf, Shield, BarChart3, Globe, ArrowRight, Zap, Target } from "lucide-react";

function AnimatedCounter({ value, duration = 2000, suffix = "" }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = parseInt(value.replace(/[^0-9]/g, ""));
    if (isNaN(end)) return;

    const totalMiliseconds = duration;
    const incrementTime = Math.max(10, (totalMiliseconds / end) * 5);

    const timer = setInterval(() => {
      start += Math.ceil(end / 100); 
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 30);

    return () => clearInterval(timer);
  }, [value, duration]);

  return <span>{count.toLocaleString()}{suffix}</span>;
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-brand-cream font-sans selection:bg-brand-terracotta/30 relative overflow-hidden">
      {/* Decorative Background Blobs */}
      <div className="absolute top-0 -right-24 w-[600px] h-[600px] decorative-blob opacity-40 -z-10"></div>
      <div className="absolute bottom-1/4 -left-32 w-96 h-96 decorative-blob opacity-20 -z-10 bg-brand-teal/10"></div>
      <div className="absolute -bottom-48 right-1/3 w-[800px] h-[800px] decorative-blob opacity-30 -z-10 bg-brand-mint/5"></div>

      {/* Navigation */}
      <nav className="flex items-center justify-between px-10 py-8 max-w-7xl mx-auto z-20 relative">
        <div className="flex items-center space-x-2 group cursor-pointer">
          <Leaf className="w-8 h-8 text-brand-terracotta transition-transform group-hover:rotate-12" />
          <span className="text-3xl font-black text-brand-black tracking-tighter font-serif italic">Envify</span>
        </div>
        <div className="hidden md:flex space-x-10 text-xs font-black uppercase tracking-[0.3em] text-gray-500">
          <a href="#how-it-works" className="hover:text-brand-terracotta transition">How it works</a>
          <a href="#trust" className="hover:text-brand-terracotta transition">Verification</a>
          <a href="#projects" className="hover:text-brand-terracotta transition">Marketplace</a>
        </div>
        <Link to="/auth" className="px-8 py-3 bg-brand-black text-white rounded-full font-black text-xs uppercase tracking-widest hover:bg-brand-terracotta hover:scale-105 transition shadow-2xl shadow-black/20">
          Access Platform
        </Link>
      </nav>

      {/* Hero Section */}
      <section className="px-8 py-24 max-w-7xl mx-auto text-center relative z-10">
        <div className="inline-flex items-center space-x-2 bg-brand-terracotta/10 px-6 py-2.5 rounded-full mb-10 border border-brand-terracotta/20 animate-in fade-in slide-in-from-top-4 duration-1000">
          <Shield className="w-4 h-4 text-brand-terracotta" />
          <span className="text-[10px] font-black text-brand-terracotta uppercase tracking-[0.2em]">Dual-Verified Carbon Accountability</span>
        </div>
        
        <h1 className="text-7xl md:text-9xl font-black text-brand-black mb-8 tracking-tighter leading-[0.9] font-serif animate-in fade-in slide-in-from-bottom-10 duration-1000">
          Your Impact, <br />
          <span className="text-brand-terracotta italic">Scientifically Proven.</span>
        </h1>
        
        <p className="text-xl text-gray-600 mb-14 max-w-3xl mx-auto leading-relaxed font-medium animate-in fade-in duration-1000 delay-300">
          Move beyond estimation. Envify bridges the gap between local climate initiatives and satellite precision, creating a marketplace built on absolute trust.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 animate-in fade-in duration-1000 delay-500">
          <Link to="/auth?role=individual" className="group w-full sm:w-auto px-12 py-6 bg-brand-terracotta text-white rounded-2xl font-black text-lg hover:bg-brand-teal transition shadow-2xl shadow-brand-terracotta/20 flex items-center justify-center">
            Individual Tracking <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition" />
          </Link>
          <Link to="/auth?role=business" className="w-full sm:w-auto px-12 py-6 bg-brand-black text-white rounded-2xl font-black text-lg hover:bg-brand-teal transition shadow-2xl shadow-black/20 flex items-center justify-center">
            Enterprise Solutions
          </Link>
        </div>

        {/* Stats Strip */}
        <div className="mt-32 grid grid-cols-2 md:grid-cols-4 gap-12 border-t border-gray-200 pt-16 animate-in fade-in duration-1000 delay-700">
          <div className="text-center group">
             <p className="text-5xl font-black text-brand-black mb-2 leading-none font-serif italic group-hover:text-brand-terracotta transition">
               <AnimatedCounter value="812" suffix=" kg" />
             </p>
             <p className="text-[10px] uppercase font-black text-gray-400 tracking-[0.2em]">Avg. Indiv. Offset</p>
          </div>
          <div className="text-center group">
             <p className="text-5xl font-black text-brand-teal mb-2 leading-none font-serif italic group-hover:text-brand-terracotta transition">
               <AnimatedCounter value="1200" suffix="+" />
             </p>
             <p className="text-[10px] uppercase font-black text-gray-400 tracking-[0.2em]">Verified Assets</p>
          </div>
          <div className="text-center group">
             <p className="text-5xl font-black text-brand-terracotta mb-2 leading-none font-serif italic group-hover:text-brand-teal transition">
               $<AnimatedCounter value="15" suffix="M" />
             </p>
             <p className="text-[10px] uppercase font-black text-gray-400 tracking-[0.2em]">Capital Deployed</p>
          </div>
          <div className="text-center group">
             <p className="text-5xl font-black text-brand-gold mb-2 leading-none font-serif italic group-hover:text-brand-terracotta transition">
               <AnimatedCounter value="25" suffix="%" />
             </p>
             <p className="text-[10px] uppercase font-black text-gray-400 tracking-[0.2em]">Avg. Efficiency</p>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section id="trust" className="py-32 bg-white/40 backdrop-blur-md relative z-10">
        <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-3 gap-16">
          <div className="group bg-white p-12 rounded-[2.5rem] shadow-xl shadow-brand-terracotta/5 border border-white hover:shadow-2xl hover:-translate-y-4 transition duration-700">
            <div className="w-20 h-20 bg-brand-terracotta/5 rounded-3xl flex items-center justify-center mb-8 group-hover:scale-110 transition">
              <Zap className="w-10 h-10 text-brand-terracotta" />
            </div>
            <h3 className="text-3xl font-black mb-6 font-serif">Deep Ingestion</h3>
            <p className="text-gray-500 leading-relaxed font-medium">Native IoT integration for industrial pipelines and residential smart grids. Every watt is accounted for.</p>
          </div>
          
          <div className="group bg-white p-12 rounded-[2.5rem] shadow-xl shadow-brand-teal/5 border border-white hover:shadow-2xl hover:-translate-y-4 transition duration-700">
            <div className="w-20 h-20 bg-brand-teal/5 rounded-3xl flex items-center justify-center mb-8 group-hover:scale-110 transition">
              <Globe className="w-10 h-10 text-brand-teal" />
            </div>
            <h3 className="text-3xl font-black mb-6 font-serif">Orbital Audit</h3>
            <p className="text-gray-500 leading-relaxed font-medium">Spectral analysis via Sentinel-2 clusters to verify carbon capture biomass and solar yield benchmarks.</p>
          </div>

          <div className="group bg-white p-12 rounded-[2.5rem] shadow-xl shadow-brand-gold/5 border border-white hover:shadow-2xl hover:-translate-y-4 transition duration-700">
            <div className="w-20 h-20 bg-brand-gold/5 rounded-3xl flex items-center justify-center mb-8 group-hover:scale-110 transition">
              <Target className="w-10 h-10 text-brand-gold" />
            </div>
            <h3 className="text-3xl font-black mb-6 font-serif">Market Flow</h3>
            <p className="text-gray-500 leading-relaxed font-medium">A frictionless ecosystem to fund localized climate action where impact is visible from space.</p>
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <footer className="py-16 border-t border-gray-200 text-center relative z-10">
        <p className="text-[11px] font-black text-brand-terracotta uppercase tracking-[0.4em] mb-6 animate-pulse">Building the Future of Accountability</p>
        <div className="flex items-center justify-center space-x-6">
          <Leaf className="w-5 h-5 text-gray-300" />
          <span className="text-xs text-gray-400 font-bold uppercase tracking-widest italic font-serif">Envify Alpha v1.2</span>
          <Target className="w-5 h-5 text-gray-300" />
        </div>
      </footer>
    </div>
  );
}
