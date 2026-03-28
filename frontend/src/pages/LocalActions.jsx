import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { MapPin, CheckCircle, Clock, ShieldCheck, RefreshCw, Satellite } from "lucide-react";
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import L from 'leaflet';

// Fix leaflet marker icon rendering issue in react
let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

const DEMO_PROJECTS = [
  { id: 1, lat: 21.1458, lng: 79.0882, title: "Nagpur Green Belt Tree Drive", type: "Tree Plantation", impact: "12t CO₂/yr", distance: "3km", funding: 60, status: "pending", host: "EcoNagpur" },
  { id: 2, lat: 21.2000, lng: 79.1500, title: "Vidarbha Solar Farm", type: "Solar", impact: "800t CO₂/yr", distance: "18km", funding: 100, status: "verified", host: "SunPower India" },
  { id: 3, lat: 21.1100, lng: 79.0500, title: "Orange Peel Waste-to-Compost", type: "Waste", impact: "400t CO₂/yr", distance: "5km", funding: 20, status: "under review", host: "AgriTech LLC" },
];

function MapEffect({ isScanning }) {
  const map = useMap();
  useEffect(() => {
    if (isScanning) {
      map.flyTo([21.1458, 79.0882], 14, { duration: 1.5 });
    }
  }, [isScanning, map]);
  return null;
}

export default function LocalActions() {
  const [projects, setProjects] = useState(DEMO_PROJECTS);
  const [selectedProject, setSelectedProject] = useState(null);
  const [successMsg, setSuccessMsg] = useState("");
  const [isScanning, setIsScanning] = useState(false);

  const handleFund = (id) => {
    setIsScanning(true);
    
    setTimeout(() => {
      setProjects(prev => prev.map(p => {
        if (p.id === id) {
          const newFunding = Math.min(100, p.funding + 10);
          return { ...p, funding: newFunding };
        }
        return p;
      }));
      
      // Update global session offsets
      const currentOffset = parseFloat(sessionStorage.getItem('envify_total_offset') || "812");
      sessionStorage.setItem('envify_total_offset', (currentOffset + 50).toString());
      
      const fundedCount = parseInt(sessionStorage.getItem('envify_projects_funded') || "2");
      sessionStorage.setItem('envify_projects_funded', (fundedCount + 1).toString());

      setSuccessMsg("✓ Satellite Verification Complete! Offset Reflected in Profile.");
      setIsScanning(false);
      setTimeout(() => setSuccessMsg(""), 5000);
    }, 2000);
  };

  const handleHostProject = () => {
    alert("Project registration form submitted! Our satellite verification team will review your site shortly.");
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto h-[calc(100vh-120px)] flex flex-col pt-2 relative overflow-hidden">
      
      {/* Satellite Scan Overlay */}
      {isScanning && (
        <div className="absolute inset-0 bg-brand-black/40 z-1000 pointer-events-none flex items-center justify-center backdrop-blur-sm">
          <div className="absolute top-0 left-0 w-full h-1 bg-brand-terracotta/60 shadow-[0_0_20px_rgba(145,61,47,1)] animate-scan"></div>
          <div className="bg-brand-black p-10 rounded-[2.5rem] border border-white/10 text-white flex flex-col items-center animate-in zoom-in duration-300 shadow-2xl">
            <RefreshCw className="w-12 h-12 text-brand-mint animate-spin mb-6" />
            <h3 className="text-2xl font-black mb-2 flex items-center font-serif italic tracking-tight">
              <Satellite className="w-6 h-6 mr-3 text-brand-terracotta" /> Orbital Uplink Established
            </h3>
            <p className="text-brand-mint font-mono text-[10px] uppercase tracking-widest opacity-80">Scanning NDVI Pixels: 21.14N, 79.08E</p>
            <div className="mt-8 w-64 h-1 bg-white/5 rounded-full overflow-hidden">
              <div className="h-full bg-brand-terracotta animate-pulse shadow-[0_0_10px_rgba(145,61,47,0.5)]"></div>
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between mb-4 shrink-0 px-2">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center">
            <MapPin className="w-6 h-6 text-brand-terracotta" />
          </div>
          <div>
            <h2 className="text-3xl font-black text-brand-black font-serif italic tracking-tight leading-none">Local Climate Action Map</h2>
            <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mt-1">Verified Node Deployment Registry</p>
          </div>
        </div>

        {successMsg && (
          <div className="bg-brand-mint/10 border border-brand-mint/30 text-brand-teal text-[10px] font-black uppercase tracking-[0.2em] px-6 py-3 rounded-full shadow-lg shadow-brand-mint/5 animate-in fade-in slide-in-from-top-2 flex items-center">
            <ShieldCheck className="w-4 h-4 mr-3" />
            {successMsg}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-0">
        
        {/* Project List / Details Sidebar */}
        <div className="lg:col-span-1 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
          <div className="p-4 border-b border-gray-100 bg-gray-50 shrink-0">
            <h3 className="font-bold text-gray-800">Nearby Projects ({projects.length})</h3>
          </div>
          <div className="overflow-y-auto flex-1 p-4 space-y-4">
            {projects.map(proj => (
              <div 
                key={proj.id} 
                className={`p-5 rounded-[2rem] border-2 cursor-pointer transition-all duration-300 ${selectedProject?.id === proj.id ? 'border-brand-terracotta bg-white shadow-xl shadow-brand-terracotta/5' : 'border-white bg-white/40 grayscale hover:grayscale-0 hover:border-gray-200 shadow-sm'}`}
                onClick={() => setSelectedProject(proj)}
              >
                <div className="flex justify-between items-start mb-3">
                  <h4 className="font-bold text-brand-black leading-tight text-base font-serif italic">{proj.title}</h4>
                  <span className={`text-[9px] px-2.5 py-1 rounded-full uppercase font-black tracking-widest ${proj.status === 'verified' ? 'bg-brand-teal text-white' : 'bg-brand-gold text-brand-black'}`}>
                    {proj.status}
                  </span>
                </div>
                <div className="text-[10px] text-gray-400 mb-4 flex items-center font-bold uppercase tracking-widest">
                  <span className="bg-gray-100 px-2 py-0.5 rounded text-gray-500 mr-2">{proj.type}</span> 
                  {proj.distance} Reach
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-gray-100 rounded-full h-2 mb-2 overflow-hidden">
                  <div className="bg-brand-terracotta h-full rounded-full transition-all duration-1000 shadow-[0_0_10px_rgba(145,61,47,0.3)]" style={{ width: `${proj.funding}%` }}></div>
                </div>
                <div className="flex justify-between text-[10px] text-gray-400 font-black uppercase tracking-widest">
                  <span className={proj.funding >= 100 ? "text-brand-teal" : ""}>{proj.funding}% Committed</span>
                  <span className="text-brand-black">{proj.impact} Net</span>
                </div>

                {/* Expanded Details when selected */}
                {selectedProject?.id === proj.id && (
                    <div className="mt-5 pt-5 border-t border-gray-100 animate-in fade-in zoom-in-95 duration-200">
                      <div className="bg-brand-cream/50 p-4 rounded-2xl border border-gray-100 mb-5">
                        <div className="flex items-center text-[10px] font-black uppercase tracking-[0.2em] mb-2 text-brand-black">
                          {proj.status === 'verified' ? <ShieldCheck className="w-4 h-4 text-brand-teal mr-2" /> : <Clock className="w-4 h-4 text-brand-gold mr-2" />}
                          Audit Protocol: {proj.status === 'verified' ? 'Dual Signature' : 'Validation Sequence'}
                        </div>
                        <p className="text-[11px] text-gray-500 font-medium leading-relaxed">
                          {proj.status === 'verified' ? 'Sentinel-2 cluster has confirmed the biomass density and structural alignment.' : 'Orbital NDVI verification requested. Multi-spectral analysis pending.'}
                        </p>
                      </div>
                      <button 
                        onClick={(e) => { e.stopPropagation(); handleFund(proj.id); }}
                        disabled={proj.funding >= 100}
                        className={`w-full py-3.5 text-white text-xs uppercase tracking-[0.2em] font-black rounded-2xl shadow-xl transition-all duration-300 transform active:scale-95 ${proj.funding >= 100 ? 'bg-gray-300 cursor-not-allowed shadow-none' : 'bg-brand-terracotta hover:bg-brand-teal shadow-brand-terracotta/20 hover:shadow-brand-teal/20'}`}
                      >
                        {proj.funding >= 100 ? 'Audit Cycle Complete' : 'Commit Funding'}
                      </button>
                    </div>
                )}
              </div>
            ))}
          </div>
          
          <div className="p-5 bg-white border-t border-gray-100 shrink-0">
            <button 
              onClick={handleHostProject}
              className="w-full py-3.5 bg-brand-black text-white text-xs uppercase tracking-[0.2em] font-black rounded-2xl shadow-xl shadow-black/10 hover:bg-brand-terracotta transition"
            >
              + Register Deployment Node
            </button>
          </div>
        </div>

        {/* Leaflet Map */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden relative z-0">
          <MapContainer center={[21.1458, 79.0882]} zoom={12} scrollWheelZoom={true} className="w-full h-full">
            <MapEffect isScanning={isScanning} />
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {projects.map((proj) => (
              <Marker key={proj.id} position={[proj.lat, proj.lng]}>
                <Popup>
                  <div className="p-1 min-w-[150px]">
                    <h3 className="font-bold text-sm mb-1">{proj.title}</h3>
                    <p className="text-xs text-gray-600 mb-2">{proj.type} • {proj.impact}</p>
                    <button 
                      onClick={() => setSelectedProject(proj)}
                      className="w-full py-1 text-[11px] uppercase tracking-wider font-bold bg-brand-green text-white rounded shadow-sm"
                    >
                      View Details
                    </button>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
    </div>
  );
}
