import { FileText, Download, Award, Target, Leaf, Share2, ShieldCheck, CheckCircle, Globe } from "lucide-react";

export default function ImpactReport() {
  const userName = sessionStorage.getItem('envify_user_name') || "Rutunj Dewase";
  const totalOffset = sessionStorage.getItem('envify_total_offset') || "812";
  const projectsCount = sessionStorage.getItem('envify_projects_funded') || "2";
  
  const reportData = {
    user: userName,
    date: new Date().toLocaleDateString(),
    baseline: 5000,
    current: 4200 - (parseFloat(totalOffset) - 812), // Adjust based on extra funding
    reduction: 16.0 + ((parseFloat(totalOffset) - 812) / 100),
    points: 1250,
    badge: "Gold Purity"
  };

  const shareOnLinkedIn = () => {
    const text = `I just reached ${reportData.badge} status on Envify! I've offset ${totalOffset}kg of CO2 this month through verified local projects. Join the movement! #ClimateAction #Envify`;
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.origin)}&text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div className="space-y-2">
          <h2 className="text-4xl font-black text-brand-black tracking-tighter font-serif italic">Environmental Impact Report</h2>
          <p className="text-[10px] text-gray-400 uppercase font-black tracking-[0.3em]">Official Carbon Accountability Statement — {reportData.user}</p>
        </div>
        <div className="flex space-x-4">
          <button 
            onClick={shareOnLinkedIn}
            className="flex items-center space-x-2 px-6 py-3 bg-brand-teal text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-brand-teal/20 hover:scale-105 transition active:scale-95"
          >
            <Share2 className="w-4 h-4" />
            <span>Share Achievement</span>
          </button>
          <button className="flex items-center space-x-2 px-6 py-3 bg-brand-black text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-black/20 hover:bg-brand-terracotta transition">
            <Download className="w-4 h-4" />
            <span>Export Registry</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* PREMIUM BADGE CARD */}
        <div className="md:col-span-1 bg-brand-black rounded-[3rem] p-10 text-white relative overflow-hidden flex flex-col items-center justify-center text-center shadow-2xl">
          <div className="absolute top-0 right-0 w-48 h-48 decorative-blob opacity-20 -mr-20 -mt-20 bg-brand-terracotta animate-pulse-glow"></div>
          
          <div className="relative z-10 w-full">
            <div className="w-36 h-36 bg-white/5 rounded-full mx-auto flex items-center justify-center mb-8 border border-white/10 backdrop-blur-md shadow-2xl relative group">
              <div className="absolute inset-0 rounded-full border-2 border-brand-terracotta animate-ping opacity-20 group-hover:opacity-40 transition"></div>
              <Award className="w-20 h-20 text-brand-terracotta drop-shadow-[0_0_20px_rgba(145,61,47,0.8)]" />
              <div className="absolute -bottom-2 -right-1 bg-brand-terracotta text-white p-2 rounded-full shadow-lg">
                <ShieldCheck className="w-5 h-5" />
              </div>
            </div>
            
            <h3 className="text-3xl font-black mb-2 tracking-tighter font-serif italic text-brand-mint">{reportData.badge}</h3>
            <p className="text-brand-terracotta font-black text-[10px] uppercase tracking-[0.3em]">Verified Carbon Delegate</p>
            
            <div className="mt-10 pt-8 border-t border-white/5 w-full">
              <p className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">Registry ID: 4429-ENV-ZX</p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 decorative-blob group-hover:opacity-20 opacity-0 transition bg-brand-teal -mr-10 -mt-10"></div>
            <div className="flex items-center space-x-3 text-gray-400 mb-6">
              <Globe className="w-4 h-4 text-brand-teal" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Registry Offset</span>
            </div>
            <div className="flex items-baseline space-x-2">
              <span className="text-5xl font-black text-brand-black font-serif italic">{totalOffset}</span>
              <span className="text-gray-400 font-bold text-xs uppercase tracking-widest italic leading-loose">kg CO₂</span>
            </div>
            <p className="text-[10px] text-brand-teal font-black uppercase tracking-widest mt-4 flex items-center">
              <ShieldCheck className="w-4 h-4 mr-2" /> Proven Reduction Chain
            </p>
          </div>

          <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 decorative-blob group-hover:opacity-20 opacity-0 transition bg-brand-terracotta -mr-10 -mt-10"></div>
            <div className="flex items-center space-x-3 text-gray-400 mb-6">
              <Target className="w-4 h-4 text-brand-terracotta" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Audit Status</span>
            </div>
            <div className="flex items-baseline space-x-2">
              <span className="text-5xl font-black text-brand-terracotta font-serif italic">{reportData.reduction.toFixed(1)}%</span>
            </div>
            <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mt-4">Target Efficiency: 25.0%</p>
          </div>

          <div className="sm:col-span-2 bg-white/80 backdrop-blur-md p-8 rounded-[2.5rem] border border-gray-100 shadow-sm flex items-center justify-between group">
            <div className="flex items-center space-x-6 text-left">
              <div className="w-16 h-16 bg-brand-teal/10 rounded-3xl flex items-center justify-center group-hover:scale-110 transition">
                <Leaf className="w-8 h-8 text-brand-teal" />
              </div>
              <div>
                <h4 className="font-black text-brand-black text-xl font-serif italic tracking-tight">Regional Portfolio</h4>
                <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">{projectsCount} Verified Node Deployments</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-4xl font-black text-brand-black font-serif italic leading-none">{projectsCount}</p>
              <p className="text-[10px] text-gray-400 uppercase font-black tracking-widest mt-2">Active</p>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Verification Seal */}
      <div className="bg-green-50/50 p-6 rounded-3xl border border-green-100 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center space-x-4 text-left">
          <div className="w-14 h-14 bg-white rounded-2xl shadow-sm border border-green-100 flex items-center justify-center animate-pulse-glow shrink-0">
            <ShieldCheck className="w-8 h-8 text-brand-green" />
          </div>
          <div>
            <h4 className="font-bold text-brand-black">Satellite Verification Chain</h4>
            <p className="text-sm text-gray-500 max-w-md">Every gram of carbon offset is verified via multi-spectral analysis from Sentinel-2 satellite data and locally verified ground audits.</p>
          </div>
        </div>
        <div className="flex -space-x-3 shrink-0">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-gray-200 shadow-sm">
              <img src={`https://i.pravatar.cc/40?img=${i+10}`} alt="Verifier" className="rounded-full w-full h-full object-cover grayscale" />
            </div>
          ))}
          <div className="w-10 h-10 rounded-full border-2 border-white bg-brand-green flex items-center justify-center text-brand-black text-[10px] font-black">
            +18
          </div>
        </div>
      </div>
    </div>
  );
}
