import { useState, useEffect } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, Legend } from "recharts";
import { Factory, Truck, Box, ShieldCheck, ShieldAlert, ArrowDown, RefreshCw, Layers } from "lucide-react";

const COLORS = ['#1A1A19', '#1A5F73', '#913D2F'];

export default function DashboardBusiness() {
  const [inputs, setInputs] = useState({
    operations: "300",
    transport: "400",
    supplyChain: "300",
  });

  const [metrics, setMetrics] = useState({ total: 1000, esgCompliant: false });
  const [pieData, setPieData] = useState([]);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncMessage, setSyncMessage] = useState("");

  const handleSync = async () => {
    setIsSyncing(true);
    setSyncMessage("Connecting to Enterprise ERP Vault...");
    
    try {
      const response = await fetch("http://localhost:8000/simulate-business-sync");
      const data = await response.json();
      
      setTimeout(() => {
        setSyncMessage(`Parsing ${data.source}...`);
        setTimeout(() => {
          setInputs({
            operations: data.operations,
            transport: data.transport,
            supplyChain: data.supplyChain
          });
          setIsSyncing(false);
          setSyncMessage("Registry Updated");
          setTimeout(() => setSyncMessage(""), 3000);
        }, 1500);
      }, 1000);
    } catch (err) {
      console.error("Business sync failed:", err);
      setIsSyncing(false);
      setSyncMessage("ERP Unavailable");
    }
  };

  useEffect(() => {
    const ops = parseFloat(inputs.operations) || 0;
    const trans = parseFloat(inputs.transport) || 0;
    const supply = parseFloat(inputs.supplyChain) || 0;
    
    const total = ops + trans + supply;
    const isCompliant = total <= 800; // threshold: 800t/mo
    setMetrics({ total, esgCompliant: isCompliant });

    setPieData([
      { name: "Scope 1 (Operations)", value: ops },
      { name: "Scope 2 (Transport)", value: trans },
      { name: "Scope 3 (Supply Chain)", value: supply },
    ]);
  }, [inputs]);

  const handleInput = (e, field) => {
    setInputs(prev => ({ ...prev, [field]: e.target.value }));
  };

  return (
    <div className="space-y-6">
      {/* Header summary */}
      <div className="bg-linear-to-br from-brand-black to-brand-teal rounded-[2rem] p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 decorative-blob opacity-20 -mr-20 -mt-20"></div>
        <p className="text-[10px] text-brand-mint/60 uppercase tracking-[0.3em] font-black mb-2">Aggregate Monthly Emissions</p>
        <div className="flex items-baseline space-x-3">
          <span className="text-6xl font-black font-serif italic">{metrics.total}</span>
          <span className="text-brand-mint/40 font-bold text-xs uppercase tracking-widest leading-loose">t CO₂/month</span>
        </div>
        <p className="text-sm text-gray-300 mt-4 font-medium italic opacity-80">Real-time Scope 1, 2 & 3 auditing across all business units — Acme Industries</p>
      </div>

      {/* Top Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-2">
        <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 flex flex-col justify-center">
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3 flex items-center"><Factory className="w-4 h-4 mr-2 text-brand-terracotta"/> Operations</span>
          <div className="flex items-baseline space-x-2">
            <span className="text-3xl font-black text-brand-black font-serif italic">{inputs.operations}</span>
            <span className="text-gray-400 font-bold text-[10px] uppercase">t CO₂/mo</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 flex flex-col justify-center">
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3 flex items-center"><Truck className="w-4 h-4 mr-2 text-brand-teal"/> Logistics</span>
          <div className="flex items-baseline space-x-2">
            <span className="text-3xl font-black text-brand-teal font-serif italic">{inputs.transport}</span>
            <span className="text-gray-400 font-bold text-[10px] uppercase">t CO₂/mo</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 flex flex-col justify-center">
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3 flex items-center"><Box className="w-4 h-4 mr-2 text-brand-terracotta"/> Supply Chain</span>
          <div className="flex items-baseline space-x-2">
            <span className="text-3xl font-black text-brand-terracotta font-serif italic">{inputs.supplyChain}</span>
            <span className="text-gray-400 font-bold text-[10px] uppercase">t CO₂/mo</span>
          </div>
        </div>

        <div className={`p-6 rounded-[2rem] shadow-sm border flex flex-col justify-center relative overflow-hidden ${metrics.esgCompliant ? 'bg-brand-mint/10 border-brand-mint/30' : 'bg-brand-terracotta/5 border-brand-terracotta/20'}`}>
          <span className={`text-[10px] font-black uppercase tracking-[0.2em] mb-3 flex items-center ${metrics.esgCompliant ? 'text-brand-teal' : 'text-brand-terracotta'}`}>
            {metrics.esgCompliant ? <ShieldCheck className="w-5 h-5 mr-2"/> : <ShieldAlert className="w-5 h-5 mr-2"/>} 
            ESG Status
          </span>
          <div className="flex items-baseline space-x-2">
            <span className={`text-2xl font-black font-serif italic ${metrics.esgCompliant ? 'text-brand-teal' : 'text-brand-terracotta'}`}>{metrics.esgCompliant ? 'COMPLIANT' : 'AT RISK'}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Input Controls */}
        <div className="lg:col-span-1 bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 relative overflow-hidden">
          {isSyncing && (
            <div className="absolute inset-0 bg-white/70 backdrop-blur-md z-50 flex flex-col items-center justify-center p-8 text-center animate-in fade-in duration-300">
               <Layers className="w-12 h-12 text-brand-teal animate-bounce mb-4" />
               <p className="text-xs font-black text-brand-black uppercase tracking-[0.2em]">{syncMessage}</p>
            </div>
          )}
          
          <div className="flex justify-between items-center mb-8">
            <h3 className="font-black text-xl text-brand-black font-serif italic">Metrics Input</h3>
            <button 
              onClick={handleSync}
              className="px-3 py-1.5 bg-brand-teal text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-brand-black transition-colors flex items-center shadow-lg shadow-brand-teal/20"
            >
              <RefreshCw className={`w-3 h-3 mr-2 ${isSyncing ? 'animate-spin' : ''}`} />
              Sync ERP
            </button>
          </div>
          <div className="space-y-6">
            <div>
              <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Operations (t CO₂)</label>
              <input type="number" min="0" value={inputs.operations} onChange={(e) => handleInput(e, 'operations')} className="w-full bg-gray-50 border border-gray-200 text-gray-700 py-3 px-4 rounded-xl text-sm focus:outline-none focus:border-brand-terracotta focus:ring-1 focus:ring-brand-terracotta" />
            </div>
            <div>
              <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Logistics (t CO₂)</label>
              <input type="number" min="0" value={inputs.transport} onChange={(e) => handleInput(e, 'transport')} className="w-full bg-gray-50 border border-gray-200 text-gray-700 py-3 px-4 rounded-xl text-sm focus:outline-none focus:border-brand-terracotta focus:ring-1 focus:ring-brand-terracotta" />
            </div>
            <div>
              <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Supply Chain (t CO₂)</label>
              <input type="number" min="0" value={inputs.supplyChain} onChange={(e) => handleInput(e, 'supplyChain')} className="w-full bg-gray-50 border border-gray-200 text-gray-700 py-3 px-4 rounded-xl text-sm focus:outline-none focus:border-brand-terracotta focus:ring-1 focus:ring-brand-terracotta" />
            </div>
          </div>
        </div>

        {/* Donut Chart */}
        <div className="lg:col-span-1 bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 flex flex-col items-center">
          <h3 className="font-black text-xl mb-6 text-brand-black font-serif italic self-start">Scope Breakdown</h3>
          <div className="w-full h-80 relative">
             <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie 
                  data={pieData} 
                  innerRadius={70} 
                  outerRadius={90} 
                  paddingAngle={2} 
                  dataKey="value"
                  label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} strokeWidth={0} />
                  ))}
                </Pie>
                <RechartsTooltip formatter={(value) => `${value} t CO₂`} />
                <Legend 
                  verticalAlign="bottom" 
                  height={36} 
                  formatter={(value, entry, index) => (
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                      {value}: {pieData[index] ? ((pieData[index].value / (metrics.total || 1)) * 100).toFixed(1) : 0}%
                    </span>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none -mt-10">
              <span className="text-4xl font-black text-brand-black font-serif italic">{metrics.total}</span>
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Aggregate</span>
            </div>
          </div>
        </div>

        {/* Actionable Insights */}
        <div className="lg:col-span-1 bg-brand-black p-8 rounded-[2rem] shadow-xl text-white flex flex-col relative overflow-hidden">
          <div className="absolute bottom-0 right-0 w-48 h-48 decorative-blob opacity-10 -mb-10 -mr-10 bg-brand-terracotta"></div>
          <h3 className="font-black text-xl mb-6 text-gray-100 font-serif italic">Enterprise Insights</h3>
          <div className="flex-1 space-y-5">
            <div className="bg-white/5 p-5 rounded-2xl border border-white/10 backdrop-blur-sm">
              <div className="flex items-start justify-between">
                <span className="font-bold text-sm">Solar Photovoltaic Grid</span>
                <span className="px-2 py-0.5 bg-brand-mint/20 text-brand-mint text-[10px] rounded-full font-black uppercase tracking-widest">Tier 1</span>
              </div>
              <p className="text-xs text-gray-400 mt-2 font-medium">Provisioning 500kW rooftop array for facility 4A.</p>
              <div className="mt-4 flex items-center text-brand-mint text-xs font-black uppercase tracking-widest">
                <ArrowDown className="w-4 h-4 mr-1" /> Save 1.8t CO₂
              </div>
            </div>

            <div className="bg-white/5 p-5 rounded-2xl border border-white/10 backdrop-blur-sm">
              <div className="flex items-start justify-between">
                <span className="font-bold text-sm">Logistics Fleet Decarbon</span>
                <span className="px-2 py-0.5 bg-brand-gold/20 text-brand-gold text-[10px] rounded-full font-black uppercase tracking-widest">Tier 2</span>
              </div>
              <p className="text-xs text-gray-400 mt-2 font-medium">Transitioning 20% of fleet to EV clusters.</p>
              <div className="mt-4 flex items-center text-brand-mint text-xs font-black uppercase tracking-widest">
                <ArrowDown className="w-4 h-4 mr-1" /> Save 0.5t CO₂
              </div>
            </div>
          </div>
        </div>
      </div>
    
    </div>
  );
}
