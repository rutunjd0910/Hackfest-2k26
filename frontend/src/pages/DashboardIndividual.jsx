import { useState, useEffect } from "react";
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Legend } from "recharts";
import { Zap, Car, Droplet, Trash2, Utensils, Lightbulb, AlertCircle, ArrowUp, RefreshCw, Check, Link } from "lucide-react";

const COLORS = ['#913D2F', '#1A5F73', '#D4AF37', '#BEE3DB', '#1A1A19'];

const initialData = {
  energy: 8,
  car: 30,
  water: 120,
  waste: 1.2,
  diet: 'mixed'
};

const historyData = [
  { name: 'Mon', co2: 14.2 },
  { name: 'Tue', co2: 13.8 },
  { name: 'Wed', co2: 15.1 },
  { name: 'Thu', co2: 12.9 },
  { name: 'Fri', co2: 12.4 },
  { name: 'Sat', co2: 10.5 },
  { name: 'Sun', co2: 11.2 },
];

export default function DashboardIndividual() {
  const [inputs, setInputs] = useState(initialData);
  const [metrics, setMetrics] = useState({ total: 12.4, score: "C+", scoreValue: 62 });
  const [pieData, setPieData] = useState([]);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncMessage, setSyncMessage] = useState("");

  const handleSync = async () => {
    setIsSyncing(true);
    setSyncMessage("Connecting to Nagpur Smart Grid...");
    
    try {
      const response = await fetch("http://localhost:8000/simulate-live-data");
      const data = await response.json();
      
      // Simulate network delay for "wow" effect
      setTimeout(() => {
        setSyncMessage(`Fetching from ${data.source}...`);
        setTimeout(() => {
          setInputs({
            energy: data.energy_kwh,
            car: data.transport_km_car,
            water: data.water_liters,
            waste: data.waste_kg,
            diet: data.diet
          });
          setIsSyncing(false);
          setSyncMessage("Sync Complete!");
          setTimeout(() => setSyncMessage(""), 3000);
        }, 1500);
      }, 1000);
    } catch (err) {
      console.error("Sync failed:", err);
      setIsSyncing(false);
      setSyncMessage("Connection Error");
    }
  };

  useEffect(() => {
    // Simulate calculation API
    const energyCo2 = inputs.energy * 0.85;
    const transportCo2 = inputs.car * 0.19;
    const waterCo2 = inputs.water * 0.005;
    const wasteCo2 = inputs.waste * 1.5;
    let dietCo2 = 2.5;
    if (inputs.diet === 'vegan') dietCo2 = 1.0;
    if (inputs.diet === 'vegetarian') dietCo2 = 1.5;
    if (inputs.diet === 'meat-heavy') dietCo2 = 3.5;

    const total = energyCo2 + transportCo2 + waterCo2 + wasteCo2 + dietCo2;
    const scoreVal = Math.max(0, 100 - (total * 2)); // simple mock logic
    
    let grade = "A+";
    if (scoreVal < 90) grade = "A";
    if (scoreVal < 80) grade = "B";
    if (scoreVal < 70) grade = "C+";
    if (scoreVal < 60) grade = "C";
    if (scoreVal < 50) grade = "D";
    if (scoreVal < 40) grade = "F";

    setMetrics({ total: parseFloat(total.toFixed(1)), score: grade, scoreValue: scoreVal.toFixed(0) });
    setPieData([
      { name: "Energy", value: parseFloat(energyCo2.toFixed(1)) },
      { name: "Transport", value: parseFloat(transportCo2.toFixed(1)) },
      { name: "Water", value: parseFloat(waterCo2.toFixed(1)) },
      { name: "Waste", value: parseFloat(wasteCo2.toFixed(1)) },
      { name: "Diet", value: parseFloat(dietCo2.toFixed(1)) },
    ]);
  }, [inputs]);

  const handleSlider = (e, field) => {
    setInputs(prev => ({ ...prev, [field]: parseFloat(e.target.value) }));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      
      {/* LEFT COLUMN: Input Form */}
      <div className="lg:col-span-1 space-y-6">
        <div className="bg-white/80 backdrop-blur-sm p-8 rounded-[2rem] shadow-sm border border-gray-100 relative overflow-hidden">
          {isSyncing && (
            <div className="absolute inset-0 bg-white/60 backdrop-blur-sm z-50 flex flex-col items-center justify-center p-6 text-center animate-in fade-in duration-300">
               <RefreshCw className="w-12 h-12 text-brand-terracotta animate-spin mb-4" />
               <p className="text-sm font-black text-brand-black uppercase tracking-widest">{syncMessage}</p>
            </div>
          )}
          
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-black flex items-center font-serif italic"><Lightbulb className="w-6 h-6 mr-3 text-brand-terracotta"/> Daily Activity</h2>
            <button 
              onClick={handleSync}
              className="p-2 bg-brand-cream border border-brand-terracotta/20 rounded-xl hover:bg-brand-terracotta hover:text-white transition group relative"
              title="Sync Live Data"
            >
              <RefreshCw className={`w-4 h-4 text-brand-terracotta group-hover:text-white ${isSyncing ? 'animate-spin' : ''}`} />
              {syncMessage === "Sync Complete!" && <span className="absolute -top-1 -right-1 flex h-3 w-3"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-teal opacity-75"></span><span className="relative inline-flex rounded-full h-3 w-3 bg-brand-teal"></span></span>}
            </button>
          </div>
          
          <div className="space-y-5">
            <div>
              <div className="flex justify-between mb-1">
                <label className="text-sm font-medium text-gray-700 flex items-center"><Zap className="w-4 h-4 mr-1 text-yellow-500"/> Energy (kWh)</label>
                <span className="text-sm font-bold text-brand-terracotta">{inputs.energy}</span>
              </div>
              <input type="range" min="0" max="30" step="0.5" value={inputs.energy} onChange={(e) => handleSlider(e, 'energy')} className="w-full accent-brand-terracotta" />
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <label className="text-sm font-medium text-gray-700 flex items-center"><Car className="w-4 h-4 mr-1 text-gray-500"/> Transport (km)</label>
                <span className="text-sm font-bold text-brand-terracotta">{inputs.car}</span>
              </div>
              <input type="range" min="0" max="100" step="1" value={inputs.car} onChange={(e) => handleSlider(e, 'car')} className="w-full accent-brand-terracotta" />
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <label className="text-sm font-medium text-gray-700 flex items-center"><Droplet className="w-4 h-4 mr-1 text-blue-400"/> Water (L)</label>
                <span className="text-sm font-bold text-brand-terracotta">{inputs.water}</span>
              </div>
              <input type="range" min="0" max="300" step="10" value={inputs.water} onChange={(e) => handleSlider(e, 'water')} className="w-full accent-brand-terracotta" />
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <label className="text-sm font-medium text-gray-700 flex items-center"><Trash2 className="w-4 h-4 mr-1 text-red-400"/> Waste (kg)</label>
                <span className="text-sm font-bold text-brand-terracotta">{inputs.waste}</span>
              </div>
              <input type="range" min="0" max="5" step="0.1" value={inputs.waste} onChange={(e) => handleSlider(e, 'waste')} className="w-full accent-brand-terracotta" />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 flex items-center mb-2"><Utensils className="w-4 h-4 mr-1 text-orange-400"/> Diet</label>
              <select 
                value={inputs.diet} 
                onChange={(e) => setInputs(prev => ({...prev, diet: e.target.value}))}
                className="w-full bg-gray-50 border border-gray-200 text-gray-700 py-3 px-4 rounded-xl text-sm focus:outline-none focus:border-brand-terracotta focus:ring-1 focus:ring-brand-terracotta"
              >
                <option value="vegan">Vegan</option>
                <option value="vegetarian">Vegetarian</option>
                <option value="mixed">Mixed (Average)</option>
                <option value="meat-heavy">Meat Heavy</option>
              </select>
            </div>
          </div>
        </div>

        {/* AI Action Tips */}
        <div className="bg-linear-to-br from-brand-terracotta to-brand-teal p-8 rounded-[2rem] shadow-xl text-white">
          <h3 className="font-black flex items-center mb-6 font-serif italic text-xl"><AlertCircle className="w-6 h-6 mr-3" /> AI Insights</h3>
          <ul className="space-y-4">
            <li className="bg-white/10 p-4 rounded-2xl border border-white/20 backdrop-blur-sm">
              <span className="block font-bold text-sm">Switch to Spectral LED</span>
              <span className="text-xs text-brand-mint/80 font-medium tracking-wide mt-1 block">Saves 1.3t/yr • ~8 mo payback</span>
            </li>
            <li className="bg-white/10 p-4 rounded-2xl border border-white/20 backdrop-blur-sm">
              <span className="block font-bold text-sm">Carpool Optimization</span>
              <span className="text-xs text-brand-mint/80 font-medium tracking-wide mt-1 block">Saves 0.8t/yr • Instantly active</span>
            </li>
            <li className="bg-white/10 p-4 rounded-2xl border border-white/20 backdrop-blur-sm">
              <span className="block font-bold text-sm">Biomass Diet Shift</span>
              <span className="text-xs text-brand-mint/80 font-medium tracking-wide mt-1 block">Saves 0.5t/yr • Health benchmarks</span>
            </li>
          </ul>
        </div>
      </div>

      {/* RIGHT COLUMN: Dashboards & Charts */}
      <div className="lg:col-span-2 space-y-6">
        
        {/* Top Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 flex flex-col justify-center">
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3">Daily Footprint</span>
            <div className="flex items-baseline space-x-2">
              <span className="text-5xl font-black text-brand-black font-serif italic">{metrics.total}</span>
              <span className="text-gray-400 font-bold text-xs uppercase tracking-widest">kg CO₂</span>
            </div>
            <div className="mt-3 flex items-center text-xs text-brand-teal font-black uppercase tracking-widest">
              <ArrowUp className="w-4 h-4 mr-1 rotate-180" /> 12% Variance
            </div>
          </div>

          <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 flex flex-col justify-center">
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3">Yearly Projection</span>
            <div className="flex items-baseline space-x-2">
              <span className="text-5xl font-black text-brand-teal font-serif italic">{(metrics.total * 365 / 1000).toFixed(1)}</span>
              <span className="text-gray-400 font-bold text-xs uppercase tracking-widest">t CO₂</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 flex flex-col justify-center">
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3">Trust Score</span>
            <div className="flex items-center justify-between">
              <span className="text-4xl font-black text-brand-terracotta font-serif italic">{metrics.scoreValue}<span className="text-lg font-bold text-gray-200">/100</span></span>
              <div className={`w-12 h-12 shrink-0 rounded-full flex items-center justify-center text-lg font-black border-2 ${metrics.score.includes('A') || metrics.score.includes('B') ? 'border-brand-mint text-brand-teal bg-brand-mint/10' : 'border-brand-terracotta text-brand-terracotta bg-brand-terracotta/10'}`}>
                {metrics.score}
              </div>
            </div>
            <div className="mt-4 w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
              <div className="h-full bg-brand-terracotta" style={{width: `${metrics.scoreValue}%`}}></div>
            </div>
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Pie Chart */}
          <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 hidden sm:block h-[450px]">
            <h3 className="font-black text-gray-800 mb-6 font-serif italic text-xl">Emissions Breakdown</h3>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie 
                  data={pieData} 
                  innerRadius={60} 
                  outerRadius={80} 
                  paddingAngle={5} 
                  dataKey="value"
                  label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <RechartsTooltip formatter={(value) => `${value} kg CO₂`} />
                <Legend 
                  verticalAlign="bottom" 
                  height={36} 
                  formatter={(value, entry, index) => (
                    <span className="text-xs font-bold text-gray-600">
                      {value}: {pieData[index] ? ((pieData[index].value / (metrics.total || 1)) * 100).toFixed(1) : 0}%
                    </span>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Line Chart */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-80">
            <h3 className="font-bold text-gray-800 mb-4">Past 7 Days</h3>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={historyData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94A3B8', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94A3B8', fontSize: 12}} />
                <RechartsTooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Line type="monotone" dataKey="co2" stroke="#913D2F" strokeWidth={4} dot={{r: 5, fill: '#913D2F', strokeWidth: 0}} activeDot={{r: 8}} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
}
