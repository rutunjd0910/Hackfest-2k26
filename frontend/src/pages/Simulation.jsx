import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Legend } from "recharts";
import { Calculator, AlertTriangle, CheckCircle, TrendingUp } from "lucide-react";

export default function Simulation() {
  const [inputs, setInputs] = useState({
    expansionType: "new factory",
    size: 1000,
    energySource: "grid",
    location: "urban"
  });

  const [result, setResult] = useState(null);

  const handleSimulate = () => {
    // Mock simulation logic
    let factor = 2.5;
    if (inputs.energySource === 'renewable') factor = 0.5;
    if (inputs.energySource === 'mixed') factor = 1.5;

    let baseAdd = inputs.size * factor;
    if (inputs.expansionType === 'new office') baseAdd *= 0.2;
    if (inputs.expansionType === 'new fleet') baseAdd *= 0.8;

    const additionalCo2 = Math.round(baseAdd);
    const riskLevel = additionalCo2 > 2000 ? "High" : additionalCo2 > 800 ? "Medium" : "Low";

    setResult({
      annual: additionalCo2,
      fiveYear: additionalCo2 * 5,
      riskLevel,
      chartData: [
        { name: 'Year 1', Current: 1000, Projected: 1000 + additionalCo2 },
        { name: 'Year 2', Current: 1000, Projected: 1000 + (additionalCo2 * 1.1) },
        { name: 'Year 3', Current: 1000, Projected: 1000 + (additionalCo2 * 1.2) },
        { name: 'Year 4', Current: 1000, Projected: 1000 + (additionalCo2 * 1.3) },
        { name: 'Year 5', Current: 1000, Projected: 1000 + (additionalCo2 * 1.4) },
      ]
    });
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-3 bg-brand-blue/10 rounded-xl text-brand-blue">
          <TrendingUp className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Growth Simulation Module</h2>
          <p className="text-gray-500 text-sm">Predict environmental impact before breaking ground.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Form Controls */}
        <div className="lg:col-span-1 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Expansion Type</label>
              <select value={inputs.expansionType} onChange={e => setInputs({...inputs, expansionType: e.target.value})} className="w-full bg-gray-50 border border-gray-200 text-gray-700 py-2.5 px-3 rounded-lg text-sm focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue">
                <option value="new factory">New Factory</option>
                <option value="new office">New Office / HQ</option>
                <option value="new fleet">Logistics Fleet Expansion</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Size / Capacity</label>
              <input type="number" min="100" step="100" value={inputs.size} onChange={e => setInputs({...inputs, size: e.target.value})} className="w-full bg-gray-50 border border-gray-200 text-gray-700 py-2.5 px-3 rounded-lg text-sm focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Primary Energy Source</label>
              <select value={inputs.energySource} onChange={e => setInputs({...inputs, energySource: e.target.value})} className="w-full bg-gray-50 border border-gray-200 text-gray-700 py-2.5 px-3 rounded-lg text-sm focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue">
                <option value="grid">Standard Grid (Fossil Heavy)</option>
                <option value="mixed">Mixed Grid</option>
                <option value="renewable">100% Renewable</option>
              </select>
            </div>
            <button onClick={handleSimulate} className="w-full mt-4 flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-brand-blue hover:bg-blue-700 transition">
              <Calculator className="w-4 h-4 mr-2" /> Run Simulation
            </button>
          </div>
        </div>

        {/* Results Area */}
        <div className="lg:col-span-2 space-y-6">
          {result ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                  <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2 block">Projected Added Impact</span>
                  <div className="text-4xl font-black text-brand-black mb-1">{result.annual.toLocaleString()} <span className="text-xl text-gray-400 font-medium">t CO₂/yr</span></div>
                  <div className="text-sm text-gray-500 font-medium">+{(result.fiveYear).toLocaleString()} t CO₂ over 5 years</div>
                </div>

                <div className={`p-6 rounded-2xl shadow-sm border flex flex-col justify-center ${result.riskLevel === 'Low' ? 'bg-green-50 border-green-200' : result.riskLevel === 'Medium' ? 'bg-orange-50 border-orange-200' : 'bg-red-50 border-red-200'}`}>
                  <span className={`text-sm font-semibold uppercase tracking-wider mb-2 flex items-center ${result.riskLevel === 'Low' ? 'text-green-700' : result.riskLevel === 'Medium' ? 'text-orange-700' : 'text-red-700'}`}>
                    {result.riskLevel === 'Low' ? <CheckCircle className="w-4 h-4 mr-2"/> : <AlertTriangle className="w-4 h-4 mr-2" />} 
                    Carbon Risk Level
                  </span>
                  <div className={`text-4xl font-black ${result.riskLevel === 'Low' ? 'text-green-800' : result.riskLevel === 'Medium' ? 'text-orange-800' : 'text-red-800'}`}>
                    {result.riskLevel.toUpperCase()}
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-80">
                <h3 className="font-bold text-gray-800 mb-6">5-Year Growth Trajectory</h3>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={result.chartData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0"/>
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94A3B8'}} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#94A3B8'}} />
                    <RechartsTooltip cursor={{fill: 'transparent'}} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                    <Legend />
                    <Bar dataKey="Current" stackId="a" fill="#E2E8F0" radius={[0, 0, 4, 4]} />
                    <Bar dataKey="Projected" stackId="a" fill="#378ADD" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-blue-50 border-l-4 border-brand-blue p-4 rounded-r-lg">
                <p className="text-sm text-blue-900 font-medium">
                  <strong>Decision Guidance:</strong> This expansion will increase your baseline emissions by {((result.annual / 1000) * 100).toFixed(1)}%. {result.riskLevel === 'High' ? "Consider shifting strictly to renewable energy sources before proceeding to maintain ESG compliance." : "You can safely absorb this impact with minimal offsets."}
                </p>
              </div>
            </>
          ) : (
            <div className="h-full min-h-[400px] flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-2xl text-gray-400">
              <Calculator className="w-12 h-12 mb-4 text-gray-300" />
              <p className="font-medium">Define parameters and run simulation to see projections.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
